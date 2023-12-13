import React from "react";
interface RemoveIMG {
  index: number;
  removeListUrl: (index: number) => void;
}
export default function RemoveIMG(props: RemoveIMG) {
  const { removeListUrl, index } = props;
  return (
    <div onClick={() => removeListUrl(index)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M18 6L6 18"
          stroke="#EA4B48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="#EA4B48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
