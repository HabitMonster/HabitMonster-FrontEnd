import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontSize, whiteOpacity } from '../../styles/Mixin';
import { ToggleUp, ToggleDown } from '../../assets/icons/common';

const NoticeItem = ({ notice, active, onToggle }) => {
  const { title, content, createdAt } = notice;
  const contentArea = useRef();

  return (
    <NotiListItem>
      <NotiTitleWrap>
        <NotiTitle>{title}</NotiTitle>
        <NotiDate>{createdAt}</NotiDate>
      </NotiTitleWrap>
      <ToggleButton onClick={onToggle}>
        {active ? <ToggleUp /> : <ToggleDown />}
      </ToggleButton>
      {/* <ContentsWrap ref={contentArea}>
        <NotiBox>{content}</NotiBox>
      </ContentsWrap> */}
      <ContentsWrap
        ref={contentArea}
        style={
          active
            ? { height: contentArea.current.scrollHeight }
            : { height: '0px' }
        }
      >
        <NotiBox>{content}</NotiBox>
      </ContentsWrap>
    </NotiListItem>
  );
};

export default NoticeItem;

const NotiListItem = styled.li`
  cursor: ${({ isCursor }) => (isCursor ? 'pointer' : 'default')};
  padding: 0 24px;
  border-bottom: 0.5px solid rgba(248, 248, 248, 0.1);
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* & :nth-child(4) {
    margin-right: 6px;
    border-bottom: none;
  } */
`;

const NotiTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-content: baseline;
  justify-content: flex-start;
  margin: 0 16px;
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
  /* margin-left: 7px; */
`;

const ContentsWrap = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
  height: 0;
  overflow: hidden;
  transition: height ease 0.2s;
`;

const NotiBox = styled.div`
  background-color: var(—bg-primary);
  ${fontSize('14px')}
  ${whiteOpacity('0.8')};
  font-weight: var(—weight-semi-regular);
  line-height: 20px;
  color: var(—color-primary);
`;

NoticeItem.propTypes = {
  notice: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
