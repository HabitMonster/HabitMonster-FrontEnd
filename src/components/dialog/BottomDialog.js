import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { whiteOpacity } from '../../styles/Mixin';

const BottomDialog = ({
  height,
  title,
  description,
  activeButtonText,
  onClose,
  onActive,
}) => (
  <Wrapper height={height}>
    <Title>{title}</Title>
    <Description>{description}</Description>
    <ButtonGrid>
      <Button onClick={onClose}>아니요</Button>
      <Button onClick={onActive} active>
        {activeButtonText}
      </Button>
    </ButtonGrid>
  </Wrapper>
);

BottomDialog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  activeButtonText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onActive: PropTypes.func.isRequired,
  height: PropTypes.string,
};

BottomDialog.defaultProps = {
  height: '202px',
};

const Wrapper = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  padding: 24px 24px 0 24px;
  background: var(--bg-primary);
  border-radius: 24px 24px 0px 0px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  bottom: 0;
`;

const Title = styled.h2`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-l);
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
  grid-template-columns: repeat(2, 1fr);
  column-gap: 12px;
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
  font-weight: var(--font-weight-bold);
  line-height: 18px;
  color: ${({ active }) =>
    active ? 'var(--color-white)' : 'rgba(255, 255, 255, 0.8)'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default BottomDialog;
