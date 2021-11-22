import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MonsterThumbnail } from '../common';

const MonsterThumbnailWrapper = ({
  id,
  width,
  height,
  thumbnailSize,
  monsterLevel,
}) => {
  return (
    <ThumbnailWrapper size={thumbnailSize}>
      <MonsterThumbnail id={id} width={width} height={height} />
      {monsterLevel && <LevelBadge>Lv.{monsterLevel}</LevelBadge>}
    </ThumbnailWrapper>
  );
};

export default MonsterThumbnailWrapper;

const getThumbnailSize = (size) => {
  switch (size) {
    case 'small':
      return {
        backgroundColor: 'transparent',
        border: '1px solid rgba(248, 248, 248, 0.2)',
        width: '80px',
        height: '80px',
        padding: '14px 17px',
      };
    default:
      return {
        backgroundColor: 'rgba(248, 248, 248, 0.2)',
        border: '1px solid transparent',
        width: '52px',
        height: '52px',
        padding: '0',
      };
  }
};

const ThumbnailWrapper = styled.div`
  background-color: ${({ size }) => getThumbnailSize(size).backgroundColor};
  border: ${({ size }) => getThumbnailSize(size).border};
  border-radius: 50%;
  padding: ${({ size }) => getThumbnailSize(size).padding};
  position: relative;
  width: ${({ size }) => getThumbnailSize(size).width};
  height: ${({ size }) => getThumbnailSize(size).height};
`;

const LevelBadge = styled.span`
  background-color: #02db26;
  border-radius: 4px;
  color: var(--color-white);
  line-height: 14px;
  font-size: var(--font-xxs);
  font-weight: var(--weight-bold);
  padding: 2px 4px;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

MonsterThumbnailWrapper.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  thumbnailSize: PropTypes.string,
  monsterLevel: PropTypes.number,
};
