import { useEffect, useRef } from 'react';

export const useObserver = (ref, isFetching, border, callback) => {
  const observer = useRef();
  useEffect(() => {
    if(isFetching) return;
    if(observer.current) observer.current.disconnect();
    const callBack = (entries, observer) => {
      if(entries[0].isIntersecting && border){
        callback()
      }
    };
    observer.current = new IntersectionObserver(callBack);
    observer.current.observe(ref.current)
  }, [isFetching])
};
