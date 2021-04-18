import './SideBarItem.css';
import React from 'react';
import { Link } from 'react-router-dom';

const SideBarItem = ({ Icon, title, isActive }) => {
  const active = isActive ? 'active' : '';
  return (
    <li className="side-bar__item">
      <Link to="/search-results" className={`side-bar__link ${active}`}>
        <Icon />
        <span className="side-bar__title">{title}</span>
      </Link>
    </li>
  )
}

export default SideBarItem;
