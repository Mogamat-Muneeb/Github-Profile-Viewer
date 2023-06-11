import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ username }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);
  console.log("🚀 ~ file: Profile.jsx:8 ~ Profile ~ repos:", repos);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
        };

        const response = await axios.get(
          `https://api.github.com/users/${username}`
          // { headers }
        );

        if (response.status === 404) {
          setError("User not found");
          return;
        }

        setProfile(response.data);

        const reposResponse = await axios.get(response.data.repos_url, {
          // headers,
        });

        setRepos(reposResponse.data);
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
    <div className={`${repos.length > 1 ? "h-full md:pt-[100px] pt-[70px]" : "h-screen pt-[100px]"}`}>
      <div className="text-[#ffff] text-2xl  flex md:flex-row flex-col w-full justify-between px-10 md:px-0">
        <div className="flex items-center justify-center w-full ">
          <img
            src={profile.avatar_url}
            alt=""
            className="rounded-full w-[250px] h-[250px] "
          />
        </div>
        <div className="w-full pt-5 md:pt-0 ">
          <div className="flex flex-col items-start justify-center h-full">
            {profile.name ? (
              <>
                <h2>
                  <span className="text-[18px] font-bold">Name </span>
                  <span className="font-medium text-[14px] text-[#7d8590]">
                    {profile.name}
                  </span>
                </h2>
              </>
            ) : (
              <>
                <h2>
                  <span className="text-[18px] font-bold">Name </span>
                  <span className="font-medium text-[14px] text-[#7d8590]">
                    {profile.login}
                  </span>
                </h2>
              </>
            )}
            {profile.bio && (
              <p>
                <span className="text-[18px] font-bold">Bio </span>
                <span className="font-medium text-[14px] text-[#7d8590]">
                  {profile.bio}
                </span>
              </p>
            )}
            <p className="flex items-center justify-center gap-1">
              <span className="text-[18px] font-bold">Followers </span>
              <span className="font-medium text-[14px] text-[#7d8590]">
                {profile.followers}
              </span>
            </p>
            <p className="flex items-center justify-center gap-1">
              <span className="text-[18px] font-bold">Following </span>
              <span className="font-medium text-[14px] text-[#7d8590]">
                {profile.following}
              </span>
            </p>
            <p>
              <span className="text-[18px] font-bold">Github Profile </span>
              <span className="font-medium text-[14px] text-[#7d8590] cursor-pointer hover:text-[#0ea5e9]">
                <a href={profile.html_url} target="_blank" rel="noreferrer">
                  {profile.html_url}
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1220px] mx-auto w-full md:pt-32 pt-16 px-10 md:px-0">
        <span className="text-[18px] font-bold text-[#ffff]">
          Github Profile
        </span>
        <div className="md:h-[400px] h-full  flex gap-4 flex-col  flex-wrap pt-4 pb-10">
          {repos.map((repo) => (
            <div key={repo.id} className="">
              <p className="font-medium text-[14px] text-[#7d8590] cursor-pointer hover:text-[#0ea5e9]">
                <a href={repo.clone_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// #7d8590 grey
// #ffffff

// #a371f7 purple
