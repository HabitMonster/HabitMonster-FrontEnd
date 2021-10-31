import dimmedEmotion from './emotion-dim.png';
import dimmedEtc from './etc-dim.png';
import dimmedHealth from './health-dim.png';
import dimmedHobby from './hobby-dim.png';
import dimmedLife from './life-dim.png';
import dimmedRelationship from './relationship-dim.png';
import dimmedStudy from './study-dim.png';

import emotion from './emotion.png';
import etc from './etc.png';
import health from './health.png';
import hobby from './hobby.png';
import life from './life.png';
import relationship from './relationship.png';
import study from './study.png';

const INACTIVE = {
  EMOTION: dimmedEmotion,
  ETC: dimmedEtc,
  HEALTH: dimmedHealth,
  HOBBY: dimmedHobby,
  LIFE: dimmedLife,
  RELATIONSHIP: dimmedRelationship,
  STUDY: dimmedStudy,
};

const ACTIVE = {
  EMOTION: emotion,
  ETC: etc,
  HEALTH: health,
  HOBBY: hobby,
  LIFE: life,
  RELATIONSHIP: relationship,
  STUDY: study,
};

export default {
  EMOTION: {
    name: '감정관리',
    active: emotion,
    inactive: dimmedEmotion,
  },
  ETC: {
    name: '기타',
    active: etc,
    inactive: dimmedEtc,
  },
  HEALTH: {
    name: '건강',
    active: health,
    inactive: dimmedHealth,
  },
  HOBBY: {
    name: '취미',
    active: hobby,
    inactive: dimmedHobby,
  },
  LIFE: {
    name: '생활',
    active: life,
    inactive: dimmedLife,
  },
  RELATIONSHIP: {
    name: '관계',
    active: relationship,
    inactive: dimmedRelationship,
  },
  STUDY: {
    name: '공부',
    active: study,
    inactive: dimmedStudy,
  },
};
