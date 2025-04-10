'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import TextResizer from "../TextResizer"
import Image from 'next/image';

import youtube from  '../../../../public/assets/img/social/youtube-white.png';
import facebook from '../../../../public/assets/img/social/fb-white.png'; 
import instagram from '../../../../public/assets/img/social/insta-white.png'; 
import linkedin from '../../../../public/assets/img/social/linkedin-white.png'; 
import twitter from '../../../../public/assets/img/social/twitter-white.png'; 

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
          <div className="topbar-left d-flex gap-2">
            <div className="dark-btn dark-btn-stored mode-btn" onClick={handleDarkMode}>
              {darkMode ? (
                <button className="theme-switch">Switch to Light</button>
              ) : (
                <button className="theme-switch">Switch to Dark</button>
              )}
            </div>
            <div className='text-resizer'>
              <TextResizer />
            </div>
          </div>
          <div className="topbar-right">
            <ul>
              <li className="email">
                <i className="fas fa-envelope" role='img' aria-hidden="true"></i>
                <Link href="mailto:info@blindwelfaresociety.in" title="Email" className="ml-10" aria-label="Email">
                  info@blindwelfaresociety.in
                </Link>
              </li>
              <li className="phone">
                <i className="fas fa-phone-alt" role='img' aria-hidden="true"></i>
                <Link href="tel:+91-9968969932" title="Phone" aria-label="Phone">
                  +91-9968969932
                </Link>
              </li>
              <li className="social-area">
                <span>Follow Us - </span>
                <Link href="https://www.facebook.com/blindwelfaresociety" title="Facebook" aria-label="Share on Facebook">
                  <Image src={facebook} alt="Share on Facebook" width={22} height={22} />
                </Link>
                <Link href="https://twitter.com/bwelfaresociety?t=rBF0LR2jopVuUbgMm1ib2g&s=09" title="Twitter" aria-label="Share on Twitter">
                  <Image src={twitter} alt="Share on Twitter" width={28} height={28} />
                </Link>
                <Link href="https://www.instagram.com/blindwelfaresocietyindia/?hl=en" title="Instagram" aria-label='Share on Instagram'>
                  <Image src={instagram} alt="Share on Instagram" width={24} height={24} />
                </Link>
                <Link href="https://www.linkedin.com/company/blind-welfare-society-in-india/" title="Linkedin" aria-label='Share on Linkedin'>
                  <Image src={linkedin} alt="Share on Linkedin" width={28} height={28} />
                </Link>
                <Link href="https://www.youtube.com/channel/UCfHNcdJW41aPNrF9UyHUlCg/" title="Youtube" aria-label='Share on Youtube'>
                  <Image src={youtube} alt="Share on Youtube" width={22} height={22} />
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
