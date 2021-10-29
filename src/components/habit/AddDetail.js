import React from 'react';
import styled from 'styled-components';
import { Back } from '../../assets/icons/common';

const AddDetail = () => {
  return (
    <Wrapper>
      <DetailHeader>
        <IconWrapper>
          <Back />
          <Title>습관 작성하기</Title>
        </IconWrapper>
        <CategorySummary>생활</CategorySummary>
        <CustomInputWrapper>
          <label htmlFor="asd">타이틀</label>
          <input id="asd" placeholder="택시 안타기! 그럴거면 차를 사세요" />
        </CustomInputWrapper>
        <CustomInputWrapper s={true}>
          <label htmlFor="dfg">서브타이틀</label>
          <input id="dfg" placeholder="5분만 더 자다가 텅장된다." />
        </CustomInputWrapper>
        <div style={{ width: '100%', height: '4px' }}></div>
      </DetailHeader>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #f7f5ff;
`;

const DetailHeader = styled.div`
  width: 100%;
  min-height: 392px;
  box-sizing: border-box;
  background: linear-gradient(180deg, #7056ff 0%, #7f9ae6 99.99%, #7f9be6 100%);
  padding: 0 16px;
  padding-top: 44px;
`;

const IconWrapper = styled.div`
  box-sizing: border-box;
  width: 322px;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 48px;

  & path {
    fill: #fff;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 41px;
  margin-left: 8px;
  color: #fff;
`;

const CategorySummary = styled.div`
  box-sizing: border-box;
  width: 60px;
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 33px;

  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  color: #7158fd;
`;

const CustomInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;

  color: #ffffff;

  opacity: 0.5;

  & label {
    margin-left: 15px;
    margin-bottom: 4px;
    font-size: 15px;
  }

  & input {
    width: 343px;
    height: 52px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    /* padding: 13px 0px 14px 15px; */

    &::placeholder {
      font-weight: ${({ s }) => (s ? '500' : '700')};
      font-size: ${({ s }) => (s ? '17px' : '21px')};
      line-height: ${({ s }) => (s ? '20px' : '25px')};

      color: #ffffff;

      opacity: 0.4;
    }
  }
`;

const Bar = styled.div`
  width: 100%;
  height: 4px;
  /* padding: 0px ${({ p }) => p}px; */
  background: inherit;
`;

export default AddDetail;
