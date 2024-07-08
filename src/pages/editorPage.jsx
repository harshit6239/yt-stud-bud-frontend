import React, { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom";
import Markdown from 'markdown-to-jsx';
import { search } from '../api/gemini';
import Editor from '../components/Editor';
import toast, { Toaster } from 'react-hot-toast';
import './editorPage.css'; 

function editorPage() {
  const aiRef = useRef(null);
  const playerRef = useRef(null);
  const { vid } = useParams();
  const [ videoDuration, setVideoDuration ] = useState(0);
  const [ player, setPlayer ] = useState(null);
  const [ data, setData ] = useState('');
  const [ aiHistory, setAiHistory ] = useState([]);
  const [ videoError, setVideoError ] = useState(false);

  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  function ytIframeApi() {
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new YT.Player(playerRef.current, {
        height: '315',
        width: '560',
        videoId: vid,
        events: {
          'onReady': (e) => {
            e.target.seekTo(0);
            setVideoDuration(e.target.getDuration());
          },
          'onError': (e) => {
            setVideoError(true);
            toast.error('Video not found, editor will not work for this page', {
              position: 'top-right',
            });
          }
        }
      });
      setPlayer(newPlayer);
    };
  };

  useEffect(() => {
    ytIframeApi();
  },[vid]);


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
    console.log(obj);
    setAiHistory((oldHist)=>[...oldHist,obj]);
  }

  return (
    <div className="container" onKeyUp={jumpToAi}>
            <div className="EditorPageLeft">
              <div className="frame" ref={playerRef}>
                <iframe width="560" height="315" src={"https://www.youtube.com/embed/"+vid}  allowFullScreen></iframe>
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
                <div className="editorBox">
                    <Editor editable={!videoError} initialContent={undefined}/>
                </div>
            </div>
            <Toaster />
        </div>
  )
}

export default editorPage;