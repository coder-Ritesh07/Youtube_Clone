import { Link } from "react-router-dom"

function SideBar(){
    return(
         <div className="bg-black md:w-64  md:p-4 overflow-y-scroll   h-screen mr-8">
      <div className="md:mb-5 xs:mb-3 xxs:mb-3 " id="firstPart">
        <Link to="/">
        <div className="flex items-center hover:bg-[#1c1c1c] hover:rounded-md md:p-2 xs:p-1 xxs:p-1 ">
          <span className="material-symbols-outlined text-white md:text-[28px] xs:text-[24px] xxs:text-[22px] md:mr-7 xs:mr-3.5 xxs:mr-2 ">
            home
          </span>
          <li className="text-white list-none text-[16px] font-semibold">
            Home
          </li>
        </div>

        </Link>
        <div className="flex items-center hover:bg-[#1c1c1c] hover:rounded-md md:p-2 xs:p-1 xxs:p-1 ">
          <i className="ri-film-line text-white md:text-[28px] xs:text-[24px] xxs:text-[22px] md:mr-7 xs:mr-3.5 xxs:mr-2 "></i>
          <li className="text-white list-none text-[16px] font-semibold">
            Shorts
          </li>
        </div>
        <div className="flex items-center hover:bg-[#1c1c1c] hover:rounded-md md:p-2 xs:p-1 xxs:p-1 ">
          <span className="material-symbols-outlined text-white md:text-[28px] xs:text-[24px] xxs:text-[22px]  md:mr-7 xs:mr-3.5 xxs:mr-2">
            paid
          </span>
          <li className="text-white list-none text-[16px] font-semibold">
            Subscriptions
          </li>
        </div>
      </div>
      <div className="w-full h-[0.5px] border-[#ffffff54] border"></div>

      <div id="secondPart" className="mb-5 ">
        <div className="flex items-center text-white p-2 ">
          <span className="text-[16px] font-semibold mr-3 xxs:mr-2">You</span>
          <i className="ri-arrow-right-s-line text-[28px] xxs:text-[24px]"></i>
        </div>
        <div className="flex items-center text-white md:p-2 xs:p-1 xxs:p-1 hover:bg-[#1c1c1c] hover:rounded-md">
          <i className="ri-history-line md:text-[28px] xs:text-[24px] xxs:text-[22px] xxs:mr-2 md:mr-7 xs:mr-3.5"></i>
          <li className="list-none text-[16px] font-semibold">History</li>
        </div>

        <div className="flex items-center text-white md:p-2 xs:p-1 xxs:p-1 hover:bg-[#1c1c1c] hover:rounded-md">
          <span className="material-symbols-outlined md:text-[28px] xs:text-[24px] xxs:text-[22px] xxs:mr-2 md:mr-7 xs:mr-3.5">
            playlist_play
          </span>
          <li className="list-none text-[16px] font-semibold">Playlists</li>
        </div>

        <div className="flex items-center text-white md:p-2 xs:p-1 xxs:p-1 hover:bg-[#1c1c1c] hover:rounded-md">
          <span className="material-symbols-outlined md:text-[28px] xs:text-[24px] xxs:text-[22px] xxs:mr-2 md:mr-7 xs:mr-3.5">
            smart_display
          </span>
          <li className="list-none text-[16px] font-semibold">Your videos</li>
        </div>

        <div className="flex items-center text-white md:p-2 xs:p-1 xxs:p-1 hover:bg-[#1c1c1c] hover:rounded-md">
          <span className="material-symbols-outlined md:text-[28px] xs:text-[24px] xxs:text-[22px] xxs:mr-2 md:mr-7 xs:mr-3.5">
            school
          </span>
          <li className="list-none text-[16px] font-semibold">Your Courses</li>
        </div>
        <div className="flex items-center text-white md:p-2 xs:p-1 xxs:p-1 hover:bg-[#1c1c1c] hover:rounded-md" >
          <span className="material-symbols-outlined md:text-[28px] xs:text-[24px] xxs:text-[22px] xxs:mr-2 md:mr-7 xs:mr-3.5">
            pace
          </span>
          <li className="list-none text-[16px] font-semibold">Watch Later</li>
        </div>
        <div className="flex items-center text-white md:p-2 xs:p-1 xxs:p-1 hover:bg-[#1c1c1c] hover:rounded-md">
          <i className="ri-thumb-up-line md:text-[28px] xs:text-[24px] md:mr-7 xxs:text-[22px] xxs:mr-2 xs:mr-3.5"></i>
          <li className="list-none text-[16px] font-semibold">Like Videos</li>
        </div>
        <div className="flex items-center text-white md:p-2 xs:p-1 xxs:p-1 hover:bg-[#1c1c1c] hover:rounded-md">
          <span className="material-symbols-outlined md:text-[28px] xs:text-[24px] xxs:text-[22px] xxs:mr-2 md:mr-7 xs:mr-3.5">
            content_cut
          </span>
          <li className="list-none text-[16px] font-semibold">Your Clips</li>
        </div>
      </div>
        <div className="w-full h-[0.5px] border-[#ffffff54] border"></div>

        <div>
            <li className="list-none text-[16px] font-semibold text-white p-2">Subscriptions</li>
            <div className="flex items-center p-2 hover:bg-[#1c1c1c] hover:rounded-md">
                <img src="https://yt3.ggpht.com/p6qCeZsxT97whgftwJHj_27XuYGi2rTW0hapm1qmwVWXUb8IlUY2LXj5-D0WE2RB_mlPMTkrig=s88-c-k-c0x00ffffff-no-rj" alt="Pw_image" className="w-6 h-6 rounded-full md:mr-5 xs:mr-2.5 xxs:mr-1" />
                <li className="list-none text-[16px] xxs:text-[14px] font-semibold text-white">Physics Wallah</li>
            </div>
            <div className="flex items-center p-2 hover:bg-[#1c1c1c] hover:rounded-md">
                <img src="https://yt3.ggpht.com/ytc/AIdro_mb6AQ_SKGatJO4z16_YA-Uxm1M9lX2qq1-vV8GWqP9byU=s88-c-k-c0x00ffffff-no-rj" alt="thugesg_image" className="w-6 h-6 rounded-full md:mr-5 xxs:mr-1 xs:mr-2.5" />
                <li className="list-none text-[16px] xxs:text-[14px] font-semibold text-white">Thugesh</li>
            </div>
            <div className="flex items-center p-2 hover:bg-[#1c1c1c] hover:rounded-md">
                <img src="https://yt3.ggpht.com/ytc/AIdro_nGWnCX1SjSnapRzWjpOQCG-k_v-aSZtYfjFhJzjxqSbKA=s88-c-k-c0x00ffffff-no-rj" alt="samay_image" className="w-6 h-6 rounded-full md:mr-5 xxs:mr-1 xs:mr-2.5" />
                <li className="list-none text-[16px] xxs:text-[14px] font-semibold text-white">Samay Raina</li>
            </div>
            <div className="flex items-center p-2 hover:bg-[#1c1c1c] hover:rounded-md">
                <img src="https://yt3.ggpht.com/3acddexuFlA5yKRS2--11NeqhCiik-0cntUPjk_QjlsA4ScmQUPWNmeBLweVUQjWXTCLT26lsw=s88-c-k-c0x00ffffff-no-rj" alt="Piyush_image" className="w-6 h-6 rounded-full md:mr-5 xxs:mr-1 xs:mr-2.5" />
                <li className="list-none text-[16px] xxs:text-[14px] font-semibold text-white">Piyush Garg</li>
            </div>
            <div className="flex items-center p-2 hover:bg-[#1c1c1c] hover:rounded-md">
                <img src="https://yt3.ggpht.com/Kd860ZzzW9dZThHAFNG2shjmeiMcVcktqlrRMuB7FXMypIuBlIM3-38j9JpOjEBb_WR0pJCO-A=s88-c-k-c0x00ffffff-no-rj" alt="Pw_image" className="w-6 h-6 rounded-full md:mr-5 xxs:mr-1 xs:mr-2.5" />
                <li className="list-none text-[16px] xxs:text-[14px] font-semibold text-white">Crazy Deep</li>
            </div>
        </div>
    </div>
    )
}
export default SideBar