import React from "react";

export default function HeaderIcon({ props, styles }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      fill="currentColor"
      viewBox="0 -960 960 960"
      {...props}
      style={{ transform: "rotateZ(-90deg)", ...styles }}
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm440-80h120v-560H640v560Zm-80 0v-560H200v560h360Zm80 0h120-120Z" />
    </svg>
  );
}
