// Client-safe presentation helpers. The server remains authoritative for every write.
const experiments = new Set(['mrsumitreview','mommylilworld','fs_praveen_mekala','captain_amaira','geekyranjitofficial']);
export const dayIST = (now=new Date()) => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
export function experimental(lead){return experiments.has(lead.ig_handle)||lead.meta?.segment==='brand_deal';}
export function excluded(lead){return experimental(lead)||lead.meta?.suppressed||['unsubscribe','not-fit'].includes(lead.reply_sentiment)||lead.qualification_status==='dead'||lead.stage==='Dead';}
export function evidenceFresh(lead,now=new Date()){
  return Boolean(lead.meta?.evidence?.some(e=>e.url&&e.text?.trim()&&e.checkedAt&&Date.parse(e.checkedAt)<=now.getTime()&&now.getTime()-Date.parse(e.checkedAt)<=30*86400000));
}
export function followupDue(lead,now=new Date()){
  return Boolean(lead.date_first_msg_sent&&!lead.replied&&!excluded(lead)&&!lead.meta?.sequenceClosed&&lead.meta?.nextDue&&lead.meta.nextDue<=dayIST(now));
}
export function outreachReason(lead,now=new Date()){
  if(experimental(lead))return {code:'experiment',label:'Separate pitch required',detail:'Brand-deal experiments need an approved offer before outreach.'};
  if(excluded(lead))return {code:'excluded',label:'Do not contact',detail:'This lead is closed or suppressed.'};
  if(lead.qualification_status!=='qualified')return {code:'qualification',label:'Qualification needed',detail:'Verify fit and score before preparing outreach.'};
  if(lead.replied)return {code:'replied',label:'Reply received',detail:'Review the conversation and prepare a personal response.'};
  if(lead.date_first_msg_sent&&lead.meta?.sequenceClosed)return {code:'closed',label:'Sequence closed',detail:'No further unsolicited follow-ups are queued.'};
  if(!evidenceFresh(lead,now))return {code:'evidence',label:'Verify evidence',detail:'Save a source URL and actual observation checked within 30 days.'};
  if(!lead.ig_dm_draft?.trim())return {code:'draft',label:'Draft needed',detail:'Prepare a personal Instagram message from verified facts.'};
  if(lead.meta?.approvedDraft!==lead.ig_dm_draft)return {code:'review',label:'Review draft',detail:'Approve the exact saved message after human review.'};
  if(lead.date_first_msg_sent&&!followupDue(lead,now))return {code:'waiting',label:'Follow-up not due',detail:lead.meta?.nextDue?'Next review: '+lead.meta.nextDue+' IST.':'No follow-up date is recorded.'};
  return {code:'ready',label:'Ready for manual send',detail:'Review, copy and send on Instagram yourself. Daily capacity still applies.'};
}
export function selectLeads(leads,options={},now=new Date()){
  const {query='',status='all',owner='all',stage='all',segment='all',preset='all',sort='score'}=options;
  const matches = lead => {
    if(status!=='all'&&lead.qualification_status!==status)return false;
    if(owner!=='all'&&(lead.meta?.owner||'Unassigned')!==owner)return false;
    if(stage!=='all'&&lead.stage!==stage)return false;
    if(segment!=='all'&&(experimental(lead)?'brand_deal':lead.meta?.segment||'unverified')!==segment)return false;
    if(preset==='qualified'&&(lead.qualification_status!=='qualified'||experimental(lead)))return false;
    if(preset==='drafts'&&(lead.qualification_status!=='qualified'||excluded(lead)||lead.ig_dm_draft?.trim()))return false;
    if(preset==='followups'&&!followupDue(lead,now))return false;
    if(preset==='experiments'&&!experimental(lead))return false;
    return [lead.ig_handle,lead.ig_bio,lead.niche,lead.personalization_hook,lead.next_action,lead.source_detail].filter(Boolean).join(' ').toLowerCase().includes(query.trim().toLowerCase());
  };
  return leads.filter(matches).sort((a,b)=>sort==='name'?a.ig_handle.localeCompare(b.ig_handle):sort==='due'?(a.meta?.nextDue||'9999').localeCompare(b.meta?.nextDue||'9999'):(b.score??-1)-(a.score??-1)||a.ig_handle.localeCompare(b.ig_handle));
}
export function workMutation(work,changes){
  return {type:'operation',id:work.id,kind:work.kind,expected:work.rawPayload,data:{...JSON.parse(work.rawPayload),...changes}};
}
export function leadsCsv(leads){
  const columns=['Instagram handle','Stage','Qualification','Score','Owner','Segment','Next action','Follow-up IST','Source','Offer URL'];
  const cell=value=>{const text=String(value??'');const safe=/^[\s]*[=+\-@]/.test(text)?"'"+text:text;return '"'+safe.replaceAll('"','""')+'"';};
  return '\ufeff'+[columns,...leads.map(x=>[x.ig_handle,x.stage,x.qualification_status,x.score,x.meta?.owner,x.meta?.segment||'unverified',x.next_action,x.meta?.nextDue,x.source_detail,x.ig_website])].map(row=>row.map(cell).join(',')).join('\r\n');
}
