import { useCreateBlockNote,  } from "@blocknote/react";
import { BlockNoteView,  } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import React from 'react';
import { imageUpload } from "../api/imageUpload";

const Editor = ({onchange, initialContent, editable}) => {

	const save = async (content) => {
		const markdown = await editor.blocksToMarkdownLossy(content);
		onchange(JSON.stringify(content), markdown);
	}

	const editor = useCreateBlockNote(
		{
		  initialContent: initialContent ? JSON.parse(initialContent) : undefined,
			uploadFile: async (file) => {
				const url = await imageUpload(file);
				return url;
			}
		}
	);

  return (
    <BlockNoteView editor={editor} editable={editable} onChange={()=>{save(editor.document)}} />
  )
}

export default Editor;

