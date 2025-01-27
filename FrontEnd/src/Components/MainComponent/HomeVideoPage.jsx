import { Link } from "react-router-dom";

function HomeVideoPage({ videos }) {
  return (
    // this is the homevideopage 
    <div
      id="video-section"
      className="flex flex-wrap justify-center p-4 gap-5 min-h-screen" // Added min-h-screen to ensure full height
    >
      {videos.map((video, index) => (
        <Link to={`/watch/${video._id}`} key={video._id || index}>
          <div id="outer-box" className="md:w-[350px] md:h-[360px]">
            <div className="md:w-[350px] xs:w-[280px] xxs:w-[280px] xxs:h-40 md:h-52 xs:h-44 relative bg-slate-800 rounded-md overflow-hidden">
              <video
                src={video.videolink}
                controls
                className="absolute w-full h-full"
              ></video>
              <img
                src={video.thumbnail}
                alt="thumbnail"
                className="absolute w-full h-full"
              />
              <span className="absolute right-1 bottom-0 text-white bg-[#1818184a] rounded-sm xs:text-[13px] p-[1px]">
                11:20
              </span>
            </div>
            <div>
              <p className="text-white mb-2 xs:w-[300px] xxs:w-[280px]">
                {video.title}
              </p>
            </div>
            <div className="flex flex-col">
              <div>
                <Link to={`/user/channel/${video.user._id}`} className="flex items-center">
                  <img
                    src={video.user.profileavtar}
                    alt="logo"
                    className="md:w-9 xs:w-6 xs:h-6 xxs:w-6 xxs:h-6 md:h-9 rounded-full mr-1"
                  />
                  <p className="text-white">{video.user.channelname}</p>
                </Link>
              </div>
              <div className="ml-2 mt-1 flex items-center">
                <p className="text-white xs:text-[15px] xxs:text-[14px]">2M views.</p>
                <p className="text-white">
                  {video.user.createdAt.slice(0, 10)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default HomeVideoPage