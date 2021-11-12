import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize } from '../../styles';
// import { EditIcon } from '../../assets/icons/common';

const UserInfoItem = ({ userInfoItem }) => {
  return (
    <InfoListItem>
      <DefaultTitle>{userInfoItem.title}</DefaultTitle>
      <PrivateText>
        {userInfoItem.contents}
        {userInfoItem && <EditButton>{/* <EditIcon /> */}</EditButton>}
      </PrivateText>
    </InfoListItem>
  );
};

export default UserInfoItem;

const InfoListItem = styled.li`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

const DefaultTitle = styled.p`
  ${fontSize('15px')};
  line-height: 18px;
  font-weight: var(--weight-bold);
  color: var(--color-deemed3);
  opacity: 0.8;
`;

const PrivateText = styled.p`
  ${fontSize('14px')};
  line-height: 16px;
  font-weight: var(--weight-regular);
  color: var(--color-deemed3);
  opacity: 0.8;
`;

const EditButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  outline: 0;
  height: 12px;
`;

UserInfoItem.propTypes = {
  userInfoItem: PropTypes.object.isRequired,
};
