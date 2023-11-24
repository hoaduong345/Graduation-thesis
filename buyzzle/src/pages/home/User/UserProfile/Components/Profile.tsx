import { Fragment, useState, useEffect, useCallback } from "react";
import Container from "../../../../../components/container/Container";
import Sitebar from "../Sitebar/Sitebar";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { userController } from "../../../../../controllers/UserController";
import { appConfigUser } from "../../../../../configsEnv";
import { storage } from "../../../../../firebase/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { replace } from "lodash";
import { stringify } from "querystring";
import PageNotFound from "../../../../../components/page/PageNotFound";

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
type UserData1 = {
  username: string;
  name: string;
  email: string;
  sex: string;
  phonenumber: string;
  dateOfBirth: string;
};
export default function UserProfile() {
  const [validUrl, setValidUrl] = useState<boolean>(false);
  const [CheckImageUrl, setCheckImageUrl] = useState<boolean>(false);
  const param = useParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  // const [editUser, setEditUser] = useState<FormValues>();
  const [url, setUrl] = useState<string>("");
  const [urlThen, setUrlThen] = useState<string>("");
  const [id, setId] = useState<string>("11");
  // const id: number | undefined = getID()!;
  const [sex, setSex] = useState<boolean>();
  const [emailThen, setEmailThen] = useState<string>("");
  const [sdtThen, setSdtThen] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  // const [isDisabled1,setIsDisable1] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // const [UserData1, setUserData1] = useState<UserData1>();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "all",
    // defaultValues: UserData1
  });
  let isDisabled = !(isValid && isDirty);
  // setIsDisable(!(isValid && isDirty));
  // console.log("CCCCCCCCCc:" + JSON.stringify(UserData1));
  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      try {
        if (user != null) {
          const userData = JSON.parse(user);
          const username = userData.username;
          console.log("USERNAME: " + username);
          await userController.getUserWhereUsername(username).then((res) => {
            console.log(JSON.stringify(res));
            if (res.dateOfBirth == null) {
              res.dateOfBirth = "dd/mm/yyyy";
            } else {
              res.dateOfBirth = res.dateOfBirth.substring(0, 10);
            }

            let Bruh = res.email;
            Bruh = Bruh.replace(res.email[3], "*");
            Bruh = Bruh.replace(res.email[4], "*");
            Bruh = Bruh.replace(res.email[5], "*");
            let emailDef = Bruh;

            // console.log(emailDef);
            setEmailThen(res.email);

            let Bruh2 = res.phonenumber;
            Bruh2 = Bruh2.replace(res.phonenumber[0], "*");
            Bruh2 = Bruh2.replace(res.phonenumber[1], "*");
            Bruh2 = Bruh2.replace(res.phonenumber[2], "*");
            Bruh2 = Bruh2.replace(res.phonenumber[3], "*");
            Bruh2 = Bruh2.replace(res.phonenumber[4], "*");
            Bruh2 = Bruh2.replace(res.phonenumber[5], "*");
            Bruh2 = Bruh2.replace(res.phonenumber[6], "*");
            let phonenumberDef = Bruh2;

            setSdtThen(res.phonenumber);

            res.email = emailDef;
            res.phonenumber = phonenumberDef;
            setId(res.id);
            setSex(res.sex);
            setLoading(false);
            SetDataUser(res);

            const UserImageArray = JSON.stringify(res.UserImage);
            if (UserImageArray == "[]") {
              setCheckImageUrl(false);
            } else {
              const urlTaker = JSON.parse(UserImageArray);
              setUrlThen(urlTaker[0].url);
              setCheckImageUrl(true);
            }

            return res;
          });
        } else {
          console.log("Chua Dang Nhap Dung");
        }
      } catch (error) {
        console.log("ERROR", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [reset]);

  useEffect(() => {
    function CheckLink() {
      const user = localStorage.getItem("user");
      if (user != null) {
        setValidUrl(true);
      } else {
        setValidUrl(false);
      }
    }
    CheckLink();
  }, [param]);

  const SetDataUser = (data: any) => {
    const user = localStorage.getItem("user");
    if (user != null) {
      const Username = JSON.parse(user);

      console.log("UserData1:" + JSON.stringify(data));
      reset({
        username: "" + Username?.username,
        name: "" + data?.name,
        email: "" + data?.email,
        // sex: JSON.stringify(data?.sex),
        phonenumber: " " + data?.phonenumber,
        dateOfBirth: data?.dateOfBirth,
      });
    }
  };

  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSex(JSON.parse(event.target.value));
  };

  useEffect(() => {
    loadImageFile(image);
  }, [image]);

  // useEffect(() => {

  // }, []);

  // img firebase
  const loadImageFile = async (image: any) => {
    try {
      const imageRef = ref(storage, `imageUrl/${image.name}`);

      await uploadBytes(imageRef, image);

      const url = await getDownloadURL(imageRef);
      setUrl(url);
      console.log("URL IMAGE: " + url);
      // FormImage.id = parseInt(id);
      return url;
    } catch (error) {
      console.error(error);
    }
  };

  const addImages = async (id: number, url: string) => {
    const urlImages = {
      iduser: id,
      url: url,
    };
    await axios
      .post(`${appConfigUser.apiUrl}/addimageuser`, urlImages)
      .then((response) => response.data);
  };

  const EditImages = async (id: number, url: string) => {
    const urlImages = {
      iduser: id,
      url: url,
    };
    console.log("IDDDDDDĐ:", urlImages.iduser);
    await axios
      .put(
        `${appConfigUser.apiUrl}/updateimageuser/${urlImages.iduser}`,
        urlImages.url
      )
      .then((response) => response.data);
  };

  const API = `http://localhost:5000/buyzzle/user/userprofile/${param.username}`;
  const onSubmit = async (formData: FormValues, FormImage: FormImage) => {
    try {
      console.log("selectedFile:" + selectedFile);
      if (selectedFile == null && CheckImageUrl == false) {
        toast.error("Hãy chọn hình");
        return;
      }
      // console.log("TESTING: " + formData);
      formData.sex = JSON.parse(formData.sex);
      formData.email = emailThen;
      formData.phonenumber = sdtThen;
      // console.log("SERVER:" + JSON.stringify(formData));
      const response = await axios.put(API, formData);
      FormImage.id = parseInt(id);
      if (response) {
        console.log("UrlThen" + url);

        if (CheckImageUrl == false) {
          await addImages(FormImage.id, url);
          setCheckImageUrl(true);
        } else {
          console.log("Ao that day:" + FormImage.id);
          await EditImages(FormImage.id, url);
        }
      }

      console.log("edit thanh cong", response);

      if (response.status === 200) {
        console.log("Edit successfully");
        toast.success("Cập nhật thành công", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        console.log("Sign-in Failed!");
        toast.warning("Sign-in failed", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        if (responseData.error) {
          console.log(`Lỗi2: ${responseData.error}`);
          const errorMessageUsername = responseData.error.username;
          const errorMessageEmail = responseData.error.email;
          const errorMessagePhoneNumber = responseData.error.phonenumber;
          if (errorMessageUsername) {
            toast.warning(errorMessageUsername, {
              position: "top-right",
              autoClose: 5000,
            });
          } else if (errorMessageEmail) {
            toast.warning(errorMessageEmail, {
              position: "top-right",
              autoClose: 5000,
            });
          } else if (errorMessagePhoneNumber) {
            toast.warning(errorMessagePhoneNumber, {
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
  };

  const onChangeImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`Selected file: ${file}`);
      setSelectedFile(file);
      setImage(file);

      // console.log("isDisabled:"+isDisabled)
    } else {
      setSelectedFile(null); // Reset the selectedFile state when no file is selected
      setImage(null); // Reset the imageURL state
      console.log("No file selected");
    }
  };

  return (
    <Fragment>
      {loading ? (
        "LOADING............."
      ) : (
        <div>
          {validUrl ? (
            <Container>
              <div className="body-filter container mx-auto">
                <div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="col-span-1 max-2xl:hidden">
                        <Sitebar />
                      </div>
                    </div>
                    <div className="mt-9 col-span-3 max-2xl:col-span-1 grid grid-cols-5 gap-4">
                      <form
                        className="card py-4 px-5 col-span-3  rounded-[6px]
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                      >
                        <span className="text-[#000] text-2xl font-normal ">
                          Hồ sơ của tôi
                        </span>
                        <p className="text-[#393939] text-sm font-normal">
                          Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </p>
                        <div className="flex w-[100%] mt-4 justify-between">
                          <div className="w-[48%]">
                            <Controller
                              control={control}
                              name="username"
                              rules={{
                                required: {
                                  value: true,
                                  message:
                                    "Bạn phải nhập thông tin cho trường dữ liệu này!",
                                },
                                minLength: {
                                  value: 6,
                                  message: "Tên sản phẩm phải lớn hơn 6 ký tự",
                                },
                              }}
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
                                    disabled={true}
                                    placeholder="Tên đăng nhập"
                                    value={field.value}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const reg = /[!@#$%^&*]/;
                                      field.onChange(value.replace(reg, ""));
                                    }}
                                  />
                                  {!!errors.username && (
                                    <p className="text-red-700 mt-2">
                                      {errors.username.message}
                                    </p>
                                  )}
                                </>
                              )}
                            />
                            {/* end input addNameProducts */}
                          </div>
                          <div className="w-[48%]">
                            <Controller
                              control={control}
                              name="name"
                              rules={{
                                required: {
                                  value: true,
                                  message:
                                    "Bạn phải nhập thông tin cho trường dữ liệu này!",
                                },
                                minLength: {
                                  value: 6,
                                  message:
                                    "Tên người dùng phải lớn hơn 6 ký tự",
                                },
                              }}
                              render={({ field }) => (
                                <>
                                  <label
                                    htmlFor="name"
                                    className="text-[#4C4C4C] text-sm font-medium"
                                  >
                                    Tên người dùng
                                  </label>
                                  {/* input addNameProducts */}
                                  <input
                                    className={`focus:outline-none text-[#333333] text-base placeholder-[#7A828A]
rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                                   ${
                                                     !!errors.name
                                                       ? "border-[2px] border-red-900"
                                                       : "border-[1px] border-[#FFAAAF]"
                                                   }`}
                                    placeholder="Tên người dùng"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const reg = /[!@#$%^&*]/;
                                      field.onChange(value.replace(reg, ""));
                                    }}
                                    value={field.value}
                                    // {...register("name")}
                                  />
                                  {!!errors.name && (
                                    <p className="text-red-700 mt-2">
                                      {errors.name.message}
                                    </p>
                                  )}
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
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /[!#$%^&]/;
                                    field.onChange(value.replace(reg, ""));
                                  }}
                                  value={field.value}
                                  disabled={true}
                                  // {...register("email")}
                                  // onChange={onChangeInput}
                                />
                                {!!errors.email && (
                                  <p className="text-red-700 mt-2">
                                    {errors.email.message}
                                  </p>
                                )}
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
                                    onChange={handleSexChange}
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
                                    onChange={handleSexChange}
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
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const reg = /[!@#$%^&]/;
                                      field.onChange(value.replace(reg, ""));
                                    }}
                                    disabled={true}
                                    value={field.value}
                                    // {...register("phonenumber")}
                                    // onChange={onChangeInput}
                                  />
                                  {!!errors.phonenumber && (
                                    <p className="text-red-700 mt-2">
                                      {errors.phonenumber.message}
                                    </p>
                                  )}
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
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const reg = /[!@#$%^&*]/;
                                    field.onChange(value.replace(reg, ""));
                                  }}
                                />
                                {!!errors.dateOfBirth && (
                                  <p className="text-red-700 mt-2">
                                    {errors.dateOfBirth.message}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>
                        {/* button */}
                        <div
                          onClick={handleSubmit(
                            (formData: any, FormImage: any) => {
                              onSubmit(formData, FormImage);
                            }
                          )}
                          className={`flex w-[122.164px] rounded-md h-[32px] transition duration-150 justify-evenly bg-[#EA4B48] mt-5 ${
                            isDisabled
                              ? "bg-[#aeaeae] cursor-not-allowed"
                              : "bg-[#EA4B48] hover:bg-[#ff6d65] cursor-pointer"
                          }
                     `}
                        >
                          <button
                            disabled={isDisabled}
                            className={`text-center text-base font-bold text-[#FFFFFF]
                    ${
                      isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                    }                `}
                          >
                            Lưu
                          </button>
                        </div>
                      </form>

                      {/* Form */}

                      <div
                        className="card py-4 px-5 col-span-2 rounded-[6px]
                    shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                      >
                        <div className=" flex flex-col items-center my-auto">
                          <div className="avatar online">
                            <div className="max-w-[174px] rounded-full border-[4px] border-[#2E89FF]">
                              <div className="w-[100%] h-[100%]">
                                {selectedFile ? (
                                  <>
                                    {/* <p>Selected file: {selectedFile.name}</p> */}
                                    <img
                                      src={url!}
                                      alt="Selected"
                                      width={"100%"}
                                      className="object-cover"
                                      height={"100%"}
                                    />
                                  </>
                                ) : (
                                  <div className="w-[174px]">
                                    {CheckImageUrl ? (
                                      <>
                                        <img
                                          src={urlThen!}
                                          alt="Selected"
                                          width={"100%"}
                                          className="object-cover"
                                          height={"100%"}
                                        />
                                      </>
                                    ) : (
                                      <p className=" flex flex-col items-center my-16">
                                        Chọn ảnh
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* button */}
                          <label htmlFor="images">
                            <div
                              className="flex items-center w-[141px] rounded-md h-[32px]
                             hover:bg-[#FFEAE9] transition duration-150 border-[#EA4B48]
                              border-[1px] justify-evenly cursor-pointer mt-5"
                              onClick={() => {
                                if (!!selectedFile) {
                                  console.log("Confirm");
                                }
                              }}
                            >
                              <input
                                type="file"
                                onChange={onChangeImage}
                                id="images"
                                multiple
                                className="hidden"
                              />
                              <button className="text-center text-sm font-bold text-[#1A1A1A] ">
                                Thay đổi ảnh
                              </button>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          ) : (
            <PageNotFound />
          )}
        </div>
      )}
    </Fragment>
  );
}
