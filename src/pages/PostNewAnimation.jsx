import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import useHtmlElements from "../hooks/useHtmlElements";
import Playground from "../components/Playground";

export default function PostNewAnimation() {
  const {
    selectedList,
    setSelectedElement,
    selectedElement,
    posiblesElements,
  } = useHtmlElements({ element: "popup" });
  const [cssValues, setCssValues] =
    useState(`@keyframes slideDown { 0% { translate: 0 -100px; } 30% { translate: 0 10px; }
  50% {
    translate: 0 -10px;
  }
  70% {
    translate: 0 10px;
  }
  100% {
    translate: 0 0;
  }
}
`);
  let cssEditor = useRef(null);
  const iframe = useRef(null);
  function createHtml({ html, defaultCss = "", css, js }) {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        :root{
          --primary: #7c5dff;
          --on-primary: #0b0c14;
          --secundary: #3ed6b0;
          --on-secundary: #041410;

          --surface: #0b0c10;
          --surface-light: #0f1119;
          --surface-dark: #07080d;
          --text: #e9ecf4;
          --muted: #9aa3b5;

          --surface-container: hsl(228, 23%, 9%);
          --surface-container-low: hsl(224, 27%, 8%);
          --surface-container-high: hsl(229, 30%, 11%);
          --surface-container-highest: #15192b;
          --on-surface-container: #e9ecf4;
          --on-surface-container-variant: #9aa3b5;
          --primary-container: #1a1f33;
          --on-primary-container: #dcd7ff;

          --secundary-container: #0f1f1c;
          --on-secundary-container: hsl(165, 53%, 28%);

          --success: #23896d;
          --on-success: #e9fff7;
          --success-container: #10201a;
          --on-success-container: #c1f0e0;

          --bg: #0b0c10;
          --panel: #11131b;
          --panel-strong: #131623;
          --border: #1f2230;
          --accent: #7c5dff;
          --accent-2: #3ed6b0;
          --shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          --radius: 16px;
        }

        *{margin: 0; padding:0; box-sizing:border-box;}
        body{
        height: 100%;
          display:grid;
          place-content:center;
        }
                .popup-button {
  appearance: none;
  border: 1px solid color-mix(in srgb, #ef4444 55%, transparent);
  background: color-mix(in srgb, #ef4444 10%, transparent);
  color: var(--text);
  border-radius: 12px;
  padding: 10px 16px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    transform 120ms ease;
}

.popup-button:hover {
  background: color-mix(in srgb, #ef4444 16%, transparent);
  border-color: color-mix(in srgb, #ef4444 70%, transparent);
}


    ${defaultCss}
    ${css}
    </style>
  </head>
  <body>
  <main>
   ${html}
   </main>
  </body>
  <script>${js}</script>
  </html>
  `;
  }
  function onChangeCssEditor(value) {
    setCssValues(value);
    // setTimeout(() => {
    //   editorRef.getAction("editor.action.formatDocument").run();
    // }, 100);
  }
  const updateIframe = () => {
    const html = createHtml({
      html: selectedList[0].htmlValue,
      defaultCss: selectedList[0].cssValue,
      css: cssValues,
      js: "",
    });
    if (!iframe.current) return;
    iframe.current.srcdoc = html;
  };
  useEffect(() => {
    updateIframe();
  }, [cssValues, selectedElement]);

  return (
    <main id="main-playground">
      <div className="hero-section">
        <h2>Publica una animacion unica</h2>
        <p className="hero-subtitle">
          Aporta sin animo de lucro a establecer una biblioteca de codigo
          abierto de animaciones para que exista mas oportunidades de dar a
          conocer nuestro sector{" "}
        </p>
      </div>
      <section className="elements-tab" aria-label="Selector de elementos">
        {posiblesElements.map((element, i) => {
          return (
            <button
              key={i}
              type="button"
              className={
                element === selectedElement
                  ? "elements-tab__button active"
                  : "elements-tab__button"
              }
              aria-pressed={element === selectedElement}
              onClick={() => setSelectedElement(element)}
            >
              {element.charAt(0).toUpperCase() + element.slice(1)}
            </button>
          );
        })}
      </section>
      <section className="workspace">
        <Playground
          elementJson={selectedList[0]}
          currentCss={cssValues}
          setCssValues={setCssValues}
          onPublish={(payload) => {
            console.log("Submit recibido en página:", payload);
          }}
        >
          <iframe id="new-iframe-publication" ref={iframe}></iframe>
        </Playground>

        <section className="editor-panel">
          <div className="panel-header">
            <p>Personaliza el CSS a tu gusto</p>
            <span className="panel-hint">Auto-actualiza la vista previa</span>
          </div>
          <CodeEditor code={cssValues} onChange={onChangeCssEditor} />
        </section>
      </section>
    </main>
  );
}
