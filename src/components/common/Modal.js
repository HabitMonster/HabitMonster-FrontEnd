import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import 'wicg-inert';
import { useRecoilValue } from 'recoil';
import { globalWebViewWrapperState } from '../../recoil/states/ui';

import { Portal } from './';

const Modal = ({ open, onClose, children, blurmode }) => {
  const [active, setActive] = useState(false);
  const backdropReference = useRef(null);
  const webViewWrapper = useRecoilValue(globalWebViewWrapperState);

  useEffect(() => {
    const { current } = backdropReference;
    const handleTransitionEnd = () => setActive(open);

    if (current) {
      current.addEventListener('transitionend', handleTransitionEnd);
    }

    if (open) {
      window.setTimeout(() => {
        document.activeElement.blur();
        setActive(open);
        if (isMobile) {
          document.querySelector('#root').setAttribute('inert', 'true');
        }
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', handleTransitionEnd);
      }
      if (isMobile) {
        document.querySelector('#root').removeAttribute('inert');
      }
    };
  }, [open, onClose]);

  return (
    <>
      {(open || active) && (
        <Portal className="modal-portal" parent={webViewWrapper?.current}>
          <Backdrop
            ref={backdropReference}
            className={active && open && 'active'}
            blurmode={blurmode}
          >
            <Content blurmode={blurmode} className="modal-content">
              {children}
            </Content>
          </Backdrop>
        </Portal>
      )}
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.elementType])
    .isRequired,
  blurmode: PropTypes.bool,
};

Modal.defaultProps = {
  blurmode: false,
};

const Backdrop = styled.div`
  position: ${isMobile ? 'fixed' : 'absolute'};
  height: ${isMobile ? 'auto' : '720px'};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ blurmode }) =>
    blurmode ? 'rgba(0,0,0,0.7)' : 'var(--bg-done)'};
  opacity: 0;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-duration);
  z-index: 10;

  & .modal-content {
    height: 100%;

    ${!isMobile &&
    `
      position: fixed;
      height: 640px;
      width: 100%;
      transform: translateX(-50%);
      transform: translateY(100px);
    `}
    transform: translateY(100px);
    transition: all var(--animation-duration) cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }
  &.active {
    transition-duration: 250ms;
    transition-delay: 0ms;
    opacity: 1;
    & .modal-content {
      transform: translateY(0);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
  }
`;

const Content = styled.div``;

export default Modal;
