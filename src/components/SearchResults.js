import './SearchResults.css';
import React from 'react';
import { connect } from 'react-redux';
import { VscListFilter } from 'react-icons/vsc';
import VideoItem from './VideoItem';

const SearchResults = ({ videos, channels }) => {

  const renderSearchResultVideos = () => {
    return videos.map(video => {
      const { 
        title, 
        channelTitle,
        channelId,
        thumbnails, 
        publishedAt,
        description
      } = video.snippet;
      
      return (
        <VideoItem
          className="video-item--w100"
          id={video.id.videoId}
          channelId={channelId}
          title={title}
          channelTitle={channelTitle}
          thumbnails={thumbnails}
          description={description}
          publishedAt={publishedAt}
          key={video.id.videoId}
        />
      );
    })
  }

  return (
    <div className="search-results">
      <div className="search__filters">
        <label htmlFor="filter-hidden-input" className="search__filters-button">
          <VscListFilter />
          <span>bộ lọc</span>
        </label>
        <input type="checkbox" hidden id="filter-hidden-input"/>
        <div className="search__filters-dropdown"></div>
      </div>
      <div className="search-results__videos">
        {renderSearchResultVideos()}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  videos: Object.values(state.searchResults.videos),
  channels: Object.values(state.searchResults.channels),
  isBarCollapse: state.isBarClick,
});

export default connect(mapStateToProps)(SearchResults)
