import { Link, useParams } from "react-router-dom";
import Header from "../MainComponent/Header";
import { useEffect, useRef, useState } from "react";
import SideBar from "../MainComponent/SideBar";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";

function VideoPage() {
  let { id } = useParams();
  console.log(id);
  let gettheText = useRef(null);
  let [comment, setComment] = useState("");
  let [commentThreeDots, setCommentThreeDots] = useState(null);
  let [fetcomments, setfetchcomments] = useState([]);
  let [isSidebarVisible, setSidebarVisible] = useState(false);
  let currentuserprofile = localStorage.getItem("userProfile");
  let [isCurrentuserprofile, setIsCurrentuserprofile] =
    useState(currentuserprofile);
  let [fetchdata, setFetchdata] = useState({});
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    axios
      .get(`https://youtube-clone-2-s2ml.onrender.com/video/watch/${id}`)
      .then((res) => {
        // console.log(res);
        setFetchdata(res.data.video);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  // console.log(fetchdata);
  console.log(comment);

  // console.log(isCurrentuserprofile)

  useEffect(() => {
    axios
      .get(`https://youtube-clone-2-s2ml.onrender.com/usercomment/${id}`)
      .then((res) => {
        console.log(res.data.allusercomment);
        setfetchcomments(res.data.allusercomment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("fetch Comment-", fetcomments);

  // send the comments to the server
  async function handleComments() {
    let commentBody = {
      usercomments: comment,
      video: id,
    };
    try {
      let response = await axios.post(
        "https://youtube-clone-2-s2ml.onrender.com/usercomment",
        commentBody,
        { withCredentials: true }
      );
      console.log(response);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error("Can't Comment, Authorization Denied Login Again")
    }
  }
  // comments three dots handling
  function handleThreeDots(commentId) {
    setCommentThreeDots(commentThreeDots === commentId ? null : commentId);
  }

  // handle edit comments
  let [isEditActive, setEditActive] = useState(false);
  let [editedComment, setEditedComment] = useState({});
  let editbody;
  async function handleEditComment(usercomments, cmtid, videoid, userid) {
    // setCurrentCommentText(usercomments)
    setComment(usercomments);
    setEditActive(!isEditActive);
    editbody = {
      user: userid,
      video: videoid,
      usercomments: usercomments,
      cmtid: cmtid,
    };
    setEditedComment(editbody);
  }
  // console.log(editedComment);

  // Edit the comments
  async function handleFinalEditComment() {
    if (!editedComment.cmtid) return;

    let body = {
      user: editedComment.user,
      video: editedComment.video,
      usercomments: comment, // Use the updated comment from the input field
    };

    try {
      let response = await axios.put(
        `https://youtube-clone-2-s2ml.onrender.com/usercomment/${editedComment.cmtid}`,
        body,
        { withCredentials: true }
      );
      console.log(response);

      // Update the comment in the state
      const updatedComments = fetcomments.map((cmt) =>
        cmt._id === editedComment.cmtid
          ? { ...cmt, usercomments: comment }
          : cmt
      );
      setfetchcomments(updatedComments);

      // Reset edit mode
      setEditActive(false);
      setEditedComment({});
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error("Can't Edit without Login!")
    }
  }

  // delete comments from videos
  async function handleDeleteComment(cmtid) {
    console.log("cmtId",cmtid)
    try {
      let dltrep = await axios.delete(
        `https://youtube-clone-2-s2ml.onrender.com/usercomment/${cmtid}`,{withCredentials:true}
      );
      console.log(dltrep);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Can't Delete without Login!")
    }
  }

  const [suggestVideo, setsuggestVideo] = useState([]);

  // fetch the suggest video from api
  useEffect(() => {
    axios
      .get("https://youtube-clone-2-s2ml.onrender.com/video/allvideos")
      .then((res) => {
        setsuggestVideo(res.data.video);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
    console.log("fetdata",suggestVideo);

  return (
    <div className="bg-black min-h-screen relative">
      <Header toggleSidebar={toggleSidebar} />
      <div className="absolute left-0 z-50">
        {isSidebarVisible && <SideBar />}
      </div>
      <div className="max-w-[90%] my-0 mx-auto p-3   lg:flex lg:gap-x-4  md:gap-y-5">
        {/* video section start here */}
        <div>
          <div className=" xl:w-[800px] lg:w-[550px]  lg:h-[550px] md:w-[650px] md:h-[650px]  ">
            <video
              src={fetchdata.videolink}
              controls
              autoPlay
              className="  md:w-[850px] md:h-[450px] xxs:w-[280px] xxs:h-[200px] xs:w-[320px] sm:w-[550px] sm:h-72  rounded-lg object-fill"
            ></video>
            <h1 className="text-white font-semibold md:text-[18px] xxs:text-[16px] sm:text-[18px] xs:w-[320px]  sm:w-[500px] ">
              {fetchdata.title}
            </h1>
            <div className="md:flex md:w-full sm:flex sm:items-center sm:h-20 sm:w-[550px] xxs:items-start items-center xxs:h-32  justify-between  ">
              <div className="flex items-center">
                <Link
                  to={`/user/channel/${
                    fetchdata.user ? fetchdata.user._id : ""
                  }`}
                >
                  {fetchdata.user && fetchdata.user.profileavtar && (
                    <img
                      src={fetchdata.user.profileavtar}
                      alt="profile avatar"
                      className="md:w-10 md:h-10 xxs:w-6 xxs:h-6 rounded-full md:m-3 xxs:m-2"
                    />
                  )}
                </Link>
                <div>
                  <h2 className="text-white font-bold">
                    {fetchdata.user ? fetchdata.user.channelname : ""}
                  </h2>
                  <p className="text-white md:text-[14px] xxs:text-[12px]">1.2M subscriber</p>
                </div>
              </div>
              <button className="bg-white font-[500] md:px-3 md:py-2 xxs:px-2 xxs:py-1 xxs:ml-8 xxs:mt-1 rounded-3xl">
                subscribe
              </button>
              <div className="flex md:gap-x-1 xxs:gap-x-2 xxs:mt-1 sm:mt-2 ">
                <div className="flex bg-[#1f1f1fde] items-center  md:px-3  xxs:px-2 xxs:py-[2px] rounded-full">
                  <i className="ri-thumb-up-line text-white md:text-2xl xxs:text-[14px] md:mr-2 xxs:mr-1"></i>
                  <p className="text-white md:mr-3 xxs:mr-1">{fetchdata.like}</p>
                  <div className="border-white border md:h-6 xxs:h-4 md:mr-2 xxs:mr-1 "></div>
                  <i className="ri-thumb-down-line text-white md:text-xl xxs:text-[14px] "></i>
                </div>
                <div className="flex bg-[#1f1f1fde] items-center  md:px-2 xxs:px-1 md:py-2  rounded-full">
                  <i className="ri-share-forward-line text-white md:text-xl xxs:text-[14px] xxs:mr-1 md:mr-2"></i>
                  <p className="text-white md:text-[15px] xxs:text-[14px]">Share</p>
                </div>
                <div className="flex bg-[#1f1f1fde] items-center  md:px-3 md:py-2 xxs:px-2 rounded-full">
                  <i className="ri-arrow-down-line text-white md:text-xl md:mr-2 xxs:mr-1 "></i>
                  <p className="text-white md:text-[15px] xxs:text-[14px]">Download</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1f1f1fde] mt-5 rounded-lg p-2 xxs:text-[15px] md:text-xl mb-4">
              <h1 className="text-white">{fetchdata.description}</h1>
            </div>

            <div className="">
              <div className="flex items-center">
                <img
                  src={isCurrentuserprofile}
                  alt="logo"
                  className="w-9 h-9 rounded-full"
                />

                <input
                  type="text"
                  name="comments"
                  id="comments"
                  placeholder="Add a public comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-black text-white outline-none border-0 border-b border-gray-400 p-2 text-sm w-full focus:border-blue-500 transition duration-200"
                />
              </div>
              <div className="flex justify-end mt-2 gap-x-2 mb-5">
                {isEditActive && (
                  <button
                    className="bg-[#1f1f1fde] py-2 px-3 rounded-full text-white"
                    onClick={handleFinalEditComment}
                  >
                    Edit
                  </button>
                )}
                {!isEditActive && (
                  <button
                    className="bg-[#1f1f1fde] py-2 px-3 rounded-full text-white"
                    onClick={handleComments}
                  >
                    Post
                  </button>
                )}

                <button
                  className="bg-[#1f1f1fde] py-2 px-3 rounded-full text-white"
                  onClick={() => {
                    setComment("");
                    setEditActive(false);
                    setEditedComment({});
                  }}
                >
                  Cancle
                </button>
              </div>
              {/* comments section here */}
              {fetcomments.map((cmt) => {
                return (
                  <>
                    <div
                      id="comment-section"
                      className="flex relative  bg-[#23232397] items-center rounded-md  md:mb-6 xxs:mb-7 justify-between"
                    >
                      <div className="flex items-center">
                        <img
                          src={cmt.user.profileavtar}
                          alt="logo"
                          className="w-9 h-9 rounded-full"
                        />
                        <p className="text-white  p-2 md:text-xl" ref={gettheText}>
                          {cmt.usercomments}
                        </p>
                      </div>
                      <i
                        className="ri-more-2-line text-white text-xl"
                        onClick={() => handleThreeDots(cmt._id)}
                      ></i>
                      {commentThreeDots === cmt._id && (
                        <div className="absolute right-5 top-2 bg-[#100f0f] rounded-md">
                          <p
                            className="text-white md:text-xl  md:p-1 xxs:text-[15px] xxs:p-[2px] hover:bg-[#303030d6] transition cursor-pointer"
                            onClick={() =>
                              handleEditComment(
                                cmt.usercomments,
                                cmt._id,
                                cmt.video,
                                cmt.user._id
                              )
                            }
                          >
                            Edit
                          </p>
                          <p
                            className="text-white font-xl p-1 hover:bg-[#303030d6] transition cursor-pointer "
                            onClick={() => handleDeleteComment(cmt._id)}
                          >
                            Delete
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/* Suggest video section */}
        <div className="text-white  md:mt-96 lg:mt-0 ">
          {suggestVideo.map((video,index) => {
            return (
              <>
              <Link to={`/watch/${video._id}`} key={index}>
              
                <div id="suggest-video-section" className="md:flex sm:flex gap-x-4 mb-3">
                  <div className="   lg:w-[200px] md:w-52 xxs:w-60 xxs:h-28 sm:w-60 custom-475:w-80 custom-475:h-44 relative md:h-36  rounded-md overflow-hidden">
                    <video
                      src={video.videolink}
                      controls
                      className="xl:w-[160px] absolute w-full h-full object-cover "
                    ></video>
                    <img
                      src={video.thumbnail}
                      alt="thumbnail  "
                      className=" absolute w-full h-full"
                    />
                  </div>
                  <div className="">
                    <p className="xl:text-[17px] xl:w-[200px] lg:w-[180px] md:w-[260px] lg:text-[13px] xxs:text-[14px] custom-475:text-[15px] md:text-[18px] xxs:w-[230px]  custom-475:w-[280px] ">{video.title}</p>
                    <h2 className=" xxs:text-[11px] lg:text-[14px]  custom-475:text-[14px] md:text-[16px]">{video?.user?.channelname}</h2>
                    <div>
                      <p className="md:text-[16px] xxs:text-[11px] custom-475:text-[14px] text-white">{video.createdAt.slice(0,10)}</p>
                    </div>
                  </div>
                </div>
              </Link>
              </>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default VideoPage;
