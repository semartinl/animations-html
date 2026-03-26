import React from "react";

export default function PlayIcon({ props, styles }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 640"
      {...props}
      style={styles}
      fill="currentColor"
    >
      <path d="M187.2 100.9c-12.4-6.8-27.4-6.5-39.6.7-12.2 7.2-19.6 20.3-19.6 34.4v368c0 14.1 7.5 27.2 19.6 34.4 12.1 7.2 27.2 7.5 39.6.7l336-184c12.8-7 20.8-20.5 20.8-35.1 0-14.6-8-28.1-20.8-35.1l-336-184z" />
    </svg>
  );
}
