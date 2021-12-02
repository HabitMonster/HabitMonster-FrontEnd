import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import background from '../../assets/images/background';
import { MonsterThumbnail } from '../common';

import { setFontStyles, setFlexStyles } from '../../styles';

const monsterConfiguration = {
  5: {
    width: '182px',
    height: '259px',
    bottom: '-5px',
  },
  10: {
    width: '169px',
    height: '251px',
    bottom: '0px',
  },
  15: {
    width: '202px',
    height: '246px',
    bottom: '0px',
  },
  20: {
    width: '252px',
    height: '199px',
    bottom: '12px',
  },
  25: {
    width: '307px',
    height: '178px',
    bottom: '0px',
  },
  30: {
    width: '210px',
    height: '249px',
    bottom: '10px',
  },
};

const LevelUp = ({ monsterId, onClickSelect, onClickStay }) => {
  return (
    <Container>
      <Top id={monsterId}>
        <MonsterThumbnail
          id={monsterId}
          width={monsterConfiguration[monsterId].width}
          height={monsterConfiguration[monsterId].height}
        />
      </Top>
      <Bottom>
        <TextBox>
          <p>축하합니다!</p>
          <span> 최고 레벨에 도달했어요.</span>
        </TextBox>
        <BtnWrap>
          <button onClick={onClickSelect}>다음 몬스터 고르기</button>
          <button onClick={onClickStay}>유지하기</button>
        </BtnWrap>
      </Bottom>
    </Container>
  );
};
LevelUp.propTypes = {
  onClickSelect: PropTypes.func.isRequired,
  onClickStay: PropTypes.func.isRequired,
  monsterId: PropTypes.number.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  })}
  text-align: center;
  margin: 0 auto;
  position: relative;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const Top = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${({ id }) => background[id]}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  & > svg {
    position: absolute;
    left: 50%;
    bottom: ${({ id }) => monsterConfiguration[id].bottom};
    transform: translateX(-50%);
  }
`;

const Bottom = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0px;
`;

const TextBox = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  })}
  margin: 23px 0;

  & p {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'xl',
      fontWeight: 'bold',
      lineHeight: '24px',
    })}
    margin-bottom: 7px;
  }

  & span {
    ${setFontStyles({
      color: 'deemed2',
      fontSize: 'xs',
      fontWeight: 'semi-regular',
      lineHeight: '17px',
    })}
  }
`;

const BtnWrap = styled.div`
  ${setFlexStyles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  })}

  & button {
    ${setFontStyles({
      color: 'white',
      fontSize: 'm',
    })}
    cursor: pointer;
    width: 253px;
    height: 47px;
    border-radius: var(--border-radius-semi);
    border: none;
    margin: 4px;
    background-color: var(--bg-active);
  }

  & :nth-child(2) {
    background-color: transparent;
    ${setFontStyles({ color: 'deemed2' })}
  }
`;
export default LevelUp;
