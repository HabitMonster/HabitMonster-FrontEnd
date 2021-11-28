import webBackground from './web2.webp';
import cloudBackground from './web3.webp';
import clayPhone from './clay.webp';
import loading from './loading.webp';
import popupBlue from './popupBlue.webp';
import popupRed from './popupRed.webp';
import popupYellow from './popupYellow.webp';

// 프로퍼티 키 목록
// 1: 웹 배경화면
// 2: 클레이 휴대폰 배경화면

// 1~5: GREEN
// 6~10: PINK
// 11~15: BLUE
// 16~20: YELLOW
// 21~25: ORANGE
// 26~30: RED
const background = {
  1: webBackground,
  2: clayPhone,
  3: loading,
  4: cloudBackground,
  5: popupRed,
  10: popupBlue,
  15: popupYellow,
  20: popupRed,
  25: popupBlue,
  30: popupYellow,
};

export default background;
