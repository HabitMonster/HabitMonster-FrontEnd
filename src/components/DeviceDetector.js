import React, { useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import backgroundSrcs from '../assets/images/background';

const DeviceDetector = ({ children }) => {
  useEffect(() => {
    const preventShrink = function () {
      var viewport = document.querySelector('meta[name=viewport]');
      viewport.setAttribute(
        'content',
        viewport.content + ', height=' + window.innerHeight,
      );
    };

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('load', setVh);
    window.addEventListener('load', preventShrink);
    window.addEventListener('resize', setVh);
    window.addEventListener('touchend', setVh);

    return () => {
      window.RemoveEventListener('load', setVh);
      window.removeEventListener('load', preventShrink);
      window.removeEventListener('resize', setVh);
      window.removeEventListener('touchend', setVh);
    };
  });
  return isMobile || window.matchMedia('max-width: 500px').matches ? (
    <Layout>{children}</Layout>
  ) : (
    <WebBackgroundWrapper>
      <ClayPhone>
        <WebViewLayout>{children}</WebViewLayout>
      </ClayPhone>
    </WebBackgroundWrapper>
  );
};
DeviceDetector.propTypes = {
  children: PropTypes.element.isRequired,
};

const Layout = styled.div`
  background: var(--bg-wrapper);
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  min-width: 280px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
`;

const WebViewLayout = styled(Layout)`
  max-width: 360px;
  border-radius: 18px;
  height: 640px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ClayPhone = styled.div`
  width: 387px;
  height: 739px;
  position: fixed;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  background: url(${backgroundSrcs[2]}) no-repeat center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media screen and (min-width: 1120px) {
    right: 10%;
    top: 50%;
    transform: translateX(0%);
    transform: translateY(-50%);
  }
`;

const WebBackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  background: url(${backgroundSrcs[4]}) no-repeat fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  @media screen and (min-width: 1120px) {
    background: url(${backgroundSrcs[1]}) no-repeat fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;

export default DeviceDetector;
