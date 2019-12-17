import React, { useState } from 'react';
import { auth } from '../../firebase.js';

import HorizontalDots from '../../Components/horizontal-dots';
import { BottomModal } from 'react-spring-modal';

import 'react-spring-modal/dist/index.css';
import './styles.css';

function signOut() {
  auth.signOut();
}

function SettingsModal() {
  const [isOpen, setOpen] = useState(false);

  function toggleOpen() {
    console.log("Toggling to:", !isOpen);
    setOpen(!isOpen);
  }

  return (
    <>
      <button onClick={toggleOpen} className="SettingsModal__open"><HorizontalDots /></button>
      <BottomModal isOpen={isOpen} onRequestClose={() => setOpen(false)} className="SettingsModal">
        <h1>Settings</h1>
        <button onClick={signOut} className="SettingsModal__logout">Logout</button>
      </BottomModal>
    </>
  )
}

export default SettingsModal;