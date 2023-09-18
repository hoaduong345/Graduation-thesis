import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import bg from "../../Assets/PNG/NewProject.png";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/rules";

function Register() {
  const [msg, setMsg] = useState("");

  const SignInSchema = schema.omit([
    "category",
    "color",
    "details",
    "image",
    "price",
    "size",
    "quantity",
    

  ]);
  const { handleSubmit,register, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      username: '',
      password: '',
      confirmpassword: '',
      email: '',
      phonenumber: '',
      // termsAgreement: false,
    },
    resolver: yupResolver(SignInSchema)
  });

  
  const API = "http://localhost:5000/buyzzle/auth/register";
  const onSubmit = handleSubmit(async (data) => {
    // const response = await axios.post(API, data);
    //   console.log("server: ", response); 

    try {
      console.log("checker", data); 
      const response = await axios.post(API, data);
      console.log("Them thanh cong", response); 

      if (response.status === 200) {
        console.log("Sign-in successfully");
        toast.success(
          "Sign-in successfully-check your email to verify account",
          {
            position: "top-right",
            autoClose: 5000,

          }
        );
      } else {
        console.log("Sign-in Failed!");
        toast.warning(
          "Sign-in failed",
          {
            position: "top-right",
            autoClose: 5000,

          }
        );
      }
    } catch (error) {
      // console.log("Them that bai", error);
      // console.error(error);
    
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        
        // Kiểm tra xem trong dữ liệu phản hồi có thuộc tính 'error' không
        if (responseData.error) {
          const errorMessage = responseData.error.username;
          // console.log(`Lỗi: ${errorMessage}`);
          toast.warning(
            errorMessage,
            {
              position: "top-right",
              autoClose: 5000,
    
            }
          );
        } else {
          console.log('Lỗi không xác định từ server');
        }
      } else {
        console.error('Lỗi gửi yêu cầu không thành công', error);
       
      }
    }
    
  });


  




  return (

    <div className='register-bg flex max-xl:flex-wrap'>
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
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("password")}
              />

              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className='mb-[15px]'>
              <label>Xác nhận mật khẩu:</label>
              <input
                placeholder="Nhập lại mật khẩu"
                type="password"
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("confirmpassword")}
              />
              {errors.confirmpassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmpassword.message}
                </span>
              )}
            </div>
            <div className='mb-[15px]'>
              <label>Email:</label>
              <input
                type="text"
                placeholder="Địa chỉ Email"
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("email")}

              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='mb-[15px]'>
              <label>Số điện thoại:</label>
              <input
                type="text"
                placeholder="Số điện thoại"
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
                {...register("phonenumber")}

              />
              {errors.phonenumber && (
                <span className="text-red-500 text-xs">
                  {errors.phonenumber.message}
                </span>
              )}
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="termsAgreement"
                className="custom-checkbox"
                required

              />
              <label htmlFor="termsAgreement">Tôi đã đọc và đồng ý với <a href='#'>Điều Khoản</a></label>
            </div>
            <button type="submit"  className="w-[424px] bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mt-[75px]">Đăng ký</button>
            {/* <ToastContainer
              position="top-right"
              // Custom theme for the toast container
              theme="dark"
            /> */}
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
              <Link to={`/login`} className="text-black font-semibold items-start">
            Back to login{" "}
          </Link>
            </div>
          </form>
        </div>



      </div>
    </div>

  );
};

export default Register;