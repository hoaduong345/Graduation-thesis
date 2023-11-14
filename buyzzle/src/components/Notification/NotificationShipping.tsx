import React, { useEffect, useState } from "react";
import CancelOrder from "../../layout/asset/TSX/CancelOrder";
import { Images } from "../../Assets/TS";
import NewOrder from "../../layout/asset/TSX/NewOrder";
import BuyzzleAvt from "../../layout/asset/TSX/BuyzzleAvt";
import { AllNotification } from "../../Model/Notification";
import { notificationControllers } from "../../Controllers/NotificationController";

export default function NotificationShipping() {
  const [notification, setNotification] = useState<AllNotification[]>([]);

  useEffect(() => {
    getAllNoti();
  }, []);
  const getAllNoti = async () => {
    await notificationControllers
      .getAllNotificationShipping()
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
        <div className="flex flex-col gap-3">
          {/* map Noti */}
          {notification.length > 0 ? (
            notification.map((notiItems) => {
              return (
                <a
                  href={`/shipping/detail/${notiItems.orderId}`}
                  onClick={() => handleSeenNoti(notiItems.id)}
                >
                  <>
                    <div className="flex gap-2 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
                      <div className="items-center flex gap-3">
                        <div className="p-1 relative">
                          <div
                            className={`${
                              notiItems.seen === false ? "" : "opacity-70"
                            }`}
                          >
                            <BuyzzleAvt />
                          </div>
                          <div
                            className={`${
                              notiItems.seen === false ? "" : "opacity-80"
                            }`}
                          >
                            <NewOrder />
                          </div>
                        </div>
                        <div>
                          <div
                            className={`${
                              notiItems.seen === false
                                ? "text-sm font-semibold text-black"
                                : "text-sm font-semibold text-black opacity-70"
                            }`}
                          >
                            Buyzzle thông báo
                          </div>
                          <p
                            className={`${
                              notiItems.seen === false
                                ? "text-[#739072] text-xs font-semibold"
                                : "text-[#739072] text-xs font-semibold opacity-70"
                            }`}
                          >
                            Có đơn hàng mới từ Buyzzle
                          </p>
                        </div>
                      </div>
                      <div className="my-auto">
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
