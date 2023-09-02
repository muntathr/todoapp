import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import styles from './styles/modules/app.module.scss';
import Router from './Router';


function App() {
  return (
    <>
      <div>
        <div className={styles.app__wrapper}>
          <Router />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
