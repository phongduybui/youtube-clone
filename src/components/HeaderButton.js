import "./HeaderButton.css";
import React from "react";

const HeaderButton = ({ className, dataTitle, onClick, Icon }) => {
  const hasPseudoAfter = dataTitle ? "has-after" : "";
  return (
    <button
      className={`header-btn ${hasPseudoAfter} ${className}`}
      data-title={dataTitle}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default HeaderButton;
