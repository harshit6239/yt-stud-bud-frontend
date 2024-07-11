import { useState, useEffect } from 'react'
import { getItems } from '../api/getItems';

function useItemFetch(folder) {
    const [ loading, setLoading ] = useState(true);
    const [ items, setItems ] = useState(undefined);
    const [ error, setError ] = useState(null);

    useEffect(()=>{
        setLoading(true);
        getItems(folder).then((res)=>{
            setError(null);
            setItems(res);
        }).catch((err)=>{
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
    },[])
    
    const refetch = (fldr) => {
        setLoading(true);
        if(!fldr) fldr = folder;
        getItems(fldr).then((res)=>{
            setError(null);
            setItems(res);
        }).catch((err)=>{
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
    }

    return { loading, items, error, refetch }
  
}

export default useItemFetch