import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  console.log("🚀 ~ file: Profile.jsx:6 ~ Profile ~ profile:", profile);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
        };

        const response = await axios.get(
          `https://api.github.com/users/${username}`,
          { headers }
        );

        if (response.status === 404) {
          setError("User not found");
          return;
        }

        setProfile(response.data);
      } catch (error) {
        setError("An error occurred");
      }
    };

    fetchProfile();
  }, [username]);

  if (error) {
    return <div className="text-rose-500">{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-[#ffff] text-2xl h-full flex w-full justify-between">
      <div className="w-full flex  justify-center items-center ">
        <img
          src={profile.avatar_url}
          alt=""
          className="rounded-full w-[250px] h-[250px] "
        />
      </div>
      <div className="w-full ">
        <div className="flex flex-col justify-center items-start h-full">
          {profile.name ? (
            <>
              <h2>
                <span className="text-[18px] font-bold">Name </span>
                <span className="font-medium text-[16px] text-[#7d8590]">
                  {profile.name}
                </span>
              </h2>
            </>
          ) : (
            <>
              <h2>
                <span className="text-[18px] font-bold">Name </span>
                <span className="font-medium text-[16px] text-[#7d8590]">
                  {profile.login}
                </span>
              </h2>
            </>
          )}
          {profile.bio && (
            <p>
              <span className="text-[18px] font-bold">Bio </span>
              <span className="font-medium text-[16px] text-[#7d8590]">
                {profile.bio}
              </span>
            </p>
          )}
          <p className="flex items-center gap-1 justify-center">
            <span className="text-[18px] font-bold">Followers </span>
            <span className="font-medium text-[16px] text-[#7d8590]">
              {profile.followers}
            </span>
          </p>
          <p className="flex items-center gap-1 justify-center">
            <span className="text-[18px] font-bold">Following </span>
            <span className="font-medium text-[16px] text-[#7d8590]">
              {profile.following}
            </span>
          </p>
          <p>
            <span className="text-[18px] font-bold">Github Profile </span>
            <span className="font-medium text-[16px] text-[#7d8590] cursor-pointer">
              <a href={profile.html_url} target="_blank" rel="noreferrer">
                {profile.html_url}
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// #7d8590 grey
// #ffffff

// #a371f7 purple
