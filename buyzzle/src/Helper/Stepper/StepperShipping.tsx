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
               status >= 3 && status != null ? `step-primary` : ``
            } `}
         >
            <div className="flex gap-36 items-center">
               <p
                  className={` ${
                     status >= 3 && status != null
                        ? `inherit`
                        : `text-[#9c9c9c]`
                  }`}
               >
                  Đã nhận Đơn Hàng
               </p>
               <button
                  onClick={() => comfirm(3)}
                  className={`justify-center gap-1 items-center text-sm font-bold text-white
                  rounded-md py-1 px-2 flex
                     transition duration-150 bg-[#00B207] cursor-pointer
                     max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs
                     ${status >= 3 ? `hidden` : ``}
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
         <li
            className={`step ${
               status >= 4 && status != null ? `step-primary` : ``
            } `}
         >
            <div className="flex gap-36 items-center">
               <p
                  className={` ${
                     status >= 3 && status != null
                        ? `inherit`
                        : `text-[#9c9c9c]`
                  }`}
               >
                  Đang giao hàng
               </p>
               <button
                  onClick={() => comfirm(4)}
                  className={`justify-center gap-1 items-center text-sm font-bold text-white
                  rounded-md py-1 px-2 flex
                     transition duration-150 bg-[#00B207] cursor-pointer
                     max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs
                     ${status == 3 ? `` : `hidden`}
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
         <li
            className={`step ${
               status == 5 && status != null ? `step-primary` : ``
            } `}
         >
            <div className="flex gap-36 items-center">
               <p
                  className={` ${
                     status == 5 && status != null
                        ? `inherit`
                        : `text-[#9c9c9c]`
                  }`}
               >
                  Giao hàng thành công
               </p>
               <button
                  onClick={() => comfirm(5)}
                  className={`justify-center gap-1 items-center text-sm font-bold text-white
                  rounded-md py-1 px-2 flex
                     transition duration-150 bg-[#00B207] cursor-pointer
                     max-[1105px]:px-[80px] max-lg:px-[60px] max-lg:text-sm max-[850px]:px-[45px] max-[850px]:text-xs
                     ${status == 4 ? `` : `hidden`}
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
      </ul>
   );
}

export default StepperAdmin;
