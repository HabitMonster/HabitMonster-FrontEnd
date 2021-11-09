import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarThumbnail = ({ imageUrl, imageAlt, imageSize }) => {
  return <AvatarImage src={imageUrl} alt={imageAlt} size={imageSize} />;
};

export default AvatarThumbnail;

const getThumbnailSize = (size) => {
  switch (size) {
    case 'large':
      return { width: '200px', height: '200px' };
    case 'mideum':
      return { width: '105px', height: '105px' };
    default:
      return { width: '52px', height: '52px' };
  }
};

const AvatarImage = styled.img`
  width: ${({ size }) => getThumbnailSize(size).width};
  height: ${({ size }) => getThumbnailSize(size).height};
`;

AvatarThumbnail.propTypes = {
  imageUrl: PropTypes.string.required,
  imageAlt: PropTypes.string.required,
  imageSize: PropTypes.string,
};
