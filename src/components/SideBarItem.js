import './SideBarItem.css';
import React from 'react';
import { Link } from 'react-router-dom';

const SideBarItem = ({ Icon, title, isActive, onTablet }) => {
  const showOnTablet = onTablet ? 'show-on-tablet' : '';
  const active = isActive ? 'active' : '';
  return (
    <li className={`side-bar__item ${showOnTablet}`}>
      <Link to="" className={`side-bar__link ${active}`}>
        {Icon}
        <span className="side-bar__title">{title}</span>
      </Link>
    </li>
  )
}

export default SideBarItem;
