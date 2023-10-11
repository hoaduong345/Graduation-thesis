import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RatingAndCommentController } from "../../../../../Controllers/Rating&Comment";
import { Images } from "../../../../../Assets/TS";
import Period from "../../../../../Assets/TSX/Period";
import { currentDate } from "../../../../../Helper/Format";
import Handle from "../../../Admin/Assets/TSX/bacham";
import Edit from "../../../Admin/Assets/TSX/Edit";
import RemoveCate from "../../../Admin/Assets/TSX/RemoveCate";
import LineCMT from "../../../../../Assets/TSX/LineCMT";
import CircleAvrCMT from "../../../../../Assets/TSX/CircleAvrCMT";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import DialogModal from "../../../../../Helper/Dialog/DialogModal";
import { cloneDeep } from "lodash";
import { Rate, Rating } from "../../../../../Model/RatingAndComment";
import { rating } from "@material-tailwind/react";
interface FormValues {
  id: number;
  idproduct: number;
  iduser: number;
  ratingValue: number;
  comment: string;
  createdAt: Date;
  product: {
    quantity: number;
  };
  user: {
    username: string;
  };
}
export default function RatingMap() {
  const [rateAndcomment, setRateAndcomment] = useState<Rate>();
  console.log(
    "🚀 ~ file: RatingMap.tsx:20 ~ RatingMap ~ rateAndcomment:",
    rateAndcomment
  );
  const [idRating, setidRating] = useState<number>(0);
  const { id } = useParams();
  console.log("idididid", id);
  useEffect(() => {
    getComment(Number(id));
  }, []);
  const getComment = (id: number) => {
    RatingAndCommentController.getRatingAndComment(id).then((res: any) => {
      setRateAndcomment(res);
    });
  };
  const editorRef = useRef<any>(null);
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
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

  const openDialog = (id: string, idRating: number, comment: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      console.log("idRating idRating", idRating);
      reset({ comment: comment });
      modal.showModal();
    }
  };
  const handleRatingClick = (rating: number) => {
    setValue("ratingValue", rating);
    console.log(`Sao Sao Sao Sao Sao Sao Sao Sao : ${rating}`);
  };
  //Sửa đánh giá
  const handleEditProductRating = (id: string, data: Rating) => {
    RatingAndCommentController.EditRatingAndComment(idRating, data)
      .then((res) => {
        toast.success("Đánh giá thành công !");
        const _rateAndComment = rateAndcomment?.Rating.map((item) => {
          if (item.id === res.data?.id) {
            return {
              ...item,
              comment: res.data?.comment,
              ratingValue: res.data?.ratingValue,
            };
          }
          return item;
        });
        setRateAndcomment(_rateAndComment);
        onClose(id);
      })
      .catch(() => {
        toast.error("Đánh giá thất bại !");
      });
    console.log("Sửa bình luận!");
  };
  //Xóa comment
  const handleRemoveRating = (id: number) => {
    RatingAndCommentController.RemoveRatingAndComment(id).then((_) => {
      getComment(id);
    });
  };
  return (
    <div>
      {rateAndcomment?.Rating.map((rating) => {
        return (
          <>
            <div className="border-t-[1px] border-[#EA4B48] px-11 py-8">
              {/* header comment */}
              <div className=" justify-between flex mb-4">
                <div className="flex items-center gap-3">
                  {/* hinh anh */}
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={Images.Avtcmt}
                      alt="Avtcmt"
                    />
                    <span className="top-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                  </div>
                  {/* end hinh anh */}
                  {/* thong tin users */}
                  <div>
                    {/* name - period - date */}
                    <div className="flex items-center">
                      {/* name */}{" "}
                      <p className="text-[#1A1A1A] text-xl font-medium">
                        {rating.user.username}
                      </p>
                      {/* end name */}
                      {/* period */}
                      <Period /> {/* end period */}
                      {/* date */}{" "}
                      <p className="text-[#4C4C4C] font-normal text-sm">
                        {currentDate(rating.createdAt)}
                      </p>
                      {/* end date */}
                    </div>
                    {/* end name - period - date */}
                    {/* rating */}
                    <div className="flex gap-1">
                      <div className="rating rating-xs">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <input
                            key={star}
                            type="radio"
                            name="rating-5"
                            value={rating.ratingValue}
                            className="mask mask-star-2 bg-orange-400"
                          />
                        ))}
                      </div>
                      <p className="text-[#4C4C4C] font-normal text-xs">
                        {Math.round(rateAndcomment.averageRating)}.0
                      </p>
                    </div>
                    {/* end rating */}
                    {/* quatity */}
                    <p className="text-[#4C4C4C] font-normal text-sm">
                      Số lượng: {rating.product.quantity}
                    </p>
                    {/* end quatity */}
                  </div>{" "}
                  {/* end thong tin users */}
                </div>
                <div className="items-center">
                  <div className="dropdown dropdown-right ">
                    <label
                      className="max-lg:w-[24px] max-lg:h-[24px]"
                      tabIndex={1}
                    >
                      <Handle />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-white rounded-box w-52
                              shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]
                              max-2xl:left-[100%] max-2xl:origin-left max-[940px]:w-32 max-[940px]:h-[88px] max-[940px]:rounded"
                    >
                      <li>
                        <button
                          className="flex items-center gap-4"
                          onClick={() => {
                            openDialog(
                              idDialogRating,
                              rating.id,
                              rating.comment
                            );
                            setidRating(rating.id);
                          }}
                        >
                          <Edit />
                          <p
                            className="text-[#EA4B48] text-sm font-medium
                          max-[940px]:text-xs "
                          >
                            Chỉnh sửa
                          </p>
                        </button>
                      </li>
                      <li>
                        <button
                          className="flex items-center gap-4"
                          onClick={() => handleRemoveRating(rating.id)}
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
              {/* end header comment */}
              {/* content comment */}

              <div className="border-t-[1px] border-[#E0E0E0] py-2">
                <p className="text-[#4C4C4C]">{rating.comment}</p>
              </div>

              {/* end content comment */}
              {/* reply content comment */}
              <div className="mx-3 my-2  flex">
                <div className="ml-2">
                  <LineCMT />
                </div>
                {/* shop reply cmt */}
                <div className="flex items-center mt-1 ml-3 gap-3">
                  {/* hinh anh */}
                  <div className="relative">
                    <CircleAvrCMT />
                    <span className="top-0 left-5 absolute  w-2.5 h-2.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full" />
                  </div>
                  {/* end hinh anh */}
                  {/* thong tin users */}
                  <div>
                    {/* name - period - date */}
                    <div className="flex items-center">
                      {/* name */}{" "}
                      <p className="text-[#1A1A1A] text-base font-medium">
                        ShopTaiNghe
                      </p>
                      {/* end name */}
                      {/* period */}
                      <Period /> {/* end period */}
                      {/* date */}{" "}
                      <p className="text-[#4C4C4C] text-[12px]">12-10-2023</p>
                      {/* end date */}
                    </div>
                    {/* end name - period - date */}
                    {/* quatity */}
                    <p className="text-[#4C4C4C] text-[12px]">Số lượng: 10</p>
                    {/* end quatity */}
                  </div>{" "}
                  {/* end thong tin users */}
                </div>
                {/* shop reply cmt */}
              </div>
              {/* end reply content comment */}
              {/* content comment */}
              <div className="border-t-[1px] border-[#E0E0E0] py-2 mx-7">
                <p className="text-[#4C4C4C]">
                  Đã mua em nó shop này 1 lần dùng gần 1 năm rồi ok lắm hôm nay
                  mua lại vì hôm đi chơi bị mất. vẫn chất lg như lần trc esd15
                  mãi đỉnh , mà chắc do shop uy tín lên dùng rất tốt âm thanh
                  bass trest chống âm cách tiếng onf đeo êm tai ko bị đua tai
                  luôn chyaj bộ thể dục thoải mái nhá ae lên mua thanh anh shop
                  tư vấn hài lòng vãi
                </p>
              </div>
            </div>
          </>
        );
      })}
      <DialogModal
        id={idDialogRating}
        onClose={() => onClose(idDialogRating)}
        onSave={handleSubmit((data: Rating) => {
          const htmlString = data.comment;
          const regex = /<p>(.*?)<\/p>/;
          const match = htmlString.match(regex);
          if (match) {
            const extractedText = match[1];
            const _data: Rating = {
              ...data,
              comment: extractedText,
            };
            handleEditProductRating(idDialogRating, _data);
          }
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
                  <p className="text-[#393939] text-sm font-normal">SL: x2</p>
                </div>
              </div>
              <div className=" col-span-1 flex">
                <p className="text-[#393939] text-lg font-semibold">
                  Chất lượng sản phẩm:
                </p>
                <div className="rating mt-1 ">
                  <div className="flex items-center justify-start gap-3 ">
                    <div className="rating rating-lg gap-3 ">
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
                                onClick={() => handleRatingClick(rating)}
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
              {/* <textarea
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 outline-none
                             border-[1px] border-[#FFAAAF] rounded-md mt-2"
                            placeholder="Để lại bình luận..."
                            defaultValue={""}
                          /> */}
              <Controller
                control={control}
                name="comment"
                rules={{
                  required: {
                    value: true,
                    message: "Bạn phải nhập thông tin cho trường dữ liệu này!",
                  },
                }}
                render={({ field }) => (
                  <>
                    <p className="text-[#4C4C4C] text-base font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                      Mô tả chất lượng sản phẩm
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
  );
}
