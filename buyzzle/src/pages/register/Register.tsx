import React, { useState } from 'react';
import { Images } from "../../Assets/TS/index";
import "./Register.css";
import { Link } from "react-router-dom";
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
      <div className='h-[900px] w-1/2 p-4 relative'>
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
      <div className='registerform-bg w-1/2 p-4 '>
        <div className='flex justify-center items-center mt-[70px]'>

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
                className='input'
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
                className='input'
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
                className='input'
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
                className='input'
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
                className='input'
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
            <button type="submit" className="mx-auto block mt-[70px]">Đăng ký</button>
          </form>
        </div>
        

      </div>
    </body>
  );
}

export default Register;