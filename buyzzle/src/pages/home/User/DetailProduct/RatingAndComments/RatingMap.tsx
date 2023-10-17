import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Images } from "../../../../../Assets/TS";
import CircleAvrCMT from "../../../../../Assets/TSX/CircleAvrCMT";
import LineCMT from "../../../../../Assets/TSX/LineCMT";
import Period from "../../../../../Assets/TSX/Period";
import { RatingAndCommentController } from "../../../../../Controllers/Rating&Comment";
import DialogModal from "../../../../../Helper/Dialog/DialogModal";
import { currentDate, roundedNumber } from "../../../../../Helper/Format";
import { stars } from "../../../../../Helper/StarRating/Star";
import { Rate, Ratee, Rating } from "../../../../../Model/ProductModel";
import Edit from "../../../Admin/Assets/TSX/Edit";
import RemoveCate from "../../../Admin/Assets/TSX/RemoveCate";
import Handle from "../../../Admin/Assets/TSX/bacham";
import EmptyPage from "../../../../../Helper/Empty/EmptyPage";
import RemoveIMG from "../../../../../Assets/TSX/RemoveIMG";
import UploadIMG from "../../../Admin/Assets/TSX/UploadIMG";
import { storage } from "../../../../../Firebase/Config";
import { ref, uploadBytes } from "firebase/storage";
import Loading from "../../../../../Helper/Loading/Loading";
import { productController } from "../../../../../Controllers/ProductsController";
import { EditImage } from "../DetailProductPage/DetailsProduct";
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
  CommentImage: {
    url: string;
  }[];
}

type Props = {
  handleEditProductRating: (
    id: string,
    data: Rating,
    idRating: number
  ) => Promise<void>;
  rateAndcomment: Ratee;
  editImages: EditImage[];
  handleRemoveRating: (id: number) => void;
};
export default function RatingMap(props: Props) {
  const [idRating, setidRating] = useState<number>(0);

  const [url, setUrl] = useState<string[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const { id } = useParams();
  console.log("idididid", id);

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

  // // img firebase
  // const loadImageFile = async (images: any) => {
  //   setLoadingImage(true);
  //   for (let i = 0; i < images.length; i++) {
  //     const imageRef = ref(storage, `multipleFiles/${images[i].name}`);

  //     await uploadBytes(imageRef, images[i])
  //       .then(() => {
  //         storage
  //           .ref("multipleFiles")
  //           .child(images[i].name)
  //           .getDownloadURL()
  //           .then((url: any) => {
  //             setUrl((prev) => prev.concat(url));
  //             return url;
  //           });
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       })
  //       .finally(() => setLoadingImage(false));
  //   }
  // };

  // const loading = () => {
  //   if (loadingImage) {
  //     return (
  //       <>
  //         <div className="absolute left-[65%] top-[50%] z-30">
  //           <Loading />
  //         </div>
  //       </>
  //     );
  //   }
  // };

  return (
    <div>
      {props.rateAndcomment?.Rating.length > 0 ? (
        props.rateAndcomment?.Rating.map((rating) => {
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
                          {stars.map((_, index) => (
                            <button key={index}>
                              {/* Sử dụng index để xác định xem sao này có phải sao màu vàng hay không */}
                              <img
                                src={
                                  index < rating.ratingValue
                                    ? Images.star1
                                    : Images.star2
                                }
                                alt=""
                              />
                            </button>
                          ))}
                        </div>
                        <p className="text-[#4C4C4C] font-normal text-xs">
                          {roundedNumber(rating.ratingValue)}.0
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
                            onClick={() => props.handleRemoveRating(rating.id)}
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
                  <div className=" flex flex-1 mt-2">
                    <div className="inline-grid grid-cols-8 gap-4 relative ">
                      {rating.CommentImage.map((img) => {
                        return (
                          <>
                            <img
                              src={img.url}
                              alt="imgComment"
                              className="w-20 h-20 rounded-md"
                            />
                          </>
                        );
                      })}
                    </div>
                  </div>
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
                    Đã mua em nó shop này 1 lần dùng gần 1 năm rồi ok lắm hôm
                    nay mua lại vì hôm đi chơi bị mất. vẫn chất lg như lần trc
                    esd15 mãi đỉnh , mà chắc do shop uy tín lên dùng rất tốt âm
                    thanh bass trest chống âm cách tiếng onf đeo êm tai ko bị
                    đua tai luôn chyaj bộ thể dục thoải mái nhá ae lên mua thanh
                    anh shop tư vấn hài lòng vãi
                  </p>
                </div>
              </div>
              {/* end content comment */}
            </>
          );
        })
      ):(
        <div>
          {/* <EmptyPage /> */}
          </div>

      )
    }
      <DialogModal
        id={idDialogRating}
        onClose={() => onClose(idDialogRating)}
        // onSave={handleSubmit(async (data: Rating) => {
        //   const htmlString = data.comment;
        //   const regex = /<p>(.*?)<\/p>/;
        //   const match = htmlString.match(regex);
        //   if (match) {
        //     const extractedText = match[1];
        //     const _data: Rating = {
        //       ...data,
        //       comment: extractedText,
        //     };

        //   }
        // })}
        onSave={handleSubmit((data: any) => {
          props
            .handleEditProductRating(idDialogRating, data, idRating)
            .finally(() => {
              onClose(idDialogRating);
            });
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
              <div>
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
                    <textarea
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 outline-none
                             border-[1px] border-[#FFAAAF] rounded-md mt-2"
                      placeholder="Để lại bình luận..."
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  </>
                )}
              />
              {/* // ảnh sản phẩm  */}
              {/* <div>
                <p className="text-[#4C4C4C] text-base font-semibold mb-[8px] mt-[23px] max-xl:text-[13px] max-lg:text-xs">
                  Thêm ảnh
                  <span className="text-[#FF0000]">*</span>
</p>
                {/* card */}
              {/* <div
                  className="card w-[100%] py-4 px-9 mt-2 
                                shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                >
                  <Controller
                    control={control}
                    name="CommentImage"
                    render={({}) => (
                      <>
                        <div className="flex max-[1300px]:gap-3">
                          {/* form upload img */}
              {/*    <div className="max-w-max items-center">
                            <label htmlFor="images">
                              <div
                                className="outline-dashed outline-2 outline-offset-2 outline-[#EA4B48] py-7 px-9 cursor-pointer
                                                                 max-xl:px-4 max-[1100px]:py-4 max-[1024px]:p-2 max-[768px]:p-1"
                              >
                                <input
                                  type="file"
                                  // onChange={field.onChange}
                                  onChange={(e: any) =>
                                    loadImageFile(e.target.files)
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
              {/* {props.editImages.map((e) => {
                            return (
                              <>
                                <div className="relative">
                                  <div className="group relative">
                                    <img
                                      src={e.url}
                                      alt="imageproduct6"
                                      width={80}
                                      height={80}
                                      className="rounded-md"
                                    />
                                    <div
className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden rounded-md bg-gray-900 bg-fixed 
                                                            opacity-0 transition duration-300 ease-in-out group-hover:opacity-20"
                                    ></div>
                                    <div className="transition duration-300 ease-in-out bottom-0 left-0 right-0 top-0 opacity-0 group-hover:opacity-100 absolute">
                                      <button
                                        // onClick={() =>
                                        //   props.handleRemoveOnlyIMG(e.id)
                                        // }
                                        onClick={() =>
                                            console.log("an không ?")
                                          }
                                      >
                                        <RemoveIMG />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })} */}
              {/*<div className="justify-center flex flex-1">
                            <div className="inline-grid grid-cols-3 gap-4 relative">
                              {url.map((e) => {
                                return (
                                  <>
                                    <div className="relative">
                                      {loading()}
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
                                          // onClick={() =>
                                          //   props.handleRemoveOnlyIMG()
// }
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
              </div> */}
              {/* end ảnh bình luận sản phẩm  */}
            </div>
            <div className=" border-b-[1px] border-[#E0E0E0] mb-4"></div>
          </>
        }
      />
    </div>
  );
}