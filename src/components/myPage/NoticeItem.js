import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NotiContent from './NotiContent';
import { fontSize, whiteOpacity } from '../../styles/Mixin';
import { ToggleUp, ToggleDown } from '../../assets/icons/common';

const NoticeItem = ({ notice, active, onToggle }) => {
  const { title, createdAt, id } = notice;
  const contentArea = useRef();

  console.log('contentArea', contentArea?.current?.scrollHeight);
  console.log('contentAreaPadding', contentArea?.current?.style?.padding);

  return (
    <NotiListItem active={active}>
      <HeaderWrap>
        <NotiTitleWrap>
          <NotiTitle>{title}</NotiTitle>
          <NotiDate>{createdAt}</NotiDate>
        </NotiTitleWrap>
        <ToggleButton onClick={onToggle}>
          {active ? <ToggleUp /> : <ToggleDown />}
        </ToggleButton>
      </HeaderWrap>
      <ContentsWrap ref={contentArea} contentArea={contentArea} active={active}>
        <NotiContent active={active} id={id} />
      </ContentsWrap>
    </NotiListItem>
  );
};

export default NoticeItem;

const NotiListItem = styled.li`
  cursor: ${({ isCursor }) => (isCursor ? 'pointer' : 'default')};
  border-bottom: 0.5px solid rgba(248, 248, 248, 0.1);
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 24px; */
  margin: 0 24px;
  height: 75px;
`;

const NotiTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotiTitle = styled.p`
  ${fontSize('16px')};
  line-height: 19px;
  font-weight: var(--weight-bold);
  ${whiteOpacity('0.8')};
  margin-bottom: 7px;
`;

const NotiDate = styled.p`
  ${fontSize('13px')};
  font-weight: var(--weight-semi-regular);
  line-height: 16px;
  ${whiteOpacity('0.6')};
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  height: 18px;
  outline: 0;
`;

const ContentsWrap = styled.div`
  background-color: var(--bg-primary);
  height: ${({ active, contentArea }) =>
    active ? `${contentArea.current.scrollHeight}px` : '0px'};
  overflow: hidden;
  transition: all 0.35s;
`;

NoticeItem.propTypes = {
  notice: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
