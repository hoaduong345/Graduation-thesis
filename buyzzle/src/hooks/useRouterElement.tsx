import { Navigate, useRoutes } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Register from "../pages/register/Register";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import Login from "../pages/login/Login";
import ListproductsAdmin from "../pages/home/Admin/ListProduct/Listproducts";
import HomePage from "../pages/home/User/HomePage";
import ProductsPage from "../pages/home/User/ProductsPage";
import FiltersPage from "../pages/home/User/FilterPage/FiltersPage";
// import Addproducts from "../pages/home/Admin/Addproducts";
import Editproducts from "../pages/home/Admin/EditProduct/Editproducts";
// import Detailproducts from "../pages/home/Admin/Detailproducts";
import UserProfile from "../pages/home/User/UserProfile/UserProfile";
import AdminLayout from "../layout/AdminLayout";
import ConfirmAccount from "../pages/confirmAccount/ConfirmAccount";
import Forgotpassword from "../pages/forgotpassword/Forgotpassword";
import Resetpassword from "../pages/forgotpassword/Resetpassword";
import path from "../contants/path";
import Addproducts from "../pages/home/Admin/Addproduct/Addproducts";
import Category from "../pages/home/Admin/Category/Category";
import Detailproducts from "../pages/home/User/DetailProduct/Detailproducts";
import Cart from "../pages/home/User/CartPage/Cart";
import OrderHistory from "../pages/home/User/OrderHistoryPage/OrderHistory";
import CheckOut from "../pages/home/User/CheckoutPage/CheckOut";
import OrderDetailPage from "../pages/home/User/OrderDetail/OrderDetailPage";


export default function useRouterEmelent() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },

    {
      path: "/userprofilepage/:username",
      element: (
        <MainLayout>
          <UserProfile />
        </MainLayout>
      ),
    },

    
    {
      path: "/products",
      element: (
        <MainLayout>
          <ProductsPage />
        </MainLayout>
      ),
    },
    {
      path: "/FiltersPage/:id",
      element: (
        <MainLayout>
          <FiltersPage />
        </MainLayout>
      ),
    },

  

    {
      path: "/register",
      element: (
        <RegisterLoginLayout>
          <Register />
        </RegisterLoginLayout>

      ),
    },
    {
      path: "/login",
      element: (
        <RegisterLoginLayout>
          <Login />
        </RegisterLoginLayout>

      ),
    },

    {
      path: "/forgotpassword",
      element: (
        <RegisterLoginLayout>
          <Forgotpassword />
        </RegisterLoginLayout>

      ),
    },
    {
      path: "detailproducts/:id",
      element: (
        <MainLayout>
          <Detailproducts />
        </MainLayout>
      ),
    },
    {
      path: "Cart",
      element: (
        <MainLayout>
          <Cart />
        </MainLayout>
      ),
    },
    {
      path: "orderhistory",
      element: (
        <MainLayout>
          <OrderHistory />
        </MainLayout>
      ),
    },
    {
      path: "checkout",
      element: (
        <MainLayout>
          <CheckOut />
        </MainLayout>
      ),
    },
    {
      path: "orderdetail",
      element: (
        <MainLayout>
          <OrderDetailPage />
        </MainLayout>
      ),
    },
    {
      path: path.confirmAccount,
      element: (
        <RegisterLoginLayout>
          <ConfirmAccount />
        </RegisterLoginLayout>

      ),
    },
    {
      path: "/userprofilepage/:username",
      element: (
        <MainLayout>
          <UserProfile />
        </MainLayout>
      ),
    },

    // AdminPages
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [{
        index: true,
        element: <Navigate to={'Addproductspage'} />
      },
      {
        path: "Addproductspage",
        element: (
          <Addproducts />
        ),
      },
   
      {
        path: "updateproduct/:id",
        element: (
          <Editproducts />
        ),
      },
      {
        path: "ListproductsAdmin",
        element: (
          <ListproductsAdmin />
        ),
      },

      {
        path: "Detailproducts/:id",
        element: (
          <Detailproducts />
        ),
      },
      {
        path: "category",
        element: (
          <Category />
        ),
      },]
    },

    {
      path: path.resetpassword,
      element: (
        <RegisterLoginLayout>
          <Resetpassword />
          <ConfirmAccount />
        </RegisterLoginLayout>

      ),
    },

  ]);
  return routes;
}