import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MonsterThumbnail, MonsterThumbnailProfile } from '../common';

import { setFontStyles, setFlexStyles } from '../../styles';

const MonsterThumbnailWrapper = ({
  isProfile,
  monsterId,
  width,
  height,
  thumbnailSize,
  monsterLevel,
}) => {
  if (isProfile) {
    return (
      <ThumbnailWrapper size={thumbnailSize}>
        <MonsterThumbnailProfile id={monsterId} width={width} height={height} />
        {monsterLevel && <LevelBadge>Lv.{monsterLevel}</LevelBadge>}
      </ThumbnailWrapper>
    );
  }

  return (
    <ThumbnailWrapper size={thumbnailSize}>
      <MonsterThumbnail id={monsterId} width={width} height={height} />
      {monsterLevel && <LevelBadge>Lv.{monsterLevel}</LevelBadge>}
    </ThumbnailWrapper>
  );
};

MonsterThumbnailWrapper.propTypes = {
  isProfile: PropTypes.bool,
  monsterId: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  thumbnailSize: PropTypes.string,
  monsterLevel: PropTypes.number,
};

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
    case 'large': {
      return {
        width: '152px',
        height: '152px',
        padding: '29px',
      };
    }
    default:
      return {
        backgroundColor: 'rgba(248, 248, 248, 0.2)',
        border: '1px solid transparent',
        width: '52px',
        height: '52px',
        padding: '7px',
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
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })}
`;

const LevelBadge = styled.span`
  background-color: #02db26;
  border-radius: 4px;
  ${setFontStyles({
    color: 'white',
    fontSize: 'xxs',
    fontWeight: 'bold',
    lineHeight: '14px',
  })}
  padding: 2px 4px;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

export default MonsterThumbnailWrapper;
