import React, { useState, useEffect, useRef } from 'react';
import './birthday.css';
import hbdAudio from '../assets/audio/hbd.mp3';
import banner from '../assets/images/banner.png';
import photo1 from '../assets/images/photo1.jpg';
// import photo2 from '../assets/images/photo1.jpg';
// import photo3 from '../assets/images/photo1.jpg';
import canZoom from '../assets/images/can-zoom.png';
import person from '../assets/images/person.jpg';
import ballonBorder from '../assets/images/Balloon-Border.png'

const Birthday = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [lightsOn, setLightsOn] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [cakeVisible, setCakeVisible] = useState(false);
  const [candlesLit, setCandlesLit] = useState(false);
  const [balloonsFlying, setBalloonsFlying] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);
  const [wishDone, setWishDone] = useState(false);

  const audioRef = useRef(null);
  const messageRefs = useRef([]);
  const lightboxRef = useRef(null);
  const lightboxImgRef = useRef(null);
  const containerRef = useRef(null);

  const buttons = [
    { text: "✨ Turn On Lights", action: "lights" },
    { text: "🎵 Play the Music Buddy", action: "music" },
    { text: "🎉 Let's Decorate", action: "banner" },
    { text: "🎈 I got you some Balloons", action: "balloons" },
    { text: "🎂 Cake? Of course!", action: "cake" },
    { text: "🕯️ Light the Candles", action: "candle" },
    { text: "🥳 Happy Birthday!", action: "wish" },
    { text: "💌 A Message for You", action: "story" },
  ];

  const messages = [
    "Hey, it's your special day! 🎂",
    "You light up every room you walk into ✨",
    "Thank you for being YOU 💖",
    "Wishing you joy, laughter, and endless cake 🎉",
    "Happy Birthday! 🥳",
  ];

  // Loading fade-out
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDone(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Lightbox setup
  useEffect(() => {
    const lightbox = lightboxRef.current;
    const img = lightboxImgRef.current;
    if (!lightbox || !img) return;

    const close = (e) => {
      if (e.target === lightbox) lightbox.classList.remove('show');
    };
    lightbox.addEventListener('click', close);
    return () => lightbox.removeEventListener('click', close);
  }, []);

  // Attach lightbox to photos when visible
  useEffect(() => {
    if (!photosVisible) return;
    const photos = document.querySelectorAll('.album-photo');
    const img = lightboxImgRef.current;
    const lightbox = lightboxRef.current;

    const open = (e) => {
      img.src = e.target.src;
      lightbox.classList.add('show');
    };
    photos.forEach(p => p.addEventListener('click', open));
    return () => photos.forEach(p => p.removeEventListener('click', open));
  }, [photosVisible]);

  const showNextButton = (delay = 800) => {
    setTimeout(() => setCurrentStep(prev => prev + 1), delay);
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case "lights":
        setTimeout(() => {
          setLightsOn(true);
        }, 800);
        showNextButton(2000);
        break;

      case "music":
        if (audioRef.current && !musicPlaying) {
          audioRef.current.play().catch(() => {});
          setMusicPlaying(true);
        }
        showNextButton(800);
        break;

      case "banner":
        setBannerVisible(true);
  setPhotosVisible(true);
  
  // Trigger balloons after banner has risen (approx 4.5s)
  setTimeout(() => {
    setBalloonsFlying(true);
  }, 4800);   // <- increased a bit so small balloons start after banner finishes rising

  showNextButton(900);
        break;

      case "balloons":
       setBalloonsFlying(true);
  showNextButton(2800);
        break;

      case "cake":
        setCakeVisible(true);
        showNextButton(900);
        break;

      case "candle":
        setCandlesLit(true);
        showNextButton(900);
        break;

      case "wish":
        setWishDone(true);
        showNextButton(1400);
        break;

      case "story":
  setTimeout(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transition = 'opacity 1.2s ease-in-out';
      container.style.opacity = '0';
    }
    
    setTimeout(() => {
      // This will trigger the parent to switch components
      if (window.switchToLetter) {
        window.switchToLetter();
      }
    }, 1200);
  }, 800);

      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`birthday-container 
        ${lightsOn ? 'lights-on' : ''}
      `}
    >
      {/* Loading Screen */}
      <div className={`loading ${loadingDone ? 'fade-out' : ''}`}>
        <span>Loading your special surprise...</span>
      </div>

      {/* Audio */}
      <audio ref={audioRef} loop>
         <source src={hbdAudio} type="audio/mpeg" />
      </audio>

      <div className={`string-lights ${lightsOn ? 'on' : ''}`}>
        {['yellow', 'red', 'blue', 'green', 'pink', 'orange', 'yellow', 'red'].map((color, i) => (
          <div
            key={i}
            className={`hanging-bulb ${color}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>

{/* ===== BALLOONS ===== */}
<div className={`balloons-container ${balloonsFlying ? 'active' : ''}`}>

  {/* 1. Balloon Banner - comes from bottom to top */}
  <div className={`balloon-banner ${balloonsFlying ? 'rise-and-shrink' : ''}`}>
    <img 
      src={ballonBorder}
      alt="Balloon Banner" 
    />
  </div>

  {/* 2. Flying individual balloons - appear after banner */}
  <div className={`flying-balloons ${balloonsFlying ? 'fly' : ''}`}>
    {['H', 'B', 'D', 'B', 'A', 'B', 'Y'].map((letter, i) => (
      <div
        key={i}
        className={`balloon balloon-${i + 1}`}
        style={{
          '--delay': `${2 + i * 0.5}s`,     // start after banner animation
          '--left': `${12 + i * 11}%`,      // nicely spread
        }}
      >
        <h2 className={wishDone ? 'show-letter' : ''}>{letter}</h2>
      </div>
    ))}
  </div>
</div>

      {/* ===== BANNER ===== */}
<div className={`banner-wrap ${bannerVisible ? 'come' : ''}`}>
  <img src={banner} alt="Happy Birthday Banner" />
</div>

      {/* ===== ALBUM PHOTOS ===== */}
      {photosVisible && (
        <>
          <img src={photo1} className="album-photo album-left-1" alt="Memory 1" />
          <img src={photo1} className="album-photo album-left-2" alt="Memory 2" />
          <img src={photo1} className="album-photo album-right-1" alt="Memory 3" />
          <img src={photo1} className="album-photo album-right-2" alt="Memory 4" />
          <img src={canZoom} className="can-zoom" alt="Click to zoom" />
        </>
      )}

      {/* ===== CAKE ===== */}
      <div className={`cake-wrapper ${cakeVisible ? 'visible' : ''}`}>
        <div className="cake">
          <div className="velas">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`fuego ${candlesLit ? 'lit' : ''}`} />
            ))}
          </div>
          <div className="cobertura" />
          <img src={person} className="profile-img" alt="Birthday Person" />
          <div className="bizcocho" />
        </div>
      </div>

      {/* ===== MESSAGE ===== */}
      {showMessage && (
        <div className="message">
          {messages.map((text, index) => (
            <p
              key={index}
              ref={el => (messageRefs.current[index] = el)}
              style={{ opacity: 0, transform: 'translateY(40px)' }}
            >
              {text}
            </p>
          ))}
        </div>
      )}

      {/* ===== CONTROL BUTTON ===== */}
      <div className="control-panel">
        {currentStep < buttons.length && (
          <button
            className="btn"
            onClick={() => handleButtonClick(buttons[currentStep].action)}
          >
            {buttons[currentStep].text}
          </button>
        )}
      </div>

      {/* ===== LIGHTBOX ===== */}
      <div ref={lightboxRef} className="lightbox">
        <img ref={lightboxImgRef} src="" alt="Zoomed Memory" />
      </div>
    </div>
  );
};

export default Birthday;