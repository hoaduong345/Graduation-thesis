import React from "react";
import { CheckboxCategory } from "../SitebarFilter";

export default function Checkbox(props: CheckboxCategory) {
  return (
    <>
      {/* <div className="flex items-center mr-4 mt-4 justify-start gap-3">
        <div className="flex items-center mr-4 mt-4 justify-start gap-3">
          <input
            id="orange-radio"
            type="radio"
            // defaultValue
            name="colored-radio"
            className="w-4 h-4  border-gray-300 accent-[#EA4B48] "
          />

          <p className="text-sm cursor-pointer text-[#1A1A1A] hover:text-[#FFAAAF] max-w-max hover:text-[#FFAAAF] max-w-max">
            {props.title}
          </p>
          <p className="text-sm text-[#808080]">({props.quantity})</p>
        </div>
      </div> */}

      <div className="flex items-center mr-4 mt-4 justify-start ">
        <input
          type="radio"
          name="colored-radio"
          id="orange-radio"
          className="
      appearance-none h-6 w-6 border border-[#CCCCCC] rounded-full 
      checked:bg-[#EA4B48] checked:scale-75
      transition-all duration-200 peer
  "
        />
        <div
          className="h-6 w-6 absolute rounded-full pointer-events-none
  peer-checked:border-[#EA4B48] peer-checked:border-2
  "
        />
        <label className="flex flex-col justify-center px-2 peer-checked:text-[#EA4B48] select-none">
          {props.title}
        </label>
        <p className="text-sm text-[#808080]">({props.quantity})</p>
      </div>
    </>
  );
}
