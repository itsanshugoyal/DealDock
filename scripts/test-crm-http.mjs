import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import nextEnv from '@next/env';
import {hashPassword,signSession} from '../src/lib/crm/auth.mjs';
import {workMutation} from '../src/lib/crm/views.mjs';
nextEnv.loadEnvConfig(process.cwd(),true,{info(){},error(){}});
const hosted=process.argv.includes('--hosted');
const secret=hosted?process.env.CRM_SESSION_SECRET:randomBytes(48).toString('hex'),password=randomBytes(24).toString('hex'),origin=hosted?'https://dealdock-crm.vercel.app':'http://127.0.0.1:3457';
if(!secret)throw new Error('CRM session configuration is missing');
const child=hosted?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','--port','3457','--hostname','127.0.0.1'],{windowsHide:true,stdio:['ignore','pipe','pipe'],env:{...process.env,CRM_SESSION_SECRET:secret,CRM_PASSWORD_HASH:hashPassword(password),VERCEL:'1'}});
child?.stdout?.resume();child?.stderr?.resume();let temporary;
async function call(path,body,authenticated=true,source=origin){return fetch(origin+path,{method:body?'POST':'GET',headers:{...(authenticated?{Cookie:'dd_crm='+signSession('CRM verification',secret)}:{}),Origin:source,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});}
try{
  let ready=false;for(let n=0;n<45;n++){try{if((await fetch(origin+'/api/crm/auth')).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,1000));}assert.ok(ready,'Production server should start');
  assert.equal((await call('/dashboard')).status,200);
  assert.equal((await call('/api/crm',undefined,false)).status,401);
  assert.equal((await call('/api/airtable',undefined,false)).status,401);
  assert.equal((await call('/api/n8n/workflows')).status,410);
  assert.equal((await call('/api/crm',{type:'lead'},true,'https://untrusted.example')).status,403);
  const r=await call('/api/crm');assert.equal(r.status,200);const data=await r.json();assert.equal(data.leads.length,76);assert.equal(data.outreach.ready.length,0);console.log('Authenticated production API reads 76 leads; legacy endpoints are locked or retired.');
  const existing=data.leads[0];assert.equal((await call('/api/crm',{type:'lead',handle:'@'+existing.ig_handle.toUpperCase(),sourceUrl:'https://example.com'})).status,400);
  assert.equal((await call('/api/crm',{type:'lead_action',id:existing.id,action:'edit',version:'stale',fields:{next_action:'Test'}})).status,409);
  const brand=data.leads.find(l=>l.ig_handle==='mrsumitreview');assert.equal((await call('/api/crm',{type:'lead_action',id:brand.id,version:brand.version,action:'approve'})).status,400);
  console.log('Duplicate creation, stale edits and experimental outreach are rejected without changing leads.');
  assert.equal((await call('/api/crm/auth',{action:'login',name:'Someone else',password})).status,400);
  const made=await call('/api/crm',{type:'operation',kind:'task',data:{title:'CRM verification — temporary',status:'todo',owner:'Both',notes:'Preserve this checklist',due:'2050-12-31',leadId:existing.id}});assert.equal(made.status,200);temporary=(await made.json()).record;
  const read=await(await call('/api/crm')).json();const task=read.operations.find(t=>t.id===temporary.id);assert.ok(task,'Task must persist in Airtable');
  assert.equal((await call('/api/crm',workMutation(task,{status:'done'}))).status,200);
  assert.equal((await call('/api/crm',{type:'operation',kind:'task',id:task.id,expected:'old',data:{title:'stale'}})).status,409);
  const latest=await(await call('/api/crm')).json(),updated=latest.operations.find(t=>t.id===task.id);assert.equal(updated.status,'done');assert.equal(updated.owner,'Both');assert.equal(updated.notes,'Preserve this checklist');assert.equal(updated.due,'2050-12-31');assert.equal(updated.leadId,existing.id);assert.equal(updated.key,temporary.fields.key);console.log('Task creation, read-back, quick completion preserving details, stable keys, and stale-write rejection passed.');
  assert.equal((await call('/api/crm/auth',{action:'setup',name:'Test',password})).status,403);console.log('Hosted bootstrap setup is disabled. HTTP checks passed.');
}finally{
  if(temporary){const url=`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/CRM%20Operations/${temporary.id}`;const headers={Authorization:`Bearer ${process.env.AIRTABLE_PAT}`};const check=await fetch(url,{headers});const row=await check.json();if(row.fields?.key===temporary.fields.key&&JSON.parse(row.fields.payload).title==='CRM verification — temporary'){
    // Invalidate the hosted operations cache before deleting our exact fixture.
    // No GET may repopulate it between this update and the direct Airtable delete.
    if(hosted){const invalidated=await call('/api/crm',workMutation({id:row.id,kind:row.fields.kind,rawPayload:row.fields.payload},{}));assert.ok(invalidated.ok,'Invalidate only the test fixture cache');}
    const removed=await fetch(url,{method:'DELETE',headers});assert.ok(removed.ok,'Remove only the exact temporary verification record');console.log('Removed the temporary test task.');
    if(hosted){const clean=await(await call('/api/crm')).json();assert.ok(!clean.operations.some(x=>x.id===temporary.id),'The deleted fixture must not remain in the hosted cache');}
  }}
  child?.kill();
}
