import React from 'react'
import { Images } from "../../Assets/TS/index";
import "./Register.css";
import { Link } from "react-router-dom";
function Register() {
  return (
    <body className='register-bg flex'>
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
      <div className='registerform-bg w-1/2 p-4'>

      </div>
    </body>
  );
}

export default Register;