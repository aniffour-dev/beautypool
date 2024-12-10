import React from "react";
import Logo from "./Logo";
import RightBar from "./RightBar";

const Navbar = () => {
  return (
    <div className="relative z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto pt-10 px-5 lg:px-0">
        <div className="block lg:hidden"></div>
        <Logo />
        <RightBar />
      </div>
    </div>
  );
};

export default Navbar;
