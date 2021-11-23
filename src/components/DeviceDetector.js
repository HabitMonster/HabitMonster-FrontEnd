import React from 'react';
import { isMobile } from 'react-device-detect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import backgroundSrcs from '../assets/images/background';

const DeviceDetector = ({ children }) =>
  isMobile || window.matchMedia('max-width: 500px').matches ? (
    <Layout>{children}</Layout>
  ) : (
    <WebBackgroundWrapper>
      <ClayPhone>
        <WebViewLayout>{children}</WebViewLayout>
      </ClayPhone>
    </WebBackgroundWrapper>
  );

DeviceDetector.propTypes = {
  children: PropTypes.element.isRequired,
};

const Layout = styled.div`
  background: var(--bg-wrapper);
  display: flex;
  max-width: 414px;
  width: 100%;
  min-width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  max-height: 100vh;
  margin: 0 auto;
  overflow: hidden;
`;

const WebViewLayout = styled(Layout)`
  max-width: 360px;
  border-radius: 18px;
  height: 640px;
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
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

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
