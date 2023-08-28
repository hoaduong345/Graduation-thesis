import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import LogoWeb from "../../Assets/LogoWeb";
import "./Login.css";
import { Link } from "react-router-dom";
import LogoGoogle from "../../Assets/PNG/lgG.png";
import LogoApple from "../../Assets/PNG/lgApple.png";
import LogoFace from "../../Assets/PNG/lgFace.png";
function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <body className='login-bg flex'>
            <div className='h-[840px] w-1/2 p-4 relative'>
                <img src={Images.bgRegisterIcon}
                    alt="bgRegisterIcon"
                    width={"100%"}
                    height={"100%"} />
                <div className="absolute inset-0 flex justify-center items-center">
                    <Link to="/">
                        <img src={Images.logoSlogan}
                            alt="logo"
                            width={"90%"}
                            height={"90%"} />
                    </Link>
                </div>
            </div>
            <div className='w-1/2 flex justify-center items-center min-h-screen bg-white'>
                <div className='w-1/2'>
                    <h1 className='font-sans text-center mb-20 font-bold text-6xl text-pink-300 login-a'>Đăng nhập</h1>
                    <form>
                        <div className='mb-4'>
                            <label htmlFor='username' className='block text-sm font-medium mb-1'>
                                Tên tài khoản
                            </label>
                            <input
                                type='username'
                                id='username'
                                className='w-full p-2 border rounded-md'
                                placeholder='Email / Số điện thoại / Tên đăng nhập'
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='password' className='block text-sm font-medium mb-1'>
                                Mật khẩu
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id='password'
                                    className='w-full p-2 border rounded-md'
                                    placeholder='Mật khẩu'
                                />
                                <button
                                    type='button'
                                    className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500'
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? 'Ẩn' : 'Hiển thị'}
                                </button>
                            </div>
                        </div>
                        <div className='mb-4 text-right'>
                            <a href='#' className='text-black-500 hover:no-underline'>
                                Quên mật khẩu?
                            </a>
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300'
                        >
                            Đăng nhập
                        </button>
                        <div className='flex items-center my-4'>
                            <div className='flex-grow h-px bg-white-300'></div>
                            <div className='mx-2 text-white-500'>Hoặc</div>
                            <div className='flex-grow h-px bg-white-300'></div>
                        </div>
                        <div className='flex justify-center space-x-4'>
                            <button className='flex items-center justify-center w-12 h-12 text-white rounded-full'>
                                <img src={LogoGoogle} alt='Google' className='w-6 h-6' />
                            </button>
                            <button className='flex items-center justify-center w-12 h-12  text-white rounded-full'>
                                <img src={LogoApple} alt='Apple' className='w-6 h-6' />
                            </button>
                            <button className='flex items-center justify-center w-12 h-12  text-white rounded-full'>
                                <img src={LogoFace} alt='Facebook' className='w-6 h-6' />
                            </button>
                        </div>
                        <div className='mt-6 text-center'>
                            <span className='text-gray-600'>Bạn chưa sử dụng Buyzzle? </span>
                            <a href='#' className='text-black-500 hover:underline font-bold'>
                                Đăng ký
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default Login;
