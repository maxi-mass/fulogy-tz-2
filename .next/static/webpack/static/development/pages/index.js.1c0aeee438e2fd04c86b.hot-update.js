webpackHotUpdate("static/development/pages/index.js",{

/***/ "./src/components/sections/Slider/Slider.jsx":
/*!***************************************************!*\
  !*** ./src/components/sections/Slider/Slider.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Slider_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider.module.css */ "./src/components/sections/Slider/Slider.module.css");
/* harmony import */ var _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Slider_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Slider/Slider.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var Slider = function Slider(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1),
      currentImage = _useState[0],
      setCurrentImage = _useState[1];

  var sliderHandler = function sliderHandler(direction) {
    switch (direction) {
      case "next":
        {
          if (currentImage < 6) {
            setCurrentImage(function (prev) {
              return prev + 1;
            });
          }

          break;
        }

      case "prev":
        {
          if (currentImage > 1) {
            setCurrentImage(function (prev) {
              return prev - 1;
            });
          }

          break;
        }
    }
  };

  return __jsx("div", {
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.slider,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, __jsx("div", {
    className: "".concat(_Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.slider__left, " ").concat(_Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.slider__desc),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "\u0411\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, "\u0421\u0432\u0435\u0442\u043E\u0434\u0438\u043E\u0434\u044B \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u0446\u0432\u0435\u0442\u043E\u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "\u0410\u043B\u044E\u043C\u0438\u043D\u0438\u0435\u0432\u044B\u0439 \u043A\u043E\u0440\u043F\u0443\u0441 \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u0433\u0440\u0435\u0432\u0430")), __jsx("div", {
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.slider__center,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx("div", {
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.slider__center_inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, __jsx("div", {
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.center_inner__image,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/slider/Photo-".concat(currentImage, ".jpg"),
    alt: "Photo-".concat(currentImage),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  })), __jsx("div", {
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.center_inner__numberOf,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, currentImage), "/6"), __jsx("div", {
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.center_inner__buttons,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, __jsx("div", {
    onClick: function onClick() {
      return sliderHandler("prev");
    },
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.buttons__prev,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/arrow.png",
    alt: "prev",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  })), __jsx("div", {
    onClick: function onClick() {
      return sliderHandler("next");
    },
    className: _Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.buttons__next,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/arrow.png",
    alt: "next",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }))))), __jsx("div", {
    className: "".concat(_Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.slider__right, " ").concat(_Slider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.slider__desc),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, "\u041D\u0438\u0437\u043A\u043E\u0435 \u044D\u043D\u0435\u0440\u0433\u043E\u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u0435"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  }, "\u041B\u0435\u0433\u043A\u043E \u043C\u043E\u043D\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, "\u0423\u0434\u043E\u0431\u043D\u043E \u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C")));
};

/* harmony default export */ __webpack_exports__["default"] = (Slider);

/***/ })

})
//# sourceMappingURL=index.js.1c0aeee438e2fd04c86b.hot-update.js.map