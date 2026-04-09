import React, { useState } from "react";
import CopyIcon from "../../public/icons/CopyIcon";
import CodeEditor from "./CodeEditor";

export default function CopyPopover({ anim, category, id = "copy-popover" }) {
  const [copyStatus, setCopyStatus] = useState({ type: "", success: false });

  if (!anim) return null;

  // Formateamos los snippets
  const isPopup = category === "popup";

  const htmlSnippet = isPopup
    ? `<button popovertarget="popup">Eliminar cuenta</button>\n<section id="popup" popover="manual">\n  <h4>¿Seguro que deseas eliminar la cuenta?</h4>\n  <button popovertarget="popup">Cancelar</button>\n  <button>Eliminar</button>\n</section>`
    : `<div class="dropdown">\n  <button>Menu</button>\n  <div class="menu-content">\n    <p>Opción 1</p>\n  </div>\n</div>`;

  const cssSnippet = isPopup
    ? `/* Keyframes */\n${anim.keyframes}\n\n/* Aplicación Popup */\n#popup {\n  --animation: ${anim.cssValue};\n  --animation-time: 0.3s;\n}\n#popup:popover-open {\n  animation: var(--animation) var(--animation-time) ease forwards;\n}\n#popup::backdrop {\n  backdrop-filter: blur(5px);\n}`
    : `/* Keyframes */\n${anim.keyframes}\n\n/* Aplicación */\n.dropdown button:hover + .menu-content {\n  animation: ${anim.cssValue} 0.4s ease-out forwards;\n}`;

  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus({ type, success: true });
      setTimeout(() => setCopyStatus({ type: "", success: false }), 2000);
    } catch (err) {
      console.error("Error al copiar", err);
    }
  };

  return (
    <div popover="auto" id={id} className="code-popover">
      <div className="popover-header">
        <h3>Snippet: {anim.name}</h3>
        {/* Botón de cierre manual opcional (la tecla ESC ya funciona por defecto) */}
        <button
          className="close-icon"
          onClick={() => document.getElementById(id).hidePopover()}
        >
          &times;
        </button>
      </div>

      <div className="popover-content">
        {/* Sección CSS */}
        <div className="code-block">
          <div className="block-header">
            <span>CSS</span>
            <button
              className="popover-copy-btn"
              onClick={() => handleCopy(cssSnippet, "css")}
            >
              {copyStatus.type === "css" ? "¡Copiado!" : <CopyIcon />}
            </button>
          </div>
          <pre>
            <CodeEditor readOnly={true} language="css" code={cssSnippet} />
          </pre>
        </div>

        {/* Sección HTML */}
        <div className="code-block">
          <div className="block-header">
            <span>HTML</span>
            <button
              className="popover-copy-btn"
              onClick={() => handleCopy(htmlSnippet, "html")}
            >
              {copyStatus.type === "html" ? "¡Copiado!" : <CopyIcon />}
            </button>
          </div>
          <pre>
            <CodeEditor readOnly={true} language="html" code={htmlSnippet} />
          </pre>
        </div>
      </div>
    </div>
  );
}
