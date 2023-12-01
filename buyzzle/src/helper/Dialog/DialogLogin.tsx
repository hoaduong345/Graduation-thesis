import { ReactNode, useEffect, useRef } from "react";
import { Images } from "../../assets/TS";
import { Link } from "react-router-dom";

type Props = {
    title: ReactNode;
    body: ReactNode;
    onSave: () => void;
    onClose: () => void;
    id: string;
};
export default function DialogLogin(props: Props) {
    const { title, id, body, onClose, onSave } = props;
    
    return (

        <>
            <dialog id={id} className="modal " >
                {/* <div className="bg-white relative flex flex-col w-[640px] p-[60px] max-xl:w-[650px] max-lg:w-[450px] max-lg:p-[30px] rounded-2xl">
                    <div className="flex flex-col max-lg:gap-4">
                        <div className="flex items-center justify-center">
                            <h3 className="font-bold text-3xl max-xl:text-[18px] uppercase text-[#FFAAAF]">
                                {title}
                            </h3>
                        </div>
                        <div className="mt-5">{body}</div>

                        <div className="flex justify-center gap-2 mt-9">
                            <button
                                onClick={() => onClose()}
                                className="py-2 px-14 border-[1px] border-[#EA4B48] text-sm text-[#1A1A1A] rounded"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => onSave()}
                                className="py-2 px-11 border-[1px] text-sm text-[#FCFCFD] rounded bg-[#EA4B48]"
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div> */}


                <div className="flex flex-wrap content-center justify-center bg-gray-200 py-10 bg-white relative flex flex-col w-[1000px] p-[10px]  relative">


                    <div className="flex shadow-md">

                        <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" >
                            <div className="w-[500px] p-[20px]">

                                <h1 className="text-3xl font-semibold">Đăng nhập</h1>
                                <small className="text-gray-400">Xin chào! Vui lòng nhập vào thông tin của bạn</small>
                                {/* <div className="mt-5"></div> */}

                                <div className="mt-4 ">
                                    {body}
                                    {/* <div className="mb-3">
                                        <label className="mb-2 block text-xs font-semibold">Email</label>
                                        <input type="email" placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="mb-2 block text-xs font-semibold">Password</label>
                                        <input type="password" placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                                    </div> */}

                                    <div className="mb-3 flex flex-wrap content-center">
                                        {/* <input id="remember" type="checkbox" className="mr-1 checked:bg-purple-700" /> <label className="mr-auto text-xs font-semibold">Remember for 30 days</label> */}
                                        <a href="/forgotpassword" className="text-xs font-semibold text-[#EA4B48]">Quên mật khẩu?</a>
                                    </div>

                                    <div className="mb-3">
                                        <button className="mb-1.5 block w-full text-center text-white bg-[#EA4B48] hover:bg-[#ab0a07] px-2 py-1.5 rounded-md" onClick={() => onSave()}>Đăng Nhập</button>
                                        <button className=" mb-1.5 flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md">
                                            <img className="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
                                            Sign in with Google
                                        </button>
                                        <button className="flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md" onClick={() => onClose()}>
                                           Hủy
                                        </button>
                                    </div>
                                  
                                </div>


                                <div className="text-center">
                                    <span className="text-xs text-gray-400 font-semibold">Không có tài khoản?</span>
                                    <a href="/register" className="text-xs font-semibold text-[#EA4B48]"> Đăng kí ngay</a>
                                </div>
                            </div>
                        </div>


                        <div className="flex flex-wrap relative p-[15px]" >
                            <img
                                src={Images.bgRegisterIcon}
                                alt="bgRegisterIcon"

                            />
                            <div className="absolute inset-0 flex items-center ">
                                <a className="absolute flex justify-center " href="/">
                                    <img
                                        src={Images.logoSlogan}
                                        alt="logo"
                                        width={"50%"}
                                        height={"50%"}
                                    />
                                </a>
                            </div>
                        </div>

                    </div>



                </div>

            </dialog>
        </>
    );
}
