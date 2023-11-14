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
import { shipperController } from "../../../../../Controllers/ShipperController";


export interface userStatus {
  id: number;
  createdAt: string;
}

export type FormValues = {
  id: number;
  createdAt: string;
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
  const [name, setName] = useState<string>("");
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

  const getShipperData = () => {
    const user = param.username
    if (user != null) {
     
      const username = user;
      console.log("USERNAME1: " + username);
      shipperController
        .getShipperWhereUsername(username)
        .then((res) => {
          console.log("BRUHUUUUUUUUUU:"+JSON.stringify(res.ShippingWithImage))
          return res;
        })
        .then((res) => {
          setName(res.ShippingWithImage.name);
          const UserImageArray = JSON.stringify(res.ShippingWithImage.ShippingImage);
          if (UserImageArray == "[]") {
            setCheckImageUrl(false);  
          } else {
            const urlTaker = JSON.parse(UserImageArray);
            setUrlThen(urlTaker[0].url);
            setCheckImageUrl(true);
            // console.log(urlThen);
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
    getShipperData();
    getUserStatus();
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

  const getUserStatus = () => {
    const user = param.username;
    if (user != null) {
      console.log("USERNAME1: " + user);
      shipperController.getShipperWhereUsername(user)
        .then((res) => {
          return res;
        })
        .then((res) => {
          if (res.ShippingWithImage.createdAt == null) {
            res.ShippingWithImage.createdAt = "dd/mm/yyyy";
          } else {
            var createdAt = (res.ShippingWithImage.createdAt).substring(0, 10);
            console.log(createdAt)
            var datearray = createdAt.split("-");
            res.ShippingWithImage.createdAt = datearray[2] + '-' + datearray[1] + '-' + datearray[0];
          }
          reset({
            id: res.ShippingWithImage.id,
            createdAt: res.ShippingWithImage.createdAt
          });
          // console.log( res.createdAt);
        }).catch((error) => {
          console.log(
            "🚀 ~ file: Detailproducts.tsx:27 ~ .then ~ error:",
            error
          );
        });
      console.log("Chua Dang Nhap Dung");
    }
  }

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
            {CheckImageUrl ? (
              <div>
                <img
                  className="w-[70px] h-[70px] rounded-full border-4"
                  src={urlThen}
                  alt=""
                />
              </div>
            ) : (
              <div>
                <div className="w-[70px] h-[70px] rounded-full border-4  flex items-center justify-center bg-red-500">
                  <p className="text-2xl text-stone-50">
                    {name.substring(0, 1).toUpperCase()}
                  </p>
                </div>
              </div>
            )}
            <div>

              <p>Tên: {name}</p>

              <p className="text-[#12b004]">● Đang Hoạt Động</p>
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
                  <Controller
                    control={control}
                    name="id"
                    render={({ field }) => (
                      <>
                        <input
                          className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]
                                                                            max-xl:text-sm  max-lg:text-[13px] cursor-not-allowed"
                          placeholder="#a32223"
                          value={field.value}
                          disabled={true}
                        />
                      </>
                    )}
                  />


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
                  <Controller
                    control={control}
                    name="createdAt"
                    render={({ field }) => (
                      <>
                        <input
                          className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]
                                                                            max-xl:text-sm max-lg:text-[13px] cursor-not-allowed"
                          placeholder={"20/10/2020"}
                          maxLength={3}
                          value={field.value}
                          disabled={true}
                        />
                      </>
                    )}
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