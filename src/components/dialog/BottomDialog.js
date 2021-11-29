import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { whiteOpacity } from '../../styles/Mixin';
import LEVELS from '../../assets/images/level';

const BottomDialog = ({
  height,
  title,
  description,
  activeButtonText,
  onClose,
  onActive,
  type,
  level,
}) => {
  const LevelIcon = LEVELS[level];
  console.log('type', type);
  switch (type) {
    case 'levelUp':
      return (
        <Wrapper height={height}>
          <OneButtonInner>
            <Title type={type}>{title}</Title>
            <BadgeWrap>
              <LevelIcon />
            </BadgeWrap>
            {description && <Description>{description}</Description>}
            <ButtonGrid type={type}>
              <Button onClick={onActive} active>
                {activeButtonText}
              </Button>
            </ButtonGrid>
          </OneButtonInner>
        </Wrapper>
      );
    default:
      console.log(type);
      return (
        <Wrapper height={height}>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          <ButtonGrid>
            <Button onClick={onClose}>아니요</Button>
            <Button onClick={onActive} active>
              {activeButtonText}
            </Button>
          </ButtonGrid>
        </Wrapper>
      );
  }
};

BottomDialog.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  activeButtonText: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onActive: PropTypes.func.isRequired,
  height: PropTypes.string,
  level: PropTypes.number,
};

BottomDialog.defaultProps = {
  height: '202px',
  description: '',
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 414px;
  height: ${({ height }) => (height ? height : '308px')};
  padding: 24px 24px 0 24px;
  background: var(--bg-primary);
  border-radius: 24px 24px 0px 0px;

  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
`;

const OneButtonInner = styled.div`
  height: 100%;

  & > h2 {
    text-align: center;
    margin-bottom: 24px;
  }

  & > p {
    text-align: center;
  }

  & button {
    width: 150px;
    margin: 0 auto;
  }
`;

const BadgeWrap = styled.div`
  width: 108px;
  height: 108px;
  margin: 0 atuo;
  background: linear-gradient(180deg, #02db26 0%, #19892c 100%);
  border-radius: 99em;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: var(--weight-bold);
  font-size: ${({ type }) => (type ? 'var(--font-xxl)' : 'var(--font-l)')};
  line-height: 24px;
  color: var(--color-primary);
`;

const Description = styled.p`
  ${whiteOpacity('0.8')};
  font-size: var(--font-xs);
  line-height: 20px;
  margin: 21px 0px;
`;

const ButtonGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ type }) => (type ? '1fr' : 'repeat(2, 1fr)')};
  column-gap: 12px;
  margin-top: 21px;
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background: ${({ active }) =>
    active ? 'var(--bg-active)' : 'var(--bg-nope)'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-s);
  font-weight: var(--weight-bold);
  line-height: 18px;
  color: ${({ active }) =>
    active ? 'var(--color-white)' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  border-radius: var(--border-radius-semi);
  cursor: pointer;
`;

export default BottomDialog;
