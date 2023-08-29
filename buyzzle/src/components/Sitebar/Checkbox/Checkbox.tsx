import React from "react";
import { CheckboxCategory } from "../SitebarFilter";

export default function Checkbox(props: CheckboxCategory) {
  return (
    <>
      <div className="flex items-center mr-4 mt-4 justify-start gap-3">
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
      </div>
    </>
  );
}
