import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};
  :root {
    /* Color */
    --color-black: #000000;
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
    /* 추후 디자이너 답변에 따라 컬러 변수명 수정 */
    --color-statistics: #492cf1;
    /* Font name */
    --font-name-apple: 'Apple SD Gothic Neo';
    /* Font size */
    --font-large: 48px;
   /* --font-semi-large: 36px; */
    --font-medium: 28px;
    --font-semi-medium: 24px;
    --font-regular: 18px;
    --font-small: 16px;
    --font-micro: 14px;
    --font-nano: 12px;
    /* Font weight */
    --weight-heavy-bold: 900;
    --weight-extra-bold: 800;
    --weight-bold: 700;
    --weight-semi-bold: 600;
    --weight-regular: 500;
    --weight-semi-regular: 400;
    /* Size */
    --size-border-radius: 6px;
    --border-radius-monsterItem: 2px;
    --border-radius-progress: 10px;
    --border-radius-checkBtn: 20px;
    /* border-radius도 사이즈별로 정의하는건 어떨까요?  */
    /* --border-radius-small: 6px; */
    --border-radius-mideum: 12px;
    /* Animation Duration */
    --animation-duration: 200ms;

    --font-weight-extraLight: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semiBold: 600;
    --font-weight-bold: 700;
    --font-weight-extraBold: 800;
    --font-weight-heavy: 900;

    --font-xxxl: 44px;
    --font-xxl: 24px;
    --font-xl: 20px;
    --font-l: 18px;
    --font-m: 16px;
    --font-s: 15px;
    --font-xs: 14px;
    --font-xxs: 12px;
    --bg-wrapper: #070707;
    --bg-primary: #1e2025;
    --bg-disabled: #181819;
    --bg-active: #3b0a9d;
    --bg-selected: #1c0054;
    --bg-selected-light: #7d3cff;
    --bg-done: #000000;
    --bg-nope: #303236;
    --color-white: #ffffff;
    --color-primary: #f8f8f8;
    --color-primary-deemed: rgba(248, 248, 248, 0.5);
    --color-danger: #ef2f68;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      font-family: var(--font-name-apple);
    }
`;

export default GlobalStyle;
