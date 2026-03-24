import React, { useState, useEffect, useRef } from 'react';
import './birthday.css';
import hbdAudio from '../assets/audio/hb3.mpeg';
import banner from '../assets/images/banner.png';
import photo1 from '../assets/images/photo1.jpg';
// import photo2 from '../assets/images/photo2.jpg';
// import photo3 from '../assets/images/photo3.jpg';
import canZoom from '../assets/images/can-zoom.png';
import person from '../assets/images/person.jpg';
import ballonBorder from '../assets/images/Balloon-Border.png';

const Birthday = ({ onNext }) => {
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

  // Lightbox state (React-controlled instead of classList)
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const audioRef = useRef(null);
  const messageRefs = useRef([]);
  const containerRef = useRef(null);

  const buttons = [
    { text: "✨ Turn On Lights",      action: "lights"   },
    { text: "🎵 Play the Music Buddy", action: "music"    },
    { text: "🎉 Let's Decorate",       action: "banner"   },
    { text: "🎈 I got you some Balloons", action: "balloons" },
    { text: "🎂 Cake? Of course!",     action: "cake"     },
    { text: "🕯️ Light the Candles",   action: "candle"   },
    { text: "🥳 Happy Birthday!",      action: "wish"     },
    { text: "💌 A Message for You",    action: "story"    },
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
    const timer = setTimeout(() => setLoadingDone(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightboxOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openLightbox = (src) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showNextButton = (delay = 800) => {
    setTimeout(() => setCurrentStep(prev => prev + 1), delay);
  };

  const handleButtonClick = (action) => {
    switch (action) {
      case "lights":
        setTimeout(() => setLightsOn(true), 800);
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
        setTimeout(() => setBalloonsFlying(true), 4800);
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
            container.style.transition = "opacity 1.2s ease-in-out";
            container.style.opacity = "0";
          }
          setTimeout(() => onNext(), 1200);
        }, 800);
        break;

      default:
        break;
    }
  };

  // Balloon config: letter, color pair [body, shine], left%
  const balloonConfig = [
    { letter: 'H', body: '#FF6B6B', shine: '#FFB3B3', left: 8  },
    { letter: 'B', body: '#FFD93D', shine: '#FFF0A0', left: 20 },
    { letter: 'D', body: '#6BCB77', shine: '#B3F0BA', left: 33 },
    { letter: 'B', body: '#4D96FF', shine: '#A8CBFF', left: 46 },
    { letter: 'A', body: '#FF6BCC', shine: '#FFB3EA', left: 59 },
    { letter: 'B', body: '#FF9F43', shine: '#FFD4A0', left: 72 },
    { letter: 'Y', body: '#A29BFE', shine: '#D4CFFF', left: 85 },
  ];

  return (
    <div
      ref={containerRef}
      className={`birthday-container ${lightsOn ? 'lights-on' : ''}`}
    >
      {/* Loading Screen */}
      <div className={`loading ${loadingDone ? 'fade-out' : ''}`}>
        <span>Loading your special surprise...</span>
      </div>

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src={hbdAudio} type="audio/mpeg" />
      </audio>

      {/* ===== STRING LIGHTS ===== */}
      <div className={`string-lights ${lightsOn ? 'on' : ''}`}>
        {['yellow','red','blue','green','pink','orange','yellow','red'].map((color, i) => (
          <div
            key={i}
            className={`hanging-bulb ${color}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* ===== BALLOONS ===== */}
      {balloonsFlying && (
        <div className="balloons-scene">
          {/* Balloon Border strip at bottom */}
          {/* <div className="balloon-border-strip">
            <img src={ballonBorder} alt="Balloon Border" />
          </div> */}

          {/* Individual SVG balloons floating up */}
          {balloonConfig.map((cfg, i) => (
            <div
              key={i}
              className="svg-balloon-wrap"
              style={{
                left: `${cfg.left}%`,
                animationDelay: `${i * 0.35}s`,
              }}
            >
              {/* SVG Balloon */}
              <svg
                className="svg-balloon"
                viewBox="0 0 80 110"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Balloon body */}
                <ellipse cx="40" cy="44" rx="32" ry="38" fill={cfg.body} />
                {/* Shine */}
                <ellipse cx="29" cy="28" rx="9" ry="13" fill={cfg.shine} opacity="0.55" transform="rotate(-20 29 28)" />
                {/* Knot */}
                <ellipse cx="40" cy="82" rx="5" ry="4" fill={cfg.body} />
                {/* String */}
                <path
                  d="M40 86 Q36 96 40 106"
                  stroke="#999"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Letter — only show after wishDone */}
                {wishDone && (
                  <text
                    x="40"
                    y="52"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="'Signika', sans-serif"
                    fontWeight="900"
                    fontSize="28"
                    fill="#fff"
                    style={{ textShadow: 'none' }}
                  >
                    {cfg.letter}
                  </text>
                )}
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* ===== BANNER ===== */}
      <div className={`banner-wrap ${bannerVisible ? 'come' : ''}`}>
        <img src={banner} alt="Happy Birthday Banner" />
      </div>

      {/* ===== ALBUM PHOTOS ===== */}
      {photosVisible && (
        <>
          {[
            { src: photo1, cls: 'album-left-1',  alt: 'Memory 1' },
            { src: photo1, cls: 'album-left-2',  alt: 'Memory 2' },
            { src: photo1, cls: 'album-right-1', alt: 'Memory 3' },
            { src: photo1, cls: 'album-right-2', alt: 'Memory 4' },
          ].map(({ src, cls, alt }) => (
            <img
              key={cls}
              src={src}
              className={`album-photo ${cls}`}
              alt={alt}
              onClick={() => openLightbox(src)}
            />
          ))}
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

      {/* ===== LIGHTBOX (React-controlled) ===== */}
      {lightboxOpen && (
        <div
          className="lightbox show"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed photo"
        >
          {/* Close button */}
          <button
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close"
          >
            ✕
          </button>
          <img
            src={lightboxSrc}
            alt="Zoomed Memory"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Birthday;