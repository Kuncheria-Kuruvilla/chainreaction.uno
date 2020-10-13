import React from 'react';
import './CloseButton.css';

const CloseButton = ({ onCloseButtonClick }) => (
  <svg
    onClick={onCloseButtonClick}
    className="bi bi-x-square custom-close-button"
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default CloseButton;
