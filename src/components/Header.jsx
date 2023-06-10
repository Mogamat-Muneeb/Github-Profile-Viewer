import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="w-full bg-[#0d1117] ">
      <Link
        to="/"
        onClick={handleRefresh}
        className=" text-[20px] md:text-[32px] font-bold px-10 py-4 left-0 right-0 top-0 fixed"
      >
        <span className="text-[#ffffff]">GP</span>
        <span className="textG">Viewer</span>
      </Link>
    </div>
  );
};
