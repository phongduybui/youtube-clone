import "./SideBar.css";
import React from "react";
import { connect } from "react-redux";
import { MdHome } from "react-icons/md";
import { FaCompass } from "react-icons/fa";
import { SiYoutubetv } from "react-icons/si";
import { MdVideoLibrary } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { RiVideoChatFill } from "react-icons/ri";
import { BsFillCollectionPlayFill } from 'react-icons/bs';
import SideBarItem from "./SideBarItem";

const SideBar = ({ isBarsClick }) => {

  const isSideBarTablet = isBarsClick ? 'side-bar--tablet' : '';

  return (
    <ul className={`side-bar ${isSideBarTablet}`}>
      <SideBarItem onTablet active="active" title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem onTablet title="Khám phá" Icon={<FaCompass />} />
      <SideBarItem onTablet title="Kênh đăng kí" Icon={<SiYoutubetv />} />
      <SideBarItem onTablet title="Thư viện" Icon={<MdVideoLibrary />} />
      <SideBarItem title="Video đã xem" Icon={<MdWatchLater />} />
      <SideBarItem title="Video của bạn" Icon={<BsFillCollectionPlayFill />} />
      <SideBarItem title="Xem sau" Icon={<RiVideoChatFill />} />
      {/* <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} />
      <SideBarItem title="Trang chủ" Icon={<MdHome />} /> */}
    </ul>
  );
};

const mapStateToProps = (state) => ({ isBarsClick: state.isBarsClick });

export default connect(mapStateToProps)(SideBar);
