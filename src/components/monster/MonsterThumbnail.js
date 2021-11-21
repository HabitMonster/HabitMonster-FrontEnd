import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { None } from '../../assets/images/placeholder';

const MonsterThumbnail = ({ imageUrl, imageAlt, imageSize }) => {
  return (
    <>
      {imageUrl ? (
        <MonsterImage src={imageUrl} alt={imageAlt} size={imageSize} />
      ) : (
        <PlaceholderImage width="100%" height="100%" />
      )}
    </>
  );
};

export default MonsterThumbnail;

const getThumbnailSize = (size) => {
  switch (size) {
    case 'large':
      return { width: '200px', height: '200px' };
    case 'mideum':
      return { width: '105px', height: '105px' };
    case 'small':
      return { width: '100%', height: '100%' };
    default:
      return { width: '52px', height: '52px' };
  }
};

const MonsterImage = styled.img`
  width: ${({ size }) => getThumbnailSize(size).width};
  height: ${({ size }) => getThumbnailSize(size).height};
`;

const PlaceholderImage = styled(None)`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

MonsterThumbnail.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  imageSize: PropTypes.string,
};
