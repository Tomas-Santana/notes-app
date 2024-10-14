import { useRef, useEffect, useState } from "react";


export function useAutosave<T>(data: T, onSave: () => void, delay = 5000, saveOnUnmount = true) {
    const valueOnCleanup = useRef(data);
    const initialRender = useRef(true);
    const handleSave = useRef(onSave);
  
    const debouncedValueToSave = useDebounce(data, delay);
  
    useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
      } else {
        handleSave.current();
      }
    }, [debouncedValueToSave]);
  
    useEffect(() => {
      valueOnCleanup.current = data;
    }, [data]);
  
    useEffect(() => {
      handleSave.current = onSave;
    }, [onSave]);
  
    useEffect(
      () => () => {
        if (saveOnUnmount) {
          handleSave.current();
        }
      },
      [saveOnUnmount],
    );

}

function useDebounce<TData>(data: TData, interval: number) {
    const [liveData, setLiveData] = useState<TData>(data);
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const handler = setTimeout(() => {
          setLiveData(data);
        }, interval);
        return () => {
          clearTimeout(handler);
        };
      }
    }, [data, interval]);
  
    return liveData;
  }