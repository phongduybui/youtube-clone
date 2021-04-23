import './SearchResults.css';
import React from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { fetchVideosAndChannelsByTerm, setIsFetchingData } from '../actions';
import { connect } from 'react-redux';
import { VscListFilter } from 'react-icons/vsc';
import VideoItem from './VideoItem';
import VideoItemSkeleton from './VideoItemSkeleton';

const SearchResults = ({
  videos,
  isFetchingData,
  setIsFetchingData,
  searchTerm,
  nextPageToken,
  fetchVideosAndChannelsByTerm,
}) => {

  // useEffect(() => {
  //   if(isFetchingData) {
  //     console.log('fetch');
  //     fetchVideosAndChannelsByTerm(nextPageToken, searchTerm)
  //   }
  // }, [isFetchingData, searchTerm])

  // useEffect(() => {
  //   const onScroll = () => {
  //     if(window.innerHeight + document.documentElement.scrollTop === 
  //         document.documentElement.offsetHeight) {
  //       setIsFetchingData(true);
  //       console.log('cuoi trang')
  //     }
  //   };
  //   window.addEventListener('scroll', onScroll);

  //   return () => window.removeEventListener('scroll', onScroll);
  // }, [])

  const [isFetching, setFetching] = useInfiniteScroll(fetchMoreResults);

  function fetchMoreResults() {
    setIsFetchingData(isFetching); //true
    fetchVideosAndChannelsByTerm(nextPageToken, searchTerm)
    setFetching(isFetchingData);
  }

  const renderSearchResultVideos = () => {
    return videos.map((video) => {
      const {
        title,
        channelTitle,
        channelId,
        thumbnails,
        publishedAt,
        description,
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
    });
  };

  return (
    <div className="search-results">
      <div className="search__filters">
        <label htmlFor="filter-hidden-input" className="search__filters-button">
          <VscListFilter />
          <span>bộ lọc</span>
        </label>
        <input type="checkbox" hidden id="filter-hidden-input" />
        <div className="search__filters-dropdown"></div>
      </div>
      <div className="search-results__videos">
        {renderSearchResultVideos()}
        {isFetchingData && (
          <VideoItemSkeleton count={3} className="video-item--w100" />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  videos: Object.values(state.searchResults.videos),
  nextPageToken: state.searchResults.nextPageToken,
  searchTerm: state.searchResults.searchTerm,
  isFetchingData: state.isFetchingData,
});

const mapDispatchToProps = { 
  fetchVideosAndChannelsByTerm, 
  setIsFetchingData
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
