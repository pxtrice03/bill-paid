import AppLayout from "@/layout/AppLayout"
import ErrorPage from "@/pages/ErrorPage"
import Home from "@/pages/Home"
import { createBrowserRouter } from "react-router"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])

export default routes