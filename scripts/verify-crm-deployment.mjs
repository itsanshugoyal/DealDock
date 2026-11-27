// Read-only hosted verification. Session material stays in memory and is never output.
import nextEnv from '@next/env';
import {signSession} from '../src/lib/crm/auth.mjs';
nextEnv.loadEnvConfig(process.cwd(),true,{info(){},error(){}});
const origin='https://dealdock-crm.vercel.app';
const configured=await fetch(origin+'/api/crm/auth');
if(!configured.ok)throw new Error('Hosted access status endpoint failed');
const status=await configured.json();
if(!status.configured||status.localSetup)throw new Error('Hosted password configuration is not active');
for(const path of ['/api/crm','/api/airtable']){
  const response=await fetch(origin+path);
  if(response.status!==401)throw new Error('Unauthenticated CRM access was not rejected');
}
const token=signSession('Deployment verification',process.env.CRM_SESSION_SECRET||'');
const response=await fetch(origin+'/api/crm',{headers:{Cookie:'dd_crm='+token}});
if(!response.ok)throw new Error('Authenticated hosted CRM read failed ('+response.status+')');
const data=await response.json();
if(!Array.isArray(data.leads)||!Array.isArray(data.operations))throw new Error('Hosted CRM returned incomplete data');
console.log(JSON.stringify({configured:true,publicSetupDisabled:true,anonymousDataAccessBlocked:true,authenticatedRead:true,leads:data.leads.length,tasks:data.operations.filter(x=>x.kind==='task').length,marketingItems:data.operations.filter(x=>x.kind==='campaign').length}));
