import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import Navigation from 'swiper/components/navigation';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

import { setFontStyles } from '../../styles/Mixin';

import {
  IPHONE_TUTORIAL_LIST,
  ANDROID_TUTORIAL_LIST,
} from '../../assets/images/notice';

SwiperCore.use([Navigation]);

const ImageSlider = ({ imageType }) => {
  const [slideItems, setSlideItems] = useState([]);

  useEffect(() => {
    switch (imageType) {
      case 'iphoneTutorial':
        setSlideItems(IPHONE_TUTORIAL_LIST);
        break;
      case 'androidTutorial':
        setSlideItems(ANDROID_TUTORIAL_LIST);
        break;
      default:
        break;
    }
  }, [imageType]);

  if (!imageType) return null;

  return (
    <SliderWrap>
      <Swiper navigation={true}>
        {slideItems.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={`${item}`} alt={`${imageType}_${index + 1}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </SliderWrap>
  );
};

export default ImageSlider;

const SliderWrap = styled.div`
  margin: 20px 0;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    background: transparent;
    text-align: center;
    ${setFontStyles({
      fontSize: 'xs',
    })}

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;

    img {
      border-radius: var(--border-randroidius-small);
      display: block;
      width: 80%;
    }
  }

  .swiper-button {
    &-prev {
      color: var(--color-primary);
      --swiper-navigation-size: 20px;
      left: 5px;
    }
    &-next {
      color: var(--color-primary);
      --swiper-navigation-size: 20px;
      right: 5px;
    }
  }
`;

ImageSlider.propTypes = {
  imageType: PropTypes.string.isRequired,
};
