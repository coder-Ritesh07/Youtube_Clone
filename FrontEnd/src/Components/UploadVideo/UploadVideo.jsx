import { Link, useNavigate } from "react-router-dom";
import Header from "../MainComponent/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbLoader } from "react-icons/tb";
import {toast,ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function UploadVideo() {
  const [uploadVideo,setUploadVideo]=useState({"title":"","description":"","videotype":"","thumbnail":"","videolink":""})
  console.log(uploadVideo)
  let [loading, setLoading] = useState(false);
  let navigate=useNavigate()
   
  function handleUploadVideo(e,name){
    setUploadVideo({
      ...uploadVideo,[name]:e.target.value
    })
  }
  // if the user already login then user can easily upload video with thumbnails
  async function handleUploadImageAndVideo(e,type) {
    setLoading(true);
    const file = e.target.files;
    console.log(file);
    let data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "Yotube-clone");

    try {
      let response = await axios.post(
        `https://api.cloudinary.com/v1_1/ddwdrpgxy/${type}/upload`,
        data
      );
      setLoading(false);
      console.log(response);
      let url = response.data.url;
      let val=type==="image"?"thumbnail":"videolink"
      setUploadVideo({
        ...uploadVideo,[val]:url
      })
      
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  // if the user not login then user can not upload any video
  useEffect(()=>{
   let islogin=localStorage.getItem('userId')
   if(islogin===null)
   {
    navigate('/')
  }
  },[])

  // handle the upload video here
  async function hanldeVideos() {
    if (
      uploadVideo.title === "" || 
      uploadVideo.description === "" || 
      uploadVideo.videotype === "" || 
      uploadVideo.thumbnail === "" || 
      uploadVideo.videolink === ""
  ) {
     toast.error("Fill Up Form Properly!");
     return; // Ensure the function exits if the form is not properly filled
  }
    try {
      const response = await axios.post('http://localhost:5000/video/upload', uploadVideo, { withCredentials: true });
      console.log(response);
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error("Authorization denied,Login Again!")
    }

  }

  return (
    <div className="bg-black  ">
      <Header />
      <div className="flex justify-center sm:mt-12 md:mt-7 xs:mt-10 xxs:mt-7  h-screen ">
        <div
          id="upload-section"
          className=" lg:w-[500px] lg:h-[490px] lg:gap-y-3 md:w-[450px] sm:w-[500px] sm:h-[300px] xs:w-[300px] xs:h-[350px] xxs:w-[280px] xxs:h-[350px] md:h-[470px] rounded-md shadow-white shadow flex flex-col md:gap-y-3 xs:gap-y-2 xxs:gap-y-2 md:p-3"
        >
          <div className="flex items-center justify-center">
            <i className="ri-youtube-fill sm:text-3xl text-red-600 md:text-4xl xs:text-2xl xxs:text-2xl "></i>
            <h1 className="text-white sm:text-xl md:font-bold xs:font-semibold xxs:font-light md:text-xl xs:text-xl xxs:text-[18px] ">Upload Videos</h1>
          </div>
          <div
            id="form"
            className="flex flex-col justify-center items-center gap-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Title Of Video"
              required
              className="rounded-md font-semibold md:text-[16px] sm:text-[16px] sm:w-80 sm:h-8 xs:text-[15px] xxs:text-[14px] bg-[#2d2c2c] pl-2 md:w-96 xs:w-64 xs:h-7 xxs:w-60 xxs:h-7 md:h-10 text-white focus:outline-none focus:border-blue-600 focus:border"
              value={uploadVideo.title}
              onChange={(e)=>handleUploadVideo(e,"title")}
            />
            <input
              type="text"
              name="description"
              placeholder="Video Description"
              required
              className="rounded-md md:text-[16px] sm:text-[16px] sm:w-80 sm:h-8 xs:text-[15px] xxs:text-[14px] bg-[#2d2c2c] pl-2 md:w-96 xs:w-64 xs:h-7 md:h-10  text-white focus:outline-none xxs:w-60 xxs:h-7 focus:border-blue-600 focus:border"
              value={uploadVideo.description}
              onChange={(e)=>handleUploadVideo(e,"description")}
            />
            <input
              type="text"
              name="videotype"
              placeholder="Video Category"
              required
              className="rounded-md md:text-[16px] sm:text-[16px] sm:w-80 sm:h-8 xs:text-[15px] xxs:text-[14px] bg-[#2d2c2c] pl-2 md:w-96 xs:w-64 xs:h-7 md:h-10  text-white focus:outline-none xxs:w-60 xxs:h-7 focus:border-blue-600 focus:border"
              value={uploadVideo.videotype}
              onChange={(e)=>handleUploadVideo(e,"videotype")}
            />
          </div>
          <div id="Upload-buttons" className="flex flex-col items-center   md:gap-y-3">
            <div className="md:flex xs:flex-col xs:ml-5 xxs:ml-8  items-center   ">
              <label htmlFor="thumbnail" className="text-white xs:text-[15px] md:text-[18px] xxs:text-[14px] md:mr-1">
                Upload Thumbnail
              </label>
              <input
                type="file"
                accept="image/*"
                className="bg-transparent underline rounded-sm xs:text-[12px] md:text-[15px] lg:text-[18px] xxs:text-[12px] text-white"
                name="thumbnail"
                onChange={(e)=>handleUploadImageAndVideo(e,"image")}
              />
            </div>
            <div className="md:flex xs:flex-col xs:ml-5 xxs:ml-8 items-center  ">
              <label htmlFor="video" className="text-white xs:text-[15px] md:text-[18px] lg:text-[18px] xxs:text-[14px]  md:mr-1">
                Upload Video
              </label>
              <input
                type="file"
                accept="video/mp4, video/webm, video/*"
                className="bg-transparent underline rounded-sm xs:text-[12px] md:text-[15px] lg:text-[18px] xxs:text-[12px] text-white"
                name="videolink"
                onChange={(e)=>handleUploadImageAndVideo(e,"video")}
              />
            </div>
            {
              loading&&<TbLoader className="text-blue-500 md:text-3xl xs:text-2xl xxs:text-2xl animate-spin"/>
            }
            
          </div>

          <div className="flex justify-center xs:mt-2 xxs:mt-2 md:gap-x-16 xs:gap-x-8 xxs:gap-x-6 ">
            <button className="text-black md:text-xl sm:text-[18px] xs:text-[16px] xxs:text-[15px] md:font-bold xs:font-semibold md:rounded-md xs:rounded md:p-2 xs:p-1 xxs:p-1  xxs:rounded xxs:font-semibold bg-white hover:scale-105 transition" onClick={hanldeVideos}>Upload</button>
            <Link to="/"><button className="text-black md:text-xl sm:text-[18px] xs:text-[16px] xxs:text-[15px] md:font-bold xs:font-semibold md:rounded-md xs:rounded xxs:rounded xxs:font-semibold md:p-2 xs:p-1 xxs:p-1 bg-white cursor-pointer  hover:scale-105 transition">Home</button></Link>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
export default UploadVideo;
