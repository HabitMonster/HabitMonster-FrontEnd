import React from 'react';
import PropTypes from 'prop-types';
import MONSTERS from '../../assets/images/monsters/svg';

/*
  @ 몬스터 썸네일'만' 출력하는 컴포넌트입니다.
  @ Wraaper의 children으로 넣어주세요!
  @ Wrapper의 padding을 반드시 지정해주셔야합니다!
*/

const MonsterThumbnail = ({ id, width, height }) => {
  const Monster = MONSTERS[id];

  return (
    <Monster style={{ width, height, maxWidth: '100%', maxHeight: '100%' }} />
  );
};

MonsterThumbnail.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default MonsterThumbnail;
