import './Main.css';
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import useWindowDimensions from '../hooks/useWindowDimensions';
import ListVideos from './ListVideos';
import SearchResults from './SearchResults';
import LineLoader from './LineLoader';
import WatchVideo from './WatchVideo/WatchVideo';

const Main = ({ isBarCollapse }) => {
  const { width } = useWindowDimensions();
  const sideBarStatus = isBarCollapse && width >= 1024 ? 'collapse' : '';

  return (
    <div className={`main ${sideBarStatus}`}>
      <LineLoader />
      <Route path="/" exact component={ListVideos} />
      <Route path="/search-results" exact component={SearchResults} />
      <Route path="/watch/:id" exact component={WatchVideo} />
    </div>
  )
}

const mapStateToProps = state => ({ isBarCollapse: state.isBarClick });

export default connect(mapStateToProps)(Main);
