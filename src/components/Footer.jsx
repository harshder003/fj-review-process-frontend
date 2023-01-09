import React from "react";

const Footer = () => {
  return (
    // on bottom of page tailwind css even if page is short footer will be at bottom
    <div className="bottom-0 w-full">
      <footer className="bg-navy text-white text-center py-6 mt-6 border-t-2 border-gray-200 shadow-md border-zinc-600">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            Copyright &copy; 2022{" "}
            <a href="https://fischerjordan.com/" className="text-gold">
              FischerJordan.{" "}
            </a>
            All rights reserved.{" "}
          </p>
          <a
            href="https://fischerjordan.com/privacypolicy/"
            className="text-gold text-sm mt-2
          "
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
