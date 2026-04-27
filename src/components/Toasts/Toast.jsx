import React, { useEffect, useRef } from "react";
import styles from "@/styles/toasts.module.css";

export default function Toast({
  children,
  description,
  type,
  time = 3000,
  animation = "slideDown",
  animationTime = 0.3,
  onClose,
}) {
  const toastRef = useRef(null);

  const handleEliminate = () => {
    onClose?.();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, time);

    return () => clearTimeout(timer);
  }, [time, onClose]);

  useEffect(() => {
    if (!toastRef.current) return;
    toastRef.current.style.setProperty("--animation", animation);
    toastRef.current.style.setProperty("--animation-time", `${animationTime}s`);
  }, [animation, animationTime]);

  return (
    <div ref={toastRef} id="toast" className={`${styles.toast} ${type}`}>
      {children}
      <span className="description">{description}</span>
      <button
        onClick={handleEliminate}
        className={`${styles.close}`}
        popoverTarget="toast"
      >
        &times;
      </button>
    </div>
  );
}
