import './App.css'
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import useWindowDimensions from '../hooks/useWindowDimensions';
import Header from './Header';
import SideBar from './SideBar';
import ListVideos from './ListVideos';
import SearchResults from './SearchResults';

const App = ({ isBarCollapse }) => {
  const { width } = useWindowDimensions();
  const sideBarStatus = isBarCollapse && width >= 1024 ? 'collapse' : '';
  
  return (
    <BrowserRouter>
      <div className="app container">
        <IconContext.Provider value={{ className: "react-icons" }}>
          <Header />
          <SideBar />
        </IconContext.Provider>
        <div className={`main ${sideBarStatus}`}>
          <Route path="/" exact component={ListVideos} />
          <Route path="/search-results" exact component={SearchResults} />
        </div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({ isBarCollapse: state.isBarClick });

export default connect(mapStateToProps)(App);
