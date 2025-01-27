import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import HomePage from './Components/MainComponent/HomePage.jsx'
import VideoPage from './Components/VideoComponent/VideoPage.jsx';
import UploadVideo from './Components/UploadVideo/UploadVideo.jsx';
import Login from './Components/UserSection/Login.jsx';
import Signup from './Components/UserSection/Signup.jsx';
import ViewUserChannel from './Components/UserChannel/ViewUserChannel.jsx';

const router=createBrowserRouter([
   {
    path:'/',
    element:<HomePage/>,
   },
   {
    path:'/watch/:id',
    element:<VideoPage/>
   },
   {
    path:'/upload',
    element:<UploadVideo/>
   },
   {
    path:'/user/login',
    element:<Login/>
   },
   {
    path:'/user/signup',
    element:<Signup/>
   },
   {
    path:'/user/channel/:userid',
    element:<ViewUserChannel/>
   }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
