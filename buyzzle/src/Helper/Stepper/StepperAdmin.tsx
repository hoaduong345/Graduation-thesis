type handleClick = {
   status: number;
   comfirm: (status: number) => void;
};

function StepperAdmin(props: handleClick) {
   const { comfirm, status } = props;
   return (
      <ul className="steps steps-vertical">
         <li
            className={`step ${
               status >= 1 && status != null ? `step-primary` : ``
            } `}
         >
            {/* step-primary */}
            <div className="flex gap-64 items-center">
               <p
                  className={` ${
                     status >= 1 && status != null
                        ? `inherit`
                        : `text-[#9c9c9c]`
                  }`}
               >
                  Đặt hàng
               </p>
               <button
                  onClick={() => comfirm(1)}
                  className={`justify-center gap-1 items-center text-sm font-bold text-white
                  rounded-md py-1 px-2 flex
                     transition duration-150 bg-[#00B207] cursor-pointer
                     max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs
                     ${status != 0 ? `hidden` : ``}
                     `}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="18"
                     height="18"
                     viewBox="0 0 24 24"
                     fill="none"
                  >
                     <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                     />
                  </svg>
                  <p className="text-xs">Xác nhận</p>
               </button>
            </div>
         </li>
         <li className={`step ${status >= 2 ? `step-primary` : ``} `}>
            <div className="flex gap-[215px] items-center">
               <p className={` ${status >= 2 ? `inherit` : `text-[#9c9c9c]`}`}>
                  Giao cho ĐVVT
               </p>
               <button
                  onClick={() => comfirm(2)}
                  className={`justify-center gap-1 items-center text-sm font-bold text-white
                  rounded-md py-1 px-2 flex
                     transition duration-150 bg-[#00B207] cursor-pointer
                     max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs
                     ${status == 1 ? `` : `hidden`}
                     `}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     width="18"
                     height="18"
                     viewBox="0 0 24 24"
                     fill="none"
                  >
                     <path
                        d="M20 6L9 17L4 12"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                     />
                  </svg>
                  <p className="text-xs">Xác nhận</p>
               </button>
            </div>
         </li>
         <li className={`step ${status >= 4 ? `step-primary` : ``} `}>
            <p className={` ${status >= 4 ? `inherit` : `text-[#9c9c9c]`}`}>
               Đang giao hàng
            </p>
         </li>
         <li className={`step ${status == 5 ? `step-primary` : ``} `}>
            <p className={` ${status == 5 ? `inherit` : `text-[#9c9c9c]`}`}>
               Giao hàng thành công
            </p>
         </li>
      </ul>
   );
}

export default StepperAdmin;
