import {studentContent} from './student-resources';
export type ResourceSection={id:string;title:string;body:string;example:boolean};
export function resourceSections(content:string):ResourceSection[]{
 return studentContent(content).map((block,index)=>{
  const lines=block.trim().split('\n');const first=lines[0].trim();
  const heading=lines.length>1&&/[A-Z]/.test(first)&&first===first.toUpperCase();
  const title=heading?first.replace(/^\d+[.)]\s*/,'').toLowerCase().replace(/^./,c=>c.toUpperCase()).replace(/\bnlu\b/g,'NLU'):index===0?'Start here':'Keep in mind';
  return {id:String(index),title,body:heading?lines.slice(1).join('\n'):block.trim(),example:/\bexample\b/i.test(first)&&heading};
 });
}
export function sectionLines(body:string){return body.split('\n').filter(line=>line.trim()).map(line=>({text:line.replace(/^\s*(?:\d+[.)]|[•–])\s+/,'').trim(),checkable:/^\s*(?:\d+[.)]|[•–])\s+/.test(line)}));}
