import React, { useEffect, Fragment, useState } from 'react';
import { Images } from "../../Assets/TS/index";

import "./ConfirmAccount.css";

import axios from "axios";
// import LogoGoogle from "../../Assets/PNG/lgG.png";
// import LogoApple from "../../Assets/PNG/lgApple.png";
import bg from "../../Assets/PNG/NewProject.png";

import { Link, useParams } from "react-router-dom";


function ConfirmAccount() {


  const param = useParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      const url = `http://localhost:5000/buyzzle/auth/${param.id}/verify/${param.token}`;
      try {
       
        await axios.post(url);
        setValidUrl(true);
        // console.log("data", data)
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl()
  }, [param]);

  return (
    <Fragment>
      {validUrl?(<body className='register-bg flex max-xl:flex-wrap'>
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
            <Link to="/login">
              <button className="green_btn">Login</button>
            </Link>
          </div>

        </div>



      </div>
    </body>):(<h1>404 Not Found</h1>)}
    
    </Fragment>
  );
};

export default ConfirmAccount;