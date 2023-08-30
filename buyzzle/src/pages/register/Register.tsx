import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import "./Register.css";
import { Link } from "react-router-dom";
import LogoGoogle from "../../Assets/PNG/lgG.png";
import LogoApple from "../../Assets/PNG/lgApple.png";
import LogoFace from "../../Assets/PNG/lgFace.png";

function Register() {


  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    contact: '',
    termsAgreement: false,
  });



  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      termsAgreement: !prevData.termsAgreement, // Đảo ngược giá trị trạng thái
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform form submission or validation here
    console.log(formData);
  };
  return (

    <body className='register-bg flex'>
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

          <form onSubmit={handleSubmit} className="registration-form">
            <h2>ĐĂNG KÝ</h2>
            <div>
              <label>Tên:</label>
              <input
                placeholder="Tên đầy đủ"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
              />
            </div>
            <div>
              <label>Tên tài khoản:</label>
              <input
                placeholder="Email/ Số điện thoại/ Tên đăng nhập"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
              />
            </div>
            <div>
              <label>Mật khẩu:</label>

              <input
                placeholder="Mật khẩu"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
              />
            </div>
            <div>
              <label>Xác nhận mật khẩu:</label>
              <input
                placeholder="Nhập lại mật khẩu"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
              />
            </div>
            <div>
              <label>Số điện thoại / Email:</label>
              <input
                placeholder="Số điện thoại hoặc địa chỉ Email"
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className='input hover:border-2 border-[#EA4B48] focus:outline-none focus:ring focus:ring-[#f38482]'
              />
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="termsAgreement"
                checked={formData.termsAgreement}
                onChange={handleCheckboxChange}
                className="custom-checkbox"
              />
              <label htmlFor="termsAgreement">Tôi đã đọc và đồng ý với <a href='#'>Điều Khoản</a></label>
            </div>
            <button type="submit" className="w-[424px] bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mt-[70px]">Đăng ký</button>
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

export default Register;