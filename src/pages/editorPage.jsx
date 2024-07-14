import React, { useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import { search } from '../api/gemini';
import Editor from '../components/Editor';
import toast, { Toaster } from 'react-hot-toast';
import './editorPage.css'; 
import useNoteFetch from '../hooks/useNoteFetch';

function editorPage() {
  const navigate = useNavigate();
  const aiRef = useRef(null);
  const playerRef = useRef(null);
  const { id } = useParams();
  const { loading, vid, content, error, update, updateLoading, updateError } = useNoteFetch(id);
  const [ aiHistory, setAiHistory ] = useState([]);

  if(error){
    if(error.message === "Invalid token"){
      navigate('/login');
    }
    else{
      toast.error('error while fetching notes please try again', {
        position: 'top-right',
      });
    }
  }

  const handleAiSearchBox = (e) => {
    if(e.key === 'Enter' & e.shiftKey === false) {
      handleSearch();
    }
  }

  const jumpToAi = (e) => {
    if(e.ctrlKey && e.key === '/') {
      aiRef.current.select();
    }
  }

  const handleSearch = async (e) => {
    const query = aiRef.current.value.trim();
    if(query.trim() === '') return;
    aiRef.current.value = '';
    if(query === 'clear()') {
      setAiHistory([]);
      return;
    }
    const obj = await search(query);
    setAiHistory((oldHist)=>[...oldHist,obj]);
  }

  return (
    <div className="container" onKeyUp={jumpToAi}>
            <div className="EditorPageLeft">
              <div className="frame" ref={playerRef}>
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+(vid?vid:"")}  allowFullScreen></iframe>
              </div>
              <div className="ai">
                <div className="searchBox">
                  <textarea name="searchQuery" id="searchQuery" rows="1" placeholder='Search you Query here(enter to search and shift+enter for new line)
Type "clear()" to clear the box below' onKeyUp={handleAiSearchBox} ref={aiRef}></textarea>
                  <button onClick={handleSearch}>search</button>
                </div>
                <div className="queries">{aiHistory.length>0 && aiHistory.map((element, index) => {
                  return <div className='qna' key={index}><div className='query'>{element.query}</div>
                  <Markdown className='response'>{element.response}</Markdown></div>
                })}
                </div>
              </div>
            </div>
            <div className="EditorPageRight">
                <div className="loadingDiv">
                  {( loading || updateLoading) && <img src="/loader.gif" alt="" /> }
                  
                </div>
                <div className="editorBox">
                    {!loading && !error && <Editor editable={!error} initialContent={content} onchange={update}/>}
                    {loading && <div className="loader"><img src="/loader.gif" alt="" /></div>}
                </div>
            </div>
            <Toaster />
        </div>
  )
}

export default editorPage;