import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { BackButtonHeader, TextInput, BottomFixedButton } from '../common';
import { myPageDataState } from '../../recoil/states/user';

import { myPageApis } from '../../api';
import { fontSize } from '../../styles';
import { OK } from '../../constants/statusCode';
import { fromUnixTime } from 'date-fns';

const EditBox = ({
  type,
  editValue,
  handleChangeValue,
  pageTitleText,
  closeModal,
}) => {
  const [originValue] = useState(editValue);
  const isEnabled = editValue && editValue.length <= 10;
  const setEditValue = useSetRecoilState(myPageDataState); // myPageData를 새로운 값으로 바꿔준다!

  const handleClickEdit = async () => {
    if (!isEnabled) return;
    try {
      let editRequest = myPageApis.editUserName;
      if (type === 'monsterName') {
        editRequest = myPageApis.editMonsterName;
      }

      const { data } = await editRequest({ [type]: editValue });
      console.log('editValue', editValue);

      if (data.statusCode === OK) {
        alert('변경되었습니다!');
        setEditValue((myPageData) => ({ ...myPageData, [type]: editValue }));
        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <PositionWrap>
        <BackWrap>
          <BackButtonHeader
            onButtonClick={closeModal}
            // pageTitleText={pageTitleText}
          />
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
          text={editValue}
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
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--bg-wrapper);
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
