import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import LogoWeb from "../../Assets/TSX/LogoWeb";

import "./ChangePassword.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LogoGoogle from "../../Assets/PNG/lgG.png";
import LogoApple from "../../Assets/PNG/lgApple.png";
import LogoFace from "../../Assets/PNG/lgFace.png";
import { schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import * as yup from 'yup';
function ChangePassword() {

    // const history = useHistory();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validationSchema = yup.object().shape({
        newpassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu mới'),

        confirmpassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu'),
    });

    const changePassword = () => {
        // Đổi mật khẩu ở đây
        // Sau khi đổi, đưa người dùng về trang đăng nhập hoặc trang chính
        // history.push('/');
    };

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = handleSubmit(async (data) => {

    });

    return (
        <body className='login-bg flex'>
            <div className='h-1083px w-963px p-4 relative'>
                <img src={Images.bgRegisterIcon}
                    alt="bgRegisterIcon"
                    width={"924px"}
                    height={"1083px"} />
                <div className="absolute inset-0 flex justify-center items-center ">
                    <Link to="/">
                        <img src={Images.logoSlogan}
                            alt="logo"
                            width={"90%"}
                            height={"90%"} />
                    </Link>
                </div>
            </div>
            <div className='w-1/2 flex justify-center items-center min-h-screen bg-white'>
                <div className='w-[424px]'>

                    <form onSubmit={onSubmit} className="registration-form">
                        <h1 className=' login-a '>ĐỔI MẬT KHẨU</h1>
                        <div className='mb-4'>
                            <input
                                type="password"
                                value={password}
                                className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                                placeholder="Nhập mật khẩu mới"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.newpassword && (
                                <span className="text-red-500 text-sm">
                                    {errors.newpassword.message}
                                </span>
                            )}
                        </div>

                        <div className='mb-4'>
                            <input
                                type="password"
                                value={confirmPassword}
                                className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                                placeholder="Nhập mật khẩu mới"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmpassword && (
                                <span className="text-red-500 text-sm">
                                    {errors.confirmpassword.message}
                                </span>
                            )}
                        </div>
                        <button onClick={changePassword} className="w-[424px] h-[49.44px] bg-[#00B207] text-white py-2 rounded-md transition duration-300 mt-[25px]">GỬI</button>
                        <div className='flex items-center my-4'>
                            <div className='grow h-px bg-slate-300'></div>
                            <div className='mx-2 text-white-500'>Hoặc</div>
                            <div className='grow h-px bg-slate-300'></div>
                        </div>
                        <div className='flex justify-center space-x-3'>
                            <button className='flex items-center justify-center w-12 h-12 text-white rounded-full border-2' >
                                <img src={LogoGoogle} alt='Google' className='w-6 h-6' />
                            </button>
                            <button className='flex items-center justify-center w-12 h-12 text-white rounded-full border-2'>
                                <img src={LogoApple} alt='Apple' className='w-6 h-6' />
                            </button>
                            <button className='flex items-center justify-center w-12 h-12 text-white rounded-full border-2'>
                                <img src={LogoFace} alt='Facebook' className='w-6 h-6' />
                            </button>
                        </div>
                        <div className='mt-6 text-center'>
                            <span className='text-gray-600'>Bạn đã có tài khoản Buyzzle? </span>
                            <a href='#' className='text-black-500 hover:underline font-bold'>
                                Đăng nhập
                            </a>
                        </div>
                    </form>
                </div>



            </div>
        </body>
    );
}

export default ChangePassword;