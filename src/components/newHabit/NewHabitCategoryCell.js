import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { whiteOpacity, setFontStyles, setFlexStyles } from '../../styles';
import { LoadingSpinner } from '../../assets/icons/common';
import noop from '../../utils/noop';

const NewHabitCategoryCell = ({ src, name, onClick, skeleton }) => {
  return (
    <GategoryWrapper onClick={onClick}>
      {skeleton ? (
        <div style={{ width: '30px', height: '30px', background: 'eee' }}>
          <LoadingSpinner style={{ width: '100%', height: '100%' }} />
        </div>
      ) : (
        <>
          <img
            style={{ width: '45px', height: '45px' }}
            src={src}
            alt={`category: ${name}`}
          />
          <span>{name}</span>
        </>
      )}
    </GategoryWrapper>
  );
};

NewHabitCategoryCell.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
  skeleton: PropTypes.bool,
};

NewHabitCategoryCell.defaultProps = {
  src: '',
  name: '',
  onClick: noop,
};

const GategoryWrapper = styled.div`
  width: 100%;
  height: 92px;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  })}
  padding: 19px 28px 14px;
  background: var(--bg-primary);
  border: 1px solid #3c4254;
  border-radius: var(--border-radius-semi);
  cursor: pointer;

  & span {
    width: 100%;
    min-width: 54px;
    margin-top: 8px;
    ${setFontStyles({
      fontSize: 'xs',
      fontWeight: 'semi-bold',
      lineHeight: '17px',
    })}
    text-align: center;
    ${whiteOpacity('0.8')};
  }
`;

export default NewHabitCategoryCell;
