// Scoped setup: creates one operations table only. Never modifies existing leads.
import nextEnv from '@next/env';
const {loadEnvConfig}=nextEnv;
loadEnvConfig(process.cwd(),true,{info(){},error(){}});
const headers={Authorization:`Bearer ${process.env.AIRTABLE_PAT}`,'Content-Type':'application/json'};
const root=`https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`;
const res=await fetch(root,{headers});
if(!res.ok){console.error('Schema read failed:',res.status);process.exit(1);}
const schema=await res.json();
console.log(JSON.stringify(schema.tables.map(t=>({name:t.name,fields:t.fields.map(f=>({name:f.name,type:f.type}))})),null,2));
if(process.argv.includes('--apply')){
  if(schema.tables.some(t=>t.name==='CRM Operations'))console.log('CRM Operations already exists; no schema change.');
  else{
    const made=await fetch(root,{method:'POST',headers,body:JSON.stringify({name:'CRM Operations',description:'Cofounder CRM tasks and marketing campaigns. No sending or paid AI integrations.',fields:[{name:'key',type:'singleLineText'},{name:'kind',type:'singleLineText'},{name:'payload',type:'multilineText'}]})});
    if(!made.ok){console.error('CRM Operations creation failed:',made.status,'Check schema.bases:write scope.');process.exit(1);}
    console.log('Created CRM Operations with key, kind and payload fields. Existing Leads were not modified.');
  }
}
