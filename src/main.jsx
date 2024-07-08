import React from 'react'
import ReactDOM from 'react-dom/client'
import pages from './pages/index.js';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css'
import Navbar from './components/Navbar.jsx'

const BrowserRouter = createBrowserRouter([
  {
    path: "/login",
    element: <pages.login/>
  },
  {
    path: "/home",
    element: <>
      <Navbar/>
      <pages.home/>
    </>,
  },
  {
    path: "/home/folder/:folder",
    element: <>
      <Navbar/>
      <pages.home/>
    </>,
  },
  {
    path: "/editor/:vid",
    element: <>
      <Navbar/>
      <pages.editorPage/>
    </>,
  },
  {
    path: "/signup",
    element: <pages.signup/>
  },
  {
    errorElement: <>
      <Navbar/>
      <pages.error/>
    </>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>,
)
