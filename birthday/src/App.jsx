import React, { useState } from 'react';
import Birthday from './components/birthday';
import Letter from './components/letter';
import MessageBox from './components/messageBox';   // Import MessageBox

function App() {
  const [currentScreen, setCurrentScreen] = useState('birthday'); 
  // Possible values: 'birthday', 'letter', 'message'

  return (
    <div className="app">
      {currentScreen === 'birthday' && <Birthday onNext={() => setCurrentScreen('letter')} />}
      {currentScreen === 'letter' && <Letter onNext={() => setCurrentScreen('message')} />}
      {currentScreen === 'message' && <MessageBox />}
    </div>
  );
}

export default App;