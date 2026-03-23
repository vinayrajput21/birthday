import React, { useState } from "react";
import "./messageBox.css";

const MessageBox = () => {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpenEnvelope = () => {
    setOpened(true);

    setTimeout(() => {
      setShowLetter(true);
    }, 800);
  };

  return (
    <div className="message-wrapper">

      {/* Envelope */}
      {!showLetter && (
        <div
          className={`msg-envelope-container ${opened ? "open" : ""}`}
          onClick={handleOpenEnvelope}
        >
          <div className="msg-envelope">
            <div className="msg-envelope-back"></div>
            <div className="msg-envelope-front"></div>
            <div className="msg-envelope-flap"></div>
          </div>

          <p className="tap-text">Tap to open letter 💌</p>
        </div>
      )}

      {/* Letter */}
      {showLetter && (
        <div className="letter-box">
          <div className="letter-card">

            <h1 className="birthday-text">
              Happy Birthday Again 🎉
            </h1>

            <h2 className="gift-text">
              Abhi To Gift Baki H 🎁
            </h2>

            <p className="sub-text">
              Wait for the surprise... something special is coming for you 💖
            </p>

          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBox;