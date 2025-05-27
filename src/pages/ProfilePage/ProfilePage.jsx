import React, { useEffect, useState } from "react";
import ProfileMain from "../../components/ProfileComponents/ProfileMain";
import "./ProfilePage.scss";
import ProfileSideBar from "../../components/ProfileComponents/ProfileSideBar/ProfileSideBar";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader/ProfileHeader";
const ProfilePage = () => {
  const [selectedComponent, setSelectedComponent] = useState("personal");
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
      <ProfileSideBar
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />

      <div className="rightPart">
        <ProfileHeader />
        <ProfileMain selectedComponent={selectedComponent} />
      </div>
    </div>
  );
};
export default ProfilePage;
