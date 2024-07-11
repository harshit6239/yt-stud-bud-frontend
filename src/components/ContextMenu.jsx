import React from 'react'
import { useOnClickOutside } from 'usehooks-ts'

const ContextMenu = ({x,y,closeContextMenu,isFolder,id,handleDelete}) => {
  const menuRef = React.useRef();
  useOnClickOutside(menuRef, closeContextMenu);

//   const handleDelete = () => {
//     console.log('delete',id);
//     closeContextMenu();
//   }

  return (
    <div className='contextMenu' ref={menuRef} style={{top:`${y}px`, left:`${x}px`}}>
        <div className='contextMenuItem' onClick={()=>{handleDelete(id,isFolder)}}>Delete</div>
    </div>
  )
}

export default ContextMenu