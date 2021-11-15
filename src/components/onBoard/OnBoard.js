import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';

import {
  onboard01,
  onboard02,
  onboard03,
  onboard04,
} from '../../assets/images/onboard';
import { BottomFixedButton } from '../common';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

SwiperCore.use([Pagination, Navigation]);

const OnBoard = () => {
  const history = useHistory();

  return (
    <>
      <OnBoardContainer>
        <TitleContainer>
          <TitleWrapper>
            <Title>Habit</Title>
            <Title>Monster</Title>
          </TitleWrapper>
          <SubTitle>몬스터와 함께하는 새로운 습관의 시작!</SubTitle>
          <Swiper
            className="banner"
            initialSlide={0}
            style={{ width: '360px' }}
            navigation
            pagination={{
              clickable: true,
            }}
          >
            <SwiperSlide>
              <Image bg={onboard01} />
            </SwiperSlide>
            <SwiperSlide>
              <Image bg={onboard02} />
            </SwiperSlide>
            <SwiperSlide>
              <Image bg={onboard03} />
            </SwiperSlide>
            <SwiperSlide>
              <Image bg={onboard04} />
            </SwiperSlide>
          </Swiper>
        </TitleContainer>
        <BottomFixedButton
          text="시작하기"
          condition={null}
          onClick={() => {
            history.replace('/login');
            window.localStorage.setItem('isOnboarding', false);
          }}
        />
      </OnBoardContainer>
    </>
  );
};

const OnBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--bg-wrapper);
  & .swiper-container {
    height: 200px;
  }
  & .swiper-pagination {
    top: 150px;
  }
  & .swiper-pagination-bullet {
    background: white;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-family: var(--font-name-apple);
`;

const TitleWrapper = styled.div`
  width: 187px;
  height: 90px;
  margin: 100px auto 18px auto;
  line-height: 43px;
`;

const Title = styled.p`
  color: var(--color-white);
  font-size: var(--font-maximum);
  font-weight: var(--weight-extra-bold);
`;

const SubTitle = styled.p`
  width: 213px;
  height: 17px;
  font-weight: var(--weight-semi-regular);
  font-size: var(--font-xs);
  line-height: 16.8px;
  color: var(--color-white);
  margin: 0 auto;
  margin-bottom: 75px;
  opacity: 0.7;
`;

const Image = styled.div`
  width: 220px;
  height: 129px;
  margin: 0 auto;
  margin-bottom: 12px;
  background-image: url(${(props) => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export default OnBoard;
