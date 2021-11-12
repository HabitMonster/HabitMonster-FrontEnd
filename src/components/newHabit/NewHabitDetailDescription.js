import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SubTitleOuter, TextInput } from '../common';

const NewHabitDetailDescription = ({ description, update }) => {
  return (
    <SubTitleOuter subTitle="내용">
      <TextInput
        text={description}
        onTextChanged={update}
        placeholder="예) 100일이면 10만원이다 이말이야"
        lengthValidationMode={false}
      />
    </SubTitleOuter>
  );
};

NewHabitDetailDescription.propTypes = {
  description: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
};

export default memo(NewHabitDetailDescription);
