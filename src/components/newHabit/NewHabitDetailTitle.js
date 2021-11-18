import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SubTitleOuter, TextInput } from '../common';

const NewHabitDetailTitle = ({ title, update, isEditMode, originTitle }) => {
  // isEditMode === true  :  해당 컴포넌트를 "습관 수정" 페이지에서 사용합니다. 따라서 placeholder가 수정 전 습관의 값으로 출력됩니다.
  // isEditMode === false : 해당 컴포넌트를 "습관 작성" 페이지에서 사용합니다. 따라서 placeholder가 default 값으로 출력됩니다.
  return (
    <SubTitleOuter subTitle="제목">
      <TextInput
        text={title}
        onTextChanged={update}
        placeholder={isEditMode ? originTitle : '예) 하루에 1000원씩 저금하기'}
        maxLength={20}
        lengthValidationMode
        errorMessage="최대 글자 수를 초과했어요"
      />
    </SubTitleOuter>
  );
};

NewHabitDetailTitle.propTypes = {
  title: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  originTitle: PropTypes.string,
};

export default memo(NewHabitDetailTitle);
