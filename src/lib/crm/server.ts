import { cookies } from 'next/headers';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { verifySession,validOrigin } from './auth.mjs';
export async function session(){return verifySession((await cookies()).get('dd_crm')?.value||'',process.env.CRM_SESSION_SECRET||'');}
export function sameOrigin(request:Request){return validOrigin(request);}
export function fail(error:unknown){const message=error instanceof Error?error.message:'Request failed';return Response.json({error:message},{status:message.includes('changed')?409:400,headers:{'Cache-Control':'no-store'}});}
export async function airtable(table:string,method='GET',body?:unknown,query='',cached=false){
  if(existsSync(resolve('.crm-retired.json')) && method!=='GET')throw new Error('This Airtable CRM is archived. Use Founder CRM (Supabase) for changes.');
  if(!process.env.AIRTABLE_PAT||!process.env.AIRTABLE_BASE_ID)throw new Error('Airtable is not configured');
  const res=await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${table.split('/').map(encodeURIComponent).join('/')}${query}`,{
    method,headers:{Authorization:`Bearer ${process.env.AIRTABLE_PAT}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,
    ...(cached?{next:{revalidate:900,tags:['crm-'+table.split('/')[0]]}}:{cache:'no-store' as RequestCache})
  });
  if(!res.ok){if(res.status===429)throw new Error('Airtable quota or rate limit reached. Try later; nothing was sent.');throw new Error(`Airtable request failed (${res.status}). Check configuration and table permissions.`);}
  return res.json();
}
export async function list(table:string,cached=true){const records=[];let offset='';do{const data=await airtable(table,'GET',undefined,'?pageSize=100'+(offset?'&offset='+encodeURIComponent(offset):''),cached);records.push(...data.records);offset=data.offset||'';}while(offset);return records;}
