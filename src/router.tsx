import {createBrowserRouter} from "react-router-dom"
import LoginPage from "./pages/Login.tsx";
import HomePage from "./pages/Home.tsx";


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
        element:<HomePage/> // This is the element associated with above path.
    },
    {
        path:"/login",
        element:<LoginPage/>
    }
])

