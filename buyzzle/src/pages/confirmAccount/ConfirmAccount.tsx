import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import "./ConfirmAccount.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import LogoGoogle from "../../Assets/PNG/lgG.png";
// import LogoApple from "../../Assets/PNG/lgApple.png";
import bg from "../../Assets/PNG/NewProject.png";


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/rules";

function ConfirmAccount() {
  const SignInSchema = schema.omit([
    "category",
    "color",
    "details",
    "image",
    "price",
    "size",
    "quantity",


  ]);
  const { handleSubmit, register, formState: { errors } } = useForm({
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
    try {
      console.log("checker", data);
      const response = await axios.post(API, data);
      console.log("Them thanh cong", data);
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }

  });







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


          <h2>Email Verified successfully</h2>
          <div className='mt-6 text-center'>
            <span className='text-gray-600'>Bạn đã có tài khoản Buyzzle? </span>
            <a href='#' className='text-black-500 hover:underline font-bold'>
              Đăng nhập
            </a>
          </div>

        </div>



      </div>
    </body>

  );
};

export default ConfirmAccount;