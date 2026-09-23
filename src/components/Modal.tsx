import { useEffect, useRef, type ReactNode } from 'react';
/** Native modal keeps focus inside, restores the trigger, and supports Escape. */
export function Modal({children,onClose,label}:{children:ReactNode;onClose:()=>void;label:string}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current;dialog?.showModal();const original=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog?.close();document.body.style.overflow=original}},[]);
 return <dialog ref={ref} aria-label={label} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose()}} className="reference-modal">{children}</dialog>;
}
