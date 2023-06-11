import React, { useState } from "react";
import Profile from "./Profile";
import { Header } from "./Header";
export const Search = () => {
  const [username, setUsername] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "" || username.split(" ").length > 3) {
      setError("Please enter a valid GitHub username");
      return;
    }

    setShowProfile(true);
  };
  return (
    <>
      <Header />
      <div className=" flex flex-col   bg-[#0d1117] ">
        {showProfile ? (
          <>
            <Profile username={username} />
          </>
        ) : (
          <div className="flex flex-col justify-center h-screen px-4 items- ">
            <h1 className="md:text-[64px] text-[30px] font-bold text-center ">
              <span className="text-[#ffffff]">Github Profile</span>
              <span className="px-1 textG">Viewer</span>
            </h1>
            <p className="font-medium text-[14px]  md:text-[16px] text-[#7d8590] pb-6 max-w-[750px] w-full mx-auto text-center">
              Discover GitHub Users easily. Start your <br /> search now and
              embark on an exciting GitHub journey.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center gap-3">
                <input
                  type="text"
                  placeholder="@github_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="md:max-w-[450px] w-full border-[#ffffff] placeholder:text-[14px] text-[#ffffff] border-[2px] bg-[#0d1117]  md:h-[60px] h-[40px] rounded-md md:rounded-lg p-3   focus:outline-none"
                />
                <button
                  type="submit"
                  className="text-[#0d1117] gradient-text bg-[#ffffff] md:max-w-[230px] max-w-[130px] w-full h-[40px] md:h-[60px] rounded-md md:rounded-lg p-3 font-bold text-[14px] md:text-[20px] transition-all duration-500 "
                >
                  Show Profile
                </button>
              </div>
            </form>
            <p className="pt-2 text-rose-500">{error}</p>
          </div>
        )}
      </div>
    </>
  );
};
