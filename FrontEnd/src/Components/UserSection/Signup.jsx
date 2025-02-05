import { useState } from "react";
import Header from "../MainComponent/Header";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../MainComponent/SideBar";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [avtar, setAvtar] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBccCjfV1tNSdQbCOR57T6XnGoHxW2Uo7IBg&s"
  );
  const navigate = useNavigate();
  let [isSidebarVisible, setSidebarVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // handle form datas by state
  const [signUp, setSignUp] = useState({
    channelname: "",
    username: "",
    password: "",
    about: "",
    profileavtar: avtar,
  });
  // console.log(signUp);

  function handleSignup(e, name) {
    setSignUp({
      ...signUp,
      [name]: e.target.value,
    });
  }

  // upload image in cloudinary
  async function uploadImage(e) {
    setLoading(true);
    const file = e.target.files;
    console.log(file);
    let data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "Yotube-clone");

    try {
      let response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddwdrpgxy/image/upload",
        data
      );
      setLoading(false);
      console.log(response);
      let imgUrl = response.data.url;
      setAvtar(imgUrl);
      setSignUp({
        ...signUp,
        profileavtar: imgUrl,
      });
    } catch (error) {
      console.log(error);
      toast.error('Video is Too Large,Upload Under 100mb')
    }
  }

  // handle user data if user does not give any information then it's handle
  async function handleUserData() {
    if (
      signUp.username === "" ||
      signUp.channelname === "" ||
      signUp.password === "" ||
      signUp.about === "" ||
      signUp.profileavtar === ""
    ) {
      toast.error("Fill Up Form Properly!");
      return; // Ensure the function exits if the form is not properly filled
    }

    try {
      const res = await axios.post("https://youtube-clone-2-s2ml.onrender.com/user/signup", signUp);
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className={`bg-black h-full`}>
      <Header toggleSidebar={toggleSidebar} />
      <div className="absolute left-0 z-50 ">
        {isSidebarVisible && <SideBar />}
      </div>
      {/* signUp form start here */}
      <div
        className={`flex justify-center items-center ${
          isSidebarVisible ? "h-screen" : "h-full"
        } mt-14 `}
      >
        <div className="md:w-[550px] md:h-[550px] xs:w-[300px] xs:h-[390px] xxs:w-[280px] xxs:h-[390px]  flex flex-col  items-center md:gap-y-8 xs:gap-y-4 xxs:gap-y-3 mb-14  p-3 rounded-md shadow-white shadow bg-[#000]">
          <div className="flex items-center justify-center">
            <i className="ri-youtube-fill text-red-600 md:text-5xl xs:text-3xl xxs:text-2xl mr-2"></i>
            <h1 className="text-white font-bold md:text-3xl xs:text-xl xxs:text-[18px] ">
              SignUp
            </h1>
          </div>
          <div className="flex flex-col items-center md:gap-y-6 xs:gap-y-3 xxs:gap-y-2 ">
            <input
              type="text"
              name="channelname"
              placeholder="Channel Name"
              required
              className="rounded-md font-semibold md:text-[16px] xs:text-[14px] xxs:text-[14px] bg-[#2d2c2c] pl-2 md:w-96 md:h-10 xs:w-64 xs:h-7 xxs:w-60 xxs:h-7 text-white focus:outline-none focus:border-blue-400 focus:border"
              value={signUp.channelname}
              onChange={(e) => handleSignup(e, "channelname")}
            />
            <input
              type="text"
              name="username"
              placeholder="User Name"
              required
              className="rounded-md font-semibold md:text-[16px] xs:text-[14px] bg-[#2d2c2c] pl-2 md:w-96 md:h-10 xs:w-64 xs:h-7 xxs:w-60 xxs:h-7 text-white focus:outline-none focus:border-blue-400 focus:border"
              value={signUp.username}
              onChange={(e) => handleSignup(e, "username")}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="rounded-md md:text-[16px] xs:text-[14px] bg-[#2d2c2c] pl-2 md:w-96 md:h-10 xs:w-64 xs:h-7 xxs:w-60 xxs:h-7 text-white focus:outline-none focus:border-blue-400 focus:border"
              value={signUp.password}
              onChange={(e) => handleSignup(e, "password")}
            />
            <input
              type="text"
              name="about"
              placeholder="About Your Channel"
              required
              className="rounded-md font-semibold md:text-[16px] xs:text-[14px] bg-[#2d2c2c] pl-2 md:w-96 md:h-10 xs:w-64 xs:h-7 xxs:w-60 xxs:h-7 text-white focus:outline-none focus:border-blue-400 focus:border"
              value={signUp.about}
              onChange={(e) => handleSignup(e, "about")}
            />
            <div className="md:flex lg:flex xs:flex-col  justify-between ">
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  name="profileavtar"
                  className="bg-transparent underline rounded-sm text-white xs:text-[14px] xxs:text-[13px]  mb-2 "
                  onChange={(e) => uploadImage(e)}
                />
                {loading && (
                  <BiLoaderCircle className="text-blue-500 md:text-3xl xs:text-[22px] animate-spin" />
                )}
              </div>
              <img
                src={avtar}
                alt="avtar"
                className="md:w-16 md:h-16 xs:w-12 xs:h-12 xxs:w-11 xxs:h-11 rounded-full"
              />
            </div>
          </div>
          <div id="buttons" className="flex items-center gap-x-12 xxs:gap-x-8">
            <button
              className="text-black md:text-xl xs:text-[16px] xxs:text-[15px] xxs:font-semibold xs:font-semibold md:font-bold rounded-md md:p-2 xs:p-1 xxs:p-1 bg-white hover:scale-105 transition"
              onClick={handleUserData}
            >
              SignUp
            </button>
            <Link to="/">
              <button className="text-black md:text-xl xs:text-[16px] md:font-bold  xxs:text-[15px] xxs:font-semibold xs:font-semibold rounded-md md:p-2 xs:p-1 xxs:p-1 bg-white hover:scale-105 transition">
                Home Page
              </button>
            </Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
