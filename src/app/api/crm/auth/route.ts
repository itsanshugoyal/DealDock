import { randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { readFile,appendFile } from 'node:fs/promises';
import { hashPassword,verifyPassword,signSession } from '@/lib/crm/auth.mjs';
import { session,sameOrigin,fail } from '@/lib/crm/server';
import { cofounderName } from '@/lib/crm/team.mjs';
const attempts=new Map<string,{count:number,until:number}>();
export async function GET(){const s=await session();return Response.json({user:s?.name||null,configured:!!process.env.CRM_PASSWORD_HASH,localSetup:!process.env.VERCEL&&!process.env.CRM_PASSWORD_HASH},{headers:{'Cache-Control':'no-store'}});}
export async function POST(request:Request){
  if(!sameOrigin(request))return Response.json({error:'Invalid origin'},{status:403});
  try{
    const body=await request.json();
    if(body.action==='setup'&&(process.env.VERCEL||process.env.CRM_PASSWORD_HASH||!['localhost','127.0.0.1'].includes(new URL(request.url).hostname)))return Response.json({error:'Setup is available once, on your local computer only'},{status:403});
    const name=cofounderName(body.name);
    if(body.action==='setup'){
      if(process.env.VERCEL||process.env.CRM_PASSWORD_HASH||!['localhost','127.0.0.1'].includes(new URL(request.url).hostname))return Response.json({error:'Setup is available once, on your local computer only'},{status:403});
      const hash=hashPassword(body.password),secret=randomBytes(48).toString('hex');
      await readFile('.env.local','utf8');await appendFile('.env.local',`\nCRM_PASSWORD_HASH=${hash}\nCRM_SESSION_SECRET=${secret}\n`);
      process.env.CRM_PASSWORD_HASH=hash;process.env.CRM_SESSION_SECRET=secret;
    }else{
      const ip=request.headers.get('x-forwarded-for')||'local';const limit=attempts.get(ip);if(limit&&limit.until>Date.now()&&limit.count>=5)return Response.json({error:'Too many attempts. Try again in 15 minutes.'},{status:429});
      if(!process.env.CRM_PASSWORD_HASH)throw new Error('Complete workspace setup locally before deployment');
      if(typeof body.password!=='string'||body.password.length>256||!verifyPassword(body.password,process.env.CRM_PASSWORD_HASH)){attempts.set(ip,{count:(limit?.until&&limit.until>Date.now()?limit.count:0)+1,until:Date.now()+900000});return Response.json({error:'Incorrect workspace password'},{status:401});}attempts.delete(ip);
    }
    (await cookies()).set('dd_crm',signSession(name,process.env.CRM_SESSION_SECRET||''),{httpOnly:true,secure:!!process.env.VERCEL,sameSite:'strict',path:'/',maxAge:86400});
    return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
  }catch(e){return fail(e);}
}
export async function DELETE(request:Request){if(!sameOrigin(request))return Response.json({error:'Invalid origin'},{status:403});(await cookies()).delete('dd_crm');return Response.json({ok:true});}
