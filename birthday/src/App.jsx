import React, { useState, useRef } from 'react';
import Birthday from './components/birthday';
import Letter from './components/letter';
import MessageBox from './components/messageBox';
import hbdAudio from './assets/audio/hb3.mpeg';

function App() {
  const [currentScreen, setCurrentScreen] = useState('birthday');
  const audioRef = useRef(null);

  return (
    <div className="app">
      <audio ref={audioRef} src={hbdAudio} loop style={{ display: 'none' }} />

      {currentScreen === 'birthday' && (
        <Birthday audioRef={audioRef} onNext={() => setCurrentScreen('letter')} />
      )}
      {currentScreen === 'letter' && (
        <Letter onNext={() => setCurrentScreen('message')} />
      )}
      {currentScreen === 'message' && (
        <MessageBox audioRef={audioRef} />
      )}
    </div>
  );
}

export default App;