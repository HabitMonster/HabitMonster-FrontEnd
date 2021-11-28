export const loadGoogleScript = () => {
  (function () {
    if (document.getElementById('google-js')) {
      document.getElementById('google-js').remove();
    }

    const firstScriptTag = document.getElementsByTagName('script')[0];

    const scriptTag = document.createElement('script');
    scriptTag.id = 'google-js';
    scriptTag.src = 'https://apis.google.com/js/platform.js';
    scriptTag.onload = window.onGoogleScriptLoad;

    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
  })();
};
