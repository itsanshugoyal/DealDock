'use client';
import {useEffect,useId,useRef} from 'react';
import {X,ArrowUpRight,ArrowRight,Tray} from '@phosphor-icons/react';
import s from './workspace.module.css';
import {label} from './types';
import {ASSIGNEES,assignment} from '@/lib/crm/team.mjs';
export function Modal({title,subtitle,close,children,drawer=false}:{title:string;subtitle?:string;close:()=>void;children:React.ReactNode;drawer?:boolean}){
  const ref=useRef<HTMLDialogElement>(null),id=useId();
  useEffect(()=>{const dialog=ref.current;dialog?.showModal();return()=>dialog?.close();},[]);
  return <dialog ref={ref} aria-labelledby={id} className={`${s.modal} ${drawer?s.drawer:''}`} onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===ref.current)close();}}><header><div><h2 id={id}>{title}</h2>{subtitle&&<small>{subtitle}</small>}</div><button type="button" className={s.iconButton} aria-label="Close panel" onClick={close}><X size={20}/></button></header><div className={s.modalBody}>{children}</div></dialog>;
}
export function Field({name,label:caption,value='',type='text',required=false,min,max}:{name:string;label:string;value?:string|number;type?:string;required?:boolean;min?:number;max?:number}){
  return <label className={s.field}>{caption}<input name={name} defaultValue={value} type={type} required={required} min={min} max={max}/></label>;
}
export function Area({name,label:caption,value='',required=false,rows=4}:{name:string;label:string;value?:string;required?:boolean;rows?:number}){
  return <label className={s.field}>{caption}<textarea name={name} defaultValue={value} required={required} rows={rows}/></label>;
}
export function Select({name,label:caption,value,options}:{name:string;label:string;value?:string;options:string[]}){
  return <label className={s.field}>{caption}<select name={name} defaultValue={value??options[0]}>{options.map(v=><option value={v} key={v}>{label(v)}</option>)}</select></label>;
}
export function OwnerSelect({value=''}:{value?:string}){
  let current='';try{current=assignment(value);}catch{current='';}
  return <label className={s.field}>Assigned to<select name="owner" defaultValue={current}><option value="">Unassigned</option>{ASSIGNEES.map(name=><option key={name}>{name}</option>)}</select></label>;
}
export function Badge({children,tone='neutral'}:{children:React.ReactNode;tone?:string}){return <span className={`${s.badge} ${s[tone]||''}`}>{children}</span>;}
export function Qualification({value}:{value:string}){return <Badge tone={value==='qualified'?'green':value==='dead'?'muted':'amber'}>{label(value)}</Badge>;}
export function External({href,children}:{href:string;children:React.ReactNode}){return /^https?:\/\//i.test(href)?<a className={s.external} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={14}/></a>:null;}
export function Empty({title,detail,action,button}:{title:string;detail:string;action?:()=>void;button?:string}){return <div className={s.empty}><Tray size={28} weight="light"/><strong>{title}</strong><p>{detail}</p>{action&&<button onClick={action}>{button||'Add lead'}</button>}</div>;}
export function Skeleton(){return <div className={s.skeleton} aria-busy="true" aria-label="Loading CRM"><div/><section>{[0,1,2,3].map(i=><div key={i}/>)}</section><article>{[0,1,2,3,4].map(i=><div key={i}/>)}</article><span className={s.srOnly}>Loading your workspace</span></div>;}
export function Title({eyebrow,title,detail,children}:{eyebrow:string;title:string;detail:string;children?:React.ReactNode}){return <div className={s.pageTitle}><div><span className={s.eyebrow}>{eyebrow}</span><h1>{title}</h1><p>{detail}</p></div>{children&&<div className={s.actions}>{children}</div>}</div>;}
export function Stats({items}:{items:{label:string;value:string|number;detail:string;action?:()=>void}[]}){return <div className={s.stats}>{items.map(item=><div key={item.label}><span>{item.label}</span>{item.action?<button onClick={item.action}>{item.value}<ArrowRight size={17}/></button>:<strong>{item.value}</strong>}<small>{item.detail}</small></div>)}</div>;}
