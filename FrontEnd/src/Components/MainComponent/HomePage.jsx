import Header from "./Header";
import { useEffect, useState } from "react";
import HomeFilterHeader from "./HomeFilterHeader";
import HomeVideoPage from "./HomeVideoPage";
import SideBar from "./SideBar";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";

function HomePage() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [allVideos, setAllVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [pageloader,setPageloader]=useState(false)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Function to get text from header component and update search state
  const getTextfromHeader = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    // Fetch all videos on component mount
    setPageloader(true)
    axios
      .get("http://localhost:5000/video/allvideos")
      .then((res) => {
        setPageloader(false)
        setAllVideos(res.data.video);
        setFilteredVideos(res.data.video);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (search.trim() !== "") {
      let Api_End_Point = `http://localhost:5000/video/search`;

      axios
        .post(Api_End_Point, { searchText: search })
        .then((res) => {
          setFilteredVideos(res.data.videoSearch);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // If search is empty, show all videos
      setFilteredVideos(allVideos);
    }
  }, [search]);

  return (
    // this is the homepage of my youtube
    <div className="min-h-screen relative bg-black">
      <Header
        toggleSidebar={toggleSidebar}
        getTextfromHeader={getTextfromHeader}
      />
      <div className="flex justify-between">
        <div className="xxs:absolute xxs:left-0 xxs:z-50">
          {isSidebarVisible && <SideBar />}
        </div>
        <div className="flex flex-col  items-center flex-grow">
          <HomeFilterHeader />
          {
            pageloader && (
                              <BiLoaderCircle className="text-blue-500 md:text-5xl xs:text-[22px] animate-spin self-center mt-56 " />
                            )
          }
          <HomeVideoPage videos={filteredVideos} />
        </div>
      </div>
    </div>
  );
}
export default HomePage