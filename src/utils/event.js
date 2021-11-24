export const miniThrottle = function (func, wait) {
  let canBeCalled = true;

  return function closure() {
    if (canBeCalled) {
      canBeCalled = false;
      setTimeout(() => (canBeCalled = true), wait);
      func.apply(this, arguments);
      return;
    }

    return;
  };
};

export const miniDebounce = function (func, wait) {
  let timeoutId = null;

  return function closure(...args) {
    const boundFunc = func.bind(null, ...args);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(boundFunc, wait);
      return;
    }

    timeoutId = setTimeout(boundFunc, wait);
  };
};
