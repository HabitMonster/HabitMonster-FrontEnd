import React from 'react';
import PropTypes from 'prop-types';

import MONSTERS from '../../assets/images/monsters/svg';

const MonsterThumbnail = ({ id, width, height, ...rest }) => {
  const Monster = MONSTERS[id];

  return (
    <Monster
      style={{ width, height, maxWidth: '100%', maxHeight: '100%', ...rest }}
    />
  );
};

MonsterThumbnail.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

MonsterThumbnail.defaultProps = {
  width: '100%',
  height: '100%',
};

export default MonsterThumbnail;
