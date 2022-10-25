import {useEffect,useState} from "react";

function useDelayUnmount(isMounted, delayTime) {
    const [showDiv, setShowDiv] = useState(false);
    useEffect(() => {
      let timeoutId;
      if (isMounted && !showDiv) {
        setShowDiv(true);
      } else if (!isMounted && showDiv) {
        timeoutId = setTimeout(() => setShowDiv(false), delayTime); //delay our unmount
      }
      return () => clearTimeout(timeoutId); 
    }, [isMounted, delayTime, showDiv]);
    return showDiv;
  }

  export default useDelayUnmount;