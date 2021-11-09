import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SubTitleOuter, TextInput } from '../common';

const NewHabitDetailTitle = ({ title, update }) => {
  return (
    <SubTitleOuter subTitle="제목">
      <TextInput
        text={title}
        onTextChanged={update}
        placeholder="예) 하루에 1000원씩 저금하기"
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
};

export default memo(NewHabitDetailTitle);
