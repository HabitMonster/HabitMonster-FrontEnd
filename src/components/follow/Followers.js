import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MonsterThumbnail from '../monster';
import { fontSize, whiteOpacity } from '../../styles';

const Followers = () => {
  return (
    <Container>
      <ThumbnailWrap>
        {/* <MonsterThumbnail
          imageUrl={}
          imageAlt={}
          imageSize={'small'}
        /> */}
      </ThumbnailWrap>
    </Container>
  );
};

export default Followers;

const Container = styled.div`
  width: 360px;
  height: 100%;
  /* position: relative; */
  background: var(--bg-wrapper);
  margin: 0 auto;
  padding-top: 24px;
`;

const ThumbnailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0 30px;
`;
