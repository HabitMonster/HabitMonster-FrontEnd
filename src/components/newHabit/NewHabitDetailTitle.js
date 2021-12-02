import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { SubTitleOuter, TextInput } from '../common';

const NewHabitDetailTitle = ({
  title,
  update,
  isEditMode,
  originTitle,
  disabled,
}) => {
  return (
    <SubTitleOuter subTitle="제목">
      <TextInput
        text={title}
        onTextChanged={update}
        placeholder={isEditMode ? originTitle : '예) 하루에 1000원씩 저금하기'}
        maxLength={10}
        lengthValidationMode
        errorMessage="최대 글자 수를 초과했어요"
        disabled={disabled}
      />
    </SubTitleOuter>
  );
};

NewHabitDetailTitle.propTypes = {
  title: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  originTitle: PropTypes.string,
  disabled: PropTypes.bool,
};

export default memo(NewHabitDetailTitle);
