import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
/** Free native scrolling supports wheel, touch and keyboard input without section snapping. */
export function useSmoothScroll(){useEffect(()=>{const refresh=()=>ScrollTrigger.refresh();document.fonts.ready.then(refresh);window.addEventListener('load',refresh);return()=>window.removeEventListener('load',refresh)},[])}
