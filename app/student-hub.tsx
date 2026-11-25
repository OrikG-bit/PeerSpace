'use client';
import {useState,useEffect,useRef} from 'react';
import {BookOpen,Building2,Bookmark,CalendarDays,ArrowLeft,ArrowRight,ArrowUpRight,FileText,GraduationCap,HeartHandshake,Search,MapPin,Menu,X,ExternalLink,Wallet,Compass} from 'lucide-react';
import {currentSeed} from '../lib/upgrades';
import {studentResources,studentContent} from '../lib/student-resources';
import type {Resource} from '../lib/resources';
import './student-design.css';
import FlyerViewer from './flyer-viewer';
import InteractiveResource from './interactive-resource';
import ResourceBrowser from './resource-browser';
import {buildStudentCatalog,filterStudentCatalog,canonicalId,normalizeSaved,needs,type CatalogResource} from '../lib/student-catalog';
import {isFlyer} from '../lib/resource-presentation';
import {hubEntry,initialSnapshot,nextHubEntry,viewFromHash,type HubView as View,type HubSnapshot} from '../lib/hub-navigation';
const navigation=[{id:'all',label:'All resources',icon:BookOpen},{id:'campus',label:'Campus & support',icon:Building2},{id:'study',label:'Study & grades',icon:GraduationCap},{id:'money',label:'Money basics',icon:Wallet},{id:'career',label:'Career & interests',icon:Compass},{id:'community',label:'Community & belonging',icon:HeartHandshake},{id:'saved',label:'Saved resources',icon:Bookmark}] as const;
export default function StudentHub(){
 const [resources,setResources]=useState<Resource[]>(currentSeed),[view,setView]=useState<View>('all'),[query,setQuery]=useState(''),[topic,setTopic]=useState('All topics'),[building,setBuilding]=useState('All buildings'),[saved,setSaved]=useState<string[]>([]),[selected,setSelected]=useState<CatalogResource|null>(null),[navOpen,setNavOpen]=useState(false);
 const [campusMode,setCampusMode]=useState<'flyer'|'directory'>('flyer');
 const dialog=useRef<HTMLDialogElement>(null),routeReady=useRef(false),openingResource=useRef<string|null>(null),closingResource=useRef(false);
 const [canGoBack,setCanGoBack]=useState(false);
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const catalog=buildStudentCatalog(resources,today);
 useEffect(()=>{
  function restore(){const entry=hubEntry(history.state);const state=entry?.snapshot??initialSnapshot(viewFromHash(location.hash));setView(state.view);setQuery(state.query);setTopic(state.topic);setBuilding(state.building);setCampusMode(state.campusMode);setSelected(catalog.find(r=>r.id===canonicalId(state.selectedId??''))??null);setNavOpen(false);setCanGoBack((entry?.depth??0)>0);requestAnimationFrame(()=>window.scrollTo({top:state.scrollY,behavior:'instant'}));}
  if(!routeReady.current){routeReady.current=true;if(!hubEntry(history.state))history.replaceState({...history.state,peerSpace:{depth:0,snapshot:initialSnapshot(viewFromHash(location.hash))}},'');restore();}
  window.addEventListener('popstate',restore);return()=>window.removeEventListener('popstate',restore);
 },[resources]);
 useEffect(()=>{const previous=history.scrollRestoration;history.scrollRestoration='manual';return()=>{history.scrollRestoration=previous}},[]);

 useEffect(()=>{try{setSaved(normalizeSaved(JSON.parse(localStorage.getItem('peerspace-student-saved')||'[]')))}catch{}},[]);
 useEffect(()=>{openingResource.current=selected?.id??null;closingResource.current=false;const modal=dialog.current;if(!modal)return;if(selected){if(!modal.open)modal.showModal();modal.querySelector<HTMLElement>('#student-resource-title')?.focus({preventScroll:true})}else if(modal.open)modal.close()},[selected]);
 useEffect(()=>{
  if(!navOpen&&!selected)return;
  const prior=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=prior};
 },[navOpen,selected]);
 useEffect(()=>{
  if(!navOpen)return;
  const menu=document.getElementById('student-navigation');const buttons=menu?.querySelectorAll<HTMLElement>('a,button');buttons?.[0]?.focus();
  function onKey(event:KeyboardEvent){if(event.key==='Escape')setNavOpen(false);if(event.key==='Tab'&&buttons?.length){const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}}
  document.addEventListener('keydown',onKey);return()=>{document.removeEventListener('keydown',onKey);document.querySelector<HTMLButtonElement>('.mobile-menu')?.focus()};
 },[navOpen]);
 function snapshot():HubSnapshot{return {view,query,topic,building,campusMode,selectedId:selected?.id??null,scrollY:window.scrollY};}
 function pushStep(next:HubSnapshot){const current=hubEntry(history.state);history.replaceState({...history.state,peerSpace:{depth:current?.depth??0,snapshot:snapshot()}},'');history.pushState({...history.state,peerSpace:nextHubEntry(current,next)},'', '#'+next.view);setCanGoBack(true);}
 function navigate(next:View){if(next!==view||selected)pushStep(initialSnapshot(next));setView(next);setSelected(null);setCampusMode('flyer');setQuery('');setTopic('All topics');setBuilding('All buildings');setNavOpen(false);window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 function openResource(resource:CatalogResource){if(openingResource.current)return;openingResource.current=resource.id;pushStep({...snapshot(),selectedId:resource.id});setSelected(resource);}
 function openRelated(id:string){const resource=catalog.find(item=>item.id===canonicalId(id));if(!resource||openingResource.current===resource.id)return;openingResource.current=resource.id;pushStep({...snapshot(),selectedId:resource.id});setSelected(resource);if(dialog.current)dialog.current.scrollTop=0;}
 function closeResource(){if(closingResource.current)return;closingResource.current=true;if(hubEntry(history.state)?.snapshot.selectedId){history.back();}else setSelected(null);}
 function goBack(){if((hubEntry(history.state)?.depth??0)>0){history.back();return;}const home=initialSnapshot('all');history.replaceState({...history.state,peerSpace:{depth:0,snapshot:home}},'', '#all');setView('all');setQuery('');setTopic('All topics');setBuilding('All buildings');setCampusMode('flyer');setSelected(null);setCanGoBack(false);window.scrollTo({top:0,behavior:'instant'});}

 function bookmark(rawId:string){const id=canonicalId(rawId);const current=normalizeSaved(saved);const next=current.includes(id)?current.filter(x=>x!==id):[...current,id];setSaved(next);try{localStorage.setItem('peerspace-student-saved',JSON.stringify(next))}catch{}}
 const filtered=filterStudentCatalog(catalog,view,query,topic,saved);
 const formats=['All topics',...new Set(catalog.filter(item=>view==='all'||view==='saved'&&saved.includes(item.id)||item.need===view).map(item=>item.format))];
 const headings={all:['Your next step, made easier.','Selected GEN 103 topics, brought together around what you need.'],campus:['Find your way. Find support.','Campus locations, technology help, wellness, and student services.'],study:['Make your next assignment easier.','Writing, research, grades, and learning support in one place.'],money:['Make sense of your money.','Student Finance and a starting point for financial literacy.'],career:['Explore what comes next.','Your interests, your possibilities, and NLU career support.'],community:['Find your people.','Student life, volunteering, and feeling connected at NLU.'],saved:['Your useful finds.','Resources bookmarked on this device.']};
 const viewArt:Partial<Record<View,string>>={campus:'/art/campus.webp',study:'/art/study.webp',community:'/art/community.webp',money:'/art/resources/finance-office.webp',career:'/art/resources/career-office.webp'};
 const selectedNeed=selected?needs.find(item=>item.id===selected.need):null;

 return <div className="app-shell student-shell">
 {navOpen&&<div className="mobile-shade" onClick={()=>setNavOpen(false)}/>}
 <aside id="student-navigation" className={'sidebar '+(navOpen?'open':'')}><button className="mobile-nav-close icon-button" aria-label="Close navigation" onClick={()=>setNavOpen(false)}><X size={24}/></button>
 <a className="brand" href="/" aria-label="PeerSpace home"><span className="brand-icon"><BookOpen size={23}/></span><span>peer<span className="brand-light">space</span><small>STUDENT SUPPORT HUB</small></span></a>
 <div className="workspace-label">YOUR NLU SHORTCUT</div><nav aria-label="Student resources">{navigation.map(n=><button className={'nav-item '+(view===n.id?'active':'')} aria-current={view===n.id?'page':undefined} key={n.id} onClick={()=>navigate(n.id)}><n.icon size={19}/><span>{n.label}</span>{n.id==='saved'&&saved.length>0&&<span className="nav-count">{saved.length}</span>}</button>)}</nav>
 <div className="sidebar-bottom"><div className="student-campus-label"><GraduationCap size={22}/><span>National Louis University<br/><small>Chicago campus</small></span></div></div>
 </aside>
 <div className="main-shell" inert={navOpen}><header className="topbar"><div className="breadcrumb"><button className="mobile-menu icon-button" aria-label="Open navigation" aria-expanded={navOpen} aria-controls="student-navigation" onClick={()=>setNavOpen(!navOpen)}><Menu size={21}/></button><span>PeerSpace</span><span className="slash">/</span><strong>{navigation.find(n=>n.id===view)?.label}</strong></div><a className="student-nlu-link" href="https://nl.edu/" target="_blank" rel="noopener noreferrer">NLU website <ExternalLink size={13}/></a></header>
 <main>{(canGoBack||view!=='all')&&<button className="page-back" onClick={goBack}><ArrowLeft size={18}/>Back</button>}<div className="page-heading"><div><div className="eyebrow">NLU CHICAGO · STUDENT RESOURCES</div><h1>{view==='all'?<>Your next step,<br/><span>made easier.</span></>:headings[view][0]}</h1><p>{view==='all'?'Selected GEN 103 topics, organized around what you need.':headings[view][1]}</p></div>{viewArt[view]&&<img className="section-art" src={viewArt[view]} alt="" width={600} height={400}/>}{view==='all'&&<figure className="nlu-welcome-art"><img src="/art/nlu-student-welcome.webp" alt="Students arriving and chatting outside NLU’s entrance at 122 South Michigan Avenue" width={1000} height={750}/></figure>}</div>
 {view==='all'&&<section className="quick-paths illustrated-paths" aria-label="What do you need?"><button onClick={()=>navigate('campus')}><img className="path-image" src="/art/campus.webp" alt="" width={600} height={400}/><span><strong>Campus & support</strong><small>Find the right people & places</small></span><ArrowUpRight size={20}/></button><button onClick={()=>navigate('community')}><img className="path-image" src="/art/community.webp" alt="" width={600} height={400}/><span><strong>Community & belonging</strong><small>Events & volunteering</small></span><ArrowUpRight size={20}/></button><button onClick={()=>navigate('study')}><img className="path-image" src="/art/study.webp" alt="" width={600} height={400}/><span><strong>Study & grades</strong><small>Writing, research & study tips</small></span><ArrowUpRight size={20}/></button></section>}

 {view==='all'&&<p className="project-context">An independent student project inspired by GEN 103. Follow official NLU links for current university information.</p>}
 {view==='community'&&<div className="context-note"><HeartHandshake size={23}/><div><strong>Find what’s happening at NLU</strong><p>Explore student organizations, events, and campus activities on InvolveU.</p></div><a className="secondary" href="https://involveu.nl.edu/" target="_blank" rel="noopener noreferrer">Explore InvolveU<ArrowUpRight size={15}/></a></div>}
 <section id="library" className="library-section" key={view}><div className="section-heading"><h2>{view==='all'?'What do you need help with?':view==='saved'?'Saved resources':'Explore resources'}</h2></div>
 <div className="filter-bar"><label className="search-field"><Search size={18}/><input aria-label="Search student resources" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search a question, resource, or campus service…"/>{query&&<button className="icon-button" aria-label="Clear search" onClick={()=>setQuery('')}><X size={15}/></button>}</label></div>
 <div className="topic-tabs" aria-label="Resource format">{formats.map(format=><button key={format} aria-pressed={topic===format} className={topic===format?'selected':''} onClick={()=>setTopic(format)}>{format==='All topics'?'All formats':format==='Guide'?'Guides & tips':format==='Campus service'?'Campus resources':format==='NLU page'?'NLU pages':format+'s'}</button>)}{catalog.some(item=>item.officialLink)&&<button aria-pressed={topic==='Official NLU links'} className={topic==='Official NLU links'?'selected':''} onClick={()=>setTopic('Official NLU links')}>Official NLU links</button>}</div>
 <div className="results-summary" role="status">{filtered.length} {filtered.length===1?'resource':'resources'}{(query||topic!=='All topics')&&<button onClick={()=>{setQuery('');setTopic('All topics')}}>Clear filters<X size={13}/></button>}</div>
 <ResourceBrowser resources={filtered} saved={saved} onBookmark={bookmark} onOpen={openResource}/>
 {!filtered.length&&<div className="empty-state"><Search size={25}/><h3>{view==='saved'&&!query&&topic==='All topics'?'Keep useful resources close':'No matching resources'}</h3><p>{view==='saved'?'Bookmark a resource to keep it here.':'Try another search or clear your filters.'}</p><button className="secondary" onClick={()=>navigate('all')}>Explore resources<ArrowRight size={15}/></button></div>}
 </section><footer className="footer"><span><BookOpen size={16}/> PeerSpace · Your NLU shortcut.</span><span>NLU Chicago</span></footer></main></div>
 <dialog aria-labelledby="student-resource-title" className="student-dialog" ref={dialog} onCancel={e=>{e.preventDefault();closeResource()}} onClick={e=>{if(e.target===e.currentTarget)closeResource()}}>{selected&&<div className="student-dialog-inner"><div className="drawer-top"><button className="detail-back" onClick={closeResource}><ArrowLeft size={18}/>Back to resources</button><span>{selectedNeed?.title}</span><button className="icon-button" aria-label="Close resource" onClick={closeResource}><X size={22}/></button></div><div className="drawer-heading"><h2 id="student-resource-title" tabIndex={-1}>{selected.title}</h2><p>{selected.summary}</p><div className="detail-source-line"><span>{selected.source}</span>{selected.classShared&&<small>Shared in GEN 103</small>}</div></div>{selected.location&&selected.type!=='Campus service'&&<div className="office-location detail-location"><MapPin size={18}/>{selected.location}</div>}{(isFlyer(selected)||selected.id==='offices')&&<FlyerViewer src={selected.id==='offices'?'/campus-room-guide.jpg':selected.link} title={selected.title}/>}{(selected.officialLink||selected.link)&&<a className="resource-link" href={selected.officialLink||selected.link} target="_blank" rel="noopener noreferrer"><ExternalLink size={17}/>{selected.format==='Video'?'Watch on YouTube':selected.format==='Tool'?'Open tool':selected.format==='Article'?'Read article':selected.topic==='Volunteering'?'Open volunteer sign-up flyer':selected.officialLink?'Visit official NLU page':selected.type==='Campus service'?'Visit department website':'Open helpful link'}<ArrowUpRight size={16}/></a>}<InteractiveResource key={selected.id+selected.updatedAt} resource={selected} onOpenResource={openRelated}/><button className="secondary" onClick={()=>bookmark(selected.id)}><Bookmark size={16} fill={saved.includes(selected.id)?'currentColor':'none'}/>{saved.includes(selected.id)?'Saved for later':'Save for later'}</button></div>}</dialog>
 </div>
}
