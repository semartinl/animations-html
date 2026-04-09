import React, { useState } from "react";
import CopyIcon from "../../public/icons/CopyIcon";
import CodeEditor from "./CodeEditor";

export default function CopyPopover({ anim, category, id = "copy-popover" }) {
  const [copyStatus, setCopyStatus] = useState({ type: "", success: false });

  if (!anim) return null;

  const getSnippetsByCategory = (cat) => {
    const isPopup = cat === "popup";
    const isToast = cat === "toast";
    console.log(cat);
    if (isPopup) {
      return {
        htmlSnippet: `<button popovertarget="popup">Eliminar cuenta</button>\n<section id="popup" popover="manual">\n  <h4>¿Seguro que deseas eliminar la cuenta?</h4>\n  <button popovertarget="popup">Cancelar</button>\n  <button>Eliminar</button>\n</section>`,
        cssSnippet: `/* Keyframes */\n${anim.keyframes}\n\n/* Aplicación Popup */\n#popup {\n  --animation: ${anim.cssValue};\n  --animation-time: 0.3s;\n}\n#popup:popover-open {\n  animation: var(--animation) var(--animation-time) ease forwards;\n}\n#popup::backdrop {\n  backdrop-filter: blur(5px);\n}`,
      };
    }

    if (isToast) {
      return {
        htmlSnippet: `<section class="toast-example-list">\n  <div class="toast correct" style="--animation: ${anim.cssValue}; --animation-time: 0.3s;">\n    <!-- Icono -->\n    <svg viewBox="0 0 24 24" aria-hidden="true">\n      <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />\n    </svg>\n\n    <span class="description">Usuario eliminado</span>\n\n    <button class="close" type="button">&times;</button>\n  </div>\n</section>`,
        cssSnippet: `/* Keyframes */\n${anim.keyframes}\n\n/* Aplicación Toast */\n.toast-example-list {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  width: min(420px, calc(100vw - 32px));\n}\n\n.toast {\n  --animation: ${anim.cssValue};\n  --animation-time: 0.3s;\n  animation: var(--animation) var(--animation-time) ease;\n}\n\n/* Opcional: estilos por tipo */\n.toast.correct {\n  /* success */\n}\n.toast.error {\n  /* error */\n}\n.toast.warning {\n  /* warning */\n}\n.toast.info {\n  /* info */\n}`,
      };
    }

    return {
      htmlSnippet: `<div class="dropdown">\n  <button>Menu</button>\n  <div class="menu-content">\n    <p>Opción 1</p>\n  </div>\n</div>`,
      cssSnippet: `/* Keyframes */\n${anim.keyframes}\n\n/* Aplicación */\n.dropdown button:hover + .menu-content {\n  animation: ${anim.cssValue} 0.4s ease-out forwards;\n}`,
    };
  };

  const { htmlSnippet, cssSnippet } = getSnippetsByCategory(category);

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
