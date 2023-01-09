import React from "react";

const Header = (props) => {
  const profileName = props.profileName;
  const dashboardLink = props.dashboardLink;

  return (
    <div className="sticky top-0 z-10 backdrop-blur-md bg-navy/75 h-16 flex items-center justify-between px-6 border-b-2 border-gray-200 shadow-md border-zinc-600">
      <div className="flex items-center justify-between w-full">
        {/* logo on left side of screen  */}
        <a href="/" className="flex-shrink-0">
          <img
            src="https://fischerjordan.com/wp-content/uploads/2018/12/FJ-Logo-horizontal-white-1.png"
            className="h-4 md:h-8 w-auto"
            alt="FJLogo"
          />
        </a>
        {/* if there is a dashboard link element put it on right side of screen before profile name */}
        <div className="flex items-center ml-6 space-x-4">
          {/* if there is a dashboard link element put it on right side of screen before profile name */}
          {dashboardLink}
          <button className="text-sm md:text-xl font-bold text-center border-2 text-gold rounded-full px-4 py-2 border-navy hover:border-gold">
            {profileName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
