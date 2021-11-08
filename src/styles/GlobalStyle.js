import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  :root {
    /* Color */
    --color-white: #ffffff;
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
    --border-radius-avatarItem: 2px;
    --border-radius-progress: 10px;
    --border-radius-checkBtn: 20px;
    /* border-radius도 사이즈별로 정의하는건 어떨까요?  */
    /* --border-radius-small: 6px; */
    --border-radius-mideum: 12px;

    /* Animation Duration */
    --animation-duration: 200ms;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }
`;

export default GlobalStyle;
