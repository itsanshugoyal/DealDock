export const COFOUNDERS = ['Anshu','Nahush'];
export const ASSIGNEES = [...COFOUNDERS,'Both'];
export function cofounderName(value){
  const name=typeof value==='string'?value.trim().toLowerCase():'';
  const match=COFOUNDERS.find(x=>x.toLowerCase()===name);
  if(!match)throw new Error('Select Anshu or Nahush to sign in');
  return match;
}
export function assignment(value){
  if(typeof value!=='string')throw new Error('Select Anshu, Nahush or Both');
  const name=value.trim();
  if(!name||name==='Unassigned')return '';
  if(name.toLowerCase()==='cofounders')return 'Both';
  const match=ASSIGNEES.find(x=>x.toLowerCase()===name.toLowerCase());
  if(!match)throw new Error('Select Anshu, Nahush or Both');
  return match;
}
