import "./SideBar.css";
import React, { useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { connect } from "react-redux";
import { MdHome } from "react-icons/md";
import { FaCompass } from "react-icons/fa";
import { SiYoutubetv } from "react-icons/si";
import { MdVideoLibrary } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { RiVideoChatFill } from "react-icons/ri";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import SideBarItem from "./SideBarItem";
import Modal from "./Modal";
import SideBarCollapse from "./SideBarCollapse";
import SideBarExpand from "./SideBarExpand";

const SideBar = ({ isBarClick }) => {
  const { width } = useWindowDimensions();

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.classList.toggle("side-bar--tablet");
  //   }
  // }, [isBarsClick]);

  // useEffect(() => {
  //   if (ref.current && width < 739) {
  //     ref.current.classList.add("side-bar--tablet");
  //   }
  //   if (ref.current && width >= 1024) {
  //     ref.current.classList.remove("side-bar--tablet");
  //   }
  // }, [width]);

  const barStatus = isBarClick ? 'collapse' : 'expand';

  function renderSideBar() { 
    if(width >= 1024) {
      return (
        <>
          <SideBarExpand barStatus={barStatus} />
          <SideBarCollapse barStatus={barStatus} />
        </>
      )
    }
    else if(width <= 1023 && width >= 600){
      return <>
        <SideBarExpand barStatus="collapse" hidden />
        <SideBarCollapse barStatus="collapse" />
      </>
    }
    else {
      return <SideBarCollapse barStatus="collapse mobile" />
    }
  }

  return (
    <aside className={`side-bar`}>
      {renderSideBar()}
    </aside>
  );
};

const mapStateToProps = (state) => ({ isBarClick: state.isBarClick });

export default connect(mapStateToProps)(SideBar);
