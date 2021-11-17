import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { fontSize, whiteOpacity } from '../../styles/Mixin';
import { ToggleUp, ToggleDown } from '../../assets/icons/common';

const NoticeItem = ({ notiInfo, onToggle, active }) => {
  const { title, contents, createdAt } = notiInfo;
  const contentArea = useRef();

  return (
    <NotiListItem>
      <NotiTitleWrap>
        <NotiTitle>{title}</NotiTitle>
        <NotiDate>{createdAt}</NotiDate>
        <ToggleButton onClick={onToggle}>
          {active ? <ToggleUp /> : <ToggleDown />}
        </ToggleButton>
      </NotiTitleWrap>
      <ContentsWrap ref={contentArea}>
        <NotiBox>{contents}</NotiBox>
      </ContentsWrap>
    </NotiListItem>
  );
};

export default NoticeItem;

const NotiListItem = styled.li`
  cursor: ${({ isCursor }) => (isCursor ? 'pointer' : 'default')};
  padding: 0 24px;
  border-bottom: 0.5px solid rgba(248, 248, 248, 0.1);
  /* & :nth-child(4) {
    margin-right: 6px;
    border-bottom: none;
  } */
`;

const NotiTitleWrap = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotiTitle = styled.p`
  ${fontSize('16px')};
  line-height: 19px;
  font-weight: var(--font-weight-bold);
  ${whiteOpacity('0.8')};
`;

const NotiDate = styled.p`
  ${fontSize('13px')};
  line-height: 16px;
  ${whiteOpacity('0.6')};
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: 0;
  /* cursor: pointer; */
  height: 18px;
  outline: 0;
  /* margin-left: 7px; */
`;

const ContentsWrap = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
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
  notiInfo: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
