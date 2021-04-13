import './App.css'
import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { connect } from 'react-redux';
import { setDarkMode } from '../actions';
import Header from './Header';
import SideBar from './SideBar';
import ListVideos from './ListVideos';

const App = ({setDarkMode}) => {
  
  useEffect(() => {
    const changeTheme = (e) => {
      if(e.which === 13) {
        document.body.classList.toggle('dark-mode');
        setDarkMode();
      }
      return;
    }
    document.body.addEventListener('keypress', changeTheme)
    return () => {
      document.body.removeEventListener('keypress', changeTheme)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="app container">
        <IconContext.Provider value={{ className: "react-icons" }}>
          <Header />
          <SideBar />
        </IconContext.Provider>
        <ListVideos />
      </div>
    </BrowserRouter>
  )
}

export default connect(null, { setDarkMode })(App);
