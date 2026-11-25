import type { Resource } from './resources';
export function studentResources(resources:Resource[],today:string){
 return resources.filter(r=>r.status==='Ready to share'&&r.topic!=='Peer mentoring'&&(
 r.type==='Guide'||r.type==='Campus service'||(r.type==='Announcement'&&r.topic==='Volunteering')||(r.type==='Event'&&!!r.date&&r.date.slice(0,10)>=today)));
}
export function studentContent(content:string){
 return content.split('\n\n').filter(block=>! /^(LOCATION SOURCE|SOURCE|TO CONFIRM|CURRENT DETAILS)\b/i.test(block.trim()));
}
