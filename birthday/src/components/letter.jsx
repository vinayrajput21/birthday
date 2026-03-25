import React, { useEffect, useState, useRef } from 'react';
import './letter.css';

const Letter = ({ onNext }) => {        
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const contentRef = useRef(null);

const fullLines = [
  "Happy Birthday to Pinki ji, Payal ji aur Paahil ji 🤍",
  "Happy Birthday to “Kuch nahi…”",
  "Happy Birthday to “Kal bataungi… phir bhool jaungi”",
  "Happy Birthday to “Dusron ki madad karne wali”",
  "Happy Birthday to “Khud ko selfish kehne wali ladki”",
  "",
  "Woh jo khud ko hamesha sambhaal ke rakhti hai,",
  "apni feelings ko chup-chaap protect karti hai…",
  "thodi si strong, thodi si soft,",
  "thodi si samajhdaar, thodi si lost.",
  "",
  "Jiska favourite movie Sita Ram hai,",
  "jise kaju katli ka meetha pyaar hai,",
  "jiska favourite alphabet “A” hai,",
  "aur number “1” uska style hai.",
  "",
  "Jise bindi pasand nahi…",
  "par uski simplicity hi uska noor hai.",
  "Jise ice-cream pasand hai…",
  "aur choti choti baaton mein khushi dhoond leti hai.",
  "",
  "Mujhe yaad hai… aapne ek aur gaana bola tha,",
  "“that her” wala…",
  "par shayad aap nahi chahti ki woh feel aaye,",
  "aur main samajhta hoon… isiliye usse bas yaadon mein rehne diya.",
  "",
  "Maine aur bhi bohot kuch likha hai aapke liye…",
  "par shabdon mein unhe kehna,",
  "abhi shayad mujhe aata nahi…",
  "ya phir kahun, mujhe abhi uski ijazat nahi hai.",
  "",
  "Toh yeh bas ek chhota sa tohfa hai meri taraf se…",
  "sirf itna sa,",
  "ki aapka birthday thoda aur special ban sake.",
  "",
  "Happy Birthday once again…",
  "Thodi si cute, thodi si confusing,",
  "par dil se ekdum special ✨"
];

  // Auto scroll while typing
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [displayedLines, currentText]);

  // Typing Effect
  useEffect(() => {
    if (currentLineIndex >= fullLines.length) {
      setTimeout(() => setShowButton(true), 600);
      return;
    }

    const currentFullLine = fullLines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < currentFullLine.length) {
        setCurrentText(currentFullLine.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setDisplayedLines(prev => [...prev, currentFullLine]);
        setCurrentText('');
        setCurrentLineIndex(prev => prev + 1);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);

  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      onNext();      
    }, 800);
  };

return (
  <div className={`letter-container ${fadeOut ? 'fade-out' : ''}`}>

    <div className="paper">
      <div className="paper-content" ref={contentRef}>
        <div className="lines">
          {displayedLines.map((line, index) => (
            <p key={index} className="line typed">{line}</p>
          ))}

          {currentText && (
            <p className="line typing">
              {currentText}
              <span className="cursor">|</span>
            </p>
          )}
        </div>
      </div>
    </div>

    {/* The button is now below the paper and will be centered by the container's flex settings */}
    {showButton && (
      <button onClick={handleNext} className="next-btn">
        Last Message For You
      </button>
    )}
  </div>
);
};

export default Letter;