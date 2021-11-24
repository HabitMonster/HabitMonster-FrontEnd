import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

const Toast = ({ text, activeToast }) => {
  return (
    <>
      <ToastBar className="ToastMessage" active={activeToast}>
        {text}
      </ToastBar>
    </>
  );
};

Toast.propTypes = {
  activeToast: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const toastFadeIn = keyframes`
  0% {
    bottom: 50px;
    opacity: 0;
  }
  100% {
    bottom: 81px;
    opacity: 1;
    }
`;
const toastFadeOut = keyframes`
  0% {
    bottom: 81px;
    opacity: 1;
  }
  100% {
    bottom: 50px;
    opacity: 0;
  }
`;

const ToastBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  max-width: 235px;
  font-family: var(--font-name-apple);
  font-size: var(--font-xs);
  border-radius: var(--border-radius-semi);
  color: var(--bg-active);
  background-color: var(--bg-toast);
  padding: 12px 20px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 100;
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  box-sizing: border-box;
  -webkit-animation: ${(props) =>
    props.active
      ? css`
          ${toastFadeIn} 0.5s, ${toastFadeOut} 0.5s 1.5s
        `
      : ''};
  animation: ${(props) =>
    props.active
      ? css`
          ${toastFadeIn} 0.5s, ${toastFadeOut} 0.5s 1.5s
        `
      : ''};
  animation-fill-mode: forwards;
`;

export default Toast;
