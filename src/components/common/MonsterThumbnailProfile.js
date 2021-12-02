import React from 'react';
import PropTypes from 'prop-types';

import MONSTERS_PROFILE from '../../assets/images/monsters/svg/profile';

const MonsterThumbnailProfile = ({ id, width, height }) => {
  const Monster = MONSTERS_PROFILE[id];

  if (!Monster) {
    return null;
  }

  return (
    <Monster style={{ width, height, maxWidth: '100%', maxHeight: '100%' }} />
  );
};

MonsterThumbnailProfile.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

MonsterThumbnailProfile.defaultProps = {
  width: '100%',
  height: '100%',
};

export default MonsterThumbnailProfile;
