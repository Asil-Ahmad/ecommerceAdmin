import JoditEditor from "jodit-react";

const TextEditor = ({ editor, content, setContent }) => {
  const handleContentChange = (newContent) => {
    // Strip HTML tags from the content
    const plainText = newContent.replace(/<p>(\s|(&nbsp))*<\/p>/gm); // Removes all HTML tags
    setContent(plainText);
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      onChange={handleContentChange} // Use the sanitized plain text
    />
  );
};

export default TextEditor;
