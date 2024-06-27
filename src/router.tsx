import {createBrowserRouter} from "react-router-dom"
import LoginPage from "./pages/Login.tsx";
import HomePage from "./pages/Home.tsx";
import RegisterPage from "./pages/Register.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import BooksPage from "./pages/BooksPage.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import CreateBook from "./pages/CreateBook.tsx";


/**
 * Well this is a new way of defining the routes for react application.
 * Where we will create an instance of the react-router-dom router
 * by passing the array of routes where each route is an object containing the path and
 * element associated with the path.
 * Which will be implemented when that route is accessed.
 * Note: All this is for the client side routing.
 */
    // This will create an instance of BrowserRouter.
export const router = createBrowserRouter([
    {
        // This is Nested Route
        path:"dashboard",
        element: <DashboardLayout/>, // This is the element associated with above path.
        children:[
            {
                // Don't Put the "/"(Slash)
                path:"home",
                element:<HomePage/>
            },
            {
                path:"books",
                element:<BooksPage/>
            },
            {
                path:"books/create",
                element:<CreateBook/>
            }
        ]
    },
    {
        path:"auth",
        element:<AuthLayout/>,
        children:[
            {
                path:"login",
                element:<LoginPage/>
            },
            {
                path:"register",
                element:<RegisterPage/>
            }
        ]

    }
])

