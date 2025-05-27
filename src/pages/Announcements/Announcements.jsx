import React, { useEffect, useState } from "react";
import "./Announcements.scss";
import AnnouncementMain from "../../components/AnnouncementComps/AnnouncementMain";
import AnnouncementHeader from "../../components/AnnouncementComps/AnnouncementHeader";
import AnnouncementSideBar from "../../components/AnnouncementComps/AnnouncementSideBar";
const Announcements = () => {
  const [selectedComponent, setSelectedComponent] = useState("job");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="profile-page">
      <AnnouncementSideBar
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />

      <div className="rightPart">
        <AnnouncementHeader />
        <AnnouncementMain selectedComponent={selectedComponent} />
      </div>
    </div>
  );
};
export default Announcements;
