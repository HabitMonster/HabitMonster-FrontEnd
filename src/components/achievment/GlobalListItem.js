import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setFontStyles, setFlexStyles } from '../../styles';

const GlobalListItem = ({ data }) => {
  const { content, value } = data;

  return (
    <GlobalListItemWrap>
      <ContentsWrap>
        <p>{content}</p>
        <ValueText>{value}</ValueText>
      </ContentsWrap>
    </GlobalListItemWrap>
  );
};

GlobalListItem.propTypes = {
  data: PropTypes.object,
  content: PropTypes.string,
  value: PropTypes.string,
};

const GlobalListItemWrap = styled.li`
  height: 102px;
  text-align: center;
  padding: 24px;
  border-bottom: 0.7px solid rgba(248, 248, 248, 0.1);
  & :last-child {
    border-bottom: none;
  }
`;

const ContentsWrap = styled.div`
  padding: 0 20px;
  & p {
    ${setFlexStyles({
      display: 'flex',
      justifyContent: 'flex-start',
    })}
    ${setFontStyles({
      color: 'primary-deemed',
      fontSize: 'xs',
      fontWeight: 'bold',
      lineHeight: '17px',
    })}
    margin-bottom: 8px;
  }
`;

const ValueText = styled.h6`
  ${setFlexStyles({
    display: 'flex',
    justifyContent: 'flex-start',
  })}
  ${setFontStyles({
    color: 'primary',
    customFontSize: '22px',
    fontWeight: 'semi-bold',
    lineHeight: '26px',
  })}
`;

export default GlobalListItem;
