import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import path from "../services/path";
import Home from "../pages/home/Home"

export default function useRouterElement() {
    const routes = useRoutes([
      {
        path: "/",
        element: (
          <MainLayout>
            <Home />
          </MainLayout>
        ),
      },
      // {
      //   path: path.details,
      //   element: (
      //     <MainLayout>
      //       <Details />
      //     </MainLayout>
      //   ),
      // },
    ]);
  return routes;
}