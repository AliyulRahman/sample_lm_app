import React, { useEffect, useState } from "react";
import { getHomeContent } from "../../models/homeContent"; // adjust if needed
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const [footerData, setFooterData] = useState({
    about: "",
    email: "",
    phone: "",
    insta: "",
    facebook: "",
  });

  useEffect(() => {
    const data = getHomeContent();
    if (data?.footer) {
      setFooterData(data.footer);
    }
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-about">
        <h3>About Us</h3>
        <p>{footerData.about}</p>
      </div>

      <div className="footer-contact">
        <h3>Contact</h3>
        <p>Email: {footerData.email}</p>
        <p>Phone: {footerData.phone}</p>
      </div>

      <div className="footer-social">
        <h3>Follow Us</h3>
        <div className="social-icons">
          {footerData.insta && (
            <a className="instagram" href={footerData.insta} target="_blank" rel="noreferrer" title="Instagram">
              <FaInstagram />
            </a>
          )}
          {footerData.facebook && (
            <a className="facebbok" href={footerData.facebook} target="_blank" rel="noreferrer" title="Facebook">
              <FaFacebook />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
