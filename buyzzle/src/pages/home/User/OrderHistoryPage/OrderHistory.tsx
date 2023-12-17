import { IonIcon } from "@ionic/react";
import { Accordion, AccordionBody } from "@material-tailwind/react";
import useThrottle from "@rooks/use-throttle";
import { ReactNode, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowNextHistory from "../../../../Assets/TSX/ArrowNextHistory";
import {
  orderControllers,
  orderModelController,
} from "../../../../controllers/OrderControllers";
import DialogAbortOrder from "../../../../helper/Dialog/DialogAbortOrder";
import { numberFormat } from "../../../../helper/Format";
import { OrderPanigation, StatusOrder } from "../../../../model/OrderModel";
import Container from "../../../../components/container/Container";

import Sitebar from "../UserProfile/Sitebar/Sitebar";
import { dateOrder } from "../../Admin/Management/Order/OrderManagement";
import ArrowDown from "../../Admin/Assets/TSX/ArrowDown";
import EmptyPage from "../../../../helper/Empty/EmptyPage";

export const getStatusOrder = (status: StatusOrder) => {
  let _statusOrder: ReactNode;
  let _paymentStatus: string | undefined;
  switch (status) {
    case StatusOrder.Cancel:
      _statusOrder = <p className="text-red-600">Yêu Cầu Hủy Đơn</p>;
      break;
    case StatusOrder.Comfirm:
      _statusOrder = <p className="text-[#3DC0F8]">Chờ xác nhận</p>;
      break;
    case StatusOrder.Ordered:
      _statusOrder = <p className="text-[#3DC0F8]">Đã đặt hàng</p>;
      break;
    case StatusOrder.WaitingCourier:
      _statusOrder = <p className="text-[#FBC132]">Giao cho ĐVVC</p>;
      break;
    case StatusOrder.recievedCourier:
      _statusOrder = <p className="text-[#FBC132]">ĐVVT đã nhận hàng</p>;
      break;
    case StatusOrder.Shipping:
      _statusOrder = <p className="text-[#FBC132]">Đang giao hàng</p>;
      break;
    case StatusOrder.Succed:
      _statusOrder = <p className="text-[#2fce21]">Giao hàng thành công</p>;
      _paymentStatus = "Đã thanh toán";
      break;
    default:
      _statusOrder = <p className="text-red-600">Đơn hàng đã được hủy</p>;
      break;
  }
  return {
    _statusOrder,
    _paymentStatus,
  };
};

export default function OrderHistory() {
  const [order, setOrder] = useState<OrderPanigation>({} as OrderPanigation);
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [idOrder, setIdOrder] = useState<number | undefined>(0);
  const [open, setOpen] = useState<number>();
  const [orderAPI, setOrderAPI] = useState<orderModelController>(
    {} as orderModelController
  );

  const idRemove = "removeVoucher";
  const idSitebar = "my_modal_3";

  // button filter
  const [changeButton, setChangeButton] = useState([
    {
      id: -1,
      text: "Tất cả",
      active: true,
    },
    {
      id: 1,
      text: "Chờ xác nhận",
      active: false,
    },
    {
      id: 2,
      text: "Đã đặt hàng",
      active: false,
    },
    {
      id: 3,
      text: "Giao cho ĐVVC",
      active: false,
    },
    {
      id: 5,
      text: "Đang giao hàng",
      active: false,
    },
    {
      id: 6,
      text: "Giao hàng thành công",
      active: false,
    },
    {
      id: 0,
      text: "Đã hủy",
      active: false,
    },
  ]);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const openModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };
  const closeModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    if (modal) {
      modal.close();
    }
  };

  useEffect(() => {
    getOrder();
  }, [orderAPI.page, changeButton]);

  const getOrder = async () => {
    await orderControllers
      .getOrderOfUser(orderAPI.page!, orderAPI.status!)
      .then((res) => {
        console.log("🚀 ~ file: OrderHistory.tsx:132 ~ .then ~ res:", res);
        setOrder(res);
      });
  };

  const handlePageChange = (page: number) => {
    setOrderAPI({ ...orderAPI, page: page });
  };

  const abortOrder = async (id: number) => {
    await orderControllers.abortOrder(id);
    toast.success("Đã xác nhận yêu cầu hủy đơn !", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
    closeModal(idRemove);
    getOrder();
  };

  const handleClick = (id: number) => {
    const updatedButtons = changeButton.map((btn) => {
      if (btn.id === id) {
        return { ...btn, active: true };
      } else {
        return { ...btn, active: false };
      }
    });
    setChangeButton(updatedButtons);
    const selectedButton = updatedButtons.find((btn) => btn.id === id);

    if (selectedButton && selectedButton.id !== -1) {
      setOrderAPI({ ...orderAPI, status: selectedButton.id });
    } else {
      setOrderAPI({ ...orderAPI, status: null });
    }
  };

  const [btnFiterThrottle] = useThrottle(handleClick, 1000);

  function getBorderColor(id: number) {
    switch (id) {
      case 0:
        return "#D80032";
      case 1:
        return "#3DC0F8";
      case 2:
        return "#3DC0F8";
      case 3:
        return "#FBC132";
      case 5:
        return "#FBC132";
      case 6:
        return "#2fce21";
      default:
        return "#D80032";
    }
  }
  // const getOrderFilter = async (status: number) => {
  //   notificationControllers
  //     .getFilterNotification(status)
  //     .then((res: any) => {
  //       setNotification(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <Container>
      <div
        className="float-right cursor-pointer max-[1920px]:invisible max-2xl:visible"
        onClick={() => openModal(idSitebar)}
      >
        <IonIcon className="text-[2rem]" name={"menu"}></IonIcon>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className={`col-span-1 `}>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_3" className="max-2xl:modal ">
            <div className="relative">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-1 top-10"
                onClick={() => closeModal(idSitebar)}
              >
                <IonIcon className="text-[1rem]" name={"close"}></IonIcon>
              </button>
              <Sitebar />
            </div>
          </dialog>
          <div className="max-2xl:hidden">
            <Sitebar />
          </div>
        </div>
        {/* Table history order */}
        <div className="flex-col mt-9 col-span-3 max-2xl:col-span-5">
          <h1 className="text-[32px] font-bold mb-4 max-lg:text-[28px] max-[870px]:text-2xl max-[769px]:text-xl">
            Danh Sách Đơn Hàng
          </h1>
          {/* button */}
          <div className="flex my-3 gap-2 justify-around">
            {changeButton.map((btnItems) => {
              return (
                <button
                  className={`bg-white items-center max-w-max px-3 rounded-md h-[36px] transition duration-150`}
                  style={{
                    backgroundColor: "white ",
                    borderColor: btnItems.active
                      ? getBorderColor(btnItems.id)
                      : "",
                    color: btnItems.active ? getBorderColor(btnItems.id) : "",
                    borderWidth: btnItems.active ? "1px" : "",
                  }}
                  onClick={() => {
                    btnFiterThrottle(btnItems.id);
                  }}
                >
                  {btnItems.text}
                </button>
              );
            })}
          </div>
          {/* end button */}
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 max-lg:text-xs">
              <div className=" ">
                <div className=" w-full text-center text-sm max-lg:text-[11px]  z-20 ">
                  <div className="border-b w-full bg-[#FFEAE9] font-medium dark:text-[#4C4C4C]">
                    <div className=" justify-around w-full flex ">
                      <div className=" py-4 max-2xl:text-left ">
                        #ID ĐƠN HÀNG
                      </div>
                      <div className=" py-4">NGÀY TẠO ĐƠN</div>
                      <div className=" py-4">TỔNG PHÍ</div>
                      <div className=" py-4">TRẠNG THÁI</div>
                      <div className=" py-4"></div>
                    </div>
                  </div>
                </div>

                {order?.data?.length > 0 ? (
                  order?.data?.map((e) => {
                    return (
                      <>
                        <Accordion open={open === e.id}>
                          <div
                            className="w-full bg-black"
                            onClick={() => handleOpen(e.id)}
                          >
                            <div className="text-sm bg-black ">
                              <div className="border-b dark:border-neutral-500 bg-white px-4">
                                <div className="cursor-pointer flex items-center py-4 w-full justify-start">
                                  <div className="w-[5%]">
                                    {open === e.id ? (
                                      <ArrowDown />
                                    ) : (
                                      <ArrowNextHistory />
                                    )}
                                  </div>
                                  <div className="w-[24%]">#ID: 000{e.id}</div>
                                  <div className="w-[20%]">
                                    {dateOrder(e.createdAt)}
                                  </div>
                                  <div className="w-[22%] text-center">
                                    {numberFormat(e.amountTotal)} (
                                    {e.OrderDetail.length} SP)
                                  </div>
                                  <div className="w-[16%] text-center">
                                    {e.deletedAt != null ? (
                                      <p>
                                        <p className="text-red-600">
                                          Đơn hàng đã được hủy
                                        </p>
                                      </p>
                                    ) : (
                                      <p>
                                        {getStatusOrder(e.status)._statusOrder}
                                      </p>
                                    )}
                                  </div>
                                  <Link
                                    to={`/orderdetail/${e.id}`}
                                    className="text-[#EA4B48] hover:text-[#ea4b48ad] text-center w-[13%]"
                                  >
                                    Xem chi tiết
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <AccordionBody>
                            <table className="w-full">
                              <thead className="border-b bg-[#F2F2F2] dark:text-[#4C4C4C]">
                                <tr>
                                  <th className=" px-[50px] py-2 w-[40%] text-left font-normal">
                                    Thông tin sản phẩm
                                  </th>
                                  <th className=" px-6 py-2 w-[14%] font-normal">
                                    Giá
                                  </th>
                                  <th className=" px-6 py-2 w-[14%] font-normal max-lg:px-4 max-lg:py-2">
                                    Số lượng
                                  </th>
                                  <th className=" px-6 py-2 w-[14%] font-normal">
                                    Tổng
                                  </th>
                                  <th className=" px-6 py-2 w-[14%] font-normal">
                                    {e.status === 1 || e.status === 2 ? (
                                      <>
                                        {!isOrderCancelled ? (
                                          <p
                                            onClick={() => {
                                              openModal(idRemove);
                                              setIdOrder(e.id);
                                            }}
                                            className="cursor-pointer text-[#EA4B48]"
                                          >
                                            Hủy đơn
                                          </p>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {e.OrderDetail.map((element) => {
                                  console.log(
                                    "🚀 ~ file: OrderHistory.tsx:362 ~ {e.OrderDetail.map ~ element:",
                                    element
                                  );
                                  return (
                                    <>
                                      <tr className="border-b dark:border-[#E0E0E0] text-center">
                                        <td className="flex items-center pl-[50px] py-4 text-left gap-3">
                                          <img
                                            src={element.image}
                                            className="w-[50px] h-[50px] 
                                                   max-lg:h-[35px]  max-lg:w-[35px]
                                                   "
                                            alt="imgProduct"
                                          />
                                          <div>
                                            <p className="text-[#4C4C4C] text-base font-medium max-lg:text-sm">
                                              {element.name}
                                            </p>
                                            <p className="text-[#7A828A] text-xs font-medium mt-1">
                                              Phân loại:{" "}
                                              {element.fK_attributee?.color} -{" "}
                                              {element.fK_attributee?.size}
                                            </p>
                                          </div>
                                        </td>
                                        <td className="whitespace-nowrap  px-6 py-4">
                                          {numberFormat(element.price)}
                                        </td>
                                        <td className="whitespace-nowrap  px-6 py-4">
                                          x{element.quantity}
                                        </td>
                                        <td className="whitespace-nowrap  px-6 py-4">
                                          {numberFormat(element.total)}
                                        </td>
                                        <td className="whitespace-nowrap  px-6 py-4">
                                          {e.status == 5 ? (
                                            <>
                                              <Link
                                                to={`/Detailproducts/${element.productId}`}
                                                className="text-[#EA4B48] hover:text-[#ea4b48ad] text-center w-[13%]"
                                              >
                                                Mua lại
                                              </Link>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </tbody>
                            </table>
                          </AccordionBody>
                        </Accordion>
                      </>
                    );
                  })
                ) : (
                  <>
                    <EmptyPage title="Chưa có đơn hàng!" />
                  </>
                )}

                <DialogAbortOrder
                  onClose={() => closeModal(idRemove)}
                  title="Hủy đơn hàng này"
                  desc="Bạn chắc chắn muốn hủy đơn hàng này?"
                  onSave={() => {
                    abortOrder(idOrder!);
                    setIsOrderCancelled(true);
                  }}
                  id={idRemove}
                  input={
                    <div
                      className={`flex justify-between items-center rounded-[6px] px-[15px] py-[9px] mb-5 border-[1px] border-[#FFAAAF]`}
                    >
                      <input
                        className="focus:outline-none text-[#333333] text-sm font-medium placeholder-[#7A828A] w-[100%]
                        max-xl:text-sm  max-lg:text-[13px]"
                        placeholder="Lý do (Có thể bỏ trống)"
                      />
                    </div>
                  }
                />
              </div>
            </div>
            <ResponsivePagination
              current={orderAPI.page!}
              total={order.totalPage}
              onPageChange={handlePageChange}
              maxWidth={500}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
