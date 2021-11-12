import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fontSize } from '../../styles';
import { whiteOpacity } from '../../styles/Mixin';
import { BackButtonHeader, TextInput, BottomFixedButton } from '../common';

const EditBox = ({ userInfoItem }) => {
  const [ originName, setOriginName ] = useState
  return (
<TextInput
  text
  placeholder={}
  onTextChanged={}
  maxLength={10}
  idleHelperText="한글, 영문, 숫자 공백없이 최대 10자 입력 가능해요"
  errorMessage="최대 글자 수를 초과했어요"
  lengthValidationMode={false}
/>;

  )
};
