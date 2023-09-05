import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import LogoWeb from "../../Assets/TSX/LogoWeb";
import "./Login.css";
import { Link } from "react-router-dom";
import LogoGoogle from "../../Assets/PNG/lgG.png";
import LogoApple from "../../Assets/PNG/lgApple.png";
import LogoFace from "../../Assets/PNG/lgFace.png";
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (isFormSubmitted) {

            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!/^\S+@\S+\.\S+$/.test(formData.username)) {
            newErrors.username = 'Tên tài khoản không hợp lệ.';
            valid = false;
        } else {
            newErrors.username = '';
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(formData.password)) {
            newErrors.password = 'Mật khẩu phải bao gồm ít nhất 8 ký tự, trong đó có ít nhất một chữ cái viết hoa, chữ cái viết thường và một số.';
            valid = false;
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsFormSubmitted(true);

        if (validateForm()) {

            console.log('Form data:', formData);
        } else {

            console.log('Form is invalid.');
        }
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
                    <h1 className='font-sans text-center mb-20 font-bold text-6xl text-pink-300 login-a'>ĐĂNG NHẬP</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-4'>
                            <label htmlFor='username' className='block font-sans mb-1 login-a4'>
                                Tên tài khoản
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full p-2 input focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input"
                                placeholder="Email / Số điện thoại / Tên đăng nhập"
                            />
                            {isFormSubmitted && errors.username && (
                                <p className="text-red-500">{errors.username}</p>
                            )}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='password' className='block font-sans mb-1 login-a4'>
                                Mật khẩu
                            </label>
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 input focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input"
                                    placeholder="Mật khẩu"
                                />
                                {isFormSubmitted && errors.password && (
                                    <p className="text-red-500">{errors.password}</p>
                                )}
                                <button
                                    type='button'
                                    className='absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500'
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5'
                                            viewBox='0 0 16 16'
                                            fill='currentColor'
                                        >
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-5 w-5'
                                            viewBox='0 0 16 16'
                                            fill='currentColor'
                                        >
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                    )}
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
                            <span className='login-a3'>Bạn chưa sử dụng Buyzzle? </span>
                            <a href='#' className='hover:underline font-bold login-a2'>
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