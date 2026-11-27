import test from 'node:test';
import assert from 'node:assert/strict';
const domain = await import('../src/lib/crm/model.mjs').catch(() => ({}));
const auth = await import('../src/lib/crm/auth.mjs').catch(() => ({}));
const now = new Date('2026-10-13T06:00:00Z');
const lead = () => ({id:'recExample',fields:{ig_handle:'example_coach',qualification_status:'qualified',stage:'Qualified',score:8,notes:domain.pack?domain.pack('Existing founder note',{evidence:[{url:'https://example.com/offer',text:'Paid offer',checkedAt:now.toISOString()}]}):'Existing founder note',ig_dm_draft:'A reviewed draft'}});
test('canonical identity handles profile URLs without merging different accounts',()=>{
  assert.equal(typeof domain.normalizeHandle,'function');
  assert.equal(domain.normalizeHandle('https://www.instagram.com/Example_Coach/?x=1'),'example_coach');
  assert.throws(()=>domain.normalizeHandle('https://evil.test/example_coach'));
});
test('draft approval never marks a message sent and preserves existing notes',()=>{
  assert.equal(typeof domain.mutateLead,'function');
  const result=domain.mutateLead(lead(),{action:'approve',version:domain.version(lead())},'Founder',[lead()],now);
  assert.equal(result.fields.date_first_msg_sent,undefined);
  assert.match(result.fields.notes,/Existing founder note/);
  assert.equal(domain.unpack(result.fields.notes).meta.approvedDraft,'A reviewed draft');
});
test('manual send requires attestation and approval of the exact current draft',()=>{
  assert.equal(typeof domain.mutateLead,'function');
  assert.throws(()=>domain.mutateLead(lead(),{action:'confirm_send',channel:'ig',confirmed:true,requestId:'abc',version:domain.version(lead())},'Founder',[lead()],now),/review/i);
  const l=lead(); l.fields={...l.fields,...domain.mutateLead(l,{action:'approve',version:domain.version(l)},'Founder',[l],now).fields};
  assert.throws(()=>domain.mutateLead(l,{action:'confirm_send',channel:'ig',requestId:'abc',version:domain.version(l)},'Founder',[l],now),/confirm/i);
  const r=domain.mutateLead(l,{action:'confirm_send',channel:'ig',confirmed:true,requestId:'abc',version:domain.version(l)},'Founder',[l],now);
  assert.equal(r.fields.stage,'Outreach Sent');
  assert.equal(r.fields.date_first_msg_sent,'2026-10-13');
  const saved={...l,fields:{...l.fields,...r.fields}};
  assert.equal(domain.mutateLead(saved,{action:'confirm_send',channel:'ig',confirmed:true,requestId:'abc',version:'old'},'Founder',[saved],now).duplicate,true);
});
test('brand-deal experiments and opt-outs cannot enter outreach',()=>{
  assert.equal(typeof domain.queue,'function');
  const brand={...lead(),id:'recBrand',fields:{...lead().fields,ig_handle:'mrsumitreview'}};
  const stop={...lead(),id:'recStop',fields:{...lead().fields,reply_sentiment:'unsubscribe'}};
  assert.deepEqual(domain.queue([brand,stop],now).ready,[]);
});
test('daily limits share confirmed activity across cofounders and queue overflow',()=>{
  assert.equal(typeof domain.queue,'function');
  const rows=Array.from({length:18},(_,i)=>({...lead(),id:'rec'+i,fields:{...lead().fields,ig_handle:'coach_'+i,notes:domain.pack('',{approvedDraft:'A reviewed draft',evidence:[{url:'https://example.com/offer',text:'Paid coaching',checkedAt:now.toISOString()}],segment:'owned_offer'})}}));
  const q=domain.queue(rows,now);
  assert.equal(q.ready.length,15);
  assert.equal(q.overflow.length,3);
});
test('stale edits fail instead of silently replacing a cofounder update',()=>{
  assert.equal(typeof domain.mutateLead,'function');
  assert.throws(()=>domain.mutateLead(lead(),{action:'edit',version:'stale',fields:{next_action:'Call tomorrow'}},'Founder',[lead()],now),/changed/i);
});
test('lead assignment accepts Both and rejects arbitrary owner names without altering evidence',()=>{
  const row=lead(),result=domain.mutateLead(row,{action:'edit',version:domain.version(row),owner:'Both'},'Anshu',[row],now);
  const meta=domain.unpack(result.fields.notes).meta;
  assert.equal(meta.owner,'Both');assert.deepEqual(meta.evidence,domain.unpack(row.fields.notes).meta.evidence);
  assert.throws(()=>domain.mutateLead(row,{action:'edit',version:domain.version(row),owner:'Someone else'},'Anshu',[row],now),/Select/);
});
test('warm replies do not fabricate bookings and opt-outs stop follow-ups',()=>{
  assert.equal(typeof domain.mutateLead,'function');
  const r=domain.mutateLead(lead(),{action:'reply',version:domain.version(lead()),text:'Tell me more',sentiment:'warm'},'Founder',[lead()],now);
  assert.equal(r.fields.stage,'Replied'); assert.equal(r.fields.call_booked,undefined);
  const s=domain.mutateLead(lead(),{action:'reply',version:domain.version(lead()),text:'Stop contacting me',sentiment:'unsubscribe'},'Founder',[lead()],now);
  assert.equal(s.fields.email_sequence_active,false); assert.equal(s.fields.stage,'Dead');
});
test('password hashes and signed sessions reject wrong passwords, tampering and expiry',()=>{
  assert.equal(typeof auth.hashPassword,'function');
  const hash=auth.hashPassword('correct horse battery staple');
  assert.equal(auth.verifyPassword('wrong',hash),false); assert.equal(auth.verifyPassword('correct horse battery staple',hash),true);
  const secret='test-session-secret-longer-than-thirty-two-characters';
  const token=auth.signSession('Anshu',secret,100);
  assert.equal(auth.verifySession(token,secret,101).name,'Anshu');
  assert.equal(auth.verifySession(token+'x',secret,101),null);
  assert.equal(auth.verifySession(token,secret,100+86401),null);
});
test('record versions are stable across Airtable field order',()=>{
  const a=lead(),b={...a,fields:Object.fromEntries(Object.entries(a.fields).reverse())};
  assert.equal(domain.version(a),domain.version(b));
});
test('activity history is chronological across different leads',()=>{
  const a={...lead(),fields:{...lead().fields,notes:domain.pack('',{events:[{type:'note',at:'2026-10-13T08:00:00Z'}]})}};
  const b={...lead(),id:'recB',fields:{...lead().fields,notes:domain.pack('',{events:[{type:'note',at:'2026-10-13T06:00:00Z'}]})}};
  assert.deepEqual(domain.counts([a,b],now).events.map(e=>e.leadId),['recB','recExample']);
});
test('same-origin checks use the public host behind a Next.js server',()=>{
  assert.equal(typeof auth.validOrigin,'function');
  const headers={host:'127.0.0.1:3457',origin:'http://127.0.0.1:3457'};
  assert.equal(auth.validOrigin(new Request('http://localhost:3457/api/crm',{headers})),true);
  assert.equal(auth.validOrigin(new Request('http://localhost:3457/api/crm',{headers:{...headers,origin:'https://untrusted.example'}})),false);
  assert.equal(auth.validOrigin(new Request('https://dealdock-crm.vercel.app/api/crm',{headers:{host:'dealdock-crm.vercel.app',origin:'https://dealdock-crm.vercel.app'}})),true);
});
