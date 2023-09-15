import { Navigate, useRoutes } from "react-router-dom"
import MainLayout from "../layout/MainLayout"

import Register from "../pages/register/Register";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import Login from "../pages/login/Login";
import AddproductsPage from "../pages/home/Admin/AddproductsPage";
import ListproductsAdmin from "../pages/home/Admin/ListProduct/Listproducts";
import HomePage from "../pages/home/User/HomePage";
import ProductsPage from "../pages/home/User/ProductsPage";
import FiltersPage from "../pages/home/User/FilterPage/FiltersPage";
import Addproducts from "../pages/home/Admin/Addproducts";
import Editproducts from "../pages/home/Admin/Editproducts";
import Detailproducts from "../pages/home/Admin/Detailproducts";
import AdminLayout from "../layout/AdminLayout";


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
      path: "/products",
      element: (
        <MainLayout>
          <ProductsPage />
        </MainLayout>
      ),
    },
    {
      path: "/FiltersPage",
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
      path: "Detailproducts/:id",
      element: (
        <Detailproducts />
      ),
    },


    // AdminPages
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [{
        index: true,
        element: <Navigate to={'Addproductspage'} />
      }, {
        path: "Addproductspage",
        element: (
          <Addproducts />
        ),
      },
      {
        path: "Editproductspage",
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
      },]
    }

  ]);
  return routes;
}