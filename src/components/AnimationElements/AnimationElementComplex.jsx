import React, { useEffect, useRef, useState } from "react";
import CopyIcon from "../../../public/icons/CopyIcon";
import PlayIcon from "../../../public/icons/PlayIcon";

export default function AnimationElementComplex({
  animationName,
  targetElement,
  titleAnimation,
  descriptionAnimation,
  isActive = false,
  onOpenCopy,
}) {
  const element = useRef(null);
  const [time, setTime] = useState(0.4);
  function toggleAnimation() {
    if (!targetElement?.current) {
      console.warn("No hay elemento de destino para animar");
      return;
    }
    targetElement.current.style.setProperty("--animation", animationName);
    targetElement.current.style.setProperty("--animation-time", `${time}s`);
    toggleActive();
  }
  function toggleActive() {
    const active = document.querySelector(".animation-element.active");
    if (active !== null && active !== element.current) {
      //Desactivar el activo
      active.classList.remove("active");
      //POnerlo en el establecido
      element.current.classList.add("active");
    }
  }

  return (
    <>
      <div
        ref={element}
        className={`animation-element ${isActive ? "active" : ""}`}
      >
        <div className="animation-header">
          <span className="title">{titleAnimation}</span>
          <span id="description">{descriptionAnimation}</span>
        </div>
        <input
          type="number"
          max={10}
          min={0}
          step={0.1}
          onInput={(e) => setTime(e.target.value)}
          value={time}
          name="time-animation"
          id="time-animation"
        />

        <div className="buttons-animations">
          <button id="copy" popovertarget="copy-popover" onClick={onOpenCopy}>
            <CopyIcon />
          </button>
          <button id="play" onClick={toggleAnimation}>
            <PlayIcon />
          </button>
        </div>
      </div>
    </>
  );
}
