'use client';
import type {Resource} from '../lib/resources';
import CampusStopGuide from './campus-stop-guide';
import VisualResourceBoard from './visual-resource-board';
export default function InteractiveResource({resource,onOpenResource}:{resource:Resource;onOpenResource?:(id:string)=>void}){
 return resource.id==='offices'?<CampusStopGuide content={resource.content} onOpenResource={onOpenResource}/>:<VisualResourceBoard key={resource.id+resource.updatedAt} resource={resource}/>;
}
