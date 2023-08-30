import React from "react";
import { ButtonSuggest } from "../SitebarFilter";

type Props = {
  btnSug: ButtonSuggest;
};

const ButtonSuggestt = (props: Props) => {
  return (
    <>
      {}
      <button
        type="button"
        className="transition duration-200 hover:ease-in bg-[#F2F2F2] hover:bg-[#EA4B48] focus:outline-none  font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 hover:text-[#FFFFFF]"
      >
        {props.btnSug.name}
      </button>
    </>
  );
};

export default ButtonSuggestt;
