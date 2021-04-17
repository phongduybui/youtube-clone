import "./SideBar.css";
import React, { useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { setBarClick } from '../actions';
import { connect } from "react-redux";
import SideBarCollapse from "./SideBarCollapse";
import SideBarExpand from "./SideBarExpand";

const SideBar = ({ isBarClick, setBarClick }) => {
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

  return (
    <aside className="side-bar">
      {renderSideBar()}
    </aside>
  );
};

const mapStateToProps = (state) => ({ isBarClick: state.isBarClick });

export default connect(mapStateToProps, { setBarClick })(SideBar);
