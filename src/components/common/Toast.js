import React from 'react';
import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';

import { globalWebViewWrapperState } from '../../recoil/states/ui';

import Portal from './Portal';

import { setFontStyles, setFlexStyles } from '../../styles';

const Toast = ({ text, activeToast }) => {
  const webViewWrapper = useRecoilValue(globalWebViewWrapperState);
  return (
    <>
      {activeToast && (
        <Portal className="toast-portal" parent={webViewWrapper?.current}>
          <ToastBar className="toast-content" active={activeToast}>
            {text}
          </ToastBar>
        </Portal>
      )}
    </>
  );
};

Toast.propTypes = {
  activeToast: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  webViewWrapper: PropTypes.object,
};

const toastFadeIn = keyframes`
  0% {
    bottom: 50px;
    opacity: 0;
  }
  100% {
    bottom: 104px;
    opacity: 1;
    }
`;
const toastFadeOut = keyframes`
  0% {
    bottom: 104px;
    opacity: 1;
  }
  100% {
    bottom: 50px;
    opacity: 0;
  }
`;

const ToastBar = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}

  position: absolute;
  width: 100%;
  max-width: 235px;
  ${setFontStyles({
    customColor: 'var(--bg-active)',
    fontSize: 'xs',
  })}
  border-radius: var(--border-radius-semi);
  background-color: var(--bg-toast);
  padding: 12px 20px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  z-index: 2;

  animation: ${({ active }) =>
    active &&
    css`
      ${toastFadeIn} 0.5s, ${toastFadeOut} 0.5s 1.5s
    `};
  animation-fill-mode: forwards;
`;

export default Toast;
