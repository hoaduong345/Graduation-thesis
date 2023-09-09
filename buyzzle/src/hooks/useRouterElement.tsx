import { useRoutes } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/home/HomePage"
import ProductsPage from "../pages/home/ProductsPage";
import FiltersPage from "../pages/home/FiltersPage";
import Register from "../pages/register/Register";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";
import Login from "../pages/login/Login";
import AddProduct from "../pages/product/AddProduct";
import AddCategory from "../pages/product/AddCategory";


export default function useRouterEmelent() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <Home />
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
      path: "/ProductsPage/AddProducts",
      element: (
        <MainLayout>
          <AddProduct />
        </MainLayout>
      ),
    },
    {
      path: "/ProductsPage/AddCategory",
      element: (
        <MainLayout>
          <AddCategory />
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
  ]);
  return routes;
}