import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { EditIcon, CopyIcon } from '../../assets/icons/common';

import { whiteOpacity, setFlexStyles, setFontStyles } from '../../styles';

const UserInfoItem = ({ userInfoItem }) => {
  const { title, contents, handleClick, isLogout, isDeleteAccount, isCopy } =
    userInfoItem;
  const isPossibleEdit = useMemo(() => !!handleClick, [handleClick]);
  const isNeedEditIcon = useMemo(
    () => isPossibleEdit && !isLogout && !isDeleteAccount && !isCopy,
    [isPossibleEdit, isLogout, isDeleteAccount, isCopy],
  );

  return (
    <InfoListItem isCursor={isPossibleEdit} onClick={handleClick}>
      <DefaultTitle>{title}</DefaultTitle>
      <PrivateTextWrap>
        {contents && <PrivateText>{contents}</PrivateText>}
        {isNeedEditIcon && <EditIcon />}
        {isCopy && (
          <CopyWrap>
            <CopyIcon />
          </CopyWrap>
        )}
      </PrivateTextWrap>
    </InfoListItem>
  );
};

UserInfoItem.propTypes = {
  userInfoItem: PropTypes.object.isRequired,
};

const InfoListItem = styled.li`
  color: var(--color-primary);
  cursor: ${({ isCursor }) => (isCursor ? 'pointer' : 'default')};
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })}
  height: 64px;
  padding: 0 24px;
  border-bottom: 0.5px solid rgba(248, 248, 248, 0.1);

  & :nth-child(4) {
    margin-right: 6px;
    border-bottom: none;
  }
`;

const DefaultTitle = styled.p`
  ${setFontStyles({
    fontSize: 's',
    fontWeight: 'bold',
    lineHeight: '18px',
  })}
  ${whiteOpacity('0.8')};
`;

const PrivateTextWrap = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
  })}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > svg {
    display: block;
    margin-left: 8px;
  }
`;

const CopyWrap = styled.div`
  padding-left: 8px;
  cursor: pointer;
`;

const PrivateText = styled.p`
  ${setFontStyles({
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: '16px',
  })}
  ${whiteOpacity('0.8')};
  height: 17px;
`;

export default UserInfoItem;
