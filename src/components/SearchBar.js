import './SearchBar.css';
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import { fetchVideosAndChannelsByTerm, setIsFetchingData } from '../actions';
import useWindowDimensions from '../hooks/useWindowDimensions';
import HeaderButton from './HeaderButton';
import { connect } from 'react-redux';


const SearchBar = ({ 
  isMobile, 
  setMobile, 
  fetchVideosAndChannelsByTerm, 
  setIsFetchingData 
}) => {
  const [term, setTerm] = useState('');
  const { width } = useWindowDimensions();
  const refSearch = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if(refSearch.current && refSearch.current.contains(e.target)) {
        return;
      }
      setMobile(false);
    }
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderBackButton = () => {
    if(isMobile && width < 739) {
      return (
        <div className="search-bar__back-btn" onClick={() => setMobile(false)}>
          <MdArrowBack />
        </div>
      )
    }
  }

  const searchBarMobile = isMobile && width < 739 ? 'search-bar--mobile' : '';

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(!term) {
      return;
    }
    setIsFetchingData(true);
    fetchVideosAndChannelsByTerm(term, true);
  }

  return (
    <form onSubmit={onFormSubmit} ref={refSearch} className={`search-bar ${searchBarMobile}`}>
      {renderBackButton()}
      <input 
        type="text"
        name="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="search-bar__input"
        placeholder="Tìm kiếm"
      />
      <HeaderButton
        className="btn--search"
        dataTitle="Tìm kiếm"
        Icon={AiOutlineSearch} 
      />
    </form>
  )
}

const mapDispatchToProps = {
  setIsFetchingData,
  fetchVideosAndChannelsByTerm,
};

export default connect(null, mapDispatchToProps)(SearchBar);
