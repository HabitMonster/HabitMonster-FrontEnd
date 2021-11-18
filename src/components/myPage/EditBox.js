import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { BackButtonHeader, TextInput, BottomFixedButton } from '../common';
import { myPageDataState } from '../../recoil/states/user';
import { asyncDefaultMonster } from '../../recoil/states/monster';

import { myPageApis } from '../../api';
import { fontSize } from '../../styles';
import { OK } from '../../constants/statusCode';

const EditBox = ({ type, editValue, handleChangeValue, closeModal }) => {
  const [originValue] = useState(editValue);
  const isEnabled = editValue && editValue.length <= 10;
  const setEditValue = useSetRecoilState(myPageDataState); // myPageData를 새로운 값으로 바꿔준다!
  // const [monster, refetchMonster] = useRecoilStateLoadable(asyncDefaultMonster); // 비동기 요청으로 담는 몬스터 값을 리페칭해주기!
  const refetchMonster = useSetRecoilState(asyncDefaultMonster);

  const handleClickEdit = async () => {
    if (!isEnabled) return;
    try {
      let editRequest = myPageApis.editUserName;
      if (type === 'monsterName') {
        editRequest = myPageApis.editMonsterName;
      }
      //userName, monsterName

      const { data } = await editRequest({ [type]: editValue });

      if (data.statusCode === OK) {
        alert('변경되었습니다!');

        if (type === 'monsterName') {
          //메인 페이지에 몬스터의 이름을 변경해야 하므로 이것도 추가할게요!
          // setMonster((prev) => ({ ...prev, [type]: editValue }));
          // @jaekyung: default value가 비동기의 응답을 담고있는 아톰이기 때문에 useRecoilSet으로는 아직 지원하지 않는다고 에러가 나네요ㅠㅠ!
          // 대신 api를 다시 리페칭하는 방법을 한 번 사용하겠습니다!
          refetchMonster();
        }
        closeModal();
        // myPageData가 먼저 갱신되면서 closeModal callback 의존성에 영향을 주기 때문에 모달을 닫고 EditValue를 하도록 한다
        setTimeout(() =>
          setEditValue((myPageData) => ({ ...myPageData, [type]: editValue })),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <PositionWrap>
        <BackWrap>
          <BackButtonHeader onButtonClick={closeModal} />
        </BackWrap>
        {type === 'username' && (
          <EditTitle>
            제가 뭐라고
            <br /> 부르면 좋을까요?
          </EditTitle>
        )}
        {type === 'monsterName' && (
          <EditTitle>
            변경할 몬스터 이름을
            <br /> 적어주세요!
          </EditTitle>
        )}
        <TextInput
          text={editValue || ''}
          placeholder={originValue}
          onTextChanged={handleChangeValue}
          maxLength={10}
          idleHelperText="한글, 영문, 숫자 공백없이 최대 10자 입력 가능해요"
          errorMessage="최대 글자 수를 초과했어요"
          lengthValidationMode={true}
        />
      </PositionWrap>
      <BottomFixedButton
        text="변경하기"
        condition={() => isEnabled}
        onClick={handleClickEdit}
      />
    </Container>
  );
};

const Container = styled.div`
  max-width: 414px;
  width: 100%;
  height: 100%;
  /* position: relative; */
  background: var(--bg-wrapper);
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BackWrap = styled.div`
  padding-top: 50px;
`;

const PositionWrap = styled.div`
  padding: 0 24px;
`;

const EditTitle = styled.p`
  color: var(--color-primary);
  ${fontSize('24px')};
  font-weight: var(--weight-bold);
  line-height: 32px;
  margin-bottom: 32px;
`;

EditBox.propTypes = {
  type: PropTypes.string.isRequired,
  editValue: PropTypes.string.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  pageTitleText: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default EditBox;
