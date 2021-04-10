import './Header.css';
import { connect } from 'react-redux';
import { barsClick } from '../actions';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDehaze } from 'react-icons/md';
import { ImYoutube2 } from 'react-icons/im';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdKeyboardVoice } from 'react-icons/md';
import { RiVideoUploadLine } from 'react-icons/ri';
import { CgMenuGridO } from 'react-icons/cg';
import { MdNotifications } from 'react-icons/md';
import SearchBar from './SearchBar';
import HeaderButton from './HeaderButton';


const Header = ({ isBarsClick, barsClick }) => {
  const [isMobileSearchClick, setMobileSearchClick] = useState(false);

  return (
    <header className="header">
        <div className="header__logo">
          <HeaderButton
              className={`header__logo-bars ${isBarsClick ? 'active' : ''} `}
              Icon={<MdDehaze />}
              onClick={() => barsClick()}
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
            Icon={<MdKeyboardVoice />}
          />
        </div>
        <HeaderButton
            className="btn--search-mobile"
            Icon={<AiOutlineSearch />}
            onClick={() => setMobileSearchClick(true)}
        />
        <div className="header__user">
          <HeaderButton
            className="btn--user user__upload"
            dataTitle="Tạo"
            Icon={<RiVideoUploadLine />}
          />
          <HeaderButton
            className="btn--user user__app"
            dataTitle="Các ứng dụng"
            Icon={<CgMenuGridO />}
          />
          <HeaderButton
            className="btn--user user__notify"
            dataTitle="Thông báo"
            Icon={<MdNotifications />}
          />
          <div className="user">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyz-77X11MoGE22xVjjPhbpW6lPj6I0SkcTQ&usqp=CAU" alt="" className="user__avatar"/>
          </div>
        </div>
    </header>
  )
}

const mapStateToProps = state => ({ isBarsClick: state.isBarsClick });

export default connect(mapStateToProps, { barsClick })(Header);
