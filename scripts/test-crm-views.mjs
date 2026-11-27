import test from 'node:test';
import assert from 'node:assert/strict';
const ui = await import('../src/lib/crm/views.mjs').catch(() => ({}));
const now = new Date('2026-10-14T06:00:00Z');
const team = await import('../src/lib/crm/team.mjs').catch(() => ({}));
const lead = (extra={}) => ({id:'recExample',ig_handle:'coach',qualification_status:'qualified',stage:'Qualified',score:8,meta:{},...extra});
test('saved views separate experimental leads and overdue follow-ups',()=>{
  const rows=[lead(),lead({id:'recBrand',ig_handle:'mrsumitreview',qualification_status:'pending'}),lead({id:'recDue',date_first_msg_sent:'2026-10-01',meta:{nextDue:'2026-10-14'}}),lead({id:'recStop',meta:{suppressed:true,nextDue:'2026-10-13'}})];
  assert.deepEqual(ui.selectLeads(rows,{preset:'experiments'},now).map(x=>x.id),['recBrand']);
  assert.deepEqual(ui.selectLeads(rows,{preset:'followups'},now).map(x=>x.id),['recDue']);
  assert.equal(ui.selectLeads(rows,{preset:'drafts'},now).some(x=>x.id==='recBrand'),false);
});
test('search, owner, stage, segment and sort apply together without mutating records',()=>{
  const rows=[lead({id:'recLow',score:7,personalization_hook:'Cohort closing',meta:{owner:'Anshu',segment:'owned_offer'}}),lead({id:'recHigh',score:9,ig_bio:'Cohort offer',meta:{owner:'Anshu',segment:'owned_offer'}}),lead({id:'recOther',score:10,ig_bio:'Cohort',meta:{owner:'Other'}})];
  assert.deepEqual(ui.selectLeads(rows,{query:'cohort',owner:'Anshu',stage:'Qualified',segment:'owned_offer',sort:'score'},now).map(x=>x.id),['recHigh','recLow']);
  assert.equal(rows[0].id,'recLow');
});
test('readiness explains stale evidence, unsaved approvals and waiting sequences',()=>{
  const x=lead({ig_dm_draft:'Hello',meta:{approvedDraft:'Hello',evidence:[{url:'https://example.org',text:'Verified offer',checkedAt:'2026-09-01T00:00:00Z'}]}});
  assert.equal(ui.outreachReason(x,now).code,'evidence');
  x.meta.evidence[0].checkedAt=now.toISOString();
  assert.equal(ui.outreachReason(x,now).code,'ready');
  x.ig_dm_draft='Edited';assert.equal(ui.outreachReason(x,now).code,'review');
  x.meta.approvedDraft='Edited';x.date_first_msg_sent='2026-10-12';x.meta.nextDue='2026-10-17';
  assert.equal(ui.outreachReason(x,now).code,'waiting');
  x.replied=true;assert.equal(ui.outreachReason(x,now).code,'replied');
});
test('CSV preserves quotes and multiline text and neutralizes spreadsheet formulas',()=>{
  const csv=ui.leadsCsv([lead({ig_handle:'=bad',next_action:'A, "quote"\nand line'})]);
  assert.match(csv,/"'=bad"/);assert.match(csv,/"A, ""quote""\nand line"/);
});
test('quick task actions preserve all existing values and optimistic version',()=>{
  const w={id:'recTask',kind:'task',rawPayload:JSON.stringify({title:'Review',owner:'Both',notes:'Keep this',leadId:'recLead',due:'2026-10-16',status:'todo'})};
  const payload=ui.workMutation(w,{status:'done'});
  assert.equal(payload.expected,w.rawPayload);assert.equal(payload.data.notes,'Keep this');assert.equal(payload.data.leadId,'recLead');assert.equal(payload.data.status,'done');
});
test('login offers the two cofounders and assignments normalize shared legacy owners',()=>{
  assert.deepEqual(team.COFOUNDERS,['Anshu','Nahush']);
  assert.equal(team.cofounderName(' nahush '),'Nahush');
  assert.throws(()=>team.cofounderName('Someone else'),/Anshu.*Nahush/);
  assert.equal(team.assignment('Cofounders'),'Both');
  assert.equal(team.assignment('Both'),'Both');
  assert.equal(team.assignment(''),'');
  assert.throws(()=>team.assignment('Someone else'),/Select/);
});
