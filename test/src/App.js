import { useState } from 'react';
import './app.sass';

import Button from './components/Button/Button';
import Popup from './components/Popup/Popup';

function App() {
  const [isShowedPopup, setShowedPopup] = useState(false);

  function onTogglePopup() {
    setShowedPopup((prev) => !prev);
  }

  return (
    <main className='main'>
      <Button empty onClick={onTogglePopup}>
        Налоговый вычет
      </Button>

      {isShowedPopup && <Popup onClose={onTogglePopup} />}
    </main>
  );
}

export default App;
