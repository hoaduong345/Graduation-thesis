import React, { useState } from "react";
import { Images } from "../../../../Assets/TS/index";

// import { localStorage } from 'localStorage';
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LogoGoogle from "../../../../Assets/PNG/lgG.png";
import LogoApple from "../../../../Assets/PNG/lgApple.png";
import LogoFace from "../../../../Assets/PNG/lgFace.png";
import { schema } from "../../../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import { shipperController } from "../../../../Controllers/ShipperController";
import secureLocalStorage from "react-secure-storage";
export interface FormLoginValues {
   username: string;
   password: string;


}
function LoginShipper() {
   const {
      control,
      handleSubmit,
      register,
      reset,
      formState: { errors, isDirty, isValid },
   } = useForm<FormLoginValues>({
      mode: "all",
      // defaultValues: UserData1
   });
   const onSubmit = async (formData: FormLoginValues) => {
      shipperController.loginShipper(formData).then((res) => {
         toast.success("Đăng nhập thành công !");
         console.log("res:" + res);
         localStorage.removeItem("user");
         const jsonString: string = JSON.stringify(res);
         const jsonObject = JSON.parse(jsonString);
         const username = jsonObject.username;
         console.log(username);
         // const accessToken = jsonObject.accessToken;
         // console.log(accessToken);
         const UserData = {username};
         // const Token = {accessToken}; 
         secureLocalStorage.setItem('shippername', JSON.stringify(UserData));
         // .setItem('admin', UserData);
         setTimeout(() => {
            window.location.href = "/shipping/management";
         }, 2000);
      })
         .catch(() => {
            toast.error("Đăng nhập thất bại !");
         });

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
               <form className="registration-form">
                  <h1 className=" login-a ">ĐƠN VỊ VẬN CHUYỂN</h1>
                  <div className="grid grid-cols-5 gap-8">
                     <div className="col-span-3 " >
                        <div className="flex gap-3 ">
                           <div className="flex flex-col gap-5 max-lg:gap-2">
                              <div className="h-[90px] w-[424px]">
                                 <Controller
                                    name="username"
                                    control={control}
                                    rules={{
                                       required: {
                                          value: true,
                                          message:
                                             "Không để trống",
                                       },
                                       minLength: {
                                          value: 4,
                                          message:
                                             "Ít nhất 4 ký tự",
                                       },
                                       // maxLength: {
                                       //   value: ,
                                       //   message:
                                       //     "Nhiều nhất 25 kí tự",
                                       // },
                                       // validate: { // Kiểm tra email có đúng định dạng không 
                                       //    validEmail: (value) => /^[A-Z0-9._%±]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(value) || "Email không hợp lệ",

                                       // },

                                    }}
                                    render={({ field }) => (
                                       <>
                                          <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                                             Username
                                          </label>
                                          <input
                                             className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                             placeholder="Tên tài khoản"
                                             value={field.value}
                                             onChange={(e) => {
                                                const reg =
                                                   /[!#$%^&]/;
                                                const value =
                                                   e.target
                                                      .value;
                                                field.onChange(
                                                   value.replace(
                                                      reg,
                                                      ""
                                                   )
                                                );
                                             }}
                                             name="username"
                                          />
                                          {errors.username && (
                                             <p className="text-[11px] text-red-700 mt-0">
                                                {
                                                   errors.username
                                                      .message
                                                }
                                             </p>
                                          )}
                                       </>
                                    )}
                                 />
                              </div>
                           </div>

                        </div>

                        <div className="flex gap-3 ">
                           <div className="flex flex-col gap-5 max-lg:gap-2">
                              <div className="h-[90px] w-[424px]">
                                 <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                       required: {
                                          value: true,
                                          message:
                                             "Không để trống",
                                       },
                                       minLength: {
                                          value: 4,
                                          message:
                                             "Ít nhất 4 ký tự",
                                       },
                                       maxLength: {
                                          value: 25,
                                          message:
                                             "Nhiều nhất 25 kí tự",
                                       },
                                    }}
                                    render={({ field }) => (
                                       <>
                                          <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                                             Mật khẩu
                                          </label>
                                          <input
                                             className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                                             placeholder="Mật khẩu"
                                             value={field.value}
                                             type="password"
                                             onChange={(e) => {
                                                const reg =
                                                   /[!@#$%^&]/;
                                                const value =
                                                   e.target
                                                      .value;
                                                field.onChange(
                                                   value.replace(
                                                      reg,
                                                      ""
                                                   )
                                                );
                                             }}
                                             name="password"
                                          />
                                          {errors.password && (
                                             <p className="text-[11px] text-red-700 mt-0">
                                                {
                                                   errors.password
                                                      .message
                                                }
                                             </p>
                                          )}
                                       </>
                                    )}
                                 />
                              </div>
                           </div>

                        </div>

                     </div>
                  </div>

                  <div className="mb-4 text-right">
                     <a
                        href="/forgotpassword"
                        className="text-black-500 hover:no-underline"
                     >
                        Quên mật khẩu?
                     </a>
                  </div>
                  <button onClick={handleSubmit((formData: any) => {
                     onSubmit(formData);
                  })}
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
                  <div className="flex justify-center space-x-3">
                     <button className="flex items-center justify-center w-12 h-12 text-white rounded-full border-2">
                        <img
                           src={LogoGoogle}
                           alt="Google"
                           className="w-6 h-6"
                        />
                     </button>
                     <button className="flex items-center justify-center w-12 h-12 text-white rounded-full border-2">
                        <img src={LogoApple} alt="Apple" className="w-6 h-6" />
                     </button>
                     <button className="flex items-center justify-center w-12 h-12 text-white rounded-full border-2">
                        <img
                           src={LogoFace}
                           alt="Facebook"
                           className="w-6 h-6"
                        />
                     </button>
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
               </form>
            </div>
         </div>
      </body>
   );
}

export default LoginShipper;
