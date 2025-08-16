import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { useUser } from "../firebase/UserContext";
import stackprooflogo from '/images/lang-icons/stackproof logo icon.png'
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef();
  const overlayRef = useRef();
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const auth = getAuth();

  // Logo animation effects
  useEffect(() => {
    // Initial activation
    setIsActive(true);
    
    // Periodic pulsing effect
    const interval = setInterval(() => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 1000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.from(".nav-wrapper", {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.4, ease: "power2.out" });
      gsap.to(overlayRef.current, { 
        opacity: 1, 
        visibility: "visible",
        duration: 0.3 
      });
      gsap.to(menuRef.current.querySelectorAll("li"), {
        opacity: 1,
        x: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.4, ease: "power2.in" });
      gsap.to(overlayRef.current, { 
        opacity: 0, 
        visibility: "hidden",
        duration: 0.3 
      });
    }
  }, [isOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/#', { replace: true });
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="nav-wrapper">
      <nav className="nav-container" style={{height: '80px'}}>
        <NavLink >
          <img src={stackprooflogo} alt="stackproof logo" style={{ width: '50px', height: 'auto' }} />
        </NavLink>

        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/language-selector">Challenges</NavLink></li>
          <li><NavLink to="/about-us">About</NavLink></li>
          <li><NavLink to="/leaderboard">LeaderBoard</NavLink></li>
        </ul>

        <div className="nav-auth">
          {isLoading ? null : user ? (
            <>
              <NavLink to="/dashboard" className="btn-link">Dashboard</NavLink>
              <button onClick={handleLogout} className="btn-primary">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-link">Login</NavLink>
              <NavLink to="/sign-up" className="btn-primary">Sign Up</NavLink>
            </>
          )}
        </div>

        <button 
          className="hamburger-icon" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu toggle"
        >
          {isOpen ? "×" : "≡"}
        </button>
      </nav>

      <div 
        ref={overlayRef}
        className={`menu-overlay ${isOpen ? 'open' : ''}`} 
        onClick={closeMenu}
      />

      <div className={`mobile-nav ${isOpen ? 'open' : ''}`} ref={menuRef}>
        <ul>
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/language-selector" onClick={closeMenu}>Challenges</NavLink></li>
          <li><NavLink to="/about-us" onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/leaderboard" onClick={closeMenu}>LeaderBoard</NavLink></li>

          {isLoading ? null : user ? (
            <>
              <li><NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink></li>
              <li><button onClick={handleLogout} className="btn-primary">Logout</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" onClick={closeMenu}>Login</NavLink></li>
              <li><NavLink to="/sign-up" onClick={closeMenu} className="btn-primary" style={{ color: '#fff' }}>Sign Up</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Nav;