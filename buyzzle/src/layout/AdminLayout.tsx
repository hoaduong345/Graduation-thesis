import { Outlet } from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import Footer from "../components/Footer/Footer";

function AdminLayout() {
   return (
      <div>
         <HeaderAdmin />
         <Outlet />
         <Footer />
      </div>
   );
}

export default AdminLayout;
