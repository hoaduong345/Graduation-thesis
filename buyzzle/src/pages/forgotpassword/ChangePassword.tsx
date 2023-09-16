import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import LogoWeb from "../../Assets/TSX/LogoWeb";

import "./ChangePassword.css";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import LogoGoogle from "../../Assets/PNG/lgG.png";
import LogoApple from "../../Assets/PNG/lgApple.png";
import LogoFace from "../../Assets/PNG/lgFace.png";
import { schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import * as yup from 'yup';
function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    // const history = useHistory();
    const [newPassword, setPassword] = useState('');
    const [confirmNewPassword, setConfirmPassword] = useState('');
    const params = useParams();
    const validationSchema = yup.object().shape({
        newPassword: yup
            .string()
            .required('Vui lòng nhập mật khẩu mới'),

        confirmNewPassword: yup
            .string()
            .required('Vui lòng nhập lại mật khẩu'),
    });




    const { handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        const API = `http://localhost:5000/buyzzle/auth/resetpassword/${params.token}`;
        try {
            console.log("checker", data);
            await axios.post(API, data);
            console.log('Đổi mật khẩu thành công', data);
            window.location.href = "/login";
            // setLoggedInUsername(data.email);
        } catch (error) {
            console.error(error);
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
                        <h1 className=' login-a '>ĐỔI MẬT KHẨU</h1>
                        <div className='mb-4'>
                            <div className='relative flex '>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={newPassword}
                                    name="newPassword"
                                    className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                                    placeholder="Nhập mật khẩu mới"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type='button'
                                    className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500'
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 cursor-pointer'
                                            viewBox='0 0 16 16'
                                            fill='currentColor'
                                        >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 cursor-pointer'
                                            viewBox='0 0 16 16'
                                            fill='currentColor'
                                        >
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    )}
                                </button>

                            </div>
                            {errors.newPassword && (
                                <span className="text-red-500 text-sm">
                                    {errors.newPassword.message}
                                </span>
                            )}
                        </div>

                        <div className='mb-4'>
                            <div className='relative flex '>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmNewPassword}
                                    className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                                    placeholder="Xác nhận mật khẩu"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <button
                                    type='button'
                                    className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500'
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 cursor-pointer'
                                            viewBox='0 0 16 16'
                                            fill='currentColor'
                                        >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5 cursor-pointer'
                                            viewBox='0 0 16 16'
                                            fill='currentColor'
                                        >
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    )}
                                </button>

                            </div>
                            {errors.confirmNewPassword && (
                                <span className="text-red-500 text-sm">
                                    {errors.confirmNewPassword.message}
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

export default ChangePassword;