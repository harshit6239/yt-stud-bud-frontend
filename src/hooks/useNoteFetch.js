import { useState, useEffect } from 'react'
import { getNote } from '../api/getNote';
import { updateNote } from '../api/updateNote';

function useNoteFetch(id) {
    const [ loading, setLoading ] = useState(true);
    const [ vid, setVid ] = useState(undefined);
    const [ content, setContent ] = useState(undefined);
    const [ error, setError ] = useState(null);
    const [ updateLoading , setUpdateLoading ] = useState(false);
    const [ updateError, setUpdateError ] = useState(null);

    useEffect(()=>{
        setLoading(true);
        if(id){
            getNote(id).then((res)=>{
                setError(null);
                setVid(res.note.videoId);
                if(!!res.note.content) setContent(res.note.content);
            }).catch((err)=>{
                setVid(undefined);
                setError(err);
            }).finally(()=>{
                setLoading(false);
            });
        }
    },[id])
    
    const update = (content, markdown) => {
        setUpdateLoading(true);
        updateNote(id, content, markdown).then(()=>{
            setUpdateError(null);
        }).catch((err)=>{
            setUpdateError(err);
        }).finally(()=>{
            setUpdateLoading(false);
        });
    }

    return { loading, vid, content, error, update, updateLoading, updateError }
}

export default useNoteFetch