import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'wicg-inert';

import Portal from './Portal';

const Modal = ({ open, onClose, children }) => {
  const [active, setActive] = useState(false);
  const backdropReference = useRef(null);

  useEffect(() => {
    const { current } = backdropReference;
    const handleTransitionEnd = () => setActive(open);
    const handleBackdropClick = (e) => e.target === current && onClose();

    if (current) {
      current.addEventListener('transitionend', handleTransitionEnd);
      current.addEventListener('click', handleBackdropClick);
    }

    if (open) {
      setActive(open);
      document.querySelector('#root').setAttribute('inert', 'true');
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (current) {
        current.removeEventListener('transitionend', handleTransitionEnd);
        current.removeEventListener('click', handleBackdropClick);
        document.body.style.overflow = 'scroll';
      }

      document.querySelector('#root').removeAttribute('inert');
    };
  }, [open, onClose]);

  return (
    <>
      {(open || active) && (
        <Portal className="modal-portal">
          <Backdrop
            ref={backdropReference}
            className={active && open && 'active'}
          >
            <Content className="modal-content">{children}</Content>
          </Backdrop>
        </Portal>
      )}
    </>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.elementType])
    .isRequired,
};

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;

  & .modal-content {
    transform: translateY(100px);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
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

const Content = styled.div`
  margin: 0 16px;
`;

export default Modal;
