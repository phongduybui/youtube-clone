import "./SideBar.css";
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { setBarClick } from '../actions';
import { connect } from "react-redux";
import useWindowDimensions from "../hooks/useWindowDimensions";
import checkPathName from '../helpers/checkPathName';
import SideBarCollapse from "./SideBarCollapse";
import SideBarExpand from "./SideBarExpand";

const SideBar = ({ isBarClick, setBarClick }) => {
  const { pathname } = useLocation();
  console.log(pathname)
  const { width } = useWindowDimensions();

  useEffect(() => {
    if(width <= 1023 && width >= 600) {
      setBarClick(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

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
        <SideBarExpand barStatus="collapse" isTablet />
        <SideBarCollapse barStatus="collapse" />
      </>
    }
    else {
      return <SideBarCollapse barStatus="collapse mobile" />
    }
  }

  const isWatchVideoPage = checkPathName(pathname);

  return (
    <aside className={`side-bar ${isWatchVideoPage ? 'hide-side-bar' : ''}`}>
      {isWatchVideoPage ? 
      <SideBarExpand barStatus="collapse" isShow /> : renderSideBar()}
    </aside>
  );
};

const mapStateToProps = (state) => ({ isBarClick: state.isBarClick });

export default connect(mapStateToProps, { setBarClick })(SideBar);
