import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home.jsx'
import Jewellery from './category/Jewellery.jsx'
import Men from './category/Men.jsx'
import Electronic from './category/Electronic.jsx'
import Women from './category/Women.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "jewellery",
        element: <Jewellery/>
      },
      {
        path: "men",
        element: <Men/>
      },
      {
        path: "women",
        element: <Women/>
      },
      {
        path: "electronic",
        element: <Electronic/>
      },
     
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)