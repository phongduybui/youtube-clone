import './Header.css';
import React, { useState } from 'react';
import { toggleDarkMode } from '../actions';
import { connect } from 'react-redux';
import { setBarClick } from '../actions';
import { Link } from 'react-router-dom';
import { MdDehaze } from 'react-icons/md';
import { ImYoutube2 } from 'react-icons/im';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdKeyboardVoice } from 'react-icons/md';
import { BiSun } from 'react-icons/bi';
import { BsMoon } from 'react-icons/bs';
import SearchBar from './SearchBar';
import HeaderButton from './HeaderButton';
import GoogleAuth from './Auth/GoogleAuth';


const Header = ({ isDarkMode, toggleDarkMode, isBarClick, setBarClick }) => {
  const [isMobileSearchClick, setMobileSearchClick] = useState(false);
  const onDarkModeClick = () => {
    document.body.classList.toggle('dark-mode');
    toggleDarkMode();
  }

  return (
    <header className="header">
        <div className="header__logo">
          <HeaderButton
              className={`header__logo-bars ${isBarClick ? 'active' : ''} `}
              Icon={MdDehaze}
              
              onClick={() => setBarClick(!isBarClick)}
          />
          <Link to="/">
            <ImYoutube2 className="header__logo-yt" />
          </Link>
        </div>
        <div className={`header__search-bar ${isMobileSearchClick ? 'active' : ''}`}>
          <SearchBar isMobile={isMobileSearchClick} setMobile={setMobileSearchClick} />
          <HeaderButton
            className="btn-no-border"
            dataTitle="Tìm kiếm bằng giọng nói"
            Icon={MdKeyboardVoice}
          />
        </div>
        <HeaderButton
            className="btn--search-mobile"
            Icon={AiOutlineSearch}
            onClick={(e) => {setMobileSearchClick(true); e.stopPropagation()}}
        />
        <div className="header__user">
          <HeaderButton
            className="btn--user user__darkmode"
            dataTitle={isDarkMode ? "Light Mode" : "Dark Mode"}
            Icon={isDarkMode ? BiSun : BsMoon}
            onClick={() => onDarkModeClick()}
          />
          <GoogleAuth />
        </div>
    </header>
  )
}

const mapStateToProps = state => ({
   isBarClick: state.isBarClick,
   isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps, { setBarClick, toggleDarkMode })(Header);
