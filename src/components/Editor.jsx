import { useCreateBlockNote,  } from "@blocknote/react";
import { BlockNoteView,  } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import React from 'react';
import { imageUpload } from "../api/imageUpload";

const Editor = ({onchange, initialContent, editable}) => {

	const editor = useCreateBlockNote(
		{
		  initialContent: initialContent? (JSON.parse(initialContent)) : undefined,
			uploadFile: async (file) => {
				const url = await imageUpload(file);
				return url;
			}
		}
	);

  return (
    <BlockNoteView editor={editor} editable={editable} onChange={()=>{console.log(editor.document)}} />
  )
}

export default Editor;