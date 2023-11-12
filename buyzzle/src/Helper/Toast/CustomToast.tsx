import React from "react";
import { toast } from "react-toastify";
import { Images } from "../../Assets/TS";

export default function CustomToast() {
  console.log("first");
  toast.warn(
    <div>
      <img src={Images.avatar_admin} alt="Custom Toast" />
      <button onClick={() => alert("Button Clicked")}>Custom Button</button>
    </div>,
    {
      position: "bottom-left",
      autoClose: 5000,
      closeButton: true,
    }
  );

  return <></>;
}
