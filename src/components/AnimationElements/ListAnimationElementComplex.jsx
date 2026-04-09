import React, { useMemo, useState } from "react";
import AnimationElementComplex from "./AnimationElementComplex";

export default function ListAnimationElementComplex({
  filteredList,
  target,
  setSelectedAnim,
}) {
  const defaultTime = 0.4;
  const [activeId, setActiveId] = useState(null);
  const [timesById, setTimesById] = useState({});

  const firstId = useMemo(() => filteredList?.[0]?.id ?? null, [filteredList]);

  const resolvedActiveId = useMemo(() => {
    if (activeId && filteredList.some((a) => a.id === activeId))
      return activeId;
    return firstId;
  }, [activeId, firstId, filteredList]);

  const applyToTarget = (cssValue, timeSeconds) => {
    if (!target?.current) {
      console.warn("No hay elemento de destino para animar");
      return;
    }
    target.current.style.setProperty("--animation", cssValue);
    target.current.style.setProperty("--animation-time", `${timeSeconds}s`);
  };

  const selectAnimation = (animation, timeSeconds) => {
    setSelectedAnim?.({ ...animation, animationTime: timeSeconds });
  };

  return (
    <div className="animations-list">
      {filteredList.length === 0 ? (
        <p>No hay ninguna animacion</p>
      ) : (
        filteredList.map((animation, index) => (
          <AnimationElementComplex
            key={animation.id}
            titleAnimation={animation.id}
            descriptionAnimation={animation.description}
            isActive={
              animation.id === resolvedActiveId ||
              (!resolvedActiveId && index === 0)
            }
            onOpenCopy={() =>
              selectAnimation(animation, timesById[animation.id] ?? defaultTime)
            }
            onActivate={() => {
              setActiveId(animation.id);
              selectAnimation(
                animation,
                timesById[animation.id] ?? defaultTime,
              );
            }}
            time={timesById[animation.id] ?? defaultTime}
            onTimeChange={(newTime) => {
              setTimesById((prev) => ({ ...prev, [animation.id]: newTime }));
              if (animation.id === resolvedActiveId) {
                applyToTarget(animation.cssValue, newTime);
              }
              if (animation.id === resolvedActiveId) {
                selectAnimation(animation, newTime);
              }
            }}
            onApply={() => {
              const timeSeconds = timesById[animation.id] ?? defaultTime;
              setActiveId(animation.id);
              applyToTarget(animation.cssValue, timeSeconds);
              selectAnimation(animation, timeSeconds);
            }}
          />
        ))
      )}
    </div>
  );
}
