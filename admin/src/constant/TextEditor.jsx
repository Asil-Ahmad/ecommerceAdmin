import JoditEditor from "jodit-react";

const TextEditor = ({ editor, content, setContent }) => {
  return (
    <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
  );
};

export default TextEditor;
