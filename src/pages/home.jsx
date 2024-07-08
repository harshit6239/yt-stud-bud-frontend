import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";
import useItemFetch from '../hooks/useItemFetch';
import ItemList from '../components/ItemList';
import { FaGreaterThan, FaLessThan, FaRedo  } from "react-icons/fa";
import './home.css'

function home() {
  const navigate = useNavigate();
	const { loading, items, error, refetch } = useItemFetch(useParams().folder);
	let currentFolder = useParams().folder;

	useEffect(() => {
		refetch(currentFolder);
	}, [currentFolder]);

	if(!loading && error){
		if(error.message === "Invalid token"){
			navigate('/login');
		}
		else{
			toast.error('error while fetching notes', {
				position: 'top-right',
			});
		}
	}
  
  const goBack = () => {
	if(currentFolder!=undefined){
		navigate(-1);
	}
  }

  const goForward = () => {
	navigate(1);
  }

  return (
    <div className="homePage">
        <div className="allItems">
			<div className="heading">
				{items?.parentName && <h2>{items?.parentName}</h2>}
				<div className="navBtns">
					<button onClick={goBack}><FaLessThan /></button>
					<button onClick={goForward}><FaGreaterThan /></button>
					<button onClick={()=>{refetch(currentFolder)}}><FaRedo /></button>
				</div>
			</div>
			{loading && !error && <div className="loading">loading...</div>}
			{error && error.message!="Folder not found" && !loading && <div className="error">error while fetching notes</div>}
			{error && error.message==="Folder not found" && !loading &&  <div className="error"><img src="/folder-not-found.webp" alt="" /><div>folder not found</div><button onClick={()=>{navigate("/home")}}>Go Home</button></div>}
			{!loading && !error && <ItemList parent={currentFolder} notes={items?.notes} folders={items?.folders} loading={loading} refetch={refetch} toast={toast}/>}
        </div>
		<Toaster />
    </div>
  )
}

export default home