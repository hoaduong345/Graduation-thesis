import { useRoutes } from "react-router-dom"
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
import UserProfile from "../pages/home/User/UserProfile/UserProfile";
const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
} // our location object from earlier
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
      path: "/UserProfilePage",
      element: (
        <MainLayout>
          <UserProfile />
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
      path: "/Addproductspage",
      element: (
        <MainLayout>
          <Addproducts />
        </MainLayout>
      ),
    },
    {
      path: "/Editproductspage",
      element: (
        <MainLayout>
          <Editproducts />
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
    {
      path: "/Detailproducts/:id",
      element: (
        <MainLayout>
          <Detailproducts />
        </MainLayout>
      ),
    },


  ]);
  return routes;
}