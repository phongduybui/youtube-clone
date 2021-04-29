import React from "react";
import { connect } from 'react-redux';
import { IoHome } from 'react-icons/io5';
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaCompass } from "react-icons/fa";
import { MdVideoLibrary, MdWatchLater } from "react-icons/md";
import { RiVideoChatFill } from "react-icons/ri";
import { SiYoutubetv } from "react-icons/si";
import SideBarItem from "./SideBarItem";
import Modal from "./Modal";

const SideBarExpand = ({ isBarCollapse, barStatus, isTablet, isShow }) => {

  const showExpand =  (!isBarCollapse && (isTablet || isShow)) 
    ? 'show-side-bar-expand' : '';

  return (
    <div className={`side-bar__expand ${barStatus} ${showExpand}`}>
      {(!isBarCollapse && (isTablet || isShow)) ? <Modal/> : null}
      <ul className={`side-bar__list`}>
        <SideBarItem isActive title="Trang chủ" Icon={IoHome} />
        <SideBarItem title="Khám phá" Icon={FaCompass} />
        <SideBarItem title="Kênh đăng kí" Icon={SiYoutubetv} />
        <li className="break-line"></li>
        <SideBarItem title="Thư viện" Icon={MdVideoLibrary} />
        <SideBarItem title="Video đã xem" Icon={MdWatchLater} />
        <SideBarItem title="Video của bạn" Icon={BsFillCollectionPlayFill} />
        <SideBarItem title="Xem sau" Icon={RiVideoChatFill} />
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({ isBarCollapse: state.isBarClick });

export default connect(mapStateToProps)(SideBarExpand);
