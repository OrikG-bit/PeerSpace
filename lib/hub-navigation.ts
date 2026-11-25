export type HubView='all'|'campus'|'study'|'money'|'career'|'community'|'saved';
export type HubSnapshot={view:HubView;query:string;topic:string;building:string;campusMode:'flyer'|'directory';selectedId:string|null;scrollY:number};
export type HubEntry={depth:number;snapshot:HubSnapshot};
export const hubViews:HubView[]=['all','campus','study','money','career','community','saved'];
const legacyViews:Record<string,HubView>={gen103:'all',guides:'study',opportunities:'community'};
export function viewFromHash(hash:string):HubView{const view=hash.replace(/^#/,'');return hubViews.includes(view as HubView)?view as HubView:legacyViews[view]??'all';}
export function initialSnapshot(view:HubView):HubSnapshot{return {view,query:'',topic:'All topics',building:'All buildings',campusMode:'flyer',selectedId:null,scrollY:0};}
export function hubEntry(state:unknown):HubEntry|null{
 if(!state||typeof state!=='object')return null;const entry=(state as {peerSpace?:HubEntry}).peerSpace;
 if(!entry||!Number.isInteger(entry.depth)||entry.depth<0||!entry.snapshot)return null;
 const oldView=entry.snapshot.view as string;if(!hubViews.includes(oldView as HubView)&&!legacyViews[oldView])return null;
 return {...entry,snapshot:{...entry.snapshot,view:viewFromHash('#'+oldView),topic:['All topics','Guide','Official NLU links','Video','Tool','Article','Campus service','NLU page'].includes(entry.snapshot.topic)?entry.snapshot.topic:'All topics'}};
}
export function nextHubEntry(current:HubEntry|null,snapshot:HubSnapshot):HubEntry{return {depth:(current?.depth??0)+1,snapshot};}
