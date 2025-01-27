import { useState } from "react";
import Header from "../MainComponent/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { BiLoaderCircle } from "react-icons/bi";

function Login() {
  const [login,setLogin]=useState({"username":"","password":""})
  let [loading, setLoading] = useState(false);
  let navigat=useNavigate()
  console.log(login)

  // hanle login field
   function handleLogin(e,name){
    setLogin({
      ...login,[name]:e.target.value
    })
   }

  //  handle the login user data by send the serevr and store the user information like login Userid, profileavtar, jWT tokens
   async function handleLoginUser() {
    setLoading(true)
    axios.post('http://localhost:5000/user/login',login,{withCredentials:true}).then((res)=>{
      setLoading(false)
      // console.log(res)
      localStorage.setItem('token',res.data.tokens)
      localStorage.setItem('userId',res.data.user._id)
      localStorage.setItem('userProfile',res.data.user.profileavtar)
      toast.success(res.data.messege)
      navigat('/')
    }).catch((err)=>{
      toast.error("Invalid Credentials")
      setLoading(false)
    })
   }

  return (
    <div className="bg-black h-screen">
      <Header />
      <div className="flex justify-center items-center mt-14">
        <div className="md:w-[550px] md:h-[380px] xs:w-[300px] xs:h-[280px] flex flex-col  items-center md:gap-y-12 xs:gap-y-8 xxs:gap-y-6 p-3 rounded-md shadow-white shadow bg-[#000]">
          <div className="flex items-center justify-center">
            <i className="ri-youtube-fill text-red-600 md:text-4xl xs:text-2xl xxs:text-2xl mr-2"></i>
            <h1 className="text-white font-bold md:text-3xl xs:text-xl xxs:text-xl ">LogIn</h1>
          </div>
          <div className="flex flex-col items-center md:gap-y-6 xs:gap-y-3 xxs:gap-y-3 ">
            <input
              type="text"
              name="username"
              placeholder="User Name"
              required
              className="rounded-md font-semibold text-[16px] bg-[#2d2c2c] pl-2 md:w-96 md:h-10 xs:w-64 xs:h-8 xxs:h-8 xxs:w-60 text-white focus:outline-none focus:border-blue-400 focus:border"
              value={login.username}
              onChange={(e)=>handleLogin(e,"username")}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="rounded-md text-[16px] bg-[#2d2c2c] pl-2 md:w-96 md:h-10 xs:w-64 xs:h-8 xxs:h-8 xxs:w-60 text-white focus:outline-none focus:border-blue-400 focus:border"
              value={login.password}
              onChange={(e)=>handleLogin(e,"password")}
            />

            {
            // this is the loder when data is uploading
              loading&&<BiLoaderCircle className="text-blue-600 text-3xl animate-spin"/>
            }
           
          </div>
          <div id="buttons" className="flex justify-center md:gap-x-8 xs:gap-x-4 xxs:gap-x-3 ">
            <button className="text-black md:text-xl font-bold rounded-md md:p-2 xs:h-10 xxs:h-8 xs:px-2 xxs:px-[6px] bg-white hover:scale-105 transition" onClick={handleLoginUser}>LogIn</button>
           <Link to="/user/signup"> <button className="text-black md:text-xl font-bold rounded-md md:p-2 xs:h-10 xxs:h-8 xs:px-2 xxs:px-[6px] bg-white hover:scale-105 transition">SignUp</button></Link>
            <Link to="/"><button className="text-black md:text-xl font-bold rounded-md md:p-2 xs:px-2 xs:h-10 xxs:h-8 xxs:px-[6px] bg-white hover:scale-105 transition"> Home</button></Link>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
export default Login;
