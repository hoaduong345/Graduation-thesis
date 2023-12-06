import { Controller, useForm } from "react-hook-form";
import DialogModal from "../../../../../helper/Dialog/DialogModal";
import { toastSuccess } from "../../../../../helper/Toast/Success";
// import { Voucher, VoucherModel } from "../../../../../Model/VoucherModel";
import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import Container from "../../../../../components/container/Container";
import { logoesController } from "../../../../../controllers/LogoController";
import { storage } from "../../../../../firebase/Config";
import Loading from "../../../../../helper/Loading/Loading";
import { LogoModel } from "../../../../../model/LogoModel";
import SitebarAdmin from "../../Sitebar/Sitebar";
import Edit from "../../assets/TSX/Edit";
import PlusSquare from "../../assets/TSX/PlusSquare";
import RemoveCate from "../../assets/TSX/RemoveCate";
import UploadIMG from "../../assets/TSX/UploadIMG";
import Handle from "../../assets/TSX/bacham";
import { toastWarn } from "../../../../../helper/Toast/Warning";
import { id } from "@material-tailwind/react/types/components/tabs";
import { Any } from "react-spring";
import DialogComfirm from "../../../../../helper/Dialog/DialogComfirm";
import { Accordion } from "@chakra-ui/react";
import { BannerModel } from "../../../../../model/BannerModel";
import { bannerController } from "../../../../../controllers/BannerController";
type FormValues = {
  id: number;
  images: string;
};
export default function Banner() {
  const idModal = "logo";
  const idRemove = "removeLogo";
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState<string>();
  const [open, setOpen] = useState<number>();
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const [banner, setBanner] = useState<BannerModel[]>([]);
  const [bannerToDelete, setBannerToDelete] = useState(0);
  const [checkedCategory, setCheckedCategory] = useState<BannerModel[]>([]);
  const getAllBanner = async () => {
    await bannerController.getAll().then((res: any) => {
      setBanner(res);
    });
  };

  useEffect(() => {
    getAllBanner();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<BannerModel>({
    mode: "all",
    defaultValues: {
      id : 0,
      image : "",
      linkgoogle : ""
    },
  });

  const openModal = async (id: string, data : BannerModel) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      reset({id: data.id, linkgoogle: data.linkgoogle});
      setUrl(data.image)
      modal.showModal();
    }
  };

  const closeModal = async (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      clearErrors();
      reset({});
      modal.close();
    }
  };

  const saveModal = (id: string, data: BannerModel) => {
    if (!url) {
      toastWarn("Thêm Hình");
      return;
    }
    closeModal(id);
    if (data.id != 0) {
      bannerController
        .update(data.id, {
          id: data.id,
          image: url,
          linkgoogle: data.linkgoogle,
        })
        .then(() => {
          toastSuccess("Cập nhật thành công!!");
          getAllBanner();
          setnull();
          setCheckedCategory([]);
        });
    } else {
      bannerController.add({ id: data.id, image: url, linkgoogle: data.linkgoogle }).then(() => {
        toastSuccess("Thêm thành công!!");
        getAllBanner();
      });
    }
  };

  const removee = (id: number, idDialog: string) => {
    console.log("xoa", id);
    bannerController
      .remove(id)
      .then(() => {
        closeModal(idDialog);
        toastSuccess("Xóa thành công!!");
        getAllBanner();
      })
      .then(() => {
        setCheckedCategory([]);
      });
  };

    const setnull = async () => {
      reset({ id: 0, image: "" , linkgoogle : ""});
      
      setUrl("");
    };

  const loadImageFile = async (images: any) => {
    for (let i = 0; i < 1; i++) {
      const imageRef = ref(storage, `multipleFiles/${images[i].name}`);
      setLoading(true);
      await uploadBytes(imageRef, images[i])
        .then(() => {
          storage
            .ref("multipleFiles")
            .child(images[i].name)
            .getDownloadURL()
            .then((url: string) => {
              setUrl(url);
              return url;
            });
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => setLoading(false));
    }
  };

  const load = () => {
    if (loading) {
      return <Loading />;
    }
  };

  const renderImg = () => {
    if (url) {
      console.log("🚀 ~ file: Logoes.tsx:139 ~ renderImg ~ url:", url);
      return (
        <div className="group relative">
          <img
            src={url}
            alt="imageproduct6"
            width={80}
            height={80}
            className="rounded-md"
          />
          <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden rounded-md bg-gray-900 bg-fixed 
                                                                    opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"
          ></div>
        </div>
      );
    } else {
      return (
        <>
          <UploadIMG />
          <div id="images" className="text-center mt-2">
            <p className="text-[#5D5FEF] text-center text-base -tracking-tighter font-bold max-xl:text-xs max-lg:text-[8px]">
              Click to upload
              <p className="text-[#1A1A1A] font-normal text-base tracking-widest max-xl:text-xs max-lg:text-[8px]">
                or drag and drop
              </p>
            </p>
          </div>
        </>
      );
    }
  };

 
  return (
    <Container>
      <div className="grid grid-cols-5">
        <div className="col-span-1 max-2xl:hidden">
          <SitebarAdmin />
        </div>

        <div className="content-right-filter mt-[34px] col-span-4 flex flex-col gap-[50px] max-2xl:col-span-5">
          <div>
            <h2
              className="txt-filter font-bold text-[#1A1A1A] text-3xl
                            max-lg:text-xl"
            >
              QUẢN LÝ BANNER TRANG FILTER
            </h2>
          </div>
          <div className="flex flex-col gap-[35px]">
            <div className="flex justify-between">
              <button
                onClick={() =>
                  openModal(idModal, {
                    id: 0,
                  } as LogoModel)
                }
                className="flex gap-3 items-center bg-[#EA4B48] border-[#FFAAAF] border-[1px] px-4 rounded-md h-[46px]"
              >
                <PlusSquare />
                <p className="cursor-pointer text-white text-base font-bold max-[940px]:text-sm ">
                  Thêm Hình Ảnh
                </p>
              </button>
            </div>

            <div className="grid grid-cols-7">
              <div>
                <DialogModal
                  id={idModal}
                  onClose={() => closeModal(idModal)}
                  onSave={handleSubmit((data: any) => {
                    saveModal(idModal, data);
                  })}
                  title="Quản lý hình ảnh Buyzzle"
                  body={
                    <>
                      <div className="justify-center">
                        <div className="max-w-max items-center">
                          <Controller
                            control={control}
                            name="image"
                            render={({ field }) => (
                              <>
                                <label htmlFor="images">
                                  <div className="outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-32 cursor-pointer max-lg:p-2 ml-2 ">
                                    {load()}
                                    <input
                                      value={field.value}
                                      type="file"
                                      onChange={(e: any) => {
                                        loadImageFile(e.target.files);
                                        field.onChange(e);
                                      }}
                                      id="images"
                                      multiple
                                      className="hidden"
                                    />

                                    {renderImg()}
                                    {errors.image && (
                                      <p className="text-[13px] text-red-600 mt-2">
                                        {errors.image.message}
                                      </p>
                                    )}
                                  </div>
                                </label>
                              </>
                            )}
                          />
                        </div>
                        <div className="mt-5">
                                <Controller
                                  name="linkgoogle"
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
                                   
                                  }}
                                  render={({ field }) => (
                                    <>
                                      <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                      Nhập đường dẫn hình ảnh*
                                      </label>
                                      <input
                                        className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                        placeholder="Nhập đường dẫn hình ảnh"
                                        value={field.value}
                                        onChange={(e) => {
                                          const reg = /[!@#$%^&]/;
                                          const value = e.target.value;
                                          field.onChange(
                                            value.replace(reg, "")
                                          );
                                        }}
                                        name="name"
                                      />
                                      {errors.linkgoogle && (
                                        <p className="text-[11px] text-red-700 mt-2">
                                          {errors.linkgoogle.message}
                                        </p>
                                      )}
                                    </>
                                  )}
                                />
                              </div>
                      </div>
                    </>
                  }
                />
              </div>
            </div>

            <div className="">
              <div className="grid grid-cols-9 pb-7">
                <div className="col-span-2 text-base text-[#4c4c4c] mx-auto max-[940px]:text-sm">
                  <p>ID</p>
                </div>
                <div className="col-span-2 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm mr-30">
                  <p>HÌNH ẢNH</p>
                </div>
                <div className="col-span-2 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm mr-30">
                  <p>LINK</p>
                </div>

                <div className="col-span-1 text-base text-[#4C4C4C] mx-auto max-[940px]:text-sm"></div>
              </div>

              <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
                {banner?.map((items) => {
                  console.log("🚀 ~ file: Logoes.tsx:340 ~ {logo?.map ~ items:", items)
                  return (
                    <>
                     
                      <div className="grid grid-cols-9 border-t-[1px] py-4">
                        <div className="col-span-2 text-base text-[#4C4C4C] mx-auto">
                          <p
                            className="font-medium text-base text-[#EA4B48]
                             max-[940px]:text-xs "
                          >
                            {items.id}
                          </p>
                        </div>
                        <div
                          // onClick={() => handleOpen(items.id)}
                          className="cursor-pointer"
                        >
                          <img
                            className="w-[150px] h-[100px] object-cover ml-5"
                            src={items.image}
                            alt=""
                          />
                        </div>

                        <div className="col-span-2 text-base text-[#4C4C4C] mx-auto ">
                          <p
                            className="font-medium text-base text-[#070702]
                             max-[940px]:text-xs ml-20"
                          >
                            {items.linkgoogle}
                          </p>
                        </div>

                     

                        <div className="col-span-1 flex justify-center mr-5">
                          <div className="dropdown dropdown-left">
                            <label tabIndex={0}>
                              <Handle />
                            </label>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-white rounded-box w-52
                                            shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
                                            max-2xl:right-[100%] max-2xl:origin-left max-[940px]:w-32 max-[940px]:h-[88px] max-[940px]:rounded"
                            >
                              <li>
                                <button
                                  onClick={() =>{
                                    openModal(idModal, items)
                                    // reset({id: items.id, image: items.image, linkgoogle: items.linkgoogle}) 
                                  }}   
                                  className="flex items-center gap-4"
                                >
                                  <Edit />
                                  <p
                                    className="text-[#EA4B48] text-sm font-medium
                                        max-[940px]:text-xs "
                                  >
                                    Sửa
                                  </p>
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    openModal(idRemove, items);
                                    setBannerToDelete(items.id);
                                  }}
                                  className="flex items-center gap-4"
                                >
                                  <RemoveCate />
                                  <p
                                    className="text-[#EA4B48] text-sm font-medium
                                         max-[940px]:text-xs "
                                  >
                                    Xóa
                                  </p>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              <DialogComfirm
                desc="logo"
                id={idRemove}
                onClose={() => closeModal(idRemove)}
                title="Xóa Logo này"
                onSave={() => removee(bannerToDelete, idRemove)}
               
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
