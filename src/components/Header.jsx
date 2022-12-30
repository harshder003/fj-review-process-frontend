import React from "react";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 backdrop-blur-md bg-navy/75 h-16 flex items-center justify-between px-6 border-b-2 border-gray-200 shadow-md border-zinc-600">
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img
            src="https://fischerjordan.com/wp-content/uploads/2018/12/FJ-Logo-horizontal-white-1.png"
            className="h-8 w-auto"
            alt="FJLogo"
          />
        </a>
      </div>
    </div>
  );
};

export default Header;
