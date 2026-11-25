'use client';
import {useRef,useEffect,useId} from 'react';
import {ArrowLeft,Download,Maximize2,X} from 'lucide-react';
export default function FlyerViewer({src,title}:{src:string;title:string}){
 const dialog=useRef<HTMLDialogElement>(null),viewerId=useId();
 useEffect(()=>{const onBack=()=>{if(history.state?.peerSpaceFlyer!==viewerId)dialog.current?.close();else if(!dialog.current?.open){dialog.current?.showModal();dialog.current?.querySelector<HTMLElement>('.flyer-dialog-title')?.focus({preventScroll:true})}};window.addEventListener('popstate',onBack);return()=>window.removeEventListener('popstate',onBack)},[viewerId]);
 function openFlyer(){history.pushState({...history.state,peerSpaceFlyer:viewerId},'');dialog.current?.showModal();dialog.current?.querySelector<HTMLElement>('.flyer-dialog-title')?.focus({preventScroll:true})}
 function closeFlyer(){if(history.state?.peerSpaceFlyer===viewerId)history.back();else dialog.current?.close()}

 return <div className="flyer-viewer"><button className="flyer-preview" onClick={openFlyer} aria-label={'Enlarge '+title}><img src={src} alt={title} width={1187} height={1536}/><span><Maximize2 size={16}/> Tap to enlarge</span></button><div className="flyer-actions"><button className="secondary" onClick={openFlyer}><Maximize2 size={16}/> Enlarge flyer</button><a className="secondary" href={src} download><Download size={16}/> Download</a></div><dialog ref={dialog} className="flyer-lightbox" aria-label={title} onCancel={e=>{e.preventDefault();closeFlyer()}} onClick={e=>{if(e.target===e.currentTarget)closeFlyer()}}><div className="flyer-lightbox-bar"><button className="detail-back" onClick={closeFlyer}><ArrowLeft size={18}/>Back</button><strong className="flyer-dialog-title" tabIndex={-1}>{title}</strong><button className="icon-button" onClick={closeFlyer} aria-label="Close flyer"><X size={24}/></button></div><img src={src} alt={title}/><a className="secondary" href={src} download><Download size={16}/> Download flyer</a></dialog></div>
}
