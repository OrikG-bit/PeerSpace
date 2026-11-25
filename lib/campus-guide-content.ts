import {resourceSections} from './resource-sections';
export type CampusStop={name:string;room:string;note:string};
export type CampusFloor={number:string;label:string;stops:CampusStop[]};
export function campusGuideContent(content:string){
 const sections=resourceSections(content);
 const buildings=sections.filter(section=>/^(main|gage) building/i.test(section.title)).map(section=>({
  id:/^main/i.test(section.title)?'main':'gage',
  name:/^main/i.test(section.title)?'Main building':'Gage building',
  address:section.title.split('·').slice(1).join('·').trim().replace(/s\. michigan ave\./i,'S. Michigan Ave.'),
  floors:section.body.split('\n').flatMap(line=>{
   const match=line.match(/^(\d+)(st|nd|rd|th) floor:\s*(.*)/i);if(!match)return [];
   return [{number:match[1],label:match[1]+match[2]+' floor',stops:match[3].split(';').flatMap(stop=>{
    if(/ and Library, across from each other/i.test(stop))return [stop.split(' and Library')[0],'Library. Across from Learning Support.'];
    return [stop];
   }).map(stop=>{const room=stop.match(/\((\d+)\)/);let text=stop.replace(/\s*\(\d+\)/,'').replace(/\.$/,'').trim();let note='';
    if(text.startsWith('Student Finance, ')){note=text.slice('Student Finance, '.length);text='Student Finance';}
    const period=text.indexOf('. ');if(period>=0){note=text.slice(period+2);text=text.slice(0,period);}
    return {name:text,room:room?.[1]??'',note};
   })}];
  }),
 }));
 return {buildings,tips:sections.filter(section=>! /^(main|gage) building/i.test(section.title))};
}
