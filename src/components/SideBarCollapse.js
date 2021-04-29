import React from "react";
import { FaCompass } from "react-icons/fa";
import { IoHome } from 'react-icons/io5';
import { MdVideoLibrary } from "react-icons/md";
import { RiVideoChatFill } from "react-icons/ri";
import { SiYoutubetv } from "react-icons/si";
import SideBarItem from "./SideBarItem";

const SideBarCollapse = ({ barStatus }) => {
  return (
    <div className={`side-bar__collapse ${barStatus}`}>
      <ul className="side-bar__list">
        <SideBarItem isActive title="Trang chủ" Icon={IoHome} />
        <SideBarItem title="Khám phá" Icon={FaCompass} />
        <SideBarItem title="Kênh đăng kí" Icon={SiYoutubetv} />
        <SideBarItem title="Thư viện" Icon={MdVideoLibrary} />
        <SideBarItem title="Xem sau" Icon={RiVideoChatFill} />
      </ul>
    </div>
  );
};

export default SideBarCollapse;
