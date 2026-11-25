import type {Resource} from './resources';
import {classResources} from './gen103-resources';
import {studentResources} from './student-resources';
export type Need='campus'|'study'|'money'|'career'|'community';
export type CatalogResource=Resource&{need:Need;classShared:boolean;externalOnly:boolean;format:string;source:string;officialLink?:string};
export const needs=[
 {id:'campus',title:'Campus & support',description:'Find your way, get help, and connect with campus services.'},
 {id:'study',title:'Study & grades',description:'Writing, research, learning support, and academic planning.'},
 {id:'money',title:'Money basics',description:'Student Finance and resources for understanding your money.'},
 {id:'career',title:'Career & interests',description:'Explore interests and connect with career support.'},
 {id:'community',title:'Community & belonging',description:'Student life, volunteering, and finding your people.'},
] as const;
const mergedIds:Record<string,string>={'student-finance':'finance-office','learning-support':'learning','library':'library-office','wellness':'wellness-office','international':'affairs-office','fresh-market':'market-office','career-bridge':'career-office'};
export function canonicalId(id:string){return id.startsWith('gen103:')?(mergedIds[id.slice(7)]??id):id;}
export function normalizeSaved(ids:string[]){return [...new Set(ids.filter(id=>typeof id==='string').map(canonicalId))];}
const classNeed:Record<string,Need>={'student-life':'community','support-system':'community','support-belonging':'community','life-lessons':'community','gpa':'study','learning-support':'study','library':'study','student-finance':'money','financial-literacy':'money','career-bridge':'career','interest-profiler':'career','many-interests':'career'};
function needFor(resource:Resource):Need{
 if(resource.id==='finance-office')return 'money';if(resource.id==='career-office')return 'career';
 if(['centro-office','sankofa-office','volunteer','honor-societies'].includes(resource.id)||['Events','Volunteering'].includes(resource.topic))return 'community';
 if(['learning','library-office','essay','grammarly','week','research','library-delivery'].includes(resource.id)||resource.type==='Guide'&&resource.id!=='offices')return 'study';
 return 'campus';
}
export function buildStudentCatalog(resources:Resource[],today:string):CatalogResource[]{
 const result:CatalogResource[]=studentResources(resources,today).map(resource=>({...resource,need:needFor(resource),classShared:false,externalOnly:false,format:resource.type==='Campus service'?'Campus service':'Guide',source:'PeerSpace guide',...(/^https:\/\/(?:www\.)?nl\.edu(?:\/|$)/.test(resource.link)?{officialLink:resource.link}:{})}));
 for(const item of classResources){
  const id=canonicalId('gen103:'+item.id),existing=result.find(resource=>resource.id===id);
  if(existing){existing.classShared=true;existing.officialLink=item.url;existing.source='Official NLU link';continue;}
  const need=classNeed[item.id]??'campus';
  result.push({id,title:item.title,summary:item.description,topic:need==='study'?'Academic success':'Campus support',type:'Guide',status:'Ready to share',content:`START HERE\n${item.description}${item.note?'\n\nKEEP IN MIND\n'+item.note:''}${item.prompt?'\n\nTRY A REFLECTION\n'+item.prompt+'\nThink about it or discuss it in class. No response is collected.':''}`,link:item.url,location:'',date:'',saved:false,updatedAt:'2026-11-17T00:00:00.000Z',need,classShared:true,externalOnly:true,format:item.kind,source:item.source,...(item.kind==='NLU page'?{officialLink:item.url}:{})});
 }
 return result;
}
export function filterStudentCatalog(catalog:CatalogResource[],view:string,query:string,format:string,saved:string[]){
 const normalized=normalizeSaved(saved);const text=query.toLowerCase().trim();
 return catalog.filter(resource=>(view==='all'||view==='saved'&&normalized.includes(resource.id)||resource.need===view)&&(format==='All topics'||(format==='Official NLU links'?!!resource.officialLink:resource.format===format))&&`${resource.title} ${resource.summary} ${resource.location} ${resource.source} ${resource.content}`.toLowerCase().includes(text));
}
