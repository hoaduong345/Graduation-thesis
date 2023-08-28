import {useRoutes} from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/home/HomePage"
import ProductsPage from "../pages/home/ProductsPage";
import FiltersPage from "../pages/home/FiltersPage";

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
    ]);
    return routes;
}