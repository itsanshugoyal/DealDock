import { revalidateTag } from 'next/cache';
import { session,sameOrigin,airtable,list,fail } from '@/lib/crm/server';
import { clientLead,mutateLead,normalizeHandle,pack,httpUrl,counts,queue,version } from '@/lib/crm/model.mjs';
import { assignment } from '@/lib/crm/team.mjs';
export async function GET(){
  if(!await session())return Response.json({error:'Sign in to the CRM'},{status:401});
  try{const [leads,ops,calls]=await Promise.all([list('Leads'),list('CRM Operations'),list('Calls')]);
    const q=queue(leads);
    return Response.json({leads:leads.map(clientLead),operations:ops.map(r=>({id:r.id,...JSON.parse(r.fields.payload),kind:r.fields.kind,key:r.fields.key,rawPayload:r.fields.payload})),calls,syncedAt:new Date().toISOString(),activity:counts(leads).events,outreach:{ready:q.ready.map((r:{id:string})=>r.id),overflow:q.overflow.map((r:{id:string})=>r.id),ig:q.counts.ig,li:q.counts.li}},{headers:{'Cache-Control':'no-store'}});
  }catch(e){return fail(e);}
}
export async function POST(request:Request){
  const s=await session();if(!s)return Response.json({error:'Sign in to the CRM'},{status:401});
  if(!sameOrigin(request))return Response.json({error:'Invalid origin'},{status:403});
  try{
    const body=await request.json();
    if(body.type==='lead'){
      const handle=normalizeHandle(body.handle);const rows=await list('Leads',false);
      if(rows.some(r=>normalizeHandle(r.fields.ig_handle)===handle))throw new Error('This lead already exists');
      const source=String(body.source||'vibe_prospecting');if(!['vibe_prospecting','warm_intro','inbound','community','linkedin','podcast_guest','ig_hashtag','ig_follower_mining','twitter'].includes(source))throw new Error('Invalid source');
      const result=await airtable('Leads','POST',{fields:{ig_handle:handle,source,source_detail:httpUrl(body.sourceUrl),date_sourced:new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata'}).format(new Date()),qualification_status:'pending',enrichment_status:'pending',stage:'Sourced',notes:pack('',{segment:body.segment==='brand_deal'?'brand_deal':'owned_offer',owner:s.name,events:[{type:'created',at:new Date().toISOString(),actor:s.name}]})}});
      revalidateTag('crm-Leads',{expire:0});return Response.json({lead:clientLead(result)},{status:201});
    }
    if(body.type==='operation'){
      if(!['task','campaign'].includes(body.kind))throw new Error('Invalid work type');
      if(typeof body.data?.title!=='string'||!body.data.title.trim()||body.data.title.length>160)throw new Error('Enter a title');
      const allowed=['title','owner','status','channel','due','notes','url','budget','spend','leads','calls','customers','leadId'];
      const data:Record<string,unknown>={};for(const key of allowed)if(body.data[key]!==undefined)data[key]=body.data[key];
      for(const key of allowed.filter(k=>!['budget','spend','leads','calls','customers'].includes(k)))if(data[key]!==undefined&&(typeof data[key]!=='string'||String(data[key]).length>12000))throw new Error('Work item text is invalid or too long');
      const statuses=body.kind==='task'?['todo','in-progress','blocked','done']:['idea','draft','ready','published','running','paused','complete'];if(data.status&&!statuses.includes(String(data.status)))throw new Error('Invalid work status');
      for(const key of ['budget','spend','leads','calls','customers'])if(data[key]!==undefined&&(!Number.isFinite(data[key])||Number(data[key])<0))throw new Error('Metrics must be nonnegative numbers');
      if(data.owner!==undefined)data.owner=assignment(data.owner);
      if(data.url)data.url=httpUrl(data.url);data.updatedAt=new Date().toISOString();data.updatedBy=s.name;
      let itemKey=crypto.randomUUID();
      if(body.id){const previous=await airtable('CRM Operations/'+body.id);if(previous.fields.payload!==body.expected)throw new Error('This item changed. Refresh before saving.');if(previous.fields.kind!==body.kind)throw new Error('Work item type cannot change');itemKey=previous.fields.key;}
      const payload=JSON.stringify(data);if(payload.length>20000)throw new Error('Work item is too large');
      const result=await airtable(body.id?'CRM Operations/'+body.id:'CRM Operations',body.id?'PATCH':'POST',{fields:{key:itemKey,kind:body.kind,payload}});
      revalidateTag('crm-CRM Operations',{expire:0});return Response.json({record:result});
    }
    if(body.type==='lead_action'){
      if(!/^rec[a-zA-Z0-9]+$/.test(body.id))throw new Error('Invalid lead');
      const rows=await list('Leads',false),record=rows.find(r=>r.id===body.id);if(!record)throw new Error('Lead not found');
      const mutation=mutateLead(record,body,s.name,rows);if(mutation.duplicate)return Response.json({ok:true,duplicate:true});
      // Read again before writing to catch intervening changes in the shared workspace.
      const latest=await airtable('Leads/'+body.id);if(version(latest)!==version(record))throw new Error('This lead changed. Refresh before saving.');
      const saved=await airtable('Leads/'+body.id,'PATCH',{fields:mutation.fields});revalidateTag('crm-Leads',{expire:0});
      const updated=rows.map(r=>r.id===saved.id?saved:r),q=queue(updated);
      return Response.json({lead:clientLead(saved),activity:counts(updated).events,outreach:{ready:q.ready.map((r:{id:string})=>r.id),overflow:q.overflow.map((r:{id:string})=>r.id),ig:q.counts.ig,li:q.counts.li}});
    }
    throw new Error('Unsupported request');
  }catch(e){return fail(e);}
}
