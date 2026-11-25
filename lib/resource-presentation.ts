import type {Resource} from './resources';
export type ResourceGroup='essential'|'opportunities'|'guides';
const artIds=new Set(['research','volunteer','essay','grammarly','week','library-delivery','honor-societies','offices','learning','library-office','finance-office','affairs-office','centro-office','sankofa-office','wellness-office','market-office','den-office','gym-office','career-office','cafe-office']);
const classArtIds=new Set(["guidebook", "it-support", "accessibility", "veterans", "student-rights", "gpa", "financial-literacy", "interest-profiler", "many-interests", "student-life", "time-stress", "support-system", "life-lessons", "asking-for-help", "support-belonging"]);
export function resourceArt(resource:Resource){
 if(resource.id.startsWith('gen103:')&&classArtIds.has(resource.id.slice(7)))return '/art/resources/class-'+resource.id.slice(7)+'.webp';
 if(artIds.has(resource.id))return '/art/resources/'+resource.id+'.webp';
 return '/art/'+(resource.type==='Campus service'?'campus':['Events','Volunteering'].includes(resource.topic)?'community':'study')+'.webp';
}
export function resourceGroup(resource:Resource):ResourceGroup{
 if(resource.type==='Campus service'||resource.id==='offices')return 'essential';
 if(['Events','Volunteering'].includes(resource.topic))return 'opportunities';
 return 'guides';
}
const priority=['offices','learning','finance-office','wellness-office','market-office','affairs-office','library-office','career-office','den-office','centro-office','sankofa-office','gym-office','cafe-office'];
export function resourcePriority(resource:Resource){const index=priority.indexOf(resource.id);return index<0?priority.length:index;}
export const resourceGroups=[
 {id:'essential',title:'Campus essentials',description:'Where to go and who can help.'},
 {id:'opportunities',title:'Get involved',description:'Ways to connect and contribute.'},
 {id:'guides',title:'Helpful guides & tips',description:'Practical ideas for your next assignment.'},
] as const;
export function isFlyer(resource:Resource){return /\/volunteer-signup\.jpg(?:\?.*)?$/.test(resource.link);}
