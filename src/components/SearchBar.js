import './SearchBar.css';
import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import { fetchVideosAndChannelsByTerm } from '../actions';
import useWindowDimensions from '../hooks/useWindowDimensions';
import HeaderButton from './HeaderButton';
import { connect } from 'react-redux';


const SearchBar = ({ isMobile, setMobile, fetchVideosAndChannelsByTerm }) => {
  const [term, setTerm] = useState('');
  const { width } = useWindowDimensions();
  const refSearchBar = useRef();

  useEffect(() => {
    const onBodyClick = (e) => {
      if(refSearchBar.current && refSearchBar.current.contains(e.target)) {
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

  const searchBarMobile = isMobile && width < 739? 'search-bar--mobile' : '';
  return (
    <div ref={refSearchBar} className={`search-bar ${searchBarMobile}`}>
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
        onClick={() => fetchVideosAndChannelsByTerm(term)}
      />
    </div>
  )
}

export default connect(null, { fetchVideosAndChannelsByTerm })(SearchBar);
