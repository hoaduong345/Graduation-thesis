import { Fragment, useState, useEffect } from "react";
import Container from "../../../../../components/container/Container";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { userController } from "../../../../../Controllers/UserController";
import { appConfigUser } from "../../../../../configsEnv";
import { storage } from "../../../../../Firebase/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import InforUser from "../../Assets/TSX/InforUser";
import { Images } from "../../../../../Assets/TS";
import Contact from "../../Assets/TSX/Contact";
import { currentDate, numberFormat } from "../../../../../Helper/Format";

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
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "all",
  });
  const isDisabled = !(isValid && isDirty);

  const getUserData = () => {
    const user = localStorage.getItem("user");
    if (user != null) {
      const userData = JSON.parse(user);
      const username = userData.username;
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
            username: userData.username,
            name: res.name,
            email: res.email,
            sex: res.sex,
            phonenumber: res.phonenumber,
            dateOfBirth: res.dateOfBirth,
          });
          setSex(res.sex);
          setId(res.id);
          const UserImageArray = JSON.stringify(res.UserImage);
          if (UserImageArray == "[]") {
            setCheckImageUrl(false);
          } else {
            const urlTaker = JSON.parse(UserImageArray);
            setUrlThen(urlTaker[0].url);
            setCheckImageUrl(true);
          }
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
      const user = localStorage.getItem("user");
      if (user != null) {
        setValidUrl(true);

        // console.log("data", data)
      } else {
        setValidUrl(false);
      }
    }
    CheckLink();
  }, [param]);

  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSex(JSON.parse(event.target.value));
  };

  useEffect(() => {
    loadImageFile(image);
  }, [image]);

  // img firebase
  const loadImageFile = async (image: any) => {
    try {
      const imageRef = ref(storage, `multipleFiles/${image}`);

      await uploadBytes(imageRef, image);

      const url = await getDownloadURL(imageRef);
      setUrl(url);
      // console.log("URL IMAGE: "+url);
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
      const response = await axios.put(API, formData);
      FormImage.id = parseInt(id);
      if (response) {
        console.log("UrlThen" + url);

        if (CheckImageUrl == false) {
          await addImages(FormImage.id, url);
          setCheckImageUrl(true);
        } else {
          console.log("CHAY");
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
    // setImage(e.target.files)
    // setSelectedFile(e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      console.log(`Selected file: ${file}`);
      setSelectedFile(file);
      setImage(file);
    } else {
      setSelectedFile(null); // Reset the selectedFile state when no file is selected
      setImage("" + null); // Reset the imageURL state
      console.log("No file selected");
    }
  };

  return (
    <>
      <div
        className="p-5 rounded-md mt-9
      shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-[#000] text-2xl font-normal ">
            Trạng Thái Tài Khoản
          </span>
          <div>
            <InforUser />
          </div>
        </div>
        <div className="border-[1px] border-[#E0E0E0] my-[30px]"></div>
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-4 col-span-2">
            <div>
              <img
                className="w-[70px] h-[70px] rounded-full border-4"
                src={Images.Avtcmt}
                alt=""
              />
            </div>
            <div>
              <p>ID: #a32223</p>
              <p>● Đang Hoạt Động</p>
            </div>
          </div>

          <div className="flex items-center justify-end col-span-1">
            <button
              className="text-white text-center text-base font-bold
                 bg-[#EA4B48] hover:bg-[#ff6d65] w-[150px] h-[46px]
                 rounded-md transition duration-150 cursor-pointer
                 flex items-center px-6"
            >
              <div className="mt-2">
                <Contact />
              </div>
              <p className="w-full">Liên hệ</p>
            </button>
          </div>
        </div>

        {/* input */}
        <div className="mt-7">
          {/* card */}
          <div className="card w-[100%] rounded-md">
            <div className="grid grid-cols-6 gap-5">
              <div className="col-span-4 max-lg:col-span-3">
                <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] max-xl:text-[13px] max-lg:text-xs">
                  #Id User
                </p>
                <div
                  className={`flex justify-between items-center rounded-[6px] px-[15px] py-[12px]
                                 border-[1px] border-[#FFAAAF] `}
                >
                  <input
                    className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]
                                                                            max-xl:text-sm  max-lg:text-[13px]"
                    placeholder="#a32223"
                  />
                  <p className="text-[#7A828A] font-bold ml-4 cursor-default max-xl:text-[13px]  max-lg:text-[13px]">
                    VNĐ
                  </p>
                </div>
              </div>

              <div className="col-span-2 max-lg:col-span-3">
                <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] max-xl:text-[13px] max-lg:text-xs">
                  Ngày Tạo Tài Khoản
                </p>
                <div
                  className={`flex justify-between items-center rounded-[6px] px-[15px] py-[12px]
                                border-[1px] border-[#FFAAAF] `}
                >
                  <input
                    className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]
                                                                            max-xl:text-sm max-lg:text-[13px]"
                    placeholder={"20/10/2020"}
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="col-span-6 max-lg:col-span-3">
                <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] max-xl:text-[13px] max-lg:text-xs">
                  Tổng Số Tiền Đã Thanh Toán:
                </p>

                <input
                  className={`focus:outline-none text-[#EA4B48] text-base font-medium placeholder-[#EA4B48] 
                            w-[100%] rounded-[6px] px-[15px] py-[12px]
                            max-xl:text-sm max-lg:text-[13px] border-[1px] border-[#FFAAAF]`}
                  placeholder={numberFormat(Number(1000000))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
