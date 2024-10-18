import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { styles } from '../styles';
import { navLinks } from '../constans';
import { logo, menu, close } from '../assets';

export const Navbar = () => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to render the nav links
  const renderNavLinks = (isMobile = false) => (
    <ul
      className={`list-none ${
        isMobile ? 'flex-col gap-4' : 'flex-row gap-10'
      } ${isMobile ? 'flex justify-end items-start flex-1' : 'hidden sm:flex'}`}
    >
      {navLinks.map((nav) => (
        <li
          key={nav.id}
          className={`${
            active === nav.title ? 'text-white' : 'text-secondary'
          } ${isMobile ? 'font-poppins text-[16px]' : 'text-[18px]'} 
          hover:text-white font-medium cursor-pointer`}
          onClick={() => {
            setActive(nav.title);
            if (isMobile) setToggle(false); // Close menu for mobile
          }}
        >
          <a href={`#${nav.id}`}>{nav.title}</a>
        </li>
      ))}
    </ul>
  );

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? 'bg-primary' : 'bg-transparent'
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Amir Inbar &nbsp;
            <span className='sm:block hidden me-2'>|</span>
            <span>Frontend Developer</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        {renderNavLinks()}

        {/* Mobile Navigation Toggle */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile Navigation with Slide Animation */}
          <div
            className={`fixed top-20 right-[-5px] mx-4 my-2 min-w-[140px] z-10 rounded-xl p-6 black-gradient transition-transform duration-500 ${
              toggle ? 'translate-x-10' : 'translate-x-full'
            }`}
          >
            {renderNavLinks(true)}
          </div>
        </div>
      </div>
    </nav>
  );
};
