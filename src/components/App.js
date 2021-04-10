import './App.css'
import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import { IconContext } from 'react-icons/lib';

const App = () => {
  

  useEffect(() => {
    const changeTheme = (e) => {
      if(e.which === 13) {
        document.body.classList.toggle('dark-mode');
      }
      return;
    }
    document.body.addEventListener('keypress', changeTheme)
    return () => {
      document.body.removeEventListener('key')
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="app container">
        <IconContext.Provider 
          value={{ className: "react-icons" }}
        >
          <Header />
          <SideBar />
        </IconContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App;
