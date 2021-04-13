import './Modal.css';
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = () => {
  return ReactDOM.createPortal(
    <div className="modal visible"></div>,
    document.querySelector('#modal')
  )
}

export default Modal;