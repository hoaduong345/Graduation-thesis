import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Footer from "../components/Footer/Footer";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import { Images } from "../Assets/TS";

function AdminLayout() {
  const [deletedOrder, setDeletedOrder] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("requestdelete", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast.error(
        <div className="flex gap-2 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
          <div className="items-center flex gap-3">
            <div className="p-1">
              <img
                src={Images.avatar_admin}
                alt="avatar_admin"
                width={45}
                height={45}
              />
            </div>
            <div>
              <p className="text-red-600 text-xs">Có yêu cầu hủy đơn từ: </p>
              <div className="text-xs font-semibold text-black">
                Nguyen Viet Thang
              </div>
            </div>
          </div>
        </div>,
        {
          position: "bottom-left",
          autoClose: 10000,
          closeButton: true,
        }
      );
      setDeletedOrder(newOrder);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("newOrder", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast.info(
        <div className="flex gap-2 hover:bg-slate-200 hover:rounded-md hover:duration-500 cursor-default">
          <div className="items-center flex gap-3">
            <div className="p-1">
              <img
                src={Images.avatar_admin}
                alt="avatar_admin"
                width={45}
                height={45}
              />
            </div>
            <div>
              <p className="text-[#3DC0F8] text-xs">Có đơn hàng mới từ: </p>
              <div className="text-xs font-semibold text-black">
                Nguyen Viet Thang
              </div>
            </div>
          </div>
        </div>,
        {
          position: "bottom-left",
          autoClose: 5000,
        }
      );
      setDeletedOrder(newOrder);
    });
    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  }, []);
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AdminLayout;
