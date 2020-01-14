webpackHotUpdate("static/development/pages/index.js",{

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithHoles; });
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js");
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__);

function _arrayWithHoles(arr) {
  if (_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default()(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArrayLimit; });
/* harmony import */ var _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/get-iterator */ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js");
/* harmony import */ var _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/is-iterable */ "./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js");
/* harmony import */ var _core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1__);


function _iterableToArrayLimit(arr, i) {
  if (!(_core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1___default()(Object(arr)) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableRest; });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _slicedToArray; });
/* harmony import */ var _arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _nonIterableRest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js");



function _slicedToArray(arr, i) {
  return Object(_arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || Object(_nonIterableRest__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

/***/ }),

/***/ "./src/components/sections/Header/Content/Content.jsx":
/*!************************************************************!*\
  !*** ./src/components/sections/Header/Content/Content.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Content_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Content.module.css */ "./src/components/sections/Header/Content/Content.module.css");
/* harmony import */ var _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Content_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Button/Button */ "./src/components/common/Button/Button.jsx");
/* harmony import */ var _VideoButton_VideoButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VideoButton/VideoButton */ "./src/components/sections/Header/Content/VideoButton/VideoButton.jsx");
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/Content.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var Content = function Content(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("gold"),
      lampColor = _useState[0],
      setLampColor = _useState[1];

  return __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__content,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, "\u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043D\u0441\u043E\u0440\u043D\u044B\u0435 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0438 \u0434\u043B\u044F \u043A\u0443\u0445\u043D\u0438"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "8 \u043B\u0435\u0442"), " \u043E\u0441\u043D\u0430\u0449\u0430\u0435\u043C \u0412\u0430\u0448\u0438 \u043A\u0443\u0445\u043D\u0438 \u043D\u0430\u0448\u0438\u043C\u0438 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u043C\u0438 \u043F\u043E \u0446\u0435\u043D\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F."), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left__get_video,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__info,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435"), " \u0432\u0438\u0434\u0435\u043E\u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }), " \u043E \u043D\u0430\u0448\u0438\u0445 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u0445!"), __jsx(_VideoButton_VideoButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  })), __jsx(_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "\u043E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440")), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__switch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_group,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, __jsx("div", {
    onClick: function onClick() {
      return setLampColor("gold");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gold,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("white");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_white,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("black");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_black,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("gray");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gray,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }))), __jsx("img", {
    src: "/static/images/man.png",
    alt: "man",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__lamp_variant,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/lamp-".concat(lampColor, ".png"),
    alt: "lamp",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (Content);

/***/ }),

/***/ "./src/components/sections/Header/Content/VideoButton/VideoButton.jsx":
/*!****************************************************************************!*\
  !*** ./src/components/sections/Header/Content/VideoButton/VideoButton.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VideoButton.module.css */ "./src/components/sections/Header/Content/VideoButton/VideoButton.module.css");
/* harmony import */ var _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_VideoButton_module_css__WEBPACK_IMPORTED_MODULE_2__);

var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/VideoButton/VideoButton.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



var VideoButton = function VideoButton(props) {
  var _useState = useState({
    opacity: 1.0,
    opDirection: "down"
  }),
      _useState2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState, 2),
      yellowСircle = _useState2[0],
      setYellowСircle = _useState2[1];

  var _useState3 = useState({
    opacity: 0.0,
    opDirection: "up"
  }),
      _useState4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useState3, 2),
      pinkСircle = _useState4[0],
      setPinkСircle = _useState4[1];

  var changeCircle = function changeCircle(circle, setCircle) {
    if (circle.opDirection === "down" && circle.opacity > 0.2) {
      setCircle(function (prev) {
        return {
          opacity: Number((prev.opacity - 0.03).toFixed(2)),
          opDirection: prev.opDirection
        };
      });
    } else if (circle.opDirection === "down" && circle.opacity <= 0.2) {
      setCircle(function (prev) {
        return {
          opacity: prev.opacity,
          opDirection: "up"
        };
      });
    } else if (circle.opDirection === "up" && circle.opacity < 1.0) {
      setCircle(function (prev) {
        return {
          opacity: Number((prev.opacity + 0.03).toFixed(2)),
          opDirection: prev.opDirection
        };
      });
    } else if (circle.opDirection === "up" && circle.opacity >= 1) {
      setCircle(function (prev) {
        return {
          opacity: prev.opacity,
          opDirection: "down"
        };
      });
    }
  };

  useEffect(function () {
    setTimeout(function () {
      return changeCircle(yellowСircle, setYellowСircle);
    }, 35);
  }, [yellowСircle]);
  useEffect(function () {
    setTimeout(function () {
      return changeCircle(pinkСircle, setPinkСircle);
    }, 35);
  }, [pinkСircle]);
  return __jsx("div", {
    style: {
      background: "rgba(255, 249, 245, ".concat(pinkСircle.opacity, ")")
    },
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.get_video__button,
    onClick: function onClick() {
      return console.log("Video");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, __jsx("div", {
    style: {
      background: "rgba(255, 207, 13, ".concat(yellowСircle.opacity, ")")
    },
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.get_video__button_yellow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, __jsx("div", {
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_2___default.a.get_video__button_bg,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (VideoButton);

/***/ })

})
//# sourceMappingURL=index.js.c47a542123bab12f2d5f.hot-update.js.map