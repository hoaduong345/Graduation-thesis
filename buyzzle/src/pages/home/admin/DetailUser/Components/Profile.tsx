import { Fragment, useState, useEffect } from "react";
import Container from "../../../../../components/container/Container";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { userController } from "../../../../../controllers/UserController";
import { appConfigUser } from "../../../../../configsEnv";
import { storage } from "../../../../../firebase/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import secureLocalStorage from "react-secure-storage";

export type FormValues = {
  username: string;
  name: string;
  email: string;
  sex: string;
  phonenumber: string;
  dateOfBirth: string;
};
export type FormImage = {
  id: number;
  UserImage: string[];
};
export default function UserProfile() {
  const [validUrl, setValidUrl] = useState(false);
  const [CheckImageUrl, setCheckImageUrl] = useState(false);
  const param = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  // const [editUser, setEditUser] = useState<FormValues>();
  const [url, setUrl] = useState<string>("");
  const [urlThen, setUrlThen] = useState<string>("");

  const [id, setId] = useState<string>("11");
  // const id: number | undefined = getID()!;
  const [sex, setSex] = useState<boolean>();

  const {
    control,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "all",
  });

  const getUserData = () => {
    const user = param.username;
    if (user != null) {
      // const userData = JSON.parse(user);
      const username = user;
      console.log("USERNAME1: " + username);
      userController
        .getUserWhereUsername(username)
        .then((res) => {
          return res;
        })
        .then((res) => {
          if (res.dateOfBirth == null) {
            res.dateOfBirth = "dd/mm/yyyy";
          } else {
            res.dateOfBirth = res.dateOfBirth.substring(0, 10);
          }
          reset({
            username: user,
            name: res.name,
            email: res.email,
            // sex: res.sex,
            phonenumber: res.phonenumber,
            dateOfBirth: res.dateOfBirth,
          });
          setSex(res.sex);
          setId(res.id);
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: Detailproducts.tsx:27 ~ .then ~ error:",
            error
          );
        });
    } else {
      console.log("Chua Dang Nhap Dung");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    function CheckLink() {
      const user = secureLocalStorage.getItem("admin");
      if (user != null) {
        setValidUrl(true);
      } else {
        setValidUrl(false);
      }
    }
    CheckLink();
  }, []);
  // const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSex(JSON.parse(event.target.value));
  // };
  return (
    <Container>
      <body className="body-filter container mx-auto">
        <div>
          <div className="grid grid-cols-1 gap-1">
            <div className="mt-9 col-span-3 max-2xl:col-span-1 grid grid-cols-1 gap-1">
              <form
                className="card py-4 px-5 col-span-3 rounded-[6px]
                                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
              >
                <span className="text-[#000] text-2xl font-normal ">
                  Hồ sơ của User
                </span>
                <div className="flex w-[100%] mt-4 justify-between">
                  <div className="w-[48%]">
                    <Controller
                      control={control}
                      name="username"
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor="name"
                            className="text-[#4C4C4C] text-sm font-medium"
                          >
                            Tên đăng nhập
                          </label>
                          {/* input addNameProducts */}
                          <input
                            className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                            ${
                                              !!errors.username
                                                ? "border-[2px] border-red-900"
                                                : "border-[1px] border-[#FFAAAF]"
                                            }`}
                            placeholder="Tên đăng nhập"
                            value={field.value}
                          />
                        </>
                      )}
                    />
                    {/* end input addNameProducts */}
                  </div>
                  <div className="w-[48%]">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor="name"
                            className="text-[#4C4C4C] text-sm font-medium"
                          >
                            Tên người dùng
                          </label>

                          <input
                            className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                                        rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                                       ${
                                                         !!errors.name
                                                           ? "border-[2px] border-red-900"
                                                           : "border-[1px] border-[#FFAAAF]"
                                                       }`}
                            placeholder="Tên người dùng"
                            value={field.value}
                            // {...register("name")}
                          />
                        </>
                      )}
                    />
                    {/* end input addNameProducts */}
                  </div>
                </div>
                <div className="w-[100%] mt-4">
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor="name"
                          className="text-[#4C4C4C] text-sm font-medium"
                        >
                          Email
                        </label>
                        {/* input addNameProducts */}
                        <input
                          className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                                        rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                                       ${
                                                         !!errors.email
                                                           ? "border-[2px] border-red-900"
                                                           : "border-[1px] border-[#FFAAAF]"
                                                       }`}
                          placeholder="Email"
                          value={field.value}
                          // {...register("email")}
                          // onChange={onChangeInput}
                        />
                      </>
                    )}
                  />
                  {/* end input addNameProducts */}
                </div>
                <div className="w-[100%] mt-4 flex justify-between">
                  <div className="w-[48%]">
                    <label
                      htmlFor="name"
                      className="text-[#4C4C4C] text-sm font-medium"
                    >
                      Giới tính
                    </label>
                    <div className="flex w-[100%] mt-6">
                      <div className="flex items-center w-[33%] gap-1">
                        <div>
                          <h3>Nam</h3>
                        </div>
                        <div className="flex items-center justify-start ">
                          <input
                            type="radio"
                            // name="colored-radio"
                            id="orange-radio1"
                            value="true"
                            {...register("sex")}
                            checked={sex === true}
                            // onChange={handleSexChange}
                            className="appearance-none h-6 w-6 border border-[#CCCCCC] rounded-full 
                                            checked:bg-[#EA4B48] checked:scale-75 transition-all duration-200 peer "
                          />
                          <div
                            className="h-6 w-6 absolute rounded-full pointer-events-none
                                            peer-checked:border-[#EA4B48] peer-checked:border-2"
                          />
                        </div>
                      </div>
                      <div className="flex items-center w-[33%] gap-1">
                        <div>
                          <h3>Nữ</h3>
                        </div>
                        <div className="flex items-center justify-start ">
                          <input
                            type="radio"
                            // name="colored-radio"
                            id="orange-radio2"
                            value="false"
                            {...register("sex")}
                            checked={sex === false}
                            // onChange={handleSexChange}
                            className="appearance-none h-6 w-6 border border-[#CCCCCC] rounded-full 
                                            checked:bg-[#EA4B48] checked:scale-75 transition-all duration-200 peer "
                          />
                          <div
                            className="h-6 w-6 absolute rounded-full pointer-events-none
                                            peer-checked:border-[#EA4B48] peer-checked:border-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[48%]">
                    <Controller
                      control={control}
                      name="phonenumber"
                      rules={{
                        required: {
                          value: true,
                          message:
                            "Bạn phải nhập thông tin cho trường dữ liệu này!",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <label
                            htmlFor="name"
                            className="text-[#4C4C4C] text-sm font-medium"
                          >
                            Số điện thoại
                          </label>
                          {/* input addNameProducts */}
                          <input
                            className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                                        rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                                       ${
                                                         !!errors.phonenumber
                                                           ? "border-[2px] border-red-900"
                                                           : "border-[1px] border-[#FFAAAF]"
                                                       }`}
                            placeholder="Số điện thoại"
                            value={field.value}
                            // {...register("phonenumber")}
                            // onChange={onChangeInput}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="w-[100%] mt-4">
                  <Controller
                    control={control}
                    name="dateOfBirth"
                    rules={{
                      required: {
                        value: true,
                        message:
                          "Bạn phải nhập thông tin cho trường dữ liệu này!",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <label
                          htmlFor="name"
                          className="text-[#4C4C4C] text-sm font-medium"
                        >
                          Ngày sinh
                        </label>
                        <input
                          className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2`}
                          type="date"
                          value={field.value}
                        />
                      </>
                    )}
                  />
                </div>
              </form>

              {/* Form */}
            </div>
          </div>
        </div>
      </body>
    </Container>
  );
}