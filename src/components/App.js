import './App.css'
import React from 'react';
import history from '../history';
import { Router } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';

const App = () => {
  
  return (
    <Router history={history}>
      <div className="app container">
        <IconContext.Provider value={{ className: "react-icons" }}>
          <Header />
          <SideBar />
        </IconContext.Provider>
        <Main />
      </div>
    </Router>
  )
}

export default App;
