import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Images } from "../../assets/TS/index";
import "./Register.css";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
export interface FormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  phonenumber: string;
}
function Register() {
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      name: "",
      confirmpassword: "",
      email: "",
      password: "",
      phonenumber: "",
      username: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const API = "http://localhost:5000/buyzzle/auth/register";
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(API, data);
      if (response.status === 200) {
        setLoading(false);
        toast.success(
          "Đăng ký thành công - kiểm tra email của bạn để xác minh tài khoản",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
        reset({});
      } else {
        setLoading(true);
        toast.warning("Đăng ký thất bại!", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        if (responseData.error) {
          console.log(`Lỗi2: ${responseData.error}`);
          const errorMessageUsername = responseData.error.username;
          const errorMessageEmail = responseData.error.email;
          const errorMessagePhoneNumber = responseData.error.phonenumber;
          if (errorMessageUsername == "Tên tài khoản đã tồn tại!") {
            toast.warning("Tên tài khoản đã tồn tại!", {
              position: "top-right",
              autoClose: 5000,
            });
          } else if (errorMessageEmail == "Email đã tồn tại") {
            toast.warning("Email đã tồn tại", {
              position: "top-right",
              autoClose: 5000,
            });
          } else if (
            errorMessagePhoneNumber == "Số điện thoại không đúng định dạng!"
          ) {
            toast.warning("Số điện thoại không đúng định dạng!", {
              position: "top-right",
              autoClose: 5000,
            });
          }
        } else {
          console.log("Lỗi không xác định từ server");
        }
      } else {
        console.error("Lỗi gửi yêu cầu không thành công", error);
      }
    }
  });

  return (
    <div className="register-bg flex max-xl:flex-wrap">
      <div className="relative p-4 max-w-[872px] max-xl:mx-auto max-xl:mb-[20px]">
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
      <div className="w-1/2 flex justify-center items-center min-h-screen bg-white ">
        <div className="w-[424px]">
          <form className="registration-form">
            <h2>ĐĂNG KÝ</h2>
            <div className="grid grid-cols-5 gap-8">
              <div className="col-span-3 ">
                <div className="flex gap-3 ">
                  <div className="flex flex-col  max-lg:gap-2">
                    <div className="h-[90px] w-[424px]">
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Không để trống",
                          },
                          minLength: {
                            value: 4,
                            message: "Ít nhất 6 ký tự",
                          },
                          maxLength: {
                            value: 25,
                            message: "Nhiều nhất 25 kí tự",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                              Tên
                            </label>
                            <input
                              className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                              placeholder="Nhập vào tên của bạn"
                              value={field.value}
                              type="text"
                              onChange={(e) => {
                                const reg = /[!@#$%^&]/;
                                const value = e.target.value;
                                field.onChange(value.replace(reg, ""));
                              }}
                              name="name"
                            />
                            {errors.name && (
                              <p className="text-[11px] text-red-700 mt-0">
                                {errors.name.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="h-[90px] w-[424px]">
                      <Controller
                        name="username"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Không để trống",
                          },
                          minLength: {
                            value: 4,
                            message: "Ít nhất 4 ký tự",
                          },
                          maxLength: {
                            value: 25,
                            message: "Nhiều nhất 25 kí tự",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                              Tên tài khoản
                            </label>
                            <input
                              className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                              placeholder="Nhập vào tên tài khoản"
                              value={field.value}
                              type="text"
                              onChange={(e) => {
                                const reg = /[!@#$%^&]/;
                                const value = e.target.value;
                                field.onChange(value.replace(reg, ""));
                              }}
                              name="username"
                            />
                            {errors.username && (
                              <p className="text-[11px] text-red-700 mt-0">
                                {errors.username.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>
                    <div className="h-[90px] w-[424px]">
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Không để trống",
                          },
                          minLength: {
                            value: 6,
                            message: "Ít nhất 6 ký tự",
                          },
                          maxLength: {
                            value: 25,
                            message: "Nhiều nhất 25 kí tự",
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
                              placeholder="Nhập vào mật khẩu"
                              value={field.value}
                              type="password"
                              onChange={(e) => {
                                const reg = /[!@#$%^&]/;
                                const value = e.target.value;
                                field.onChange(value.replace(reg, ""));
                              }}
                              name="password"
                            />
                            {errors.password && (
                              <p className="text-[11px] text-red-700 mt-0">
                                {errors.password.message}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    <div className="h-[90px] w-[424px]">
                      <Controller
                        name="confirmpassword"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Không để trống",
                          },
                          minLength: {
                            value: 6,
                            message: "Ít nhất 6 ký tự",
                          },
                          maxLength: {
                            value: 25,
                            message: "Nhiều nhất 25 kí tự",
                          },
                          validate: (value) =>
                            value === getValues("password") ||
                            "Mật khẩu không khớp",
                        }}
                        render={({ field }) => (
                          <>
                            <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                              Lặp lại mật khẩu
                            </label>
                            <input
                              className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                              placeholder="Nhập vào mật khẩu"
                              value={field.value}
                              type="password"
                              onChange={(e) => {
                                const reg = /[!@#$%^&]/;
                                const value = e.target.value;
                                field.onChange(value.replace(reg, ""));
                              }}
                              name="confirmpassword"
                            />
                            {errors.confirmpassword && (
                              <p className="text-[11px] text-red-700 mt-0">
                                {errors.confirmpassword.message}
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
                        name="email"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Không để trống",
                          },
                          minLength: {
                            value: 4,
                            message: "Ít nhất 4 ký tự",
                          },
                          // maxLength: {
                          //   value: ,
                          //   message:
                          //     "Nhiều nhất 25 kí tự",
                          // },
                          validate: {
                            // Kiểm tra email có đúng định dạng không
                            validEmail: (value) =>
                              /^[A-Z0-9._%±]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(
                                value
                              ) || "Email không hợp lệ",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                              Email
                            </label>
                            <input
                              className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                              placeholder="Nhập vào Email"
                              value={field.value}
                              onChange={(e) => {
                                const reg = /[!#$%^&]/;
                                const value = e.target.value;
                                field.onChange(value.replace(reg, ""));
                              }}
                              name="email"
                            />
                            {errors.email && (
                              <p className="text-[11px] text-red-700 mt-0">
                                {errors.email.message}
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
                        name="phonenumber"
                        control={control}
                        rules={{
                          required: {
                            value: true,
                            message: "Không để trống",
                          },
                          minLength: {
                            value: 10,
                            message: "Ít nhất 10 ký tự",
                          },
                          maxLength: {
                            value: 10,
                            message: "Số điện thoại nhiều nhất 10 kí tự",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <label className="text-sm font-medium max-xl:text-xs max-lg:text-[10px]">
                              Số điện thoại
                            </label>
                            <input
                              className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-0
                                             max-xl:text-xs max-lg:text-[10px] border-[#EA4B48]
                                            `}
                              placeholder="Nhập vào số điện thoại"
                              value={field.value}
                              onChange={(e) => {
                                const reg = /[!#$%^&]/;
                                const value = e.target.value;
                                field.onChange(value.replace(reg, ""));
                              }}
                              name="phonenumber"
                            />
                            {errors.phonenumber && (
                              <p className="text-[11px] text-red-700 mt-0">
                                {errors.phonenumber.message}
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
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="termsAgreement"
                className="custom-checkbox"
                required
              />
              <label htmlFor="termsAgreement">
                Tôi đã đọc và đồng ý với{" "}
                <a className="text-red-600" href="/clause">
                  Điều Khoản
                </a>
              </label>
            </div>
            {!loading ? (
              <button
                onClick={handleSubmit((formData: any) => {
                  onSubmit(formData);
                })}
                type="submit"
                disabled={true}
                className="w-[424px] bg-gray-400 text-white py-2 rounded-md mt-[50px]"
              >
                Đăng ký
              </button>
            ) : (
              <button
                onClick={handleSubmit((formData: any) => {
                  onSubmit(formData);
                })}
                type="submit"
                className="w-[424px] bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mt-[50px]"
              >
                Đăng ký
              </button>
            )}
            <div className="mt-6 text-center">
              <span className="text-gray-600">
                Bạn đã có tài khoản Buyzzle?{" "}
              </span>
              <Link
                to={`/login`}
                className="text-[#7088f2] hover:text-[#4255AA] font-semibold items-start"
              >
                Quay lại trang đăng nhập{" "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
