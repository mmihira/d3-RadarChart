export const AREA_STATE = {
  DRAGGING: 'DRAGGING',
  DRAGGING_END: 'DRAGGING_END',
  CIRCLE_LEAVE_WHILE_DRAGGING: 'CIRCLE_LEAVE_WHILE_DRAGGING',
  CIRCLE_HOVER: 'CIRCLE_HOVER',
  LEGEND_HOVER: 'LEGEND_HOVER',
  NEUTRAL: 'NEUTRAL'
};

export const AREA_EVENT = {
  CIRCLE_WHEEL_SCROLL: 'CIRCLE_WHEEL_SCROLL',
  CIRCLE_ENTER: 'CIRCLE_ENTER',
  CIRCLE_LEAVE: 'CIRCLE_LEAVE',
  DRAGGING_START: 'DRAGGING_START',
  DRAGGING: 'DRAGGING',
  DRAGGING_END: 'DRAGGING_END'
};

export const AXIS_QUADS = {
  QUAD_1: 'QUAD_1',
  QUAD_2: 'QUAD_2',
  QUAD_3: 'QUAD_3',
  QUAD_4: 'QUAD_4'
};

export const browserVendor = (function () {
  const isOpera =
    (!!window.opr && !!window.opr.addons) ||
    !!window.opera ||
    navigator.userAgent.indexOf(' OPR/') >= 0;
  // Firefox 1.0+
  const isFirefox = typeof InstallTrigger !== 'undefined';
  // Internet Explorer 6-11
  const isIE = false || !!document.documentMode;
  // Edge 20+
  const isEdge = !isIE && !!window.StyleMedia;
  // Chrome 1+
  const isChrome = !!window.chrome && !!window.chrome.webstore;
  // Blink engine detection
  const isBlink = (isChrome || isOpera) && !!window.CSS;

  return {
    isOpera: isOpera,
    isFirefox: isFirefox,
    isIE: isIE,
    isEdge: isEdge,
    isChrome: isChrome,
    isBlink: isBlink
  };
})();

export const RADIANS = 2 * Math.PI;
