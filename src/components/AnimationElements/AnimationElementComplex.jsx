import React from "react";
import CopyIcon from "../../../public/icons/CopyIcon";
import PlayIcon from "../../../public/icons/PlayIcon";

export default function AnimationElementComplex({
  titleAnimation,
  descriptionAnimation,
  isActive = false,
  onOpenCopy,
  time,
  onTimeChange,
  onActivate,
  onApply,
}) {
  return (
    <>
      <div
        className={`animation-element ${isActive ? "active" : ""}`}
        onClick={onActivate}
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
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return;
            const parsed = Number.parseFloat(String(raw).replace(",", "."));
            if (!Number.isFinite(parsed)) return;
            onTimeChange?.(parsed);
          }}
          value={time}
          name="time-animation"
          id="time-animation"
        />

        <div className="buttons-animations">
          <button id="copy" popovertarget="copy-popover" onClick={onOpenCopy}>
            <CopyIcon />
          </button>
          <button id="play" onClick={onApply}>
            <PlayIcon />
          </button>
        </div>
      </div>
    </>
  );
}
