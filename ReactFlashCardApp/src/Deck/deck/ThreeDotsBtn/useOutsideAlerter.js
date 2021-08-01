import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideAlerter(ref,editButtonClicked, cb,cb2) {

    
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {

            if ( (ref[0].current && !ref[0].current.contains(event.target)) ) {
                if(editButtonClicked){
                    cb()
                    // ()=>{setShow(false)}
                } else {

                    if(ref[1].current && !ref[1].current.contains(event.target)) {
                        cb2()
                    
                    } else {
                        
                    }                   
                    // ()=>{setStartAnimation(true)}
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref,editButtonClicked, cb, cb2]);
}