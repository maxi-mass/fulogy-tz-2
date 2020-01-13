webpackHotUpdate("static/development/pages/index.js",{

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
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/Content.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var Content = function Content(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("gold"),
      lampColor = _useState[0],
      setLampColor = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    opacity: 1.0,
    opDirection: "down"
  }),
      yellowСircle = _useState2[0],
      setYellowСircle = _useState2[1];

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setTimeout(function () {
      console.log(yellowСircle);

      if (yellowСircle.opDirection === "down" && yellowСircle.opacity > 0) {
        setYellowСircle(function (prev) {
          return {
            opacity: Number((prev.opacity - 0.03).toFixed(2)),
            opDirection: prev.opDirection
          };
        });
      } else if (yellowСircle.opDirection === "down" && yellowСircle.opacity <= 0) {
        setYellowСircle(function (prev) {
          return {
            opacity: prev.opacity,
            opDirection: "up"
          };
        });
      } else if (yellowСircle.opDirection === "up" && yellowСircle.opacity < 1.0) {
        setYellowСircle(function (prev) {
          return {
            opacity: Number((prev.opacity + 0.03).toFixed(2)),
            opDirection: prev.opDirection
          };
        });
      } else if (yellowСircle.opDirection === "up" && yellowСircle.opacity >= 1) {
        setYellowСircle(function (prev) {
          return {
            opacity: prev.opacity,
            opDirection: "down"
          };
        });
      }
    }, 40);
  }, [yellowСircle]);
  return __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__content,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, "\u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043D\u0441\u043E\u0440\u043D\u044B\u0435 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0438 \u0434\u043B\u044F \u043A\u0443\u0445\u043D\u0438"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, "8 \u043B\u0435\u0442"), " \u043E\u0441\u043D\u0430\u0449\u0430\u0435\u043C \u0412\u0430\u0448\u0438 \u043A\u0443\u0445\u043D\u0438 \u043D\u0430\u0448\u0438\u043C\u0438 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u043C\u0438 \u043F\u043E \u0446\u0435\u043D\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F."), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left__get_video,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__info,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435"), " \u0432\u0438\u0434\u0435\u043E\u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }), " \u043E \u043D\u0430\u0448\u0438\u0445 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u0445!"), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button,
    onClick: function onClick() {
      return console.log("Video");
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, __jsx("div", {
    style: {
      background: "rgba(255, 207, 13, ".concat(yellowСircle.opacity, ")")
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_yellow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_bg,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  })))), __jsx(_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, "\u043E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440")), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__switch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_group,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, __jsx("div", {
    onClick: function onClick() {
      return setLampColor("gold");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gold,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("white");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_white,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("black");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_black,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("gray");
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gray,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: this
  }))), __jsx("img", {
    src: "/static/images/man.png",
    alt: "man",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: this
  }), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__lamp_variant,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/lamp-".concat(lampColor, ".png"),
    alt: "lamp",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: this
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (Content);

/***/ })

})
//# sourceMappingURL=index.js.fedaf3e8b4b7476779ce.hot-update.js.map