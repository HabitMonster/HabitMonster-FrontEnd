import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MonsterListItemWrap } from './MonsterListItem';

const MonsterListItemSkeleton = ({ isSearch = false }) => {
  return (
    <MonsterListItemWrap>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MonsterProfileSkeleton />
        <MonsterInformationSkeleton isSearch={isSearch} />
      </div>
      <FollowButtonSkeleton />
    </MonsterListItemWrap>
  );
};

MonsterListItemSkeleton.propTypes = {
  isSearch: PropTypes.bool,
};

const MonsterProfileSkeleton = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 99em;
  background: rgba(255, 255, 255, 0.2);
  margin-right: 12px;
`;

const MonsterInformationSkeleton = styled.div`
  width: 150px;
  height: ${({ isSearch }) => (isSearch ? '51px' : '34px')};
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-semi);
`;

const FollowButtonSkeleton = styled.div`
  width: 56px;
  height: 22px;
  background: #181819;
  border-radius: var(--border-radius-semi);
`;

export default MonsterListItemSkeleton;
