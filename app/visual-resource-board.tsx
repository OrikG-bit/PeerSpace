'use client';
import {useId,useState} from 'react';
import {ArrowRight,BookOpen,CalendarDays,Check,CheckCheck,ChevronDown,Compass,FileText,Flag,HeartHandshake,Lightbulb,MapPin,Package,PenLine,Search,Sparkles,Trophy,Building2,Copy} from 'lucide-react';
import type {Resource} from '../lib/resources';
import {resourceArt} from '../lib/resource-presentation';
import {resourceSections,sectionLines,type ResourceSection} from '../lib/resource-sections';
const themes:Record<string,{label:string;title:string;icon:typeof BookOpen;className:string}>={
 essay:{label:'THE ESSAY ROADMAP',title:'Build your ideas into an essay.',icon:PenLine,className:'essay'},
 week:{label:'YOUR WEEK, WITH A LITTLE MORE ROOM',title:'Small steps. A clearer week.',icon:CalendarDays,className:'planner'},
 research:{label:'THE SOURCE CHECK',title:'Find it. Check it. Cite it.',icon:Search,className:'research'},
 grammarly:{label:'YOUR EDITING WORKFLOW',title:'Polish the words. Keep your voice.',icon:CheckCheck,className:'editing'},
 'library-delivery':{label:'FROM THE LIBRARY TO YOUR DOOR',title:'Follow the book trail.',icon:Package,className:'delivery'},
 'honor-societies':{label:'RECOGNITION & CONNECTION',title:'Explore your next community.',icon:Trophy,className:'honors'},
 volunteer:{label:'A LITTLE TIME, A REAL CONNECTION',title:'Find your way to get involved.',icon:HeartHandshake,className:'volunteer'},
};
function VisualBody({section,resourceId}:{section:ResourceSection;resourceId:string}){
 const lines=sectionLines(section.body),total=lines.filter(l=>l.checkable).length;const [checked,setChecked]=useState<number[]>([]);
 return <div className="visual-card-body">{total>0&&<div className="task-meter"><div><strong>{checked.length} / {total}</strong><span>your checklist · this visit</span></div><progress value={checked.length} max={total} aria-label="Checklist progress"/></div>}<div className={section.example?'example-pieces':''}>{lines.map((line,i)=>{
  if(line.checkable)return <label className={'visual-task '+(checked.includes(i)?'done':'')} key={i}><input type="checkbox" checked={checked.includes(i)} onChange={()=>setChecked(v=>v.includes(i)?v.filter(n=>n!==i):[...v,i])}/><span className="task-check" aria-hidden="true"><Check size={14}/></span><span>{line.text}</span></label>;
  if(resourceId==='honor-societies'&&section.id==='0'){
   const names=['National Society of Leadership and Success','Tau Sigma','Alpha Alpha Alpha','Alpha Lambda Delta'];
   if(names.every(name=>line.text.includes(name)))return <div className="society-collection" key={i}><p className="visual-copy">NLU’s official page links to these honor societies:</p><ul>{names.map((name,n)=><li key={name}><span><Trophy size={19}/></span><div><small>EXPLORE</small><strong>{name}</strong></div></li>)}</ul></div>;
  }
  const colon=line.text.indexOf(':');if(section.example&&colon>0&&colon<30)return <div className="example-piece" key={i}><span>{line.text.slice(0,colon)}</span><p>{line.text.slice(colon+1).trim()}</p></div>;
  if(/WHERE DO I GO/i.test(section.title)){const room=line.text.match(/Room\s+(\d+)/i);return <div className="visit-location-line" key={i}><MapPin size={18}/><p>{line.text}</p>{room&&<span className="visual-room">{room[1]}</span>}</div>}
  return <p className={'visual-copy '+(resourceId==='grammarly'&&/paid Education plan/.test(line.text)?'access-note':'')} key={i}>{line.text}</p>;
 })}</div></div>;
}
function iconFor(section:ResourceSection,index:number,resource:Resource){
 const title=section.title.toLowerCase();if(section.example)return Lightbulb;if(/where|location/.test(title))return MapPin;if(/tip|keep in mind|check/.test(title))return Lightbulb;if(/start|next|join|hand/.test(title))return ArrowRight;if(/sources|research|borrow/.test(title))return BookOpen;if(resource.type==='Campus service')return index===0?HeartHandshake:Compass;return index===0?Flag:FileText;
}
export default function VisualResourceBoard({resource}:{resource:Resource}){
 const sections=resourceSections(resource.content),campus=resource.type==='Campus service';
 const theme=themes[resource.id]??(campus?{label:'YOUR CAMPUS VISIT',title:'Know your stop. Take the next step.',icon:Building2,className:'visit'}:{label:'YOUR QUICK GUIDE',title:'A useful idea, made clearer.',icon:Compass,className:'general'});
 const [open,setOpen]=useState<string[]>(sections.filter((section,i)=>i===0||(campus&&/where/i.test(section.title))).map(s=>s.id));const [copied,setCopied]=useState(false),[copyError,setCopyError]=useState(false);const id=useId();const Icon=theme.icon;
 async function copyLocation(){try{await navigator.clipboard.writeText(resource.title+'\n'+resource.location);setCopied(true);setCopyError(false)}catch{setCopyError(true)}}
 if(!sections.length)return null;
 return <section className={'visual-resource-board theme-'+theme.className} aria-label={campus?'Campus visit details':'Visual resource guide'}><header className="visual-board-header"><div><span className="visual-kicker"><Icon size={15}/>{theme.label}</span><h3>{theme.title}</h3><p>{campus?'Help, location, and a tip for your visit.':'Open a card. Try a step. Go at your own pace.'}</p></div><img src={resourceArt(resource)} alt="" width={120} height={120}/></header>{campus&&resource.location&&<div className="visit-ticket"><span className="ticket-icon"><MapPin size={22}/></span><div><small>YOUR DESTINATION</small><strong>{resource.location}</strong></div><button className="icon-button" aria-label="Copy this office location" onClick={copyLocation}>{copied?<Check size={18}/>:<Copy size={18}/>}</button></div>}<div className="visit-copy-status" role="status">{copied?'Location copied.':copyError?'Copy isn’t available. The location is shown above.':''}</div><div className="visual-card-trail">{sections.map((section,i)=>{const expanded=open.includes(section.id),SectionIcon=iconFor(section,i,resource);return <article className={'visual-info-card '+(section.example?'example-card ':'')+(expanded?'expanded':'')} key={section.id}><span className="trail-marker" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><button className="visual-card-toggle" aria-expanded={expanded} aria-controls={id+'-'+section.id} id={id+'-heading-'+section.id} onClick={()=>setOpen(current=>expanded?current.filter(x=>x!==section.id):[...current,section.id])}><span className="visual-section-icon"><SectionIcon size={20}/></span><span><small>{section.example?'SEE IT IN PRACTICE':campus?'BEFORE YOU GO':'MAKE IT PRACTICAL'}</small><strong>{section.title}</strong></span><ChevronDown size={19}/></button><div id={id+'-'+section.id} aria-labelledby={id+'-heading-'+section.id} hidden={!expanded}><VisualBody section={section} resourceId={resource.id}/></div></article>})}</div><div className="visual-board-note"><Sparkles size={17}/><p>{campus?'A starting point for your visit. Use the official department link for current details.':'Choose what helps today. Any checklist ticks last only while this guide is open.'}</p></div></section>;
}
