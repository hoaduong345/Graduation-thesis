import { Controller, useForm } from "react-hook-form";
import { Images } from "../../../../Assets/TS";
import Location from "../../../../Assets/TSX/Location";
import DialogModal from "../../../../Helper/Dialog/DialogModal";
import StepperPage from "../../../../Helper/Stepper/StepperPage";
import Container from "../../../../components/container/Container";
import Back from "../../Admin/Assets/TSX/Back";
import Sitebar from "../UserProfile/Sitebar/Sitebar";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { Rating } from "../../../../Model/RatingAndComment";
import { toast } from "react-toastify";
import { RatingAndCommentController } from "../../../../Controllers/Rating&Comment";

export default function OrderDetailPage() {
  const editorRef = useRef<any>(null);
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<Rating>({
    mode: "all",
    defaultValues: {
      comment: "",
      ratingValue: 5,
      iduser: 1,
    },
  });
  const idDialogRating = "dialogRating";
  const onClose = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  const openDialog = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  const handleRatingClick = (rating: number) => {
    setValue("ratingValue", rating);
    console.log(`Sao Sao Sao Sao Sao Sao Sao Sao : ${rating}`);
  };

  //Thêm đánh giá
  const handleAddProductRating = (id: string, data: Rating) => {
    RatingAndCommentController.postRatingAndComment(data)
      .then((_) => {
        setValue("iduser", data.iduser);
        console.log(
          "🚀 ~ file: OrderDetailPage.tsx:64 ~ .then ~ data.iduser:",
          data.iduser
        );
        toast.success("Đánh giá thành công !");
        reset({});
        onClose(id);
      })
      .catch(() => {
        toast.error("Đánh giá thất bại !");
      });
  };

  return (
    <Container>
      <div className="body-filter container mx-auto">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 max-2xl:hidden">
            <Sitebar />
          </div>

          <div className="col-span-3 max-2xl:col-span-5">
            <div className="back h-[57px] mt-[46px] ">
              <div className="flex gap-3 items-center">
                <div className="border-[1px] border-[#EA4B48] rounded-md py-4 px-4 max-xl:p-3 max-lg:p-2">
                  <Back />
                </div>
                <div>
                  <p className="font-normal text-sm max-xl:text-xs max-lg:text-[10px]">
                    Quay lại danh sách đơn hàng
                  </p>
                  <h2 className="uppercase text-[32px] font-bold max-xl:text-[28px] max-lg:text-xl">
                    Chi tiết đơn hàng
                  </h2>
                </div>
              </div>
            </div>

            <div className="p-12 shadow border-[#6C6C6C40] rounded-md flex flex-col gap-10 max-lg:p-6">
              <div className="flex gap-5">
                <div className="w-[60%] max-lg:w-[55%] border-[#6C6C6C40] border-[1px] rounded-md p-[26px] flex flex-col gap-9">
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1 items-center">
                      <Location />
                      <p className="text-[#EA4B48] font-medium text-sm max-[870px]:text-xs">
                        Địa chỉ nhận hàng
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-normal text-[#1A1A1A] max-[870px]:text-xs">
                        <span className="font-bold">
                          Trần Văn Bảo (+84) 92381882{" "}
                        </span>{" "}
                        407 Hoàng Diệu, Phường Thống Nhất, Thành Phố Buôn Ma
                        Thuột, Đắk Lắk
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1 items-center">
                      <Location />
                      <p className="text-[#EA4B48] font-medium text-sm max-[870px]:text-xs">
                        Ghi chú cho người gửi
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-normal text-[#1A1A1A] max-[870px]:text-xs">
                        Giao vào giờ hành chính từ thứ 2 - 6{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-[40%] max-lg:w-[45%] flex flex-col gap-7 p-[20px] border-[#6C6C6C40] border-[1px] rounded-md">
                  <div className="">
                    <div className="flex gap-5 max-xl:gap-3 max-lg:gap-0">
                      <div>
                        <p className="text-xs text-[#E0E0E0] max-xl:text-[13px] max-[870px]:text-xs">
                          ID ĐƠN HÀNG
                        </p>
                        <p className="max-xl:text-sm max-[870px]:text-xs">
                          #A23V
                        </p>
                      </div>
                      <div className="border-r-[1px] border-[#FFAAAF] h-[25px] my-auto"></div>
                      <div>
                        <p className="text-xs text-[#E0E0E0] max-xl:text-[13px] max-[870px]:text-xs">
                          PHƯƠNG THỨC THANH TOÁN
                        </p>
                        <p className="max-xl:text-sm max-[870px]:text-xs">
                          Thanh toán khi nhận hàng
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                      Tổng Giá Sản Phẩm:{" "}
                    </p>
                    <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                      ₫216.000
                    </p>
                  </div>
                  <div className="flex justify-between border-t-[1px] pt-2">
                    <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                      Phí vận chuyển:{" "}
                    </p>
                    <div className="flex gap-1">
                      <p className="text-sm text-[#EA4B48] max-[870px]:text-[11px]">
                        ₫0
                      </p>
                      <p className="text-[#EA4B48]"> - </p>
                      <p className="text-sm text-[#FFAAAF] line-through max-[870px]:text-[11px]">
                        ₫15.000
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between border-t-[1px] pt-2">
                    <p className="text-sm text-[#393939] max-[870px]:text-[11px]">
                      Tổng Phí:{" "}
                    </p>
                    <p className="text-xl text-[#EA4B48] font-semibold max-[870px]:text-sm">
                      ₫231.000
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <StepperPage />
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-5 px-[26px] py-[10px] bg-[#F2F2F2]">
                  <h4 className="col-span-2 font-normal text-[#1A1A1A] text-sm max-[870px]:text-xs">
                    SẢN PHẨM
                  </h4>
                  <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">
                    GIÁ
                  </h4>
                  <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">
                    TỔNG
                  </h4>
                  <h4 className="col-span-1 font-normal text-[#1A1A1A] text-sm text-center max-[870px]:text-xs">
                    THAO TÁC
                  </h4>
                </div>
                <div className="grid grid-cols-5 px-[26px] py-[16px] items-center bg-[#FFFFFF] shadow">
                  <div className="col-span-2 text-sm flex gap-4 items-center">
                    <img src={Images.cateAD} alt="" />
                    <div>
                      <p className="text-base text-[#393939] max-[870px]:text-[13px]">
                        Máy tính để bàn
                      </p>
                      <p className="text-sm text-[#1A1A1A] max-[870px]:text-[13px]">
                        SL: <span className="text-[#4C4C4C]">x2</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-span-1 flex gap-2 justify-around items-center">
                    <p className="font-medium text-[#7A828A] text-sm line-through max-[870px]:text-[13px]">
                      ₫56.000
                    </p>
                    <p className="font-medium text-[#1A1A1A] text-base max-[870px]:text-[13px]">
                      ₫36.000
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-[#EA4B48] text-base text-center max-[870px]:text-[13px]">
                      ₫72.000
                    </p>
                  </div>
                  <div className="col-span-1 flex mx-auto items-center">
                    <button
                      className="bg-[#EA4B48] rounded-md font-medium"
                      onClick={() => openDialog(idDialogRating)}
                    >
                      <p className="px-4 py-2 text-white">Đánh giá</p>
                    </button>
                  </div>
                  <DialogModal
                    id={idDialogRating}
                    onClose={() => onClose(idDialogRating)}
                    // onSave={handleSubmit((data: Rating) => {
                    //   const htmlString = data.comment;
                    //   const regex = /<p>(.*?)<\/p>/;
                    //   const match = htmlString.match(regex);
                    //   if (match) {
                    //     const extractedText = match[1];
                    //     const _data: Rating = {
                    //       ...data,
                    //       comment: extractedText,
                    //     };
                    //     handleAddProductRating(idDialogRating, _data);
                    //   }
                    // })}
                    onSave={handleSubmit((data: Rating) => {
                      handleAddProductRating(idDialogRating, data);
                    })}
                    title="Đánh Giá Sản Phẩm"
                    body={
                      <>
                        <div className="grid grid-cols-2 w-[800px]">
                          <div className="flex col-span-1 items-start gap-3">
                            <div>
                              <img
                                src={Images.imageproduct5}
                                alt="imageproduct5"
                                className="mb-5"
                              />
                            </div>
                            <div className="flex-col flex">
                              <p className="text-[#393939] text-base font-semibold">
                                Máy tính để bàn
                              </p>
                              <p className="text-[#393939] text-sm font-normal">
                                SL: x2
                              </p>
                            </div>
                          </div>
                          <div className=" col-span-1">
                            <p className="text-[#393939] text-lg font-semibold">
                              Chất lượng sản phẩm:
                            </p>
                            <div className="rating mt-1 ">
                              <div className="flex items-center justify-start gap-3 ">
                                <div className="rating rating-lg gap-3">
                                  <Controller
                                    control={control}
                                    name="ratingValue"
                                    rules={{
                                      required: {
                                        value: true,
                                        message: "",
                                      },
                                    }}
                                    render={({}) => (
                                      <>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                          <input
                                            key={rating}
                                            type="radio"
                                            name="rating-5"
                                            className="mask mask-star-2 bg-orange-400"
                                            onClick={() =>
                                              handleRatingClick(rating)
                                            }
                                            // ref={register}
                                          />
                                        ))}
                                      </>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" border-b-[1px] border-[#E0E0E0] mb-4"></div>
                        <div>
                          {/* <p>Mô tả chất lượng sản phẩm: </p> */}
                          {/* <Editor
                                  apiKey="i6krl4na00k3s7n08vuwluc3ynywgw9pt6kd46v0dn1knm3i"
                                  onInit={(editor) =>
                                    (editorRef.current = editor)
                                  }
                                  onEditorChange={(e) => field.onChange(e)}
                                  value={field.value}
                                  init={{
                                    block_formats:
                                      "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3",
                                    height: 200,
                                    width: 800,
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
                                /> */}
                          <Controller
                            control={control}
                            name="comment"
                            rules={{
                              required: {
                                value: true,
                                message:
                                  "Bạn phải nhập thông tin cho trường dữ liệu này!",
                              },
                            }}
                            render={({ field }) => (
                              <>
                                <p className="text-[#4C4C4C] text-base font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                                  Mô tả chất lượng sản phẩm
                                  <span className="text-[#FF0000]">*</span>
                                </p>
                                <textarea
                                  id="message"
                                  rows={4}
                                  className="block p-2.5 w-full text-sm text-gray-900 outline-none
                             border-[1px] border-[#FFAAAF] rounded-md mt-2"
                                  placeholder="Để lại bình luận..."
                                  defaultValue={field.value}
                                  onChange={field.onChange}
                                />
                              </>
                            )}
                          />
                        </div>
                        <div className=" border-b-[1px] border-[#E0E0E0] mb-4"></div>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
