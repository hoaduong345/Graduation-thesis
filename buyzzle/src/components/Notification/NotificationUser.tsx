import { Images } from "../../assets/TS";
import { useNotificationUser } from "../../hooks/Notification/NotificationContextUser";
import BuyzzleAvt from "../../layout/asset/TSX/BuyzzleAvt";
import CancelOrder from "../../layout/asset/TSX/CancelOrder";
import NewOrder from "../../layout/asset/TSX/NewOrder";
import { handleSeenNoti } from "./components/SeenNoti";

export default function NotificationUser() {
  const { notificationUser } = useNotificationUser();

  return (
    <div className="header-view top-full absolute w-[355px] invisible z-20 overflow-y-auto h-[600px] scroll-smooth">
      <div
        className="bg-white p-4
      shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
      >
        <p className="font-extrabold text-xl text-[#EA4B48] ">Thông báo</p>
        <div className=" border-b-[1px] mt-2"></div>
        {/* BUTTON */}

        {/* END BUTTON */}
        <div className="flex flex-col gap-3">
          {/* map Noti */}
          {notificationUser?.length > 0 ? (
            notificationUser.map((notiItems) => {
              return (
                <a
                  href={`/orderdetail/${notiItems.orderId}`}
                  onClick={() => handleSeenNoti(notiItems.id)}
                >
                  <>
                    <div className="flex gap-2 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
                      <div className="items-center flex gap-3">
                        <div className="p-1 relative">
                          {notiItems.status == 4 ? (
                            <>
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
                            Buyzzle thông báo
                          </div>
                          {notiItems.status === 4 ? (
                            <p
                              className={`${
                                notiItems.seen === false
                                  ? "text-[#739072] text-xs font-semibold"
                                  : "text-[#739072] text-xs font-semibold opacity-70"
                              }`}
                            >
                              Yêu cầu hủy đơn của quý khách đã được xác nhận
                            </p>
                          ) : (
                            <p
                              className={`${
                                notiItems.seen === false
                                  ? "text-red-700 text-xs font-semibold"
                                  : "text-red-700 text-xs font-semibold opacity-70"
                              }`}
                            >
                              Yêu cầu hủy đơn của quý khách đã bị từ chối
                            </p>
                          )}
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
