import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";

import {router} from "./routes.tsx";

import './index.css'

const reactRootContainer = ReactDOM.createRoot(document.getElementById('root')!)

reactRootContainer.render(
  <React.StrictMode>
    <ChakraProvider>
      <div className='page-container'>
        <RouterProvider router={router}/>
      </div>
    </ChakraProvider>
  </React.StrictMode>
)
