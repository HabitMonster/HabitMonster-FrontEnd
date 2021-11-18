export const loadGoogleScript = () => {
  // 구글 API를 사용하기 위해 필요한 자바스크립트 라이브러리를 스크립트로 index.html에 삽입합니다.
  (function () {
    // 기존에 선언된 스크립트가 있다면 삭제합니다.
    // 중복 선언 방지.
    if (document.getElementById('google-js')) {
      document.getElementById('google-js').remove();
    }

    // index.html에 선언되어있는 기존의 스크립트 태그 중 제일 첫 번째 태그를 불러옵니다.
    const firstScriptTag = document.getElementsByTagName('script')[0];

    // 스크립트 태그를 생성하고 다음과 같은 값을 부여합니다.
    const scriptTag = document.createElement('script');
    scriptTag.id = 'google-js';
    scriptTag.src = 'https://apis.google.com/js/platform.js';
    // 스크립트가 실행될 때 onGoogleScriptLoad 함수가 실행됩니다. (임의로 지정한 네이밍입니다. GoogleLogin.js에서 선언합니다.)
    scriptTag.onload = window.onGoogleScriptLoad;
    // firstScriptTag 앞에 이 태그를 선언함으로써, 어플리케이션이 로드될 때 이 스크립트가 제일 처음으로 실행됩니다.
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  })();
};
