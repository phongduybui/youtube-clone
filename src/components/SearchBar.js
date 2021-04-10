import './SearchBar.css';
import React from 'react';
import HeaderButton from './HeaderButton';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md'

const SearchBar = ({ isMobile, setMobile }) => {

  const renderBackButton = () => {
    if(isMobile) {
      return (
        <div 
          className="search-bar__back-btn"
          onClick={() => setMobile(!isMobile)}
        >
          <MdArrowBack />
        </div>
      )
    }
  }

  return (
    <div className={`search-bar ${isMobile ? 'search-bar--mobile' : ''}`}>
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
