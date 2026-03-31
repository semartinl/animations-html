import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import useHtmlElements from "../hooks/useHtmlElements";
import Playground from "../components/Playground";

export default function PostNewAnimation() {
  const { selectedList } = useHtmlElements({ element: "popup" });
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
