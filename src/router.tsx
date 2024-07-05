import {createBrowserRouter} from "react-router-dom"
// import LoginPage from "./pages/Login.tsx";
import HomePage from "./pages/DashHome.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import BooksPage from "./pages/BooksPage.tsx";
import CreateBook from "./pages/CreateBook.tsx";
import MainHome from "./pages/MainHome.tsx";
import HomeLayout from "./layouts/HomeLayout.tsx";
import SingleBook from "./pages/SingleBook.tsx";


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
        path:"/",
        element:<HomeLayout/>,
        children:[
            {
                path: "home",
                element: <MainHome/>
            },
            {
                path: "home/book/:id",
                element: <SingleBook/>
            }
        ]
    },
    {
        // This is Nested Route
        // Make sure we have used the <Outlet> Component in the parent component
        // So that on change in route will change the content to.
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
            },
            {
                path:"books/update/:id",
                element:<CreateBook/>
            }
        ]
    },
])

