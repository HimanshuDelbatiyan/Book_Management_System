import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import './index.css'
import {router} from "./router.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*  Defining the React application to use the Router Instance we have defined.
        To do that we will use the RouterProvider which will specify the router instance which
        we want to use.
    */}
    {/*  This is also the Entry Point*/}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
