import React, { useEffect, useMemo, useState } from "react";
import CodeEditor from "./CodeEditor";
import CopyIcon from "../../public/icons/CopyIcon";
import PublishPopover from "./PublishPopover";
import js from "@eslint/js";

export default function Playground({
  elementJson,
  children,
  onPublish,
  currentCss,
}) {
  // Los estados posibles: 'preview' | 'html' | 'css'
  const [activeTab, setActiveTab] = useState("preview");
  const [copyStatus, setCopyStatus] = useState({ type: "", success: false });
  const publishPopoverId = useMemo(
    () => `publish-popover-${elementJson?.name || "anim"}`,
    [elementJson?.name],
  );
  const copyPlayground = async (type) => {
    let value;
    switch (type) {
      case "html":
        value = elementJson.htmlValue;
        break;
      case "css":
        value = elementJson.cssValue;
        break;
    }
    console.log(value);
    await navigator.clipboard.writeText(value);
    setCopyStatus({ type, success: true });
    setTimeout(() => setCopyStatus({ type: "", success: false }), 2000);
  };

  const openPublishPopover = () => {
    const popover = document.getElementById(publishPopoverId);
    if (popover?.showPopover) {
      popover.showPopover();
    }
  };
  return (
    <div className="playground-window">
      {/* 1. Barra de Navegación de Pestañas */}
      <nav className="tabs-header">
        <div className="tabs-container">
          <button
            className={activeTab === "preview" ? "active" : ""}
            onClick={() => setActiveTab("preview")}
          >
            Resultado
          </button>
          <button
            className={activeTab === "html" ? "active" : ""}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={activeTab === "css" ? "active" : ""}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          <div className="bubble"></div>
          <div className="active-tab bubble"></div>
        </div>
        <div className="buttons-header">
          <button id="publish" onClick={openPublishPopover}>
            Publicar
          </button>
          {activeTab !== "preview" ? (
            <button id="copy" onClick={() => copyPlayground(activeTab)}>
              {copyStatus.success ? "¡Copiado!" : <CopyIcon />}
            </button>
          ) : null}
        </div>
      </nav>

      {/* 2. Área de Contenido Dinámico */}
      <div className="tabs-content">
        <div
          className="preview-container"
          style={{ display: activeTab === "preview" ? "block" : "none" }}
        >
          {children}
        </div>

        {activeTab === "html" && (
          <CodeEditor
            language="html"
            theme="vs-dark"
            code={elementJson.htmlValue}
            readOnly={true}
          />
        )}

        {activeTab === "css" && (
          <CodeEditor
            language="css"
            theme="vs-dark"
            code={elementJson.cssValue}
            readOnly={true}
          />
        )}
      </div>
      <PublishPopover
        id={publishPopoverId}
        elementName={elementJson?.name}
        onSubmit={(payload) =>
          onPublish?.({
            ...payload,
            keyframes: currentCss ?? elementJson?.cssValue ?? "",
          })
        }
      />
    </div>
  );
}
