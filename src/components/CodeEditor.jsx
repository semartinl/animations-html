import Editor from "@monaco-editor/react";
import { useRef } from "react";
export default function CodeEditor({
  code,
  language = "css",
  onChange,
  readOnly = false,
  className = "",
  containerStyle,
}) {
  const editorRef = useRef(null);
  function handleMount(editor, monaco) {
    editorRef.current = editor;

    setTimeout(() => {
      editor.getAction("editor.action.formatDocument").run();
    }, 100);
  }
  return (
    <div
      className={`editor-container ${className}`.trim()}
      style={{
        height: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      <Editor
        height="100%"
        width="100%"
        language={language}
        theme="vs-dark" // Puedes usar "light" o "vs-dark"
        value={code}
        onChange={(e) => onChange(e, editorRef)}
        onMount={handleMount}
        options={{
          readOnly, // Para que sea solo de copia
          minimap: { enabled: false }, // Quitamos el mapa pequeño lateral
          fontSize: 14,
          fontFamily: "'Fira Code', monospace", // Fuente de programador
          domReadOnly: true,
          automaticLayout: true, // Ajusta el tamaño si el contenedor cambia
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
}
