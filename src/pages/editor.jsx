import React, { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css'; 

function editor() {
  const aiRef = useRef(null);
  const frameRef = useRef(null);
  const { vid } = useParams();
  const [ data, setData ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ aiHistory, setAiHistory ] = useState([]);

  // useEffect(()=>{
  //   console.log(vid);
  //   axios({
  //     url: `http://localhost:3000/ytframe/${vid}`,
  //     method: "GET",
  // }).then((res) => {
  //   frameRef.current.innerHTML = res.data;
  // }).catch((err) => {});
  // },[]);

  const handleTitle = (e) => {
    if(e.target.value.includes('\n')) {
      console.log('new line');
    }
    else{
      setTitle(e.target.value);
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

  const handleSearch = (e) => {
    const query = aiRef.current.value.trim();
    if(query.trim() === '') return;
    aiRef.current.value = '';
    if(query === 'clear()') {
      setAiHistory([]);
      return;
    }
    axios({
      url: `http://localhost:3000/gemini/`,
      method: "GET",
      params: {
        query: query
      }
    }).then((res) => {
      const obj = {
        query: query,
        response: res.data
      };
      console.log(res.data);
      setAiHistory((oldHist)=>[...oldHist,obj]);
    }).catch((err) => {});
  }

  return (
    <div className="container" onKeyUp={jumpToAi}>
            <div className="left">
              <div className="frame" >
              <iframe ref={frameRef} width="560" height="315" src={"https://www.youtube.com/embed/"+vid}  allowFullScreen></iframe>
              </div>
              <div className="ai">
                <div className="searchBox">
                  <textarea name="searchQuery" id="searchQuery" rows="1" placeholder='Search you Query here(enter to search and shift+enter for new line)
Type "clear()" to clear the box below' onKeyUp={handleAiSearchBox} ref={aiRef}></textarea>
                  <button onClick={handleSearch}>search</button>
                </div>
                <div className="queries">{aiHistory.length && aiHistory.map((element, index) => {
                  return <div className='qna' key={index}><div className='query'>{element.query}</div>
                  <Markdown className='response'>{element.response}</Markdown></div>
                })}</div>
              </div>
            </div>
            <div className="right">
                <div className="editorBox">
                    <textarea id="title" placeholder="Title"
                    onChange={handleTitle} value={title}>
                    </textarea>
                    <div className="editor">
                      <ReactQuill id='reactEditor' theme="snow" value={data} onChange={setData} placeholder='write something
(press ctrl + / to jump to ai box)'/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default editor;