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
      document.activeElement.blur();
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.31);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  margin: 0 16px;
  background-color: var(--color-white);
  border-radius: var(--border-radius-progress);
`;

export default Modal;
