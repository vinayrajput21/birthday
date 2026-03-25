import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Dancing+Script:wght@600;700&family=Lato:wght@300;400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .bday-root {
    width: 100%;
    height: 100vh;
    background: #0d0416;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    font-family: 'Lato', sans-serif;
  }

  /* Stars */
  .stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle var(--dur, 3s) infinite ease-in-out var(--delay, 0s);
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.4); }
  }

  /* Floating petals */
  .petal {
    position: absolute;
    pointer-events: none;
    z-index: 1;
    font-size: var(--size, 18px);
    animation: floatDown var(--fdur, 8s) linear infinite var(--fdelay, 0s);
    opacity: 0;
  }
  @keyframes floatDown {
    0% { transform: translateY(-60px) rotate(0deg); opacity: 0; }
    10% { opacity: 0.9; }
    90% { opacity: 0.7; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }

  /* Scene center */
  .scene {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ─── ENVELOPE ─── */
  .envelope-wrap {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    transition: transform 0.3s;
  }
  .envelope-wrap:hover { transform: scale(1.04); }

  .envelope {
    position: relative;
    width: 320px;
    height: 210px;
    filter: drop-shadow(0 20px 60px rgba(220,100,200,0.4));
  }

  /* back panel */
  .env-back {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, #2a1040 0%, #1a0830 100%);
    border-radius: 12px;
    border: 1.5px solid rgba(220,120,255,0.25);
  }

  /* bottom flap (V shape) */
  .env-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 105px;
    background: linear-gradient(180deg, #3b1560 0%, #220a45 100%);
    clip-path: polygon(0 100%, 100% 100%, 50% 0%);
    border-radius: 0 0 12px 12px;
  }

  /* side flaps */
  .env-left {
    position: absolute;
    top: 0; left: 0;
    width: 50%; height: 100%;
    background: linear-gradient(135deg, #2e1155, #1e0840);
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    border-radius: 12px 0 0 12px;
  }
  .env-right {
    position: absolute;
    top: 0; right: 0;
    width: 50%; height: 100%;
    background: linear-gradient(225deg, #2e1155, #1e0840);
    clip-path: polygon(100% 0, 0 50%, 100% 100%);
    border-radius: 0 12px 12px 0;
  }

  /* top flap */
  .env-flap {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 110px;
    background: linear-gradient(180deg, #4a1a80 0%, #2d0e58 100%);
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    border-radius: 12px 12px 0 0;
    transform-origin: top center;
    transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 5;
  }
  .envelope-wrap.opened .env-flap {
    transform: rotateX(180deg);
  }

  /* wax seal */
  .env-seal {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 52px; height: 52px;
    background: radial-gradient(circle, #e8427a, #b01550);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    border: 3px solid rgba(255,255,255,0.2);
    box-shadow: 0 4px 20px rgba(220,50,100,0.6);
    z-index: 6;
    transition: transform 0.4s, opacity 0.4s;
  }
  .envelope-wrap.opened .env-seal {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }

  /* tap hint */
  .tap-hint {
    color: rgba(220,180,255,0.85);
    font-size: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    animation: breathe 2.5s ease-in-out infinite;
  }
  @keyframes breathe {
    0%,100% { opacity: 0.6; }
    50% { opacity: 1; }
  }

  /* ─── LETTER ─── */
  .letter-scene {
    animation: riseIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @keyframes riseIn {
    from { opacity: 0; transform: translateY(50px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .letter-paper {
    width: 460px;
    max-width: 90vw;
    background: linear-gradient(165deg, #fdfaf4 0%, #fff8ee 60%, #fdf0fa 100%);
    border-radius: 4px 4px 4px 4px;
    padding: 50px 44px 42px;
    position: relative;
    box-shadow:
      0 2px 0 #e8d5c0,
      0 40px 80px rgba(0,0,0,0.5),
      inset 0 0 80px rgba(255,220,180,0.15);
  }

  /* paper fold line */
  .letter-paper::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(200,150,100,0.3), transparent);
  }

  /* decorative corner flourishes */
  .letter-paper::after {
    content: '✦';
    position: absolute;
    top: 18px; right: 22px;
    color: rgba(200,100,150,0.25);
    font-size: 20px;
  }

  .corner-tl {
    position: absolute;
    top: 18px; left: 22px;
    color: rgba(200,100,150,0.25);
    font-size: 20px;
  }

  /* ruled lines */
  .ruled-lines {
    position: absolute;
    inset: 0;
    border-radius: 4px;
    overflow: hidden;
    pointer-events: none;
  }
  .ruled-lines::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      transparent,
      transparent 31px,
      rgba(180,160,220,0.12) 31px,
      rgba(180,160,220,0.12) 32px
    );
  }

  .letter-from {
    font-family: 'Dancing Script', cursive;
    font-size: 13px;
    color: #b08060;
    letter-spacing: 1px;
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeSlide 0.6s 0.3s ease forwards;
  }

  .letter-heading {
    font-family: 'Playfair Display', serif;
    font-size: 36px;
    font-weight: 700;
    color: #c0334d;
    line-height: 1.2;
    margin-bottom: 8px;
    opacity: 0;
    animation: fadeSlide 0.6s 0.5s ease forwards;
  }

  .letter-sub {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 14px;
    color: #b08060;
    letter-spacing: 0.5px;
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeSlide 0.6s 0.65s ease forwards;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeSlide 0.6s 0.75s ease forwards;
  }
  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, #d4a0b0, transparent);
  }
  .divider-icon { color: #d4607a; font-size: 14px; }

  .gift-block {
    background: linear-gradient(135deg, #fff0f5, #ffeef8);
    border: 1.5px solid rgba(220,100,150,0.2);
    border-radius: 12px;
    padding: 22px 24px;
    margin-bottom: 24px;
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: fadeSlide 0.6s 0.9s ease forwards;
  }
  .gift-block::before {
    content: '';
    position: absolute;
    top: -20px; right: -20px;
    width: 80px; height: 80px;
    background: radial-gradient(circle, rgba(255,100,150,0.15), transparent);
    border-radius: 50%;
  }

  .gift-label {
    font-family: 'Lato', sans-serif;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c0607a;
    margin-bottom: 8px;
  }

  .gift-text {
    font-family: 'Dancing Script', cursive;
    font-size: 34px;
    font-weight: 700;
    background: linear-gradient(135deg, #e8a000, #e84060, #c030c0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
    background-size: 200% 100%;
  }
  @keyframes shimmer {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }

  .letter-body {
    font-family: 'Dancing Script', cursive;
    font-size: 18px;
    color: #5a3a4a;
    line-height: 1.8;
    opacity: 0;
    animation: fadeSlide 0.6s 1.1s ease forwards;
  }

  .letter-signature {
    margin-top: 28px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    opacity: 0;
    animation: fadeSlide 0.6s 1.3s ease forwards;
  }
  .sig-icons {
    font-size: 22px;
    animation: bounce 1.8s ease-in-out infinite;
  }
  @keyframes bounce {
    0%,100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
    60% { transform: translateY(-3px); }
  }
  .sig-text {
    font-family: 'Dancing Script', cursive;
    font-size: 20px;
    color: #b04060;
    font-weight: 700;
    text-align: right;
  }
  .sig-name {
    font-size: 14px;
    color: #c08090;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    letter-spacing: 1px;
  }

  /* confetti burst */
  .confetti-piece {
    position: fixed;
    pointer-events: none;
    z-index: 100;
    width: 8px; height: 8px;
    border-radius: 2px;
    animation: confettiFall var(--cdur, 2.5s) ease-in var(--cdelay, 0s) forwards;
  }
  @keyframes confettiFall {
    0% {
      transform: translate(var(--cx, 0px), -20px) rotate(0deg) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(var(--cx, 0px) + var(--drift, 30px)), 90vh) rotate(720deg) scale(0.3);
      opacity: 0;
    }
  }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 520px) {
    .letter-paper { padding: 36px 28px 32px; }
    .letter-heading { font-size: 28px; }
    .gift-text { font-size: 26px; }
    .letter-body { font-size: 16px; }
  }
    .fade-overlay {
  position: fixed;
  inset: 0;
  background: #000;
  z-index: 999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 2s ease-in-out;
}
.fade-overlay.active {
  opacity: 1;
}
`;

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 2.5 + 1}px`,
  dur: `${Math.random() * 4 + 2}s`,
  delay: `${Math.random() * 4}s`,
}));

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  icon: ["🌸","💮","🌺","✿","❋"][i % 5],
  left: `${Math.random() * 100}%`,
  size: `${Math.random() * 14 + 12}px`,
  dur: `${Math.random() * 7 + 6}s`,
  delay: `${Math.random() * 10}s`,
}));

const CONFETTI_COLORS = ["#f94080","#ffcc00","#a040f0","#00d4ff","#ff6b35","#7fff00","#ff69b4"];

function spawnConfetti() {
  const container = document.getElementById("confetti-root");
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    el.className = "confetti-piece";
    const x = Math.random() * window.innerWidth;
    el.style.cssText = `
      left: ${x}px;
      top: 0;
      background: ${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      --cx: ${(Math.random() - 0.5) * 60}px;
      --drift: ${(Math.random() - 0.5) * 120}px;
      --cdur: ${Math.random() * 2 + 2}s;
      --cdelay: ${Math.random() * 0.8}s;
      border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

export default function MessageBox({ audioRef }) {
  const [opened, setOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => {
      setShowLetter(true);
      setTimeout(spawnConfetti, 200);
      setTimeout(spawnConfetti, 700);
    }, 850);
  };
  useEffect(() => {
  const timer = setTimeout(() => {
    setFadeOut(true);
    // Fade out audio
    if (audioRef?.current) {
      const audio = audioRef.current;
      const fadeAudio = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(fadeAudio);
        }
      }, 100);
    }
  }, 10000);
  return () => clearTimeout(timer);
}, []);

  return (
    <>
      <style>{styles}</style>
      <div id="confetti-root" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99 }} />
      <div className={`fade-overlay ${fadeOut ? 'active' : ''}`} />

      <div className="bday-root">
        {/* Stars */}
        <div className="stars">
          {STARS.map(s => (
            <div key={s.id} className="star" style={{
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              "--dur": s.dur, "--delay": s.delay,
            }} />
          ))}
        </div>

        {/* Floating petals */}
        {PETALS.map(p => (
          <div key={p.id} className="petal" style={{
            left: p.left, "--size": p.size,
            "--fdur": p.dur, "--fdelay": p.delay,
          }}>{p.icon}</div>
        ))}

        <div className="scene">
          {!showLetter ? (
            <div className={`envelope-wrap ${opened ? "opened" : ""}`} onClick={handleOpen}>
              <div className="envelope">
                <div className="env-back" />
                <div className="env-left" />
                <div className="env-right" />
                <div className="env-bottom" />
                <div className="env-seal">🌸</div>
                <div className="env-flap" />
              </div>
              <p className="tap-hint">✦ Tap to open your letter ✦</p>
            </div>
          ) : (
            <div className="letter-scene">
              <div className="letter-paper">
                <div className="ruled-lines" />
                <span className="corner-tl">✦</span>

                <p className="letter-from">A little something just for you...</p>

                <h1 className="letter-heading">Happy Birthday Payal 🎉</h1>
                <p className="letter-sub">— Wishing you all the sparkle in the world —</p>

                <div className="divider">
                  <div className="divider-line" />
                  <span className="divider-icon">✦</span>
                  <div className="divider-line" />
                </div>

                <div className="gift-block">
                  <p className="gift-label">Coming soon</p>
                  <p className="gift-text">Abhi To Gift Baki H 🎁</p>
                </div>

                <p className="letter-body">
                  Hold on, don't get too excited yet —<br />
                  something super special is on its way,<br />
                  picked just for you ✨
                </p>

                <div className="letter-signature">
                  <span className="sig-icons">🌟🎊✨</span>
                  <div>
                    <p className="sig-text">Your forever,</p>
                    <p className="sig-name">Always got your back 🌸</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}