import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import LogoWeb from "../../Assets/TSX/LogoWeb";

import "./forgotpassword.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LogoGoogle from "../../Assets/PNG/lgG.png";
import LogoApple from "../../Assets/PNG/lgApple.png";
import LogoFace from "../../Assets/PNG/lgFace.png";
import { schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import * as yup from 'yup';
function Forgotpassword() {
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        // ...các trường xác thực khác nếu có
    });

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            // Gọi API để lấy đường dẫn từ server
            const response = await fetch('/api/forgotPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),
            });

            if (response.ok) {
                const url = await response.text();
                // Điều hướng người dùng đến đường dẫn đã trả về từ server
                navigate(url); // Sử dụng navigate thay vì history.push
            } else {
                // Xử lý lỗi nếu cần
                console.error('Lỗi khi gửi email:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi gửi email:', error);
        }
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
                        <h1 className=' login-a '>QUÊN MẬT KHẨU</h1>
                        <div className='mb-4'>
                            <label htmlFor='email' className='login-a4 font-sans'>
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                // value={formData.email}
                                className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-sm">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <button type="submit" className="w-[424px] h-[49.44px] bg-[#00B207] text-white py-2 rounded-md transition duration-300 mt-[25px]">GỬI</button>
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

export default Forgotpassword;