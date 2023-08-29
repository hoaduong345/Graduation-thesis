import { useRoutes } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/home/HomePage"
import ProductsPage from "../pages/home/ProductsPage";
import FiltersPage from "../pages/home/FiltersPage";
import Register from "../pages/register/Register";
import RegisterLoginLayout from "../layout/RegisterLoginLayout";


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
  ]);
  return routes;
}