import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../MainComponent/Header";
import SideBar from "../MainComponent/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { BiLoaderCircle } from "react-icons/bi";


function ViewUserChannel() {
  let { userid } = useParams();
  console.log(userid);
  let navigate=useNavigate()
  let [fetchdata, setFetchdata] = useState([]);
  let [isabout, setIsAbout] = useState(null);
  let [isSidebarVisible, setSidebarVisible] = useState(false);
  let [islogin, setLogin] = useState(true);
  let [threedot, setThreedot] = useState(false);
  let login = localStorage.getItem("userId");
  let [getDataConditionally,setDataConditionally]=useState([])
  const [pageloader,setPageloader]=useState(false)
  useEffect(() => {
    if (login == null) {
      setLogin(false);
    }
  }, [login]);

  // toogle the side bar
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  // get the channel by userid
  useEffect(() => {
    setPageloader(true)
    axios
      .get(`https://youtube-clone-2-s2ml.onrender.com/video/watch/channel/${userid}`)
      .then((res) => {
        //  console.log(res.data.videouserId)
        setPageloader(false)
        setFetchdata(res.data.videouserId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userid]);
  console.log("get data", fetchdata);

  // handle the about section
  function handleAbout() {
    setIsAbout(!isabout);
  }

  function handleThreeDot(videoId) {
    setThreedot(prevId => (prevId === videoId ? null : videoId));
    console.log("click button");
  }
  // console.log(threedot);

  async function handleDeleteUserVideo(videoid) {
    // console.log("videoid-", videoid);
    setPageloader(true)
    try {
      
      let reponse=await axios.delete(`https://youtube-clone-2-s2ml.onrender.com/video/watch/channel/${videoid}`,{withCredentials:true})
      setPageloader(false)
      console.log(reponse)
      toast.success("Video Delete Successfully")
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } catch (error) {
      console.log(error)
        toast.error("You are not Authorized ")
    }

  }



//  delete the user Channel here
  async function handleDeleteUserChannel(userid,videoid) {
    console.log(userid,"videoId",videoid)

    try {
      let reponse=await axios.delete(`https://youtube-clone-2-s2ml.onrender.com/user/${userid}`,{withCredentials:true})
      console.log(reponse)
      localStorage.clear();
      getLogout()
      toast.success("channel Delete Successfully")
      setTimeout(() => {
        navigate('/')
        window.location.reload()
      }, 1000);
    } catch (error) {
      toast.error("You are not Authorized ")
    }
  }


  // its work when user delete the channel the user immedeatly logout
  function getLogout() {
    axios
      .post("https://youtube-clone-2-s2ml.onrender.com/user/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // get data Conditionally when user has not any data
  useEffect(()=>{
   try {
    axios.get(`https://youtube-clone-2-s2ml.onrender.com/user/userinfo/${userid}`).then((res)=>{
      // console.log("conditional-",res)
      setDataConditionally(res.data.userdata)
    })
   } catch (error) {
    console.log(error)
   }
  },[])
  // console.log("conditionally",getDataConditionally)

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        <div
          className={`absolute left-0 z-50 ${
            isSidebarVisible ? "block" : "hidden"
          }`}
        >
          <SideBar />
        </div>
        <div className="max-w-[90%] my-11 mx-auto flex flex-col gap-y-16  flex-grow">
          {fetchdata.length > 0 && (
            <div>
              <div className="flex items-center gap-x-4">
                <div>
                  <img
                    src={fetchdata[0].user.profileavtar}
                    alt="logo"
                    className="md:w-40 xs:w-20 xs:h-20 xxs:w-16 xxs:h-16 md:h-40 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-white md:text-3xl xs:text-[17px]">
                    {fetchdata[0].user.channelname}
                  </h1>
                  <div className="flex items-center">
                    <p className="text-white xs:text-[15px]">
                      320k subscribers.
                    </p>
                    <p className="text-white xs:text-[15px]">{`${fetchdata.length} Videos`}</p>
                  </div>
                  <div className="flex flex-col items-start gap-x-1">
                    <div className="flex">
                      <p className="text-white">About More</p>
                      <i
                        className="ri-arrow-right-s-fill text-white text-xl cursor-pointer"
                        onClick={handleAbout}
                      ></i>
                    </div>
                    <div>
                      {isabout && (
                        <p className="text-white">{fetchdata[0].user.about}</p>
                      )}
                    </div>
                    {islogin && login !== userid && (
                      <button className="bg-white font-[500] md:px-3 md:py-2 xs:px-2 xs:py-1 rounded-3xl">
                        Subscribe
                      </button>
                    )}
                    {islogin && login === userid && (
                      <button className="bg-white font-[500] xl:mt-3 md:px-3 md:py-2 xs:px-2 xs:py-1 rounded-3xl" onClick={()=>handleDeleteUserChannel(fetchdata[0].user._id,fetchdata[0]._id)}>
                        Delete Channel
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>
              <div className="w-full border-[#ffffff8e] border my-4"></div>
            </div>
          )}

<div className="flex justify-center flex-wrap gap-4 ">
  {fetchdata.length > 0 ? (
    fetchdata.map((channel) => (
      <div key={channel._id} className="md:w-[350px] md:h-[360px]  ">
        <Link to={`/watch/${channel._id}`}>
          <div></div>
          <div className="md:w-[350px] xs:w-[280px] xxs:w-[260px] xxs:h-40 xs:h-44 md:h-52 relative bg-slate-800 rounded-md overflow-hidden">
            <video
              src={channel.videolink}
              controls
              className="absolute w-full h-full"
            ></video>
            <img
              src={channel.thumbnail}
              alt="thumbnail"
              className="absolute w-full h-full"
            />
            <span className="absolute right-1 bottom-0 text-white bg-[#1818184a] rounded-sm p-[1px]">
              20:21
            </span>
          </div>
          <div>
            <p className="text-white mb-2 xs:w-72">{channel.title}</p>
          </div>

          <div className="flex flex-col relative">
            <div className="ml-2 mt-1 flex items-center justify-between">
              <div className="flex">
                <p className="text-white xs:text-[16px]">4.2M views.</p>
                <p className="text-white xs:text-[16px]">
                  {channel.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <i
          className="ri-more-2-line relative text-white text-xl"
          onClick={() => handleThreeDot(channel._id)}
        ></i>
        {threedot === channel._id && (
          <div className="bg-[#383737] rounded-md w-14 h-8 ">
            <p
              className="text-white cursor-pointer rounded-md p-1 hover:bg-[#282727e1] transition"
              onClick={() => handleDeleteUserVideo(channel._id)}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    ))
  ) : (
    getDataConditionally.map((channel,idx)=>{
      return<>
          <div key={idx}>
              <div className="flex items-center xl:w-[800px]   gap-x-4" >
                <div>
                  <img
                    src={channel.profileavtar}
                    alt="logo"
                    className="md:w-40 xs:w-20 xs:h-20 xxs:w-16 xxs:h-16 md:h-40 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-white md:text-3xl xs:text-[17px]">
                    {channel.channelname}
                  </h1>
                  <div className="flex items-center">
                    <p className="text-white xs:text-[15px]">
                      320k subscribers.
                    </p>
                    <p className="text-white xs:text-[15px]">{`${getDataConditionally.length} Videos`}</p>
                  </div>
                  <div className="flex flex-col items-start gap-x-1">
                    <div className="flex">
                      <p className="text-white">About More</p>
                      <i
                        className="ri-arrow-right-s-fill text-white text-xl cursor-pointer"
                        onClick={handleAbout}
                      ></i>
                    </div>
                    <div>
                      {isabout && (
                        <p className="text-white">{channel.about}</p>
                      )}
                    </div>
                    {islogin && login !== userid && (
                      <button className="bg-white font-[500] md:px-3 md:py-2 xs:px-2 xs:py-1 rounded-3xl">
                        Subscribe
                      </button>
                    )}
                    {islogin && login === userid && (
                      <button className="bg-white font-[500] xl:mt-3 xxs:px-2 md:px-3 md:py-2 xs:px-2 xs:py-1 rounded-3xl" onClick={()=>handleDeleteUserChannel(channel._id)}>
                        Delete Channel
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>
              <div className="w-full border-[#ffffff8e] border my-4"></div>
              <div className="flex justify-center">
                <h1 className="text-white text-2xl font-bold">No Videos Available</h1>
                {pageloader && (
                  <BiLoaderCircle className="text-blue-500 md:text-5xl xs:text-[22px] animate-spin" />
                )}
              </div>
            </div>
      </>
    })
  )}
</div>
          {/* end here */}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
export default ViewUserChannel;
