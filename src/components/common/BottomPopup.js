import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { whiteOpacity } from '../../styles/Mixin';

const BottomPopup = ({ handleAuth, disabled }) => {
  return (
    <Wrap disabled={disabled}>
      정말 로그아웃 하시겠어요?
      <RejectButton onClick={handleAuth}>아니요</RejectButton>
      <LogoutButton onClick={handleAuth}>로그아웃하기</LogoutButton>
    </Wrap>
  );
};

BottomPopup.propTypes = {
  handleAuth: PropTypes.func,
  disabled: PropTypes.func.isRequired,
};

const Wrap = styled.div`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  height: 140px;

  position: fixed;
  bottom: 0;
  background: var(--bg-primary);
  z-index: 3;
  border: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-weight: var(--weight-bold);
  font-size: var(--font-l);
  line-height: 22px;
  color: var(--color-primary);
  transition: all 150ms ease-out;

  &:disabled {
    background: var(--bg-disabled);
    ${whiteOpacity(0.2)};
  }
`;

const RejectButton = styled.button`
  border-radius: 4px;
  background: var(--bg-nope);
  color: white;
  border-radius: 4px;
`;

const LogoutButton = styled.button`
  border-radius: 4px;
  background: var(--bg-active);
  color: white;
  border-radius: 4px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;
export default BottomPopup;
