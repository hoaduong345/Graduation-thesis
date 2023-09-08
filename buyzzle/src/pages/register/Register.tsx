import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import LogoGoogle from "../../Assets/PNG/lgG.png";
// import LogoApple from "../../Assets/PNG/lgApple.png";
import bg from "../../Assets/PNG/NewProject.png";

import { CreateUser } from "../../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/rules";

function Register() {
  const SignInSchema = schema.omit([
    "category",
    "color",
    "details",
    "image",
    "price",
    "size",
    "quantity",
    "confirmPassword",

  ]);
  const { handleSubmit,register, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      username: '',
      password: '',
      // confirmPassword: '',
      email: '',
      // termsAgreement: false,
    },
    resolver: yupResolver(SignInSchema)
  });


  const API = "http://localhost:5000/buyzzle/auth/register";
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("checker", data); 
      const response = await axios.post(API, data);
      if (response.status === 201) {
      console.log("Them thanh cong", data); 
      }
    } catch (error) {
      console.error(error);
    }
    
  });


  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(SignInSchema),
  // });
  // const onSubmit = handleSubmit(async (data) => {
  //   try {
  //     console.log("Huy mat lone",);
  //     const response = await CreateUser(data);
  //     if (response.status === 200) {
  //       console.log("Sign-in successfully");

  //     } else {
  //       console.log("Sign-in Failed!");

  //     }

  //   } catch (error) {
  //     console.error("Error occurred while signing in:", error);

  //   }



  // const [formData, setFormData] = useState({
  //   name: '',
  //   username: '',
  //   password: '',
  //   confirmpassword: '',
  //   email: '',
  //   termsAgreement: false,
  // });
  // //  


  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  // const handleCheckboxChange = () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     termsAgreement: !prevData.termsAgreement, // Đảo ngược giá trị trạng thái
  //   }));
  // };




  return (

    <body className='register-bg flex max-xl:flex-wrap'>
      <div className='relative p-4 max-w-[872px] max-xl:mx-auto max-xl:mb-[20px]'>

        <img src={bg} className='img'
          alt="bgRegisterIcon"
        />

        <div className="absolute inset-0 flex justify-center items-center ">
          <Link to="/">
            <img src={Images.logoSlogan}
              alt="logo"
              width={"90%"}
              height={"90%"} />
          </Link>
        </div>

      </div>

      <div className='w-1/2 flex justify-center items-center min-h-screen bg-white '>
        <div className='w-[424px]'>

          <form onSubmit={onSubmit} className="registration-form">
            <h2>ĐĂNG KÝ</h2>
            <div className='mb-[15px]'>
              <label>Tên:</label>

              <input
                placeholder="Tên đầy đủ"
                type="text"
                // name="nameuser"
                // value={handleSubmit.name}
                // onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("name")}
               
              />
              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className='mb-[15px]'>
              <label>Tên tài khoản:</label>
              <input
                placeholder="Email/ Số điện thoại/ Tên đăng nhập"
                type="text"
                // name="name"
                // value={formData.username}
                // onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("username")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='mb-[15px]'>
              <label>Mật khẩu:</label>

              <input
                placeholder="Mật khẩu"
                type="password"
                // name="password"
                // value={formData.password}
                // onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("password")}
              />

              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* <div className='mb-[15px]'>
              <label>Xác nhận mật khẩu:</label>
              <input
                placeholder="Nhập lại mật khẩu"
                type="password"
                // name="confirmPassword"
                // value={formData.confirmpassword}
                // onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                // {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div> */}
            <div className='mb-[15px]'>
              <label>Số điện thoại / Email:</label>
              <input
                // name="email"
                type="text"
                placeholder="Số điện thoại hoặc địa chỉ Email"
                // value={formData.email}
                // onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("email")}

              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="termsAgreement"
                // checked={formData.termsAgreement}
                // onChange={handleCheckboxChange}
                className="custom-checkbox"


              />
              <label htmlFor="termsAgreement">Tôi đã đọc và đồng ý với <a href='#'>Điều Khoản</a></label>
            </div>
            <button type="submit"  className="w-[424px] bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mt-[75px]">Đăng ký</button>

            <div className='flex items-center my-4'>
              <div className='grow h-px bg-slate-300'></div>
              <div className='mx-2 text-white-500'>Hoặc</div>
              <div className='grow h-px bg-slate-300'></div>
            </div>
            <div className='flex justify-center space-x-3'>
              <button className='flex items-center justify-center w-12 h-12 text-white rounded-full border-2' >
                <img src={Images.logoGoogle} alt='Google' className='w-6 h-6' />
              </button>
              <button className='flex items-center justify-center w-12 h-12 text-white rounded-full border-2'>
                <img src={Images.logoApple} alt='Apple' className='w-6 h-6' />
              </button>
              <button className='flex items-center justify-center w-12 h-12 text-white rounded-full border-2'>
                <img src={Images.logoFace} alt='Facebook' className='w-6 h-6' />
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
};

export default Register;