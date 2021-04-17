import './App.css'
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import Header from './Header';
import SideBar from './SideBar';
import ListVideos from './ListVideos';

const App = () => {
  
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

export default App;
