import './SearchBar.css';
import React, { useRef, useEffect } from 'react';
import HeaderButton from './HeaderButton';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md'

const SearchBar = ({ isMobile, setMobile }) => {

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
  }, [])

  const renderBackButton = () => {
    if(isMobile) {
      return (
        <div className="search-bar__back-btn" onClick={() => setMobile(false)}>
          <MdArrowBack />
        </div>
      )
    }
  }
  const searchBarOnMobile = isMobile && width < 739? 'search-bar--mobile' : '';
  return (
    <div ref={refSearchBar} className={`search-bar ${searchBarOnMobile}`}>
      {renderBackButton()}
      <input 
        type="text"
        name="search" 
        className="search-bar__input"
        placeholder="Tìm kiếm"
        autoComplete="on"
      />
      <HeaderButton
        className="btn--search"
        dataTitle="Tìm kiếm"
        Icon={<AiOutlineSearch />} 
      />
    </div>
  )
}

export default SearchBar;
