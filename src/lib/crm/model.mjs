import { createHash } from 'node:crypto';
import { assignment } from './team.mjs';
export const STAGES=['Sourced','Enriched','Qualified','Outreach Sent','Replied','Call Booked','Call Done','Pilot Active','Paying','Dead'];
export const EXPERIMENTS=['mrsumitreview','mommylilworld','fs_praveen_mekala','captain_amaira','geekyranjitofficial'];
const marker='\n\n--- DealDock CRM metadata ---\n';
export function normalizeHandle(input){
  let s=String(input||'').trim();
  if(s.includes('://')) { const u=new URL(s); if(!['instagram.com','www.instagram.com'].includes(u.hostname)) throw new Error('Use an Instagram profile URL'); s=u.pathname.split('/').filter(Boolean)[0]||''; }
  s=s.replace(/^@/,'').toLowerCase();
  if(!/^[a-z0-9._]{1,30}$/.test(s)) throw new Error('Enter a valid Instagram handle'); return s;
}
export function unpack(notes=''){
  const i=notes.lastIndexOf(marker);
  if(i<0) return {notes,meta:{}};
  try{return {notes:notes.slice(0,i),meta:JSON.parse(notes.slice(i+marker.length))};}catch{throw new Error('CRM notes contain invalid metadata; repair before editing');}
}
export function pack(notes,meta){return notes+marker+JSON.stringify(meta);}
export function version(record){const canonical=Object.fromEntries(Object.entries(record.fields).sort(([a],[b])=>a.localeCompare(b)));return createHash('sha256').update(JSON.stringify(canonical)).digest('hex').slice(0,24);}
export function day(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);}
export function isBlocked(record){const f=record.fields; const m=unpack(f.notes).meta; return EXPERIMENTS.includes(f.ig_handle)||m.segment==='brand_deal'||m.suppressed||['unsubscribe','not-fit'].includes(f.reply_sentiment)||f.qualification_status==='dead'||f.stage==='Dead';}
function evidenceReady(meta,now){return meta.evidence?.some(e=>e.url&&e.text?.trim()&&e.checkedAt&&now.getTime()-Date.parse(e.checkedAt)<=30*86400000&&Date.parse(e.checkedAt)<=now.getTime());}
export function counts(records,now=new Date()){
  const d=day(now), events=records.flatMap(r=>(unpack(r.fields.notes).meta.events||[]).map(e=>({...e,leadId:r.id,handle:r.fields.ig_handle}))).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
  const sends=events.filter(e=>e.type==='send'&&day(new Date(e.at))===d);
  // Legacy first-contact dates also count when no corresponding event exists.
  const legacy=records.filter(r=>r.fields.date_first_msg_sent===d&&!sends.some(e=>e.leadId===r.id)).length;
  return {ig:sends.filter(e=>e.channel==='ig').length+legacy,li:sends.filter(e=>e.channel==='li').length,events};
}
export function queue(records,now=new Date()){
  const c=counts(records,now); const candidates=records.filter(r=>{
    const f=r.fields,m=unpack(f.notes).meta;
    return !isBlocked(r)&&f.qualification_status==='qualified'&&f.ig_dm_draft&&m.approvedDraft===f.ig_dm_draft&&evidenceReady(m,now)&&!f.replied&&(!f.date_first_msg_sent||(m.nextDue&&m.nextDue<=day(now)&&!m.sequenceClosed));
  }).sort((a,b)=>(b.fields.score||0)-(a.fields.score||0));
  const slots=Math.max(0,15-c.ig); return {ready:candidates.slice(0,slots),overflow:candidates.slice(slots),counts:c};
}
function text(v,max=10000){if(typeof v!=='string'||v.length>max)throw new Error('Text is missing or too long'); return v.trim();}
export function httpUrl(v){if(!v)return '';const u=new URL(v);if(!['http:','https:'].includes(u.protocol))throw new Error('Use an HTTP or HTTPS URL');return u.toString();}
export function mutateLead(record,input,actor,records,now=new Date()){
  const f=record.fields,{notes,meta:old}=unpack(f.notes),meta={...old,events:[...(old.events||[])]};
  if(input.requestId&&meta.events.some(e=>e.id===input.requestId))return {fields:{},duplicate:true};
  if(input.version!==version(record))throw new Error('This lead changed. Refresh before saving your edits.');
  const fields={},at=now.toISOString(),event={type:input.action,at,actor};
  let humanNotes=notes;
  if(input.action==='edit'){
    const editable=['personalization_hook','ig_dm_draft','li_connection_note','li_followup_note','next_action','ig_website','linkedin_url','email','source_detail','ig_bio'];
    for(const [k,v] of Object.entries(input.fields||{})){
      if(!editable.includes(k))throw new Error('Unsupported lead field');
      fields[k]=['ig_website','linkedin_url'].includes(k)?httpUrl(v):text(v);
      if(k==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))throw new Error('Invalid email');
    }
    if('notes' in input)humanNotes=text(input.notes,30000);
    if(input.stage){if(!STAGES.includes(input.stage)||['Outreach Sent','Replied','Call Booked','Paying'].includes(input.stage))throw new Error('Use the corresponding activity to confirm this stage');fields.stage=input.stage;}
    if(input.status){if(!['pending','qualified','hold','dead'].includes(input.status))throw new Error('Invalid qualification');fields.qualification_status=input.status;}
    if(input.score!==undefined){if(!Number.isInteger(input.score)||input.score<0||input.score>10)throw new Error('Score must be 0–10');fields.score=input.score;}
    if(input.owner!==undefined)meta.owner=assignment(input.owner);
    if(input.segment!==undefined){if(!['owned_offer','brand_deal','unknown'].includes(input.segment))throw new Error('Invalid segment');meta.segment=input.segment;}
    if(input.nextDue!==undefined){if(input.nextDue&&!/^\d{4}-\d{2}-\d{2}$/.test(input.nextDue))throw new Error('Invalid date');meta.nextDue=input.nextDue;}
    if(input.evidence!==undefined){if(!Array.isArray(input.evidence)||input.evidence.length>20)throw new Error('Too many evidence items');meta.evidence=input.evidence.map(e=>{const url=httpUrl(e.url),excerpt=text(e.text,2000);if(!url||!excerpt)throw new Error('Each evidence URL needs an actual observation');const prior=(old.evidence||[]).find(p=>p.url===url&&p.text===excerpt);return {url,text:excerpt,checkedAt:input.reverified===true?at:prior?.checkedAt||at};});}
    if(input.campaign!==undefined)meta.campaign=text(input.campaign,120);
    if(fields.ig_dm_draft!==undefined&&fields.ig_dm_draft!==f.ig_dm_draft)delete meta.approvedDraft;
    if(fields.li_connection_note!==undefined&&fields.li_connection_note!==f.li_connection_note)delete meta.approvedLi;
    if(fields.li_followup_note!==undefined&&fields.li_followup_note!==f.li_followup_note)delete meta.approvedLiFollowup;
    fields.outreach_drafted=Boolean(fields.ig_dm_draft??f.ig_dm_draft);
  }else if(input.action==='approve'){
    if(isBlocked(record))throw new Error('This lead is excluded from outreach');
    if(!f.ig_dm_draft)throw new Error('Save a draft before review');
    meta.approvedDraft=f.ig_dm_draft;meta.approvedLi=f.li_connection_note||'';meta.approvedLiFollowup=f.li_followup_note||'';
  }else if(input.action==='confirm_send'){
    if(input.confirmed!==true)throw new Error('Confirm you personally sent the message');
    if(isBlocked(record))throw new Error('This lead is excluded from outreach');
    if(!['ig','li','li_message','email'].includes(input.channel))throw new Error('Invalid channel');
    if(f.qualification_status!=='qualified')throw new Error('Qualify this lead first');
    const draft=input.channel==='ig'?f.ig_dm_draft:input.channel==='li'?f.li_connection_note:input.channel==='li_message'?f.li_followup_note:input.text;
    const approved=input.channel==='ig'?meta.approvedDraft:input.channel==='li'?meta.approvedLi:input.channel==='li_message'?meta.approvedLiFollowup:input.text;
    if(!draft||approved!==draft)throw new Error('Review and approve the current draft first');
    if(!evidenceReady(meta,now))throw new Error('Save or reverify personalization evidence before outreach (within 30 days)');
    if(input.channel.startsWith('li')&&!f.linkedin_url)throw new Error('Verify the LinkedIn profile first');
    const c=counts(records,now);if((input.channel==='ig'&&c.ig>=15)||(input.channel==='li'&&c.li>=25))throw new Error('Daily limit reached. Keep this message queued.');
    if(!input.requestId)throw new Error('A unique send confirmation is required');
    if(f.date_first_msg_sent&&!f.replied&&!input.override){if(!meta.nextDue||meta.nextDue>day(now)||meta.sequenceClosed)throw new Error('Follow-up is not due');}
    event.type='send';event.channel=input.channel;event.id=input.requestId;event.text=draft;
    if(!f.date_first_msg_sent)fields.date_first_msg_sent=day(now);
    if(!f.replied)fields.stage='Outreach Sent';
    const n=meta.events.filter(e=>e.type==='send'&&e.channel===input.channel).length+1;
    meta.sequenceClosed=n>=3;const days=n===1?5:7;meta.nextDue=meta.sequenceClosed?'':day(new Date(now.getTime()+days*86400000));
    fields.next_action=meta.sequenceClosed?'Sequence closed; await reply':'Review follow-up on '+meta.nextDue;
  }else if(input.action==='reply'){
    const sentiments=['warm','lukewarm','not-fit','unsubscribe'];if(!sentiments.includes(input.sentiment))throw new Error('Choose a reply classification');
    event.text=text(input.text,10000);if(!event.text)throw new Error('Paste the actual reply');event.sentiment=input.sentiment;
    fields.replied=true;fields.reply_sentiment=input.sentiment;fields.date_replied=f.date_replied||day(now);fields.stage='Replied';fields.email_sequence_active=false;meta.sequenceClosed=true;meta.nextDue='';
    if(['not-fit','unsubscribe'].includes(input.sentiment)){meta.suppressed=true;fields.stage='Dead';fields.qualification_status='dead';fields.next_action='Do not contact';}
    else fields.next_action='Review and draft a personal response';
  }else if(input.action==='book_call'){
    if(!input.scheduledAt||!Number.isFinite(Date.parse(input.scheduledAt)))throw new Error('Enter the confirmed call date');
    fields.call_booked=true;fields.call_date=new Date(input.scheduledAt).toISOString();fields.stage='Call Booked';event.scheduledAt=fields.call_date;fields.next_action='Prepare for confirmed call';
  }else if(input.action==='note'){
    event.text=text(input.text,10000);if(!event.text)throw new Error('Enter a note');
  }else if(input.action==='payment'){
    if(!Number.isFinite(input.amount)||input.amount<=0)throw new Error('Enter the amount actually received');
    event.amount=input.amount;event.currency='INR';event.text=text(input.text||'',1000);fields.stage='Paying';fields.outcome='paying';fields.next_action='Check activation and renewal';
  }else throw new Error('Unsupported action');
  meta.events.push(event);meta.updatedAt=at;meta.updatedBy=actor;fields.notes=pack(humanNotes,meta);if(fields.notes.length>95000)throw new Error('Activity history is near Airtable capacity. Archive it before adding more.');return {fields};
}
export function clientLead(record){const {notes,meta}=unpack(record.fields.notes);return {id:record.id,...record.fields,notes,meta,version:version(record)};}
