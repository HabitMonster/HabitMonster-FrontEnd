import React from 'react';
import styled from 'styled-components';
import Calendar from './Calendar';

import { Back, UpIcon, DownIcon } from '../../assets/icons/common';
import { CalenderIcon, ModeIcon, SettingIcon } from '../../assets/icons/habits';

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
      </DetailHeader>
      <DetailBody>
        <DetailOuter>
          <DetailInner>
            {/* 시작일이 바뀌었다면: 해당 날짜 변경 */}
            <CalenderIcon />
            <DetailRightColumn>
              <Calendar isStart={true} />
            </DetailRightColumn>
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            {/* 종료일이 바뀌었다면: 해당 날짜 변경 */}
            <CalenderIcon />
            <DetailRightColumn>
              <Calendar />
            </DetailRightColumn>
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            <ModeIcon />
            <DetailRightColumn>
              <Mode>
                <input type="radio" />
                <span>매일</span>
              </Mode>
              <Mode>
                <input type="radio" />
                <span>매주</span>
              </Mode>
            </DetailRightColumn>
          </DetailInner>
        </DetailOuter>
        <DetailOuter>
          <DetailInner>
            <SettingIcon />
            <DetailRightColumn>
              <span>빈도를 정해주세요.</span>
            </DetailRightColumn>
          </DetailInner>
          <FrequenciesWrapper>
            <Frequency>
              <div>
                <UpIcon />
                <span>1</span>
                <DownIcon />
              </div>
            </Frequency>
            <Frequency>
              <div>
                <UpIcon />
                <span>2</span>
                <DownIcon />
              </div>
            </Frequency>
          </FrequenciesWrapper>
        </DetailOuter>
        <SaveButton>저장하기</SaveButton>
      </DetailBody>
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
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
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
    font-weight: ${({ s }) => (s ? '500' : '700')};
    font-size: ${({ s }) => (s ? '17px' : '21px')};
    line-height: ${({ s }) => (s ? '20px' : '25px')};
    color: #ffffff;

    &::placeholder {
      font-weight: ${({ s }) => (s ? '500' : '700')};
      font-size: ${({ s }) => (s ? '17px' : '21px')};
      line-height: ${({ s }) => (s ? '20px' : '25px')};
      color: #ffffff;
      opacity: 0.4;
    }

    &:focus {
      outline: none;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const DetailBody = styled.div`
  width: 100%;
  padding: 0 16px;
  margin-top: 24px;
  //TODOS: RESEARCH AND IMPLEMENT CORRECT SOLUTION
  overflow: scroll;
`;

const DetailOuter = styled.section`
  width: 100%;
  max-width: 343px;
  min-height: 56px;
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 24px;
`;

const DetailInner = styled.div`
  display: flex;
  align-items: center;
`;

const DetailRightColumn = styled.div`
  margin-left: 28px;
  display: flex;
  align-items: center;

  //TODO: REMOVE DUPLICATED STYLE
  & span {
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    display: inline-block;
  }
`;

const Mode = styled.div`
  width: 60px;
  height: 24px;
  display: flex;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  & input {
    margin-right: 12px;
    background-color: #7a80ef;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    margin-right: 12px;
  }

  & span {
    display: inline-block;
    min-width: 32px;
  }
`;

const FrequenciesWrapper = styled.div`
  padding-left: 48px;
  display: flex;
`;

const Frequency = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 21px;

  width: 72px;
  height: 136px;
  background: #f7f5ff;
  border: 1px solid #e5dcff;
  box-sizing: border-box;
  border-radius: 36px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-top: 18.5px;
  margin-right: 16px;

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & span {
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    color: #7057fc;
  }
`;

const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 140px;
  border: none;

  max-width: 343px;
  height: 54px;

  background: #7057fc;
  border-radius: 10px;
  margin-top: 42px;
  margin-bottom: 70px;

  font-weight: bold;
  font-size: 18px;
  line-height: 22px;

  color: #ffffff;
`;

export default AddDetail;
