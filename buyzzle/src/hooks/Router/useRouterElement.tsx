import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Register from "../../pages/register/Register";
import RegisterLoginLayout from "../../layout/RegisterLoginLayout";
import Login from "../../pages/login/Login";
import ListproductsAdmin from "../../pages/home/Admin/ListProduct/Listproducts";
import HomePage from "../../pages/home/User/HomePage";
import ProductsPage from "../../pages/home/User/ProductsPage";
import FiltersPage from "../../pages/home/User/FilterPage/FiltersPage";
// import Addproducts from "../pages/home/Admin/Addproducts";
import Editproducts from "../../pages/home/Admin/EditProduct/Editproducts";
// import Detailproducts from "../pages/home/Admin/Detailproducts";
import UserProfile from "../../pages/home/User/UserProfile/UserProfile";
import AdminLayout from "../../layout/AdminLayout";
import ConfirmAccount from "../../pages/confirmAccount/ConfirmAccount";
import Forgotpassword from "../../pages/forgotpassword/Forgotpassword";
import ChangePassword from "../../pages/forgotpassword/Resetpassword";
import path from "../../contants/path";
import Addproducts from "../../pages/home/Admin/Addproduct/Addproducts";
import Cart from "../../pages/home/User/CartPage/Cart";
import OrderHistory from "../../pages/home/User/OrderHistoryPage/OrderHistory";
import CheckOut from "../../pages/home/User/CheckoutPage/CheckOut";
import OrderDetailPage from "../../pages/home/User/OrderDetail/OrderDetailPage";
import VoucherPage from "../../pages/home/Admin/Management/Voucher/VoucherPage";
import Category from "../../pages/home/Admin/Management/Category/Category";
import User from "../../pages/home/Admin/Management/User/User";
import DetailsProduct from "../../pages/home/User/DetailProduct/DetailProductPage/DetailsProduct";
import DetailUser from "../../pages/home/Admin/DetailUser/DetailUser";
import VoucherUserPage from "../../pages/home/User/voucherPage/VoucherPage";
import InvoicesPage from "../../pages/home/User/InvoicesPage/InvoicesPage";
import VoucherHomePage from "../../components/home/components/Voucher/Voucher";
import OrderManagement from "../../pages/home/Admin/Management/Order/OrderManagement";
import LoginAdmin from "../../pages/home/Admin/LoginAdmin/AdminLogin";
import AdminProfile from "../../pages/home/Admin/AdminProfile/AdminProfile";
import StatisticsPage from "../../pages/home/Admin/Statistics/StatisticsPage";
import DetailOrderManagement from "../../pages/home/Admin/Management/Order/DetailOrderManagement";
import Admin from "../../pages/home/Admin/Management/Admin/Admin";
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
         path: "/FiltersPage/",
         element: (
            <MainLayout>
               <FiltersPage />
            </MainLayout>
         ),
      },
      // {
      //   path: "/FiltersPage/:text",
      //   element: (
      //     <MainLayout>
      //       <FiltersPage />
      //     </MainLayout>
      //   ),
      // },

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
          <DetailsProduct />
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
          <DetailsProduct />
        </MainLayout>
      ),
    },
    {
      path: "cart",
      element: (
        <MainLayout>
          <Cart />
        </MainLayout>
      ),
    },
    // {
    //   path: "voucher",
    //   element: (
    //     <MainLayout>
    //       <VoucherUserPage />
    //     </MainLayout>
    //   ),
    // },
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
      path: "orderdetail/:id",
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
          <DetailsProduct />
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
      path: "voucher",
      element: (
        <MainLayout>
          <VoucherHomePage />
        </MainLayout>
      ),
    },
    {
      path: "uservoucherstorage",
      element: (
        <MainLayout>
          <VoucherUserPage />
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
          <DetailsProduct />
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
      path: "voucher",
      element: (
        <MainLayout>
          <VoucherHomePage />
        </MainLayout>
      ),
    },
    {
      path: "uservoucherstorage",
      element: (
        <MainLayout>
          <VoucherUserPage />
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
          <DetailsProduct />
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
          <DetailsProduct />
        </MainLayout>
      ),
    },
    {
      path: "cart",
      element: (
        <MainLayout>
          <Cart />
        </MainLayout>
      ),
    },
    // {
    //   path: "voucher",
    //   element: (
    //     <MainLayout>
    //       <VoucherUserPage />
    //     </MainLayout>
    //   ),
    // },
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
      children: [
        {
          index: true,
          element: <Navigate to={"Addproductspage"} />,
        },
        {
          path: "Addproductspage",
          element: <Addproducts />,
        },
        {
          path: "adminprofile/:username",
          element: <AdminProfile />,
        },

            {
               path: "updateproduct/:id",
               element: <Editproducts />,
            },
            {
               path: "ListproductsAdmin",
               element: <ListproductsAdmin />,
            },

        {
          path: "Detailproducts/:id",
          element: <DetailsProduct />,
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "voucher",
          element: <VoucherPage />,
        },
        {
          path: "detailuser/:username",
          element: <DetailUser />,
        },
        {
          path: "ordermanagement",
          element: <OrderManagement />,
        },
        {
          path: "ordermanagement/:id",
          element: <DetailOrderManagement />,
        },
        {
          path: "usersmanager",
          element: <User />,
        },
        {
          path: "statisticspage",
          element: <StatisticsPage />,
        },
        {
          path: "invoice/:id",
          element: <InvoicesPage />,
        },
        {
          path: "adminmanager",
          element: <Admin />,
        },
      ],
    },

      {
         path: path.resetpassword,
         element: (
            <RegisterLoginLayout>
               <ChangePassword />
               <ConfirmAccount />
            </RegisterLoginLayout>
         ),
      },
   ]);
   return routes;
}
