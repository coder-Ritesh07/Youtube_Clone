let searchTitle = [
  "All",
  "Educational",
  "informational",
  "Learn css",
  "Comedy",
  "Roast Video",
  "Mixed",
  "Web Development",
];
// this is the search buttons of my videos
function HomeFilterHeader() {
  return (
    <div className="md:p-3 xs:p-1 xxs:p-1  flex flex-wrap md:gap-y-2 xs:gap-y-1 xxs:gap-y-[2px]  justify-center">
      {searchTitle.map((title, idx) => (
        <span
          key={idx}
          className="text-white md:mr-5 xs:mr-2 xxs:mr-1  md:font-semibold xs:font-light xxs:font-light md:p-2 xs:p-1 md:text-[15px] xs:text-[13px] xxs:text-[12px] bg-[#1c1c1c] rounded-md" 
        > 
          {title}
        </span>
      ))}
    </div>
  );
}
export default HomeFilterHeader;
