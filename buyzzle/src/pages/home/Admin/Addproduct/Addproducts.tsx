import { useEffect, useRef, useState } from "react";
import Container from "../../../../components/container/Container";
import Back from "../Assets/TSX/Back";
// import ArrowDown from '../../../Assets/TSX/ArrowDown'
import UploadIMG from "../Assets/TSX/UploadIMG";
// import { Images } from '../../../Assets/TS'
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { storage } from "../../../../Firebase/Config";
import { ref, uploadBytes } from "firebase/storage";
import { appConfig } from "../../../../configsEnv";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { Images } from "../../../../Assets/TS";
import RemoveIMG from "../../../../Assets/TSX/RemoveIMG";
// import { v4 } from 'uuid'

export type FormValues = {
  productName: string;
  productPrice: number;
  productDesc: string;
  productQuantity: number;
  productImage: string;
  productDiscount: number;
  categoryID: number;
};
export interface Cate {
  id: number;
  name: string;
}

export default function Addproducts() {
  const [images, setImages] = useState("");
  const [url, setUrl] = useState<string[]>([]);
  const [categoty, setCategory] = useState<Cate[]>([]);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    axios
      .get("http://localhost:5000/buyzzle/product/allcategory")
      .then((response) => response.data)
      .then((data) => {
        // console.log(data)
        setCategory(data);
      })
      .catch((err) => console.log(err));
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
              setUrl((prev) => prev.concat(url));
              return url;
            });
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // Tạo fuction handle thêm sản phẩm.
  const handleAddproduct = (data: FormValues) => {
    // console.log(data)
    const _data = {
      name: data.productName,
      price: data.productPrice,
      description: data.productDesc,
      quantity: data.productQuantity,
      discount: data.productDiscount,
      categoryID: data.categoryID,
    };
    // console.log("🚀 ~ file: Addproducts.tsx:33 ~ handleAddproduct ~ _data:", _data)
    axios
      .post(`${appConfig.apiUrl}/addproduct`, _data)
      .then((response) => {
        console.log(response.config.data);
        return response;
      })
      .then(async (responseData) => {
        toast.success("Thêm thành công !");
        for (let i = 0; i < url.length; i++) {
          await addImages(responseData?.data.id, url[i]);
        }
        reset({});
        console.log(
          "🚀 ~ file: Addproducts.tsx:38 ~ handleAddproduct ~ responseData:",
          responseData
        );
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: Addproducts.tsx:40 ~ handleAddproduct ~ error:",
          error
        );
        toast.error("Thêm thất bại !");
      });
  };

  const addImages = async (id: number, url: string) => {
    const urlImages = {
      idproduct: id,
      url: url,
    };
    await axios
      .post(`${appConfig.apiUrl}/addImagesByProductsID`, urlImages)
      .then((response) => response.data);
  };

  // const [desc, setDesc] = useState<FormValues[]>([])

  const {
    control,
    handleSubmit,
    // resetField,
    // watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "all",
    defaultValues: {
      productName: "",
      productDesc: "",
      productImage: "",
      productPrice: 1,
      productQuantity: 1,
      productDiscount: 1,
    },
  });

  // console.log(watch().productDesc)

  const isDisabled = !(isValid && isDirty);
  // console.log(watch().productDesc)
  return (
    <Container>
      <div className="body-addproduct container mx-auto">
        {/* back */}
        <div className="back h-[57px] mt-[46px] ">
          <div className="flex gap-3 items-center">
            <div className="border-[1px] border-[#EA4B48] rounded-md py-4 px-4 max-xl:p-3 max-lg:p-2">
              <Back />
            </div>
            <div>
              <p className="font-normal text-sm max-xl:text-xs max-lg:text-[10px]">
                Quay lại danh sách sản phẩm
              </p>
              <h2 className="uppercase text-[32px] font-bold max-xl:text-[28px] max-lg:text-2xl">
                Thêm Sản Phẩm
              </h2>
            </div>
          </div>
        </div>
        {/* end back */}

        <div className="mt-11 ">
          <form>
            <div className="grid grid-cols-2 gap-6">
              <div>
                {/* Mô Tả Sản Phẩm */}
                <div>
                  <span className="text-[#000] text-2xl font-normal max-xl:text-xl max-lg:text-base">
                    Mô Tả Sản Phẩm
                  </span>
                  {/* card */}
                  <div
                    className="card w-[100%] py-6 px-6 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                  >
                    <Controller
                      control={control}
                      name="productName"
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
                            className="text-[#4C4C4C] text-sm font-semibold mb-[8px] max-xl:text-[13px] max-lg:text-xs"
                          >
                            Tên Sản Phẩm
                            <span className="text-[#FF0000]">*</span>
                          </label>
                          {/* input addNameProducts */}
                          <input
                            className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A]
                                                        rounded-[6px] px-[10px] py-[12px] w-[100%]
                                                        max-xl:text-sm max-lg:text-[13px]
                                            ${
                                              !!errors.productName
                                                ? "border-[2px] border-red-900"
                                                : "border-[1px] border-[#FFAAAF]"
                                            }`}
                            placeholder="Nhập tiêu đề sản phẩm"
                            value={field.value}
                            onChange={(e) => {
                              const reg = /[0-9]/;
                              const value = e.target.value;
                              field.onChange(value.replace(reg, ""));
                            }}
                          />
                          {!!errors.productName && (
                            <p className="text-red-700 mt-2">
                              {errors.productName.message}
                            </p>
                          )}
                        </>
                      )}
                    />

                    {/* <Controller control={control} name='productDesc' rules={{
                                            required: {
                                                value: true,
                                                message: 'Bạn phải nhập thông tin cho trường dữ liệu này!'
                                            },
                                            maxLength: {
                                                value: 1000,
                                                message: 'Mô tả không được vượt quá 300 ký tự!'
                                            },
                                            minLength: {
                                                value: 20,
                                                message: 'Mô tả sản phẩm tối thiểu 20 ký tự!'
                                            }

                                        }}
                                            render={({ field }) => (
                                                <>
                                                    <p className='text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px]'>Mô Tả Chi Tiết Sản Phẩm*</p>
                                                    {/* input addNameProducts */}
                    {/*    <textarea className={`focus:outline-none text-[#333333] text-base font-medium 
                                                border-[1px] border-[#FFAAAF] rounded-[6px] px-[10px] py-[7px] w-[100%] h-[251px] 
                                                ${!!errors.productDesc ? 'border-[2px] border-red-900' : ' border-[1px] border-[#FFAAAF]'}
                                                `}
                                                        placeholder='Nhập mô tả chi tiết sản phẩm <HTML>'
                                                        maxLength={1000}
                                                        rows={4} cols={50}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    >
                                                    </textarea>
                                                    {/* end input addNameProducts */}
                    {/*      </>
                                            )}
                                        />
                                        {!!errors.productDesc && <p className='text-red-700 mt-2'>{errors.productDesc.message}</p>} */}
                    <Controller
                      control={control}
                      name="productDesc"
                      rules={{
                        required: {
                          value: true,
                          message:
                            "Bạn phải nhập thông tin cho trường dữ liệu này!",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                            Mô Tả Chi Tiết Sản Phẩm
                            <span className="text-[#FF0000]">*</span>
                          </p>
                          <Editor
                            apiKey="i6krl4na00k3s7n08vuwluc3ynywgw9pt6kd46v0dn1knm3i"
                            onInit={(editor) => (editorRef.current = editor)}
                            onEditorChange={(e) => field.onChange(e)}
                            value={field.value}
                            init={{
                              block_formats:
                                "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3",
                              height: 500,
                              menubar: false,
                              tiny_pageembed_classes: [
                                {
                                  text: "Responsive - 21x9",
                                  value: "tiny-pageembed--21by9",
                                },
                                {
                                  text: "Responsive - 16x9",
                                  value: "tiny-pageembed--16by9",
                                },
                                {
                                  text: "Responsive - 4x3",
                                  value: "tiny-pageembed--4by3",
                                },
                                {
                                  text: "Responsive - 1x1",
                                  value: "tiny-pageembed--1by1",
                                },
                              ],

                              plugins: [
                                "advlist",
                                "autolink",
                                "link",
                                "image",
                                "lists",
                                "charmap",
                                "preview",
                                "anchor",
                                "pagebreak",
                                "searchreplace",
                                "wordcount",
                                "visualblocks",
                                "visualchars",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "p",
                                "h1, h2, h3, h4, h5, h6",
                                "div",
                                "address",
                                "pre",
                                "div",
                                "code",
                                "dt, dd",
                                "samp",
                                "table",
                                "emoticons",
                                "template",
                                "help",
                              ],
                              toolbar:
                                "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
                              content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
                {/* Danh Mục Sản Phẩm */}
                <div className="mt-7">
                  <span className="text-[#000] text-2xl font-normal max-xl:text-xl max-lg:text-base">
                    Danh Mục Sản Phẩm
                  </span>
                  {/* card */}
                  <div
                    className="card w-[100%] py-6 px-6 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                  >
                    <Controller
                      name="categoryID"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "Vui lòng chọn danh mục!",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] max-xl:text-[13px] max-lg:text-xs">
                            Danh Mục Sản Phẩm
                            <span className="text-[#FF0000]">*</span>
                          </p>
                          {/* Dropdown */}
                          <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                            <select
                              className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none rounded-md"
                              // onChange={(na) => {
                              //     const Id = na.target.value
                              //     setI(Number(Id))

                              //     console.log(Id)
                              // }}
                              value={field.value}
                              onChange={(e) => {
                                const reg = /[]/;
                                const value = e.target.value;
                                field.onChange(value.replace(reg, ""));
                              }}
                            >
                              <option>-- Chọn Danh Mục --</option>
                              {categoty.map((e) => {
                                return <option value={e.id}>{e.name}</option>;
                              })}
                            </select>
                            <div>
                              {!!errors.categoryID && (
                                <p className="text-red-700 mt-2">
                                  {errors.categoryID.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    />

                    <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                      Tag<span className="text-[#FF0000]">*</span>
                    </p>
                    {/* Dropdown */}
                    <div className=" w-[100%] flex border-[1px] border-[#FFAAAF] rounded-[6px] items-center">
                      <select className="w-[100%] p-2.5 text-gray-500 bg-white py-[14px] outline-none rounded-md">
                        <option>key-word tìm kiếm / key-word tìm kiếm 1</option>
                        <option>
                          key-word tìm kiếm 2 / key-word tìm kiếm 3
                        </option>
                      </select>
                    </div>
                    {/* end input addNameProducts */}
                  </div>
                </div>
              </div>
              <div>
                {/* Ảnh sản phẩm */}
                <div>
                  <span className="text-[#000] text-2xl font-normal max-xl:text-xl max-lg:text-base">
                    Ảnh Sản Phẩm
                  </span>
                  {/* card */}
                  <div
                    className="card w-[100%] py-4 px-9 mt-2 
                                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                  >
                    <Controller
                      control={control}
                      name="productImage"
                      render={({}) => (
                        <>
                          <div className="flex max-[1300px]:gap-3">
                            {/* form upload img */}
                            <div className="max-w-max items-center">
                              <label htmlFor="images">
                                <div
                                  className="outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-9 cursor-pointer
                                                                 max-xl:px-4 max-[1100px]:py-4 max-[1024px]:p-2 max-[768px]:p-1"
                                >
                                  <input
                                    type="file"
                                    // onChange={field.onChange}
                                    onChange={(e: any) =>
                                      setImages(e.target.files)
                                    }
                                    id="images"
                                    multiple
                                    className="hidden "
                                  />
                                  <UploadIMG />
                                  <div id="images" className="text-center mt-2">
                                    <p className="text-[#5D5FEF] text-center -tracking-tighter font-bold max-[1024px]:text-xs max-[768px]:text-[10px]">
                                      Click to upload
                                      <p className="text-[#1A1A1A] font-normal text-sm tracking-widest max-[1024px]:text-[11px] max-[768px]:text-[10px]">
                                        or drag and drop
                                      </p>
                                    </p>
                                  </div>
                                </div>
                              </label>
                            </div>
                            {/* end form upload img */}

                            <div className="justify-center flex flex-1">
                              <div className="inline-grid grid-cols-3 gap-4">
                                {url.map((e) => {
                                  return (
                                    <>
                                      <div className="relative">
                                        <div className="group relative">
                                          <img
                                            src={e}
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
                                            onClick={() =>
                                              console.log("an không ?")
                                            }
                                          >
                                            <RemoveIMG />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Giá và số lượng sản phẩm */}
                <div className="mt-7">
                  <span className="text-[#000] text-2xl font-normal max-xl:text-xl max-lg:text-base">
                    Giá & Số Lượng
                  </span>
                  {/* card */}
                  <div
                    className="card w-[100%] py-6 px-6 mt-2 rounded-md
                                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                  >
                    <div className="grid grid-cols-6 gap-5">
                      <Controller
                        control={control}
                        name="productPrice"
                        rules={{
                          required: {
                            value: true,
                            message: "Bạn phải nhập giá cho sản phẩm này!",
                          },
                          maxLength: {
                            value: 10,
                            message: "Giá sản phẩm tối đa 10 chữ số!",
                          },
                          minLength: {
                            value: 3,
                            message: "Giá sản phẩm tối thiểu 3 chữ số!",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <div className="col-span-4 max-lg:col-span-3">
                              <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] max-xl:text-[13px] max-lg:text-xs">
                                Giá Sản phẩm
                                <span className="text-[#FF0000]">*</span>
                              </p>
                              <div
                                className={`flex justify-between items-center rounded-[6px] px-[15px] py-[12px]
                                                            ${
                                                              !!errors.productPrice
                                                                ? "border-[1px] border-red-900"
                                                                : "border-[1px] border-[#FFAAAF]"
                                                            }
                                                            `}
                              >
                                <input
                                  className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]
                                                                            max-xl:text-sm  max-lg:text-[13px]"
                                  placeholder="000.000"
                                  value={field.value}
                                  onChange={(e) => {
                                    const reg = /[^1-9]/g;
                                    const value = e.target.value;
                                    field.onChange(value.replace(reg, ""));
                                  }}
                                />
                                <p className="text-[#7A828A] font-bold ml-4 cursor-default max-xl:text-[13px]  max-lg:text-[13px]">
                                  VNĐ
                                </p>
                              </div>
                              {errors.productPrice && (
                                <p className="text-red-700 mt-2">
                                  {errors.productPrice.message}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      />
                      <Controller
                        control={control}
                        name="productDiscount"
                        rules={{
                          required: {
                            value: true,
                            message: "",
                          },
                          maxLength: {
                            value: 2,
                            message: "Giảm sản phẩm tối đa 100%!",
                          },
                          minLength: {
                            value: 1,
                            message: "Giá sản phẩm tối thiểu 1 chữ số!",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <div className="col-span-2 max-lg:col-span-3">
                              <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] max-xl:text-[13px] max-lg:text-xs">
                                Giảm giá
                                <span className="text-[#FF0000]">*</span>
                              </p>
                              <div
                                className={`flex justify-between items-center rounded-[6px] px-[15px] py-[12px]
                                                            ${
                                                              !!errors.productDiscount
                                                                ? "border-[1px] border-red-900"
                                                                : "border-[1px] border-[#FFAAAF]"
                                                            }
                                                            `}
                              >
                                <input
                                  className="focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%]
                                                                            max-xl:text-sm max-lg:text-[13px]"
                                  placeholder="000.000"
                                  value={field.value}
                                  maxLength={3}
                                  onChange={(e) => {
                                    const reg = /[^1-9]/g;
                                    const value = e.target.value;
                                    field.onChange(value.replace(reg, ""));
                                  }}
                                />
                                <p className="text-[#7A828A] font-bold ml-4 cursor-default max-xl:text-[13px] max-lg:text-[13px]">
                                  %
                                </p>
                              </div>
                              {errors.productDiscount && (
                                <p className="text-red-700 mt-2">
                                  {errors.productDiscount.message}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      />
                    </div>

                    <Controller
                      control={control}
                      name="productQuantity"
                      rules={{
                        required: {
                          value: true,
                          message: "Bạn phải nhập số lượng cho sản phẩm này!",
                        },
                        maxLength: {
                          value: 4,
                          message:
                            "Số lượng sản phẩm quá nhiều! Chỉ tối đa đến hàng nghìn!",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <p className="text-[#4C4C4C] text-sm font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                            Số Lượng Sản Phẩm
                            <span className="text-[#FF0000]">*</span>
                          </p>
                          <input
                            className={`focus:outline-none text-[#333333] text-base font-medium placeholder-[#7A828A] w-[100%] rounded-[6px] px-[15px] py-[12px]
                                                            max-xl:text-sm max-lg:text-[13px]
                                                    ${
                                                      !!errors.productQuantity
                                                        ? "border-[1px] border-red-900"
                                                        : "border-[1px] border-[#FFAAAF]"
                                                    } `}
                            placeholder="000.000"
                            value={field.value}
                            onChange={(e) => {
                              const reg = /[^1-9]/g;
                              const value = e.target.value;
                              field.onChange(value.replace(reg, ""));
                            }}
                          />
                          {errors.productQuantity && (
                            <p className="text-red-700 mt-2">
                              {errors.productQuantity.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </div>
                </div>
                {/* tình trạng sản phẩm */}
                <div className="mt-7">
                  <span className="text-[#000] text-2xl font-normal max-xl:text-xl max-lg:text-base">
                    Tình trạng sản phẩm
                  </span>
                  {/* card */}
                  <div
                    className="card w-[100%] py-4 px-9 mt-2 rounded-md
                            shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                  >
                    <p className="text-[#4C4C4C] text-sm font-semibold mb-[18px] max-xl:text-[13px] max-lg:text-xs">
                      Tình trạng sản phẩm
                      <span className="text-[#FF0000]">*</span>
                    </p>
                    <div className="flex text-center  w-16 justify-start gap-5">
                      <h3 className="text-[#4C4C4C] font-semibold max-xl:text-[13px] max-lg:text-xs">
                        Ẩn
                      </h3>
                      {/* Swich */}
                      <div className="form-control">
                        <input
                          type="checkbox"
                          className="toggle toggle-error max-xl:h-[20px] max-lg:h-[18px]"
                        />
                      </div>
                      {/* end  Swich */}
                      <h3 className="text-[#5D5FEF] font-semibold max-xl:text-[13px] max-lg:text-xs">
                        Đăng
                      </h3>
                    </div>
                  </div>
                </div>
                {/* button */}
                <div className="flex w-[50%] justify-between mt-6 max-[1330px]:gap-5 max-[1330px]:w-[55%] max-[1024px]:w-[75%]">
                  <div
                    className="flex items-center w-[133px] rounded-md h-[46px] hover:bg-[#FFEAE9] transition duration-150 border-[#EA4B48] border-[1px] justify-evenly cursor-pointer
                                            max-[1330px]:w-[160px] max-[1024px]:w-[190px]"
                  >
                    <Link to="/">
                      <button className="text-center text-base font-bold text-[#1A1A1A] max-xl:text-sm max-lg:text-[13px]">
                        Hủy bỏ
                      </button>
                    </Link>
                  </div>

                  <div
                    className={`flex items-center w-[150px] rounded-md h-[46px] transition 
                                    duration-150 justify-evenly  max-[1330px]:w-[280px] max-[1024px]:w-[320px]
                                ${
                                  isDisabled
                                    ? "bg-[#aeaeae] cursor-not-allowed"
                                    : "bg-[#EA4B48] hover:bg-[#ff6d65] cursor-pointer"
                                }
                                    `}
                  >
                    <button
                      disabled={isDisabled}
                      onClick={handleSubmit((data: any) => {
                        handleAddproduct(data);
                      })}
                      className={`text-center text-base font-bold text-[#FFFFFF] max-xl:text-sm max-lg:text-[13px]
                                        ${
                                          isDisabled
                                            ? "cursor-not-allowed"
                                            : "cursor-pointer"
                                        } `}
                    >
                      Thêm sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
}
