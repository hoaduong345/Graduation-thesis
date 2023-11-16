import { useEffect, useState } from "react";
import { notificationControllers } from "../../Controllers/NotificationController";
import { AllNotification } from "../../Model/Notification";
import { Images } from "../../Assets/TS";
import NewOrder from "../../layout/asset/TSX/NewOrder";
import CancelOrder from "../../layout/asset/TSX/CancelOrder";

export default function NotificationAdmin() {
  const [notification, setNotification] = useState<AllNotification[]>([]);

  const [changeButton, setChangeButton] = useState([
    {
      id: 0,
      text: "Tất cả",
      active: true,
    },
    {
      id: 1,
      text: "Đặt hàng",
      active: false,
    },
    {
      id: 2,
      text: "Hủy hàng",
      active: false,
    },
  ]);
  const handleClick = (id: number) => {
    console.log("🚀 ~ file: Notification.tsx:27 ~ handleClick ~ id:", id);
    const updatedButtons = changeButton.map((btn) => {
      if (btn.id === id) {
        console.log(
          "🚀 ~ file: OrderManagement.tsx:91 ~ updatedButtons ~ btn.id:",
          btn.id
        );
        return { ...btn, active: true };
      } else {
        return { ...btn, active: false };
      }
    });
    setChangeButton(updatedButtons);
    if (id == 0) {
      getAllNoti();
    } else {
      getOrderFilter(id);
    }
  };
  function getBorderColor(id: number) {
    switch (id) {
      case 0:
        return "#570DF8";
      case 1:
        return "#3DC0F8";
      case 2:
        return "#EA4B48";
      default:
        return "#ccc";
    }
  }
  useEffect(() => {
    getAllNoti();
  }, []);
  const getAllNoti = async () => {
    await notificationControllers
      .getAllNotificationAdmin()
      .then((res) => {
        console.log(
          "🚀 ~ file: Notification.tsx:54 ~ awaitnotificationControllers.getAllNotification ~ res:",
          res
        );
        setNotification(res.allNotification);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOrderFilter = async (status: number) => {
    notificationControllers
      .getFilterNotification(status)
      .then((res: any) => {
        setNotification(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSeenNoti = async (id: number) => {
    await notificationControllers
      .getSeenNotification(id)
      .then((_) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="header-view top-full absolute w-[355px] invisible z-20 overflow-y-auto h-[600px] scroll-smooth">
      <div
        className="bg-white p-4
      shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
      >
        <p className="font-extrabold text-xl text-[#EA4B48] ">Thông báo</p>
        <div className=" border-b-[1px] mt-2"></div>
        {/* BUTTON */}
        <div className="flex my-3 gap-2">
          {changeButton.map((btnItems) => {
            return (
              <button
                className={`bg-white items-center w-[80px] rounded-md h-[36px] transition duration-150`}
                style={{
                  backgroundColor: "white ",
                  borderColor: btnItems.active
                    ? getBorderColor(btnItems.id)
                    : "",
                  color: btnItems.active ? getBorderColor(btnItems.id) : "",
                  borderWidth: btnItems.active ? "1px" : "",
                }}
                onClick={() => {
                  handleClick(btnItems.id);
                }}
              >
                {btnItems.text}
              </button>
            );
          })}
        </div>
        {/* END BUTTON */}
        <div className="flex flex-col gap-3">
          {/* map Noti */}
          {notification.length > 0 ? (
            notification.map((notiItems) => {
              return (
                <a
                  href={`/admin/ordermanagement/${notiItems.orderId}`}
                  onClick={() => handleSeenNoti(notiItems.id)}
                >
                  <>
                    <div className="flex gap-7 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
                      <div className="items-center flex gap-3">
                        <div className="p-1 relative">
                          {notiItems.status == 1 ? (
                            <>
                              <img
                                // src={notiItems.fk_order.User.image}
                                src={Images.avatar_admin}
                                alt="avatar_admin"
                                className={`w-12 h-12 rounded-full ${
                                  notiItems.seen === false ? "" : "opacity-70"
                                }`}
                              />
                              <div
                                className={`${
                                  notiItems.seen === false ? "" : "opacity-80"
                                }`}
                              >
                                <NewOrder />
                              </div>
                            </>
                          ) : (
                            <>
                              <img
                                // src={notiItems.fk_order.User.image}
                                src={Images.avatar_admin}
                                alt="avatar_admin"
                                className={`w-12 h-12 rounded-full ${
                                  notiItems.seen === false ? "" : "opacity-70"
                                }`}
                              />
                              <div
                                className={`${
                                  notiItems.seen === false ? "" : "opacity-80"
                                }`}
                              >
                                <CancelOrder />
                              </div>
                            </>
                          )}
                        </div>
                        <div>
                          <div
                            className={`${
                              notiItems.seen === false
                                ? "text-sm font-semibold text-black"
                                : "text-sm font-semibold text-black opacity-70"
                            }`}
                          >
                            {notiItems.fk_order.User.name}
                          </div>
                          {notiItems.status === 1 ? (
                            <p
                              className={`${
                                notiItems.seen === false
                                  ? "text-[#739072] text-xs font-semibold"
                                  : "text-[#739072] text-xs font-semibold opacity-70"
                              }`}
                            >
                              Đã đặt 1 đơn hàng mới
                            </p>
                          ) : (
                            <p
                              className={`${
                                notiItems.seen === false
                                  ? "text-red-700 text-xs font-semibold"
                                  : "text-red-700 text-xs font-semibold opacity-70"
                              }`}
                            >
                              Yêu cầu hủy đơn hàng
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 my-2">
                        <span
                          className={`${
                            notiItems.seen === false
                              ? "text-slate-500 text-xs inline-flex items-center rounded"
                              : "text-slate-500 text-xs inline-flex items-center rounded opacity-70"
                          }`}
                        >
                          {notiItems.status === 1 ? (
                            <svg
                              className="w-2 h-2 me-1.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                          ) : (
                            <svg
                              className="w-2 h-2 me-1.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                          )}
                          2 phút trước
                        </span>
                        {notiItems.seen == false ? (
                          <div className="rounded-full border-[5px] w-0 border-[#2E89FF] justify-end"></div>
                        ) : (
                          <div className="invisible"></div>
                        )}
                      </div>
                    </div>
                  </>
                </a>
              );
            })
          ) : (
            <></>
          )}
          {/* end map Noti */}
        </div>
      </div>
    </div>
  );
}
