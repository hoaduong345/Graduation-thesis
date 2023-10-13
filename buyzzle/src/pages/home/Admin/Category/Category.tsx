import { ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Plus from "../../../../Assets/TSX/Plus";
import Search from "../../../../Assets/TSX/Search";
import { storage } from "../../../../Firebase/Config";
import Container from "../../../../components/container/Container";
// import Delete from "../Assets/TSX/Delete";
import Download from "../Assets/TSX/Download";
import Edit from "../Assets/TSX/Edit";
import Line from "../Assets/TSX/Line";
import RemoveCate from "../Assets/TSX/RemoveCate";
import UploadIMG from "../Assets/TSX/UploadIMG";
import Handle from "../Assets/TSX/bacham";
import SitebarAdmin from "../Sitebar/Sitebar";
import DialogModal from "../../../../Helper/Dialog/DialogModal";
import Loading from "../../../../Helper/Loading/Loading";
import { categoryController } from "../../../../Controllers/CategoryController";
import DialogComfirm from "../../../../Helper/Dialog/DialogComfirm";

export type FormValues = {
   id: number;
   name: string;
   image: string;
};

function Category() {
   const idModal = "category";
   const idComfirm = "comfirm";

   const [idCate, setIdCate] = useState(0);

   const [categorys, setCategorys] = useState<FormValues[]>([]);

   const [loading, setLoading] = useState(false);

   const [url, setUrl] = useState<string>();

   const [checkedCategory, setCheckedCategory] = useState<FormValues[]>([]);

   // img firebase
   const loadImageFile = async (images: any) => {
      for (let i = 0; i < images.length; i++) {
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

   const {
      control,
      handleSubmit,
      clearErrors,
      reset,
      formState: { errors },
   } = useForm<FormValues>({
      mode: "all",
      defaultValues: {
         name: "",
         id: 0,
         image: "",
      },
   });

   const saveModal = (id: string, data: FormValues) => {
      if (!url) {
         toast.error("Thêm Hình", {});
         return;
      }
      closeModal(id);
      if (data.id != 0) {
         categoryController
            .update(data.id, {
               id: data.id,
               name: data.name,
               image: url,
            })
            .then(() => {
               toast.success("Cập nhật thành công!!");
               getList();
               setnull();
            });
      } else {
         categoryController
            .create({ id: data.id, name: data.name, image: url })
            .then(() => {
               toast.success("Thêm thành công!!");
               getList();
               setnull();
            });
      }
   };

   const remove = (id: number, idDialog: string) => {
      categoryController.remove(id).then(() => {
         closeModal(idDialog);
         toast.error("Successfully");
         getList();
      });
   };

   useEffect(() => {
      getList();
   }, []);

   const getList = () => {
      categoryController.getAll().then((res) => {
         closeModal("");
         setCategorys(res.data);
      });
   };
   const openModal = (id: string, data: FormValues) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         reset({ name: data.name, id: data.id });
         setUrl(data.image);
         modal.showModal();
      }
   };

   const closeModal = async (id: string) => {
      const modal = document.getElementById(id) as HTMLDialogElement | null;
      if (modal) {
         clearErrors();
         await setnull();
         modal.close();
      }
   };
   const setnull = async () => {
      reset({ id: 0, name: "", image: "" });
      setUrl("");
   };

   const handleChecked = (checked: boolean, data: FormValues) => {
      if (checked) {
         setCheckedCategory((prev) => [...prev, data]);
      } else {
         const cloneCate = [...checkedCategory];
         const cloneCates = cloneCate.filter((e) => e.id !== data.id);
         setCheckedCategory(cloneCates);
      }
   };
   const handleCheckedAll = (checked: boolean) => {
      if (checked) {
         setCheckedCategory(categorys);
      } else {
         setCheckedCategory([]);
      }
   };
   return (
      <>
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
                        QUẢN LÝ DANH MỤC SẢN PHẨM
                     </h2>
                  </div>

                  <div className="flex flex-col gap-[27px]">
                     <div className="flex gap-[24px]">
                        <div
                           className="Search-input-headerCenter items-center flex
                                        py-[3px] px-[6px] border-[1px] border-[#FFAAAF] rounded-md"
                        >
                           <div className="mb-2">
                              <Search />
                           </div>
                           <input
                              className=" rounded-lg focus:outline-none text-lg relative pr-7 flex-1 pl-3 max-xl:text-sm max-lg:text-sm"
                              placeholder="Tìm kiếm..."
                           />
                        </div>
                        <div className="flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#FFAAAF] border-[1px] justify-evenly cursor-pointer">
                           <Download />
                           <button className="text-center text-base font-bold text-[#EA4B48] max-lg:text-sm">
                              Xuất excel
                           </button>
                        </div>
                     </div>

                     <div className="grid grid-cols-10 items-center">
                        <div className="col-span-1 py-[15px] pl-[35px]">
                           {/* <Delete /> */}
                           <input
                              type="checkbox"
                              onChange={(e) =>
                                 handleCheckedAll(e.target.checked)
                              }
                           />
                        </div>
                        <div className="col-span-2">
                           <Line />
                        </div>
                        <div className="flex gap-[32px] col-span-5 ">
                           <Line />
                           <p className=" pt-[12px] text-[16px] max-lg:text-sm">
                              Tên
                           </p>
                        </div>
                        <div className="flex gap-[72px] col-span-2  max-lg:gap-[30px]">
                           <Line />
                           <p className="pt-[12px] text-[16px] max-lg:text-sm">
                              Trạng thái
                           </p>
                        </div>
                     </div>

                     <div className="items-center flex gap-3 px-6">
                        <button
                           className=""
                           onClick={() =>
                              openModal(idModal, { id: 0 } as FormValues)
                           }
                        >
                           <Plus />
                        </button>
                        <p className="cursor-default text-[#7A828A] text-base font-bold">
                           THÊM DANH MỤC
                        </p>
                        <div className=" z-[-200]">
                           <DialogModal
                              id={idModal}
                              onClose={() => closeModal(idModal)}
                              onSave={handleSubmit((data: any) => {
                                 saveModal(idModal, data);
                              })}
                              title="Danh Mục Sản Phẩm"
                              body={
                                 <>
                                    <div className="grid grid-cols-5 gap-8">
                                       <div className="col-span-3">
                                          <div className="flex gap-3 ">
                                             <div className="flex flex-col gap-5 max-lg:gap-2">
                                                <div>
                                                   <Controller
                                                      name="name"
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
                                                            <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                                               Tiêu Đề Danh Mục*
                                                            </label>
                                                            <input
                                                               className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                               placeholder="Nhập tiêu đề danh mục"
                                                               value={
                                                                  field.value
                                                               }
                                                               onChange={(
                                                                  e
                                                               ) => {
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
                                                               name="name"
                                                            />
                                                            {errors.name && (
                                                               <p className="text-[11px] text-red-700 mt-2">
                                                                  {
                                                                     errors.name
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
                                       <div className="col-span-2 flex flex-col gap-12">
                                          <div className="max-w-max items-center">
                                             <Controller
                                                control={control}
                                                name="image"
                                                render={({ field }) => (
                                                   <>
                                                      <label htmlFor="images">
                                                         <div className="outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-9 cursor-pointer max-lg:p-2">
                                                            {load()}
                                                            <input
                                                               value={
                                                                  field.value
                                                               }
                                                               type="file"
                                                               onChange={(
                                                                  e: any
                                                               ) => {
                                                                  loadImageFile(
                                                                     e.target
                                                                        .files
                                                                  );
                                                                  field.onChange(
                                                                     e
                                                                  );
                                                               }}
                                                               id="images"
                                                               multiple
                                                               className="hidden "
                                                            />

                                                            {renderImg()}
                                                            {errors.image && (
                                                               <p className="text-[13px] text-red-600 mt-2">
                                                                  {
                                                                     errors
                                                                        .image
                                                                        .message
                                                                  }
                                                               </p>
                                                            )}
                                                         </div>
                                                      </label>
                                                   </>
                                                )}
                                             />
                                          </div>
                                       </div>
                                    </div>
                                 </>
                              }
                           />
                        </div>
                     </div>

                     <DialogComfirm
                        desc="Danh mục"
                        id={idComfirm}
                        onClose={() => closeModal(idComfirm)}
                        title="Xóa danh mục"
                        onSave={() => remove(idCate, idComfirm)}
                     />

                     <div className="grid grid-cols-10">
                        {categorys.map((e) => {
                           return (
                              <>
                                 <div
                                    key={e.id}
                                    className="col-span-3 border-[#e0e0e0] border-y-[1px] items-center flex justify-between px-6"
                                 >
                                    <div className=" flex gap-[20px] max-lg:gap-2">
                                       <button>
                                          <Plus />
                                       </button>
                                       <div className="dropdown dropdown-left">
                                          <label tabIndex={0}>
                                             <Handle />
                                          </label>
                                          <ul
                                             tabIndex={0}
                                             className="dropdown-content menu bg-white rounded-box w-52
                                                shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
                                                max-2xl:left-[100%] max-2xl::origin-left"
                                          >
                                             <li>
                                                <button
                                                   onClick={() =>
                                                      openModal(idModal, e)
                                                   }
                                                   className="flex items-center gap-4"
                                                >
                                                   <Edit />
                                                   <p className="text-[#EA4B48] text-sm font-medium">
                                                      Sửa
                                                   </p>
                                                </button>
                                             </li>
                                             <li>
                                                <button
                                                   // onClick={() => remove(e.id)}
                                                   onClick={() => {
                                                      openModal(
                                                         idComfirm,
                                                         {} as FormValues
                                                      );
                                                      setIdCate(e.id);
                                                   }}
                                                   className="flex items-center gap-4"
                                                >
                                                   <RemoveCate />
                                                   <p className="text-[#EA4B48] text-sm font-medium">
                                                      Xóa
                                                   </p>
                                                </button>
                                             </li>
                                          </ul>
                                       </div>
                                       <input
                                          type="checkbox"
                                          checked={checkedCategory.includes(e)}
                                          onChange={(element) =>
                                             handleChecked(
                                                element.target.checked,
                                                e
                                             )
                                          }
                                       />
                                    </div>
                                    <div>
                                       <img
                                          className="w-[50px]"
                                          src={e.image}
                                          alt=""
                                       />
                                    </div>
                                 </div>
                                 <div className="col-span-5 border-[#e0e0e0] h-20 border-[1px] items-center gap-5 py-[5%] pl-[5%] max-lg:h-16 max-lg:py-[7%]">
                                    <p className="text-[16px] font-bold my-auto max-lg:text-sm">
                                       {e.name}
                                    </p>
                                 </div>
                                 <div className="col-span-2 border-[#e0e0e0] border-y-[1px]">
                                    <div className="flex text-center w-[37%] justify-start items-center gap-5 py-[25px] pl-[25px] max-lg:ml-4 max-lg:pt-[22px] max-lg:pb-0 max-lg:pl-[6%] max-lg:gap-2">
                                       <h3 className="font-semibold max-lg:text-sm">
                                          Ẩn
                                       </h3>

                                       <div className="form-control ">
                                          <input
                                             type="checkbox"
                                             className="toggle toggle-error max-lg:toggle-xs"
                                          />
                                       </div>
                                       <h3 className="font-semibold max-lg:text-sm">
                                          Hiện
                                       </h3>
                                    </div>
                                 </div>
                              </>
                           );
                        })}
                     </div>
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}

export default Category;
