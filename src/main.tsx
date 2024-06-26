import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import './index.css'
import {router} from "./router.tsx"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

/**
 * Creating the instance of the "QueryClient" aka "React Query".
 * Which is used to manage the data fetching, caching and UI synchronization with the server data.
 */
const queryClient:QueryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/* Defining the application to use the Query Client as well as specifying which
      Instance of Query Client to use by passing to the "client" prop
      Note: Make sure the "QueryClientProvider" Cover the whole application.
      */}
      {/*Query Client is used to handle data fetching , caching as well as keep our UI updated with the data*/}
      <QueryClientProvider client={queryClient}>
        {/*  Defining the React application to use the Router Instance we have defined.
            To do that we will use the RouterProvider which will specify the router instance which
            we want to use.
        */}
        {/*  This is also the Entry Point*/}
        <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>,
)
