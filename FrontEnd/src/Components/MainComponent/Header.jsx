import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function Header({ toggleSidebar,getTextfromHeader }) {
  let [getSearch,setGetSearch]=useState('')
  let userid
  let navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  const [islogin, setLogin] = useState(false);
  let defaultavtar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBccCjfV1tNSdQbCOR57T6XnGoHxW2Uo7IBg&s";
  const [avtar, setAvtar] = useState(defaultavtar);

  function handleProfile() {
    setProfile(!profile);
  }
  function handleavtar() {
    userid = localStorage.getItem("userId");
    navigate(`/user/channel/${userid}`);
  }

  // handle if user logout then clear the cookies
  function handleLogout() {
    localStorage.clear();
    getLogout();
    setAvtar(defaultavtar);
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  }

  // this is the handle logout function
  function getLogout() {
    axios
      .post("http://localhost:5000/user/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    let profilepic = localStorage.getItem("userProfile");
    setLogin(localStorage.getItem("userId") !== null ? true : false);
    if (profilepic) {
      setAvtar(profilepic);
    } else {
      setAvtar(defaultavtar);
    }
  }, [profile, islogin]);


   function handleupload(){
    let islogin=localStorage.getItem('userId')
    if(islogin===null)
    {
      toast.error("Can't Upload Without Login")
    }
   }

   function handleSearch(){
    getTextfromHeader(getSearch)
   }

  //  console.log(getSearch)



  return (
    <>
      <header
        className="bg-black md:p-[10px] xs:p-[3px] sm:p-2 xxs:px-[1px] xxs:py-[3px] flex justify-between sticky top-0 z-50 "
        id="header-section"
      >
        <div id="left-side">
          <div className="flex items-center  xs:w-[80px] xxs:w-[65px] md:w-[120px] justify-between">
            <span
              className="material-symbols-outlined xs:text-[15px] sm:text-xl xxs:text-[14px] text-white md:p-1 xs:p-[2px] md:text-[26px]   font-light hover:bg-[#1c1c1c] hover:rounded-full cursor-pointer "
              onClick={toggleSidebar}
            >
              menu
            </span>
            <Link to="/">
            <div className="flex items-center ">
              <i className="ri-youtube-fill text-red-600 md:text-3xl sm:text-2xl xs:text-[14px] xxs:text-[13px] "></i>
              <h2 className="text-white xs:text-[11px] sm:text-[18px] xxs:text-[10px] xs:font-[400] xxs:font-[400] md:text-[15px]  md:font-semibold">
                YOUTUBE
              </h2>
            </div>
            </Link>
            {/* First part end here */}
          </div>
        </div>
        <div id="middle" className="flex items-center">
          {/* search bar start here */}
          <div id="searchbox" className="flex justify-center  xs:w-[135px] sm:w-[250px] xxs:w-[125px] custom-425:w-[170px] custom-475:w-[200px] items-center rounded-full xs:mr-1 xxs:mr-[2px] md:mr-3 xl:w-[430px] md:w-[330px]  bg-[#1c1c1c] ">
            <input
              type="text"
              placeholder="Search"
              name="searchbox"
              value={getSearch}
              onChange={(e)=>setGetSearch(e.target.value)}
              className="xl:w-[380px] xs:w-[110px] xs:h-5 xxs:w-[100px] sm:w-[220px] sm:h-8 sm:text-[17px] custom-425:w-[140px] custom-425:h-5 custom-475:w-[170px] custom-475:h-6 xxs:h-4 xs:text-[14px] xxs:text-[13px] xs:mr-1  md:w-[280px] md:h-8   rounded-l-full md:pl-3 xs:pl-2 xxs:pl-[5px] bg-[#252525] text-[#a2a1a1] focus:outline-none focus:border-blue-500 focus:border-[0.6px] font-[500]"
            />
            <i className="ri-search-line text-white md:text-2xl sm:text-xl xs:text-[17px] xxs:text-[15px]  font-light md:px-2 md:py-1   cursor-pointer " onClick={handleSearch}></i>
          </div>
          <div>
            <i className="ri-mic-fill xs:text-[15px] sm:text-[18px] sm:p-[5px] xxs:text-[13px] md:text-xl font-light xs:p-[4px] xxs:p-[3px] md:p-[10px]  rounded-full text-white bg-[#1c1c1c] hover:bg-[#393939]"></i>
          </div>
        </div>
        {/* right side of header */}
        <div
          id="right-side"
          className="flex items-center justify-around md:w-44 xs:w-24 sm:w-36 relative"
        >
          <Link to="/upload">
            <div className="bg-[#1c1c1c] rounded-full md:px-2 xs:px-1 sm:p-2 xxs:px-1  md:py-1 cursor-pointer " onClick={handleupload}>
              <i className="ri-add-line font-light md:text-xl xs:text-[15px] xxs:text-[14px] sm:text-[14px]  text-white"></i>
              <span className="text-white md:font-semibold xs:text-[12px] sm:text-[15px] xxs:text-[10px] ">Create</span>
            </div>
          </Link>
          <span className="material-symbols-outlined text-white md:text-3xl sm:text-xl xs:text-[16px] xxs:text-[14px]   font-extralight">
            notifications
          </span>
          <img
            src={avtar}
            alt="userlogo"
            className="cursor-pointer md:w-9 md:h-9 sm:w-7 sm:h-7 xs:w-5 xs:h-5 xxs:w-4 xxs:h-4 rounded-full"
            onClick={handleProfile}
          />
      
        </div>
        {profile && (
          <div
            className={`w-40  ${
              islogin ? "h-[80px]" : " h-full"
            }   bg-[#ffffff69] backdrop-blur absolute top-14 right-6 rounded-md`}
          >
            {islogin && (
              <p
                className="text-2xl font-bold text-center cursor-pointer p-1 text-black hover:bg-[#1c1c1c84] transition"
                onClick={handleavtar}
              >
                Profile
              </p>
            )}
            {!islogin && (
              <Link to="/user/login">
                <p className="text-2xl font-bold text-center p-1 cursor-pointer text-black hover:bg-[#1c1c1c84] transition">
                  Login
                </p>
              </Link>
            )}
            {islogin && (
              <p
                className="text-2xl font-bold text-center cursor-pointer p-1 text-black hover:bg-[#1c1c1c84] transition"
                onClick={handleLogout}
              >
                Logout
              </p>
            )}
          </div>
        )}
      </header>
        <ToastContainer/>
    </>
  );
}

export default Header;
