import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
function LoadingGate(){
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  let cancelled=false;
  let minimumTimer:ReturnType<typeof setTimeout>,limitTimer:ReturnType<typeof setTimeout>,removeTimer:ReturnType<typeof setTimeout>;
  const portrait=new Image();portrait.src='/portrait.png';
  const assets=Promise.allSettled([document.fonts.ready,portrait.decode(),import('./components/SpatialScene')]);
  const minimum=new Promise<void>(resolve=>{minimumTimer=setTimeout(resolve,matchMedia('(prefers-reduced-motion: reduce)').matches?0:3000)});
  const limit=new Promise<void>(resolve=>{limitTimer=setTimeout(resolve,4500)});
  Promise.all([minimum,Promise.race([assets,limit])]).then(()=>{
   if(cancelled)return;
   clearTimeout(limitTimer);
   const loader=document.getElementById('boot-loader');
   document.getElementById('root')?.removeAttribute('inert');
   document.documentElement.classList.remove('is-loading');
   loader?.classList.add('is-finished');
   setReady(true);
   removeTimer=setTimeout(()=>loader?.remove(),800);
  });
  return()=>{cancelled=true;clearTimeout(minimumTimer);clearTimeout(limitTimer);clearTimeout(removeTimer)};
 },[]);
 return <div className={`portfolio-entry ${ready?'is-ready':''}`}><App ready={ready}/></div>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><LoadingGate/></React.StrictMode>);
