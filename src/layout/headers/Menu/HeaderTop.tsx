'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const HeaderTop = ({ style }: any) => {
  const [darkMode, setDarkMode] = useState(false);

  const addDarkBg = () => {
    if (!document.body.classList.contains('dark-mode')) {
      setDarkMode(true);
    }
  };

  const addLightBg = () => {
    if (document.body.classList.contains('dark-mode')) {
      setDarkMode(false);
    }
  };

  const handleDarkMode = () => {
    const currentState = localStorage.getItem('idDarkMode');

    if (currentState && JSON.parse(currentState) === true) {
      localStorage.setItem('idDarkMode', 'false');
      document.body.classList.remove('dark-mode');
      setDarkMode(false); // Update state to reflect light mode
    } else {
      localStorage.setItem('idDarkMode', 'true');
      document.body.classList.add('dark-mode');
      setDarkMode(true); // Update state to reflect dark mode
    }
  };

  useEffect(() => {
    const currentState = localStorage.getItem('idDarkMode');
    if (currentState && JSON.parse(currentState) === true) {
      document.body.classList.add('dark-mode');
      setDarkMode(true); // Set initial state to dark mode if stored
    } else {
      document.body.classList.remove('dark-mode');
      setDarkMode(false); // Set initial state to light mode if stored
    }
  }, []);

  return (
    <div className={`navbar-top ${style ? 'pt-30 rpt-10 navtop--two' : 'pt-15 pb-10 bgc-black navtop--one'}`}>
      <div className="container">
        <div className={`navtop-inner ${style ? 'bgc-gray' : ''}`}>
          <div className="topbar-left">
            <div className="dark-btn dark-btn-stored mode-btn" onClick={handleDarkMode}>
              {darkMode ? (
                <button className="theme-switch">Switch to Light</button>
              ) : (
                <button className="theme-switch">Switch to Dark</button>
              )}
            </div>
          </div>
          <div className="topbar-right">
            <ul>
              <li className="email">
                <i className="fas fa-envelope"></i>
                <Link href="mailto:info@blindwelfaresociety.in" title="Email" className="ml-10">
                  info@blindwelfaresociety.in
                </Link>
              </li>
              <li className="phone">
                <i className="fas fa-phone-alt"></i>
                <Link href="tel:+91-9968969932" title="Phone">
                  +91-9968969932
                </Link>
              </li>
              <li className="social-area">
                <span>Follow Us - </span>
                <Link href="https://www.facebook.com/blindwelfaresociety" title="Facebook">
                  <i className="fab fa-facebook-f" role="img" aria-label="SShare"></i>
                </Link>
                <Link href="https://twitter.com/bwelfaresociety?t=rBF0LR2jopVuUbgMm1ib2g&s=09" title="Twitter">
                  <i className="fab fa-twitter" role="img"></i>
                </Link>
                <Link href="https://www.instagram.com/blindwelfaresocietyindia/?hl=en" title="Instagram">
                  <i className="fab fa-instagram" role="img"></i>
                </Link>
                <Link href="https://www.linkedin.com/company/blind-welfare-society-in-india/" title="Linkedin">
                  <i className="fab fa-linkedin-in" role="img"></i>
                </Link>
                <Link href="https://www.youtube.com/channel/UCfHNcdJW41aPNrF9UyHUlCg/" title="Youtube">
                  <i className="fab fa-youtube" role="img"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
