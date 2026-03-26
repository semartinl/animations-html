import React, { useState } from "react";
import CopyIcon from "../../public/icons/CopyIcon";

export default function CopyPopover({ anim, id = "copy-popover" }) {
  const [copyStatus, setCopyStatus] = useState({ type: "", success: false });

  if (!anim) return null;

  // Formateamos los snippets
  const htmlSnippet = `<div class="dropdown">\n  <button>Menu</button>\n  <div class="menu-content">\n    <p>Opción 1</p>\n  </div>\n</div>`;

  const cssSnippet = `/* Keyframes */\n${anim.keyframes}\n\n/* Aplicación */\n.dropdown button:hover + .menu-content {\n  animation: ${anim.cssValue} 0.4s ease-out forwards;\n}`;

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
    <div popover="auto" id="copy-popover" className="code-popover">
      <div className="popover-header">
        <h3>Snippet: {anim.name}</h3>
        {/* Botón de cierre manual opcional (la tecla ESC ya funciona por defecto) */}
        <button
          className="close-icon"
          onClick={() => document.getElementById("copy-popover").hidePopover()}
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
            <code>{cssSnippet}</code>
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
            <code>{htmlSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
