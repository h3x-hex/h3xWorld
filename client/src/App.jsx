import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StarsCanvas from './components/Stars'
import { useMediaQuery } from 'react-responsive'
import Login from './Routes/Login'
import Home from './Routes/Home'
import Protected from './Routes/Protected'
import Register from './Routes/Register'
import Profile from './Routes/Profile'
import Admin from './Routes/Admin'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import Shop from './Routes/Shop'
import Spaces from './Routes/Spaces'
import Card from './Routes/Card'
import Wallet from './Routes/Wallet'



function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<Protected><Home/></Protected>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:":username",
      element:<Profile/>
    },
    {
      path:"/admin",
      element:<Protected><Admin/></Protected>
    },
    {
      path:"/:username/shop",
      element:<Protected><Shop/></Protected>
    },
    {
      path:"/:username/spaces",
      element:<Spaces/>
    },
    {
      path:"/h3xCard",
      element:<Card/>
    },
    {
      path:"/wallet",
      element:<Wallet/>
    },
    {
      path:"/settings/:username",
      element:<Protected><Profile/></Protected>
    },
    
  ])

  return (
    <>
      <AuthContext>
        <RouterProvider router={router}></RouterProvider>
      </AuthContext>
    </>
  )
}

export default App
