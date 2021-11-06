import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavButtonHeader = () => {
  return (
    <Wrap>
      <TextButton>월간 통계</TextButton>
      <TextButton>몬스터 도감</TextButton>
    </Wrap>
  );
};

export default NavButtonHeader;

const Wrap = styled.div`
  width: 360px;
  height: 38px;
  display: flex;
`;

const TextButton = styled.button`
  background-color: transparent;
  border: 0;
  border-radius: 3px;
  color: #fff10a;
  cursor: pointer;
  font-weight: bold;
  margin: 0 16px;
  padding: 0;
  position: relative;
  min-width: 60px;
  height: 40px;
  line-height: 40px;
  transition: all 0.3s;
  &::after {
    background-color: #ffffff;
    content: '';
    position: absolute;
    height: 2px;
    opacity: 0;
    width: 0;
    left: 0;
    bottom: 0;
    transition: all 0.3s;
  }
  &:hover {
    color: #ffffff;
    &::after {
      width: 100%;
      opacity: 1;
    }
  }
`;
