import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SubTitleOuter, TextInput } from '../common';

const NewHabitDetailDescription = ({
  description,
  update,
  isEditMode,
  originDescription,
}) => {
  // isEditMode === true  :  해당 컴포넌트를 "습관 수정" 페이지에서 사용합니다. 따라서 placeholder가 수정 전 습관의 값으로 출력됩니다.
  // isEditMode === false : 해당 컴포넌트를 "습관 작성" 페이지에서 사용합니다. 따라서 placeholder가 default 값으로 출력됩니다.
  return (
    <SubTitleOuter subTitle="내용">
      <TextInput
        text={description}
        onTextChanged={update}
        placeholder={
          isEditMode ? originDescription : '예) 100일이면 10만원이다 이말이야'
        }
        maxLength={120}
        lengthValidationMode
        errorMessage="최대 글자 수를 초과했어요"
      />
    </SubTitleOuter>
  );
};

NewHabitDetailDescription.propTypes = {
  description: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  originDescription: PropTypes.string,
};

export default memo(NewHabitDetailDescription);
