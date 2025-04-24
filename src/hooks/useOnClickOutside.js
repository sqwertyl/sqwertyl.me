 import { useEffect } from 'react'

 // Hook that alerts clicks outside of the passed ref
 export default function useOnClickOutside(ref, handler) {
   useEffect(() => {
     const listener = event => {
       // Do nothing if clicking ref's element or descendent
       if (!ref.current || ref.current.contains(event.target)) {
         return
       }
       handler(event)
     }
     document.addEventListener('mousedown', listener)
     document.addEventListener('touchstart', listener)
     return () => {
       document.removeEventListener('mousedown', listener)
       document.removeEventListener('touchstart', listener)
     }
   }, [ref, handler])
 }