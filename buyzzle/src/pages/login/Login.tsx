import { useState } from "react";
import { Images } from "../../assets/TS/index";
// import { localStorage } from 'localStorage';
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
// import LogoApple from "../../assets/PNG/lgApple.png";
// import LogoFace from "../../assets/PNG/lgFace.png";
// import LogoGoogle from "../../assets/PNG/lgG.png";
import { GoogleOAuthProvider, useGoogleLogin, GoogleLogin } from "@react-oauth/google";

import "./Login.css";
import MyCustomButton from "../../helper/Dialog/MyCustomButton";


export type LoginFormGoogle = {
  email: string;
  name: string;
  username: string;
};

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),

    password: yup.string().required("Vui lòng nhập mật khẩu"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const API = "http://localhost:5000/buyzzle/auth/login";

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("checker", data);
      const response = await axios.post(API, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Login successfully");
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 5000,
        });

        if (
          response.headers["content-type"] === "application/json; charset=utf-8"
        ) {
          const jsonString: string = JSON.stringify(response.data);
          const jsonObject = JSON.parse(jsonString);
          // console.log("aaaaaaaaaa"+response)
          // Bây giờ bạn có thể truy cập các giá trị trong jsonObject
          // console.log(response);
          // Truy cập các giá trị trong jsonObject

          const username = jsonObject.username;
          const accessToken = jsonObject.accessToken;
          console.log(accessToken);
          const UserData = { username };
          const Token = { accessToken };
          localStorage.setItem("idUser", JSON.stringify(jsonObject.id));
          localStorage.setItem("user", JSON.stringify(UserData));
          localStorage.setItem("accessToken", JSON.stringify(Token));
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          console.error("Response không phải là JSON.");
        }
      } else {
        console.log("Login Failed!");
        toast.warning("Login failed", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      // console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        console.log(responseData);
        // Kiểm tra xem trong dữ liệu phản hồi có thuộc tính 'error' không
        if (responseData) {
          //   const errorMessage = responseData.error.password;
          console.log(`Lỗi1:1 ${responseData}`);
          toast.warning(responseData, {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          console.log("Lỗi không xác định từ server");
        }
      } else {
        console.error("Lỗi gửi yêu cầu không thành công", error);
      }
    }
  });
  const CustomGoogleLogin = () => {
    const callAPI = async (data: LoginFormGoogle) => {
      localStorage.setItem("user", JSON.stringify(data));
      const API = 'http://localhost:5000/buyzzle/oauth/'
      const API2 = 'http://localhost:5000/buyzzle/oauth/savecookies'
      const response = axios.post(API, data)
      console.log("🚀 ~ file: Login.tsx:126 ~ callAPI ~ response:", response)
      setTimeout(() => {
        callAPI2(data);
      }, 1500);
      const callAPI2 = async (data: LoginFormGoogle) => {

        const response1 = axios.post(API2, data, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        })
        console.log("🚀 ~ file: Login.tsx:126 ~ callAPI ~ response:", response1)
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      if ((await response).status === 200) {
        console.log("Login successfully");
        toast.success("Đăng nhập thành công", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
    const handleSuccess = (credentialResponse: any) => {
      if (credentialResponse && credentialResponse.credential) {
        const decoded = jwtDecode<LoginFormGoogle>(credentialResponse.credential);

        const data = {
          email: decoded.email,
          name: decoded.name,
          username: (decoded.email).split('.')[0].trim(),
        }
        console.log("🚀 ~ file: Login.tsx:138 ~ handleSuccess ~ data:", data)
        callAPI(data);

      } else {
        console.log('Credential or access_token is undefined');
      }
    };

    const handleError = () => {
      console.log('Login Failed');
      // Your custom error handling logic here
    };

    return (
      <div>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          width="400"
          size="large"
        // type="icon"
        />
      </div>
    );
  };
  return (
    <body className="login-bg flex">
      <div className="h-1083px w-963px p-4 relative">
        <img
          src={Images.bgRegisterIcon}
          alt="bgRegisterIcon"
          width={"924px"}
          height={"1083px"}
        />
        <div className="absolute inset-0 flex justify-center items-center ">
          <Link to="/">
            <img
              src={Images.logoSlogan}
              alt="logo"
              width={"90%"}
              height={"90%"}
            />
          </Link>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center min-h-screen bg-white">
        <div className="w-[424px]">
          <form onSubmit={onSubmit} className="registration-form">
            <h1 className=" login-a ">ĐĂNG NHẬP</h1>
            <div className="mb-4">
              <label htmlFor="email" className="login-a4 font-sans">
                Email
              </label>
              <input
                type="text"
                id="email"
                // value={formData.email}
                className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="login-a4 font-sans">
                Mật khẩu
              </label>
              <div className="relative flex ">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  // value={formData.password}
                  className="w-full h-[46px] p-2 font-sans login-a4 focus:outline-none focus:ring focus:ring-[#FFAAAF] login-input login-a4"
                  placeholder="Mật khẩu"
                  {...register("password")}
                />

                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 cursor-pointer"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 cursor-pointer"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mb-4 text-right">
              <a
                href="/forgotpassword"
                className="text-black-500 hover:no-underline"
              >
                Quên mật khẩu?
              </a>
            </div>
            <button
              type="submit"
              className="w-[424px] h-[49.44px] bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mt-[25px]"
            >
              Đăng Nhập
            </button>
            <div className="flex items-center my-4">
              <div className="grow h-px bg-slate-300"></div>
              <div className="mx-2 text-white-500">Hoặc</div>
              <div className="grow h-px bg-slate-300"></div>
            </div>



          </form>
          {/* <div class="grid justify-items-center ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
  <div>06</div>
</div> */}
          <div className="grid justify-items-center">
            <GoogleOAuthProvider clientId="447170837696-uqm2gp31ook1fqnas6rfnn2ne2med3la.apps.googleusercontent.com" >


              <div><CustomGoogleLogin /></div>
            </GoogleOAuthProvider>
          </div>



          <div className="mt-6 text-center">
            <span className="text-gray-600">
              Bạn chưa có tài khoản Buyzzle?{" "}
            </span>
            <a
              href="/register"
              className="text-black-500 hover:underline font-bold"
            >
              Đăng ký
            </a>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
