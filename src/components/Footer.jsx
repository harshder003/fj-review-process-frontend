import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-navy text-white text-center py-2 mt-4">
        <div className="container mx-auto">
          <p className="text-sm">
            &copy; 2022{" "}
            <a href="" className="text-gold">
              FischerJordan
            </a>
            . All rights reserved.
          </p>
          <p className="text-sm">
            <a href="" className="text-gold">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="" className="text-gold">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
