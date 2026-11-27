// Seven explicitly scoped planned work items. Does not modify Leads or send anything.
import nextEnv from '@next/env';
nextEnv.loadEnvConfig(process.cwd(),true,{info(){},error(){}});
const url=`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/CRM%20Operations`,headers={Authorization:`Bearer ${process.env.AIRTABLE_PAT}`,'Content-Type':'application/json'};
const items=[
  ['task','verify-first-five','Verify the first five owned-offer prospects','Research','Verify fitlifewithvatsa, rajatmalikfitness, weightlosswithtarn, buttlikeanapricot and sachin.anand. Capture current offer, commercial DM CTA, source URLs and observed team size. Do not send or qualify from assumptions.'],
  ['task','review-legacy-drafts','Review the ten legacy outreach drafts','Instagram','Replace assumptions about DM overload, missed buyers and past pilots with verified observations and a question. Add evidence, then approve each exact draft.'],
  ['task','discovery-learning','Book the first three discovery conversations','Research','After reviewed outreach, learn the current buyer enquiry workflow, last delayed enquiry, reply owner, offer value and existing tools. Record actual replies and confirmed bookings separately.'],
  ['task','pilot-terms','Agree a short pilot and pricing decision','Other','Proposed experiment: 14-day assisted pilot, success criterion, data access/retention terms and explicit continuation price. Confirm terms with each partner; no revenue guarantee or automatic billing.'],
  ['task','weekly-review','Review learning and the weekly funnel together','Other','Review confirmed contacts, replies, positive replies, held calls, activated pilots, paid continuations and founder time. Keep IG touches near 10–15/day and LinkedIn connects within 25/day. Queue overflow.'],
  ['campaign','organic-checklist','Organic: buyer-enquiry checklist','Instagram','Draft a useful checklist for creators selling their own coaching or courses through Instagram DMs. Use labelled examples until real consented evidence exists. CTA: a conversation about their current enquiry workflow. Publish manually after review.'],
  ['campaign','ads-gate','Ads: validation gate before spending','Ads','Keep paused at ₹0. Revisit after activated partners, paid continuations and a credible outcome story. Agree a separate test budget and cost per qualified held call before any manual ad launch. Do not buy ads from this CRM.']
].map(([kind,key,title,channel,notes])=>({key:'crm-plan-'+key,kind,payload:JSON.stringify({title,channel,notes,owner:'Cofounders',status:kind==='task'?'todo':channel==='Ads'?'paused':'idea',...(kind==='campaign'?{budget:0,spend:0,leads:0,calls:0,customers:0}:{}),updatedAt:new Date().toISOString(),updatedBy:'CRM setup'})}));
async function read(){let offset='',all=[];do{const r=await fetch(url+'?pageSize=100'+(offset?'&offset='+encodeURIComponent(offset):''),{headers});if(!r.ok)throw new Error('Operations read failed '+r.status);const data=await r.json();all.push(...data.records);offset=data.offset||'';}while(offset);return all;}
const before=await read(),missing=items.filter(i=>!before.some(r=>r.fields.key===i.key));
console.log(JSON.stringify({table:'CRM Operations',planned:missing.map(i=>({key:i.key,kind:i.kind,title:JSON.parse(i.payload).title})),existing:items.length-missing.length}));
if(process.argv.includes('--apply')&&missing.length){
  const made=await fetch(url,{method:'POST',headers,body:JSON.stringify({records:missing.map(fields=>({fields}))})});if(!made.ok)throw new Error('Scoped plan write failed '+made.status);
  const after=await read();for(const item of missing){const match=after.filter(r=>r.fields.key===item.key);if(match.length!==1||match[0].fields.payload!==item.payload)throw new Error('Read-back verification failed for '+item.key);}
  console.log('Verified '+missing.length+' planned work items in Airtable. Leads remain unchanged.');
}
