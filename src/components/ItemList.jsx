import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ytImageUrl } from "../utils/ytImageUrl";
import { Link } from "react-router-dom";
import { createFolder } from "../api/createFolder";
import { createNote } from "../api/createNote";
import { deleteNote } from "../api/deleteNote";
import { deleteFolder } from "../api/deleteFolder";
import ContextMenu from "./ContextMenu";

const ItemList = ({ notes, folders, parent, loading, toast, refetch }) => {
    const navigate = useNavigate();
    const newFolderInputRef = useRef();
    const [newNoteValue, setNewNoteValue] = useState("");
    const [newFolderValue, setNewFolderValue] = useState("");
    const [createFolderBtn, setCreateFolderBtn] = useState(false);
    const initialContextMenu = {
        show: false,
        x: 0,
        y: 0,
        isFolder: false,
        id: undefined
    };
    const [contextMenu, setContextMenu] = useState(initialContextMenu);

    useEffect(() => {
        if (createFolderBtn) {
            newFolderInputRef.current.focus();
        }
    }, [createFolderBtn]);
    
    const handleContextMenu = (e, isFolder, id) => {
        e.preventDefault();
        const { pageX, pageY } = e;
        setContextMenu({
            show: true,
            x: pageX,
            y: pageY,
            isFolder: isFolder,
            id: id
        });
    };

    const closeContextMenu = () => {
        setContextMenu(initialContextMenu);
    };

    const handleNewNote = () => {
        if (newNoteValue.trim() === ""){
            toast.error("Enter a valid url", {
                position: "top-right",
            });
            return;
        }
        let url;
        try {
            url = new URL(newNoteValue);
        } catch (error) {
            toast.error("Enter a valid url", {
                position: "top-right",
            });
            return;
        }
        if (url.hostname !== "www.youtube.com") {
            toast.error("Enter a valid youtube url", {
                position: "top-right",
            });
            return;
        }
        const videoId = url.searchParams.get("v");
        if (!videoId) {
            toast.error("Enter a valid youtube video url", {
                position: "top-right",
            });
            return;
        }
        createNote(parent, videoId).then((res) => {
            notes.push(res.note);
            navigate(`/editor/${res.note.noteId._id}`); 
        }).catch((err) => {
            if(err.message === "Invalid token"){
                navigate("/login");
                return;
            }
            toast.error(err.message, {
                position: "top-right",
            });
        });

    };

    const handleDelete = (id, isFolder) => {
        if(isFolder){
            deleteFolder(id).then((res) => {
                refetch(parent);
                toast.success("Folder deleted successfully", {
                    position: "top-right",
                });
            }).catch((err) => {
                if(err.message === "Invalid token"){
                    navigate("/login");
                    return;
                }
                toast.error(err.message, {
                    position: "top-right",
                });
            });
        }else{
            deleteNote(id).then((res) => {
                refetch(parent);
                toast.success("Note deleted successfully", {
                    position: "top-right",
                });
            }).catch((err) => {
                if(err.message === "Invalid token"){
                    navigate("/login");
                    return;
                }
                toast.error(err.message, {
                    position: "top-right",
                });
            });
        }
    };

    const handleNewFolderName = (e) => {
        if(e.key === "Escape"){
            setCreateFolderBtn(false);
            return;
        }
        if (e.key === "Enter") {
            if(newFolderValue.trim() === "") return;
            for(let folder of folders){
                if(folder.folderId.name === newFolderValue.trim()){
                    toast.error("Folder with same name already exists", {
                        position: "top-right",
                    });
                    return;
                }
            }
            createFolder(parent, newFolderValue.trim())
                .then((res) => {
                    folders.push(res.folder);
                    setCreateFolderBtn(false);
                })
                .catch((err) => {
                    if(err.message === "Invalid token"){
                        navigate("/login");
                        return;
                    }
                    toast.error(err.message, {
                        position: "top-right",
                    })
                });
        }
    };

    return (
        <>
            <div className="createBtns">
                <input
                    type="text"
                    value={newNoteValue}
                    disabled={loading}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleNewNote();
                        }
                    }}
                    onChange={(e) => setNewNoteValue(e.target.value)}
                    placeholder="enter youtube video url"
                />
                <button
                    disabled={loading}
                    onClick={handleNewNote}
                    >Create Note</button>
                <button
                    disabled={loading}
                    onClick={() => {
                        setCreateFolderBtn(true);
                    }}
                >
                    Create Folder
                </button>
            </div>
            <div className="itemList">
                {createFolderBtn && (
                    <div className="newFolder">
                        <img
                            src="/folder-icon.webp"
                        />
                        <input
                            type="text"
                            value={newFolderValue}
                            ref={newFolderInputRef}
                            onChange={(e) => {
                                setNewFolderValue(e.target.value);
                            }}
                            onKeyDown={handleNewFolderName}
                            placeholder="enter folder name"
                        />
                    </div>
                )}
                {folders?.length > 0 &&
                    folders.map((folder) => {
                        return (
                            <Link
                                to={`/home/folder/${folder.folderId._id}`}
                                className="item"
                                key={folder.folderId._id}
                                onContextMenu={(e)=>{handleContextMenu(e, true, folder.folderId._id)}}
                            >
                                <img
                                    src="/folder-icon.webp"
                                    alt=""
                                />
                                <div>{folder.folderId.name}</div>
                            </Link>
                        );
                    })}
                {notes?.length > 0 &&
                    notes.map((note) => {
                        return (
                            <Link
                                to={`/editor/${note.noteId._id}`}
                                className="item"
                                key={note.noteId._id}
                                onContextMenu={(e)=>{handleContextMenu(e, false, note.noteId._id)}}
                            >
                                <img
                                    src={ytImageUrl(note.noteId.videoId)}
                                    alt="thumbnail"
                                    key={note.noteId._id}
                                />
                            </Link>
                        );
                    })}
                {!createFolderBtn &&
                    notes?.length == 0 &&
                    folders?.length == 0 && (
                        <div className="msg">
                            <img src="/empty-folder.webp" />
                            <div>
                                Folder is empty create a note now by clicking on
                                create note button
                            </div>
                        </div>
                    )}
            </div>
            {contextMenu.show && <ContextMenu x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu} isFolder={contextMenu.isFolder} id={contextMenu.id} handleDelete={handleDelete}/>}
        </>
    );
};

export default ItemList;
