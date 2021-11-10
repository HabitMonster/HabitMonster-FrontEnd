import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MonsterThumbnail = ({ imageUrl, imageAlt, imageSize }) => {
  return <MonsterImage src={imageUrl} alt={imageAlt} size={imageSize} />;
};

export default MonsterThumbnail;

const getThumbnailSize = (size) => {
  switch (size) {
    case 'large':
      return { width: '143px', height: '109px' };
    case 'mideum':
      return { width: '105px', height: '105px' };
    default:
      return { width: '60px', height: '60px' };
  }
};

const MonsterImage = styled.img`
  width: ${({ size }) => getThumbnailSize(size).width};
  height: ${({ size }) => getThumbnailSize(size).height};
`;

MonsterThumbnail.propTypes = {
  imageUrl: PropTypes.string.required,
  imageAlt: PropTypes.string.required,
  imageSize: PropTypes.string,
};
