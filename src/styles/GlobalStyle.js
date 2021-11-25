import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../assets/fonts/font.css';

const GlobalStyle = createGlobalStyle`
  ${reset};
  :root {
    /* Color */
    --color-white: #ffffff;
    --color-primary: #f8f8f8;
    --color-primary-deemed: rgba(248, 248, 248, 0.5);
    --color-danger: #ef2f68;
    --color-login-bg: #27173f;
    --color-kakao: #fee500;
    --color-naver: #03c75a;
    --color-progressbar: #f0f0f0;
    --color-layout: #eeeeee;
    --color-yellow: #fcec57;
    --color-title: #333333;
    --color-grey01: #131313;
    --color-deemed: #999999;
    --color-main: #7057fc;
    --color-subtext2: #868686;
    --color-deemed2: #e8e8e8;
    --color-detail: #f7f5ff;
    --color-statistics: #492cf1;
    --color-onboard: #7d3bff;
    /* Font name */
    --font-name-apple: 'Apple SD Gothic Neo';
    /* Font size */
    --font-maximum: 48px;
    --font-xxxxl: 44px;
    --font-xxxl: 28px;
    --font-xxl: 24px;
    --font-xl: 20px;
    --font-l: 18px;
    --font-m: 16px;
    --font-s: 15px;
    --font-xs: 14px;
    --font-xxs: 12px;
    /* Font weight */
    --weight-heavy-bold: 900;
    --weight-extra-bold: 800;
    --weight-bold: 700;
    --weight-semi-bold: 600;
    --weight-regular: 500;
    --weight-semi-regular: 400;
    --weight-light: 300;
    --weight-extraLight: 200;
    /* Size */
    --border-radius-semi: 4px;
    --border-radius-small: 6px;
    --border-radius-monsterItem: 2px;
    --border-radius-progress: 10px;
    --border-radius-checkBtn: 20px;
    --border-radius-mideum: 12px;
    /* Animation Duration */
    --animation-duration: 200ms;
    /* Background Color */
    --bg-wrapper: #070707;
    --bg-wrapper-gradient: linear-gradient(0deg, #070707, #070707);
    --bg-primary: #1e2025;
    --bg-disabled: #181819;
    --bg-active: #3b0a9d;
    --bg-selected: #1c0054;
    --bg-selected-light: #7d3cff;
    --bg-done: #000000;
    --bg-nope: #303236;
    --bg-toast: #C5BEF4;

    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html, body {
      overscroll-behavior-y: contain;
    }

    body {
      font-family: 'Apple SD Gothic Neo', sans-serif;
    }
`;

export default GlobalStyle;
