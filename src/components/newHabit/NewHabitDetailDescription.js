import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { SubTitleOuter, TextInput } from '../common';

const NewHabitDetailDescription = ({
  description,
  update,
  isEditMode,
  originDescription,
}) => {
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
