import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";

function ShippingLayout() {
   return (
      <div>
         <HeaderAdmin />
         <Outlet />
      </div>
   );
}

export default ShippingLayout;
