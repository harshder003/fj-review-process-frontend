import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-navy text-white text-center py-2 mt-4">
        <div className="container mx-auto">
          <p className="text-sm">
            &copy; 2022{" "}
            <a href="https://fischerjordan.com/" className="text-gold">
              FischerJordan
            </a>
            . All rights reserved.
          </p>
          <p className="text-gold text-sm">Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
