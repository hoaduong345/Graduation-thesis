import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../../../components/container/Container";
import SitebarAdmin from "../Sitebar/Sitebar";
import Search from "../../../../Assets/TSX/Search";
import Download from "../Assets/TSX/Download";
import Delete from "../Assets/TSX/Delete";
import Line from "../Assets/TSX/Line";
import Plus from "../../../../Assets/TSX/Plus";
import Handle from "../Assets/TSX/bacham";
import RemoveCate from "../Assets/TSX/RemoveCate";
import Edit from "../Assets/TSX/Edit";
import UploadIMG from "../Assets/TSX/UploadIMG";
import { toast } from "react-toastify";
import LogoCate from "../Assets/TSX/logoCateAdmin";
import AddCateBtn from "../Assets/TSX/AddCateAdmin";
import { useForm } from "react-hook-form";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../Firebase/Config";
import RemoveIMG from "../../../../Assets/TSX/RemoveIMG";

export interface Cate {
   id: number;
   name: string;
   image: string;
}

type FormValues = {
   name: string;
   link: string;
   desc: string;
};

function Category() {
   const [category, setCategory] = useState<Cate>({} as Cate);

   const [images, setImages] = useState("");
   const [url, setUrl] = useState<string>();
   // const [editProduct, setEditProduct] = useState<FormValues>()

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      setCategory({ ...category, name: e.target.value });
   };

   useEffect(() => {
      loadImageFile(images);
   }, [images]);

   // img firebase
   const loadImageFile = async (images: any) => {
      for (let i = 0; i < images.length; i++) {
         const imageRef = ref(storage, `multipleFiles/${images[i].name}`);

         await uploadBytes(imageRef, images[i])
            .then(() => {
               storage
                  .ref("multipleFiles")
                  .child(images[i].name)
                  .getDownloadURL()
                  .then((url: any) => {
                     setUrl(url);
                     return url;
                  });
            })
            .catch((err) => {
               alert(err);
            });
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
               <div
                  className="transition duration-300 ease-in-out bottom-0 left-0 right-0 top-0 opacity-0 group-hover:opacity-100 absolute"
                  onClick={() => console.log("an không ?")}
               >
                  <RemoveIMG />
               </div>
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
      // control,
      // handleSubmit,
      // resetField,
      // watch,
      // reset,
      // formState: { errors, isValid, isDirty },
   } = useForm<FormValues>({
      mode: "all",
      defaultValues: {
         name: "",
         link: "",
         desc: "",
      },
   });
   // const isDisabled = !(isValid && isDirty)

   const handleSubmit = () => {
      closeModal();
      if (category.id != 0 && category.id != undefined) {
         axios
            .put(
               `http://localhost:5000/buyzzle/product/updatecategory/${category.id}`,
               { name: category.name, image: url }
            )
            .then((response) => {
               return response;
            })
            .then((data) => {
               toast.success("Cập nhật thành công!!");
               console.log(data);
               getList();
               setnull();
            })
            .catch((error) => {
               console.error("Error:", error);
               // Xử lý lỗi nếu có
            });
      } else {
         axios
            .post("http://localhost:5000/buyzzle/product/addcategory", {
               name: category.name,
               image: url,
            })
            .then((response) => {
               return response;
            })
            .then((data) => {
               toast.success("Thêm thành công!!");
               console.log(data);
               getList();
               setnull();
            })
            .catch((error) => {
               console.error("Error:", error);
               // Xử lý lỗi nếu có
            });
      }
   };

   const remove = (id: number) => {
      axios
         .delete(`http://localhost:5000/buyzzle/product/deletecategory/${id}`)
         .then((response) => {
            return response;
         })
         .then(() => {
            toast.error("Successfully");
            getList();
         })
         .catch((error) => {
            console.error("Error:", error);
            alert(error);
         });
   };

   const [categorys, setCategorys] = useState<Cate[]>([]);

   useEffect(() => {
      getList();
   }, []);

   const getList = () => {
      fetch("http://localhost:5000/buyzzle/product/allcategory")
         .then((data) => {
            const bien = data.json();
            return bien;
         })
         .then((data) => {
            closeModal();
            setCategorys(data);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   //showdialog demo
   const openModal = (cate: Cate) => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         setCategory(cate);
         setUrl(cate.image);
         modal.showModal();
      }
   };

   const closeModal = async () => {
      const modal = document.getElementById(
         "my_modal_3"
      ) as HTMLDialogElement | null;
      if (modal) {
         await setnull();
         modal.close();
      }
   };
   const setnull = async () => {
      setCategory({ name: "", id: 0, image: "" });
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
                           <Delete />
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
                           onClick={() => openModal(category)}
                        >
                           <Plus />
                        </button>
                        <p className="cursor-default text-[#7A828A] text-base font-bold">
                           THÊM DANH MỤC
                        </p>
                        <div>
                           <dialog id="my_modal_3" className="modal ">
                              <div className="bg-white relative flex flex-col p-[60px] max-xl:w-[650px] max-lg:w-[450px] max-lg:p-[30px]">
                                 <form method="dialog">
                                    <button
                                       className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                       onClick={closeModal}
                                    >
                                       ✕
                                    </button>
                                 </form>
                                 <div className="flex flex-col gap-10 max-lg:gap-4">
                                    <div className="flex items-center">
                                       <LogoCate />
                                       <h3 className="font-bold text-2xl max-xl:text-[18px]">
                                          DANH MỤC SẢN PHẨM
                                       </h3>
                                    </div>

                                    <div className="grid grid-cols-5 gap-8">
                                       <div className="col-span-3">
                                          <div className="flex gap-3 ">
                                             <div className="flex flex-col gap-5 max-lg:gap-2">
                                                <div>
                                                   <label className="text-sm max-xl:text-xs max-lg:text-[10px]">
                                                      Tiêu Đề Danh Mục*
                                                   </label>
                                                   {/* <Controller control={control} name='name' rules={{
                                                                        required: {
                                                                            value: true,
                                                                            message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                                                        },
                                                                        minLength: {
                                                                            value: 6,
                                                                            message: 'Tên sản phẩm phải lớn hơn 6 ký tự'
                                                                        }
                                                                    }} render={({ field }) => (
                                                                        <>

                                                                            <input
                                                                                className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A]
                                                        rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                                        max-xl:text-xs max-lg:text-[10px]
                                            ${!!errors.name ? 'border-[2px] border-red-900' : 'border-[1px] border-[#FFAAAF]'}`}
                                                                                placeholder="Nhập tiêu đề sản phẩm"
                                                                                value={field.value}
                                                                                onChange={(e) => {
                                                                                    const reg = /[0-9]/;
                                                                                    const value = e.target.value
                                                                                    field.onChange(value.replace(reg, ''));
                                                                                }}
                                                                            />
                                                                            {!!errors.name && <p className='text-red-700 mt-2'>{errors.name.message}</p>}</>
                                                                    )} /> */}
                                                   <input
                                                      className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                      placeholder="Nhập tiêu đề danh mục"
                                                      onChange={handleChange}
                                                      name="name"
                                                      value={category.name}
                                                   />
                                                </div>
                                                {/* <div>
                                                                    <label htmlFor="" className="text-sm max-xl:text-xs max-lg:text-[10px]">Chuỗi Cho Đường Dẫn Tĩnh*</label>
                                                                    <input
                                                                        className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                                        placeholder="Nhập chuỗi cho đường dẫn tĩnh"

                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="" className="text-sm max-xl:text-xs max-lg:text-[10px]">Mô tả Danh Mục</label>
                                                                    <input
                                                                        className={`focus:outline-none border-[1px] text-[#333333] text-base placeholder-[#7A828A]
                                             rounded-[6px] px-[10px] py-[12px] w-[100%] mt-2
                                             max-xl:text-xs max-lg:text-[10px]
                                            `}
                                                                        placeholder="Nhập mô tả danh mục"

                                                                    />
                                                                </div> */}
                                             </div>
                                          </div>
                                       </div>
                                       <div className="col-span-2 flex flex-col gap-12">
                                          <div className="max-w-max items-center">
                                             <label htmlFor="images">
                                                <div className="outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-9 cursor-pointer max-lg:p-2">
                                                   <input
                                                      type="file"
                                                      onChange={(e: any) =>
                                                         setImages(
                                                            e.target.files
                                                         )
                                                      }
                                                      id="images"
                                                      multiple
                                                      className="hidden "
                                                   />
                                                   {renderImg()}
                                                </div>
                                             </label>
                                          </div>

                                          {/* <div className={`flex gap-2 items-center 
                                                         ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} `}>
                                                            <button disabled={isDisabled} onClick={handleCreate} className={`text-base font-bold flex gap-3 px-[50px] py-3 border-[#EA4B48] rounded-md border-[1px]
                                                                    max-xl:text-xs max-xl:px-[40px] max-xl:py-1 max-xl:gap-1 max-lg:text-[8px] max-lg:px-[20px]
                                                                    ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                                                <AddCateBtn />
                                                                Xác Nhận
                                                            </button>
                                                            <button className="p-3 text-white text-base bg-[#EA4B48] rounded-md
                                                                    max-xl:text-xs max-lg:text-[10px]"
                                                                onClick={closeModal}
                                                            >Hủy</button>
                                                        </div> */}
                                          <div className="flex gap-2 items-center ">
                                             <button
                                                onClick={handleSubmit}
                                                className="text-base font-bold flex gap-3 px-[50px] py-3 border-[#EA4B48] rounded-md border-[1px]"
                                             >
                                                <AddCateBtn />
                                                Xác Nhận
                                             </button>
                                             <button
                                                className="p-3 text-white text-base bg-[#EA4B48] rounded-md"
                                                onClick={closeModal}
                                             >
                                                Hủy
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </dialog>
                        </div>
                     </div>

                     <div className="grid grid-cols-10">
                        {categorys.map((e) => {
                           return (
                              <>
                                 <div className="col-span-3 border-[#e0e0e0] border-y-[1px] items-center flex justify-between px-6">
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
                                                   onClick={() => openModal(e)}
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
                                                   onClick={() => remove(e.id)}
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
                                       <input type="checkbox" />
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
