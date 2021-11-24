import React from 'react';
import PropTypes from 'prop-types';
import MONSTERS from '../../assets/images/monsters/svg';
import MONSTERS_PROFILE from '../../assets/images/monsters/svg/profile';

/*
  @ 몬스터 썸네일 중 프로필 이미지'만' 출력하는 컴포넌트입니다.
  @ 사용법은 MonsterThumbnail 컴포넌트와 같습니다.
  @ Wraaper의 children으로 넣어주시고 isProfile={true}로 설정해주세요!
  @ Wrapper의 padding을 반드시 지정해주셔야합니다!
*/

const MonsterThumbnailProfile = ({ id, width, height }) => {
  const Monster = MONSTERS_PROFILE[id] ? MONSTERS_PROFILE[id] : MONSTERS[id];

  window.alert(Monster.toString());

  if (!Monster) {
    window.alert('몬스터 안보일 예정');
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

export default MonsterThumbnailProfile;
