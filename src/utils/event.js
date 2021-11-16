export const miniThrottle = function (func, wait) {
  let canBeCalled = true;

  return function () {
    if (canBeCalled) {
      canBeCalled = false;
      setTimeout(() => (canBeCalled = true), wait);
      func.apply(this, arguments);
      return;
    }

    return;
  };
};
