import { useRoutes } from "react-router-dom"
import MainLayout from "../layout/MainLayout"

import Register from "../pages/register/Register";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import Login from "../pages/login/Login";
import AddproductsPage from "../pages/home/Admin/AddproductsPage";
import ListproductsAdmin from "../pages/home/Admin/ListProduct/Listproducts";
import Editproductspage from "../pages/home/Admin/Editproductspage";
import HomePage from "../pages/home/User/HomePage";
import ProductsPage from "../pages/home/User/ProductsPage";
import FiltersPage from "../pages/home/User/FilterPage/FiltersPage";


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
      path: "/ProductsPage",
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
    // AdminPages
    {
      path: "/AddProducts",
      element: (
        <MainLayout>
          <AddproductsPage />
        </MainLayout>
      ),
    },
    {
      path: "/Editproductspage",
      element: (
        <MainLayout>
          <Editproductspage />
        </MainLayout>
      ),
    },
    {
      path: "/ListproductsAdmin",
      element: (
        <MainLayout>
          <ListproductsAdmin />
        </MainLayout>
      ),
    },
  ]);
  return routes;
}