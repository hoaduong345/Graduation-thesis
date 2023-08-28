import {useRoutes} from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/home/Home"

export default function useRouterEmelent() {
    const routes = useRoutes([
        {
            path: "/",
            element: (
              <MainLayout>
                <Home />
              </MainLayout>
            ),
        }

    ])
    return routes;
}