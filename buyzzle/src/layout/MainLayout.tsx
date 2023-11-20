import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import CustomToast from "../helper/Toast/CustomToast";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import useCartContext, { CartContext } from "../hooks/Cart/CartContextProvider";
import BuyzzleAvt from "./asset/TSX/BuyzzleAvt";
import NewOrder from "./asset/TSX/NewOrder";

interface Props {
  children?: React.ReactNode;
}
function MainLayout({ children }: Props) {
  const cartCtx = useCartContext();
  //socket Noti adminRole confirmRequestcancelOrder
  const [deletedOrder, setDeletedOrder] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("confirmCancelOrder", (newOrder) => {
      console.log("Received deleted order data:", newOrder);
      toast(
        <CustomToast
          image={<BuyzzleAvt />}
          iconSVG={<NewOrder />}
          name={
            <p className="text-sm font-semibold text-gray-900 ">
              Buyzzle thông báo
            </p>
          }
          content={
            <p className="text-sm font-normal text-[#739072]">
              Yêu cầu hủy đơn của quý khách đã được xác nhận
            </p>
          }
        />,
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
  return (
    <CartContext.Provider value={cartCtx}>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </CartContext.Provider>
  );
}

export default MainLayout;
