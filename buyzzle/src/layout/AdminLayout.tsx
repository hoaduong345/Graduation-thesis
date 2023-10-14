import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";

function AdminLayout() {
   return (
      <div>
         <HeaderAdmin />
         <Outlet />
      </div>
   );
}

export default AdminLayout;
