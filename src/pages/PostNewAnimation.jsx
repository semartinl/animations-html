import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import useHtmlElements from "../hooks/useHtmlElements";
import Playground from "../components/Playground";

export default function PostNewAnimation() {
  const { selectedList } = useHtmlElements({ element: "dropdown" });
  const [cssValues, setCssValues] = useState("");
  let cssEditor = useRef(null);
  const iframe = useRef(null);
  function createHtml({ html, defaultCss = "", css, js }) {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        *{margin: 0; padding:0; box-sizing:border-box;}
        body{
          display:grid;
          place-content:center;
        }
    ${defaultCss}
    ${css}</style>
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
  function onChangeCssEditor(value, editorRef) {
    setCssValues(value);
    // setTimeout(() => {
    //   editorRef.getAction("editor.action.formatDocument").run();
    // }, 100);
  }
  useEffect(() => {
    const html = createHtml({
      html: selectedList[0].htmlValue,
      defaultCss: selectedList[0].cssValue,
      css: cssValues,
      js: "",
    });
    if (!iframe.current) return;
    iframe.current.srcdoc = html;
  }, [cssValues]);

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
