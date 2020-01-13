module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_components_Wrapper_Wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/components/Wrapper/Wrapper */ "./src/components/Wrapper/Wrapper.jsx");
/* harmony import */ var _src_components_sections_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/components/sections/Header/Header */ "./src/components/sections/Header/Header.jsx");
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Index = () => {
  return __jsx(_src_components_Wrapper_Wrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }, __jsx(_src_components_sections_Header_Header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ "./src/components/Wrapper/Wrapper.jsx":
/*!********************************************!*\
  !*** ./src/components/Wrapper/Wrapper.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wrapper.module.css */ "./src/components/Wrapper/Wrapper.module.css");
/* harmony import */ var _Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/Wrapper/Wrapper.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Wrapper = props => {
  return __jsx("div", {
    className: _Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.main_wrapper,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: undefined
  }, props.children);
};

/* harmony default export */ __webpack_exports__["default"] = (Wrapper);

/***/ }),

/***/ "./src/components/Wrapper/Wrapper.module.css":
/*!***************************************************!*\
  !*** ./src/components/Wrapper/Wrapper.module.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".-MT0qelzIkB7IhfEwNTos {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/Wrapper/Wrapper.module.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,kBAAkB;EAClB,eAAe;CAChB","file":"Wrapper.module.css","sourcesContent":[".main_wrapper {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"main_wrapper": "-MT0qelzIkB7IhfEwNTos"
};

/***/ }),

/***/ "./src/components/common/Button/Button.jsx":
/*!*************************************************!*\
  !*** ./src/components/common/Button/Button.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button.module.css */ "./src/components/common/Button/Button.module.css");
/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Button_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/common/Button/Button.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Button = props => {
  return __jsx("button", {
    className: _Button_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.button,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: undefined
  }, props.children);
};

/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/components/common/Button/Button.module.css":
/*!********************************************************!*\
  !*** ./src/components/common/Button/Button.module.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".xpfRyPW7TUnFYOuM8lndk {\n  background-color: #ffcf0d;\n  border: none;\n  height: 55px;\n  text-transform: uppercase;\n  border-radius: 5px;\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  padding-left: 25px;\n  padding-right: 25px;\n  transition: background 0.2s linear;\n}\n\n.xpfRyPW7TUnFYOuM8lndk:hover {\n  cursor: pointer;\n  background: #ffe013;\n}\n\n.xpfRyPW7TUnFYOuM8lndk:active {\n  background: #ffcf0d;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/common/Button/Button.module.css"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,aAAa;EACb,aAAa;EACb,0BAA0B;EAC1B,mBAAmB;EACnB,gBAAgB;EAChB,0BAA0B;EAC1B,mBAAmB;EACnB,oBAAoB;EACpB,mCAAmC;CACpC;;AAED;EACE,gBAAgB;EAChB,oBAAoB;CACrB;;AAED;EACE,oBAAoB;CACrB","file":"Button.module.css","sourcesContent":[".button {\n  background-color: #ffcf0d;\n  border: none;\n  height: 55px;\n  text-transform: uppercase;\n  border-radius: 5px;\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  padding-left: 25px;\n  padding-right: 25px;\n  transition: background 0.2s linear;\n}\n\n.button:hover {\n  cursor: pointer;\n  background: #ffe013;\n}\n\n.button:active {\n  background: #ffcf0d;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"button": "xpfRyPW7TUnFYOuM8lndk"
};

/***/ }),

/***/ "./src/components/sections/Header/Content/Content.jsx":
/*!************************************************************!*\
  !*** ./src/components/sections/Header/Content/Content.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Content_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Content.module.css */ "./src/components/sections/Header/Content/Content.module.css");
/* harmony import */ var _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Content_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../common/Button/Button */ "./src/components/common/Button/Button.jsx");
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/Content.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Content = props => {
  const {
    0: lampColor,
    1: setLampColor
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("gold");
  const {
    0: yellowСircle,
    1: setYellowСircle
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    opacity: 1.0,
    opDirection: "down"
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setTimeout(() => {
      if (yellowСircle.opDirection === "down" && yellowСircle.opacity > 0.2) {
        setYellowСircle(prev => ({
          opacity: Number((prev.opacity - 0.03).toFixed(2)),
          opDirection: prev.opDirection
        }));
      } else if (yellowСircle.opDirection === "down" && yellowСircle.opacity <= 0.2) {
        setYellowСircle(prev => ({
          opacity: prev.opacity,
          opDirection: "up"
        }));
      } else if (yellowСircle.opDirection === "up" && yellowСircle.opacity < 1.0) {
        setYellowСircle(prev => ({
          opacity: Number((prev.opacity + 0.03).toFixed(2)),
          opDirection: prev.opDirection
        }));
      } else if (yellowСircle.opDirection === "up" && yellowСircle.opacity >= 1) {
        setYellowСircle(prev => ({
          opacity: prev.opacity,
          opDirection: "down"
        }));
      }
    }, 35);
  }, [yellowСircle]);
  return __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__content,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: undefined
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: undefined
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: undefined
  }, "\u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043D\u0441\u043E\u0440\u043D\u044B\u0435 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0438 \u0434\u043B\u044F \u043A\u0443\u0445\u043D\u0438"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: undefined
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: undefined
  }, "8 \u043B\u0435\u0442"), " \u043E\u0441\u043D\u0430\u0449\u0430\u0435\u043C \u0412\u0430\u0448\u0438 \u043A\u0443\u0445\u043D\u0438 \u043D\u0430\u0448\u0438\u043C\u0438 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u043C\u0438 \u043F\u043E \u0446\u0435\u043D\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F."), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left__get_video,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: undefined
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__info,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: undefined
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: undefined
  }, "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435"), " \u0432\u0438\u0434\u0435\u043E\u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: undefined
  }), " \u043E \u043D\u0430\u0448\u0438\u0445 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u0445!"), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button,
    onClick: () => console.log("Video"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: undefined
  }, __jsx("div", {
    style: {
      background: `rgba(255, 207, 13, ${yellowСircle.opacity})`
    },
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_yellow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: undefined
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_bg,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: undefined
  })))), __jsx(_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: undefined
  }, "\u043E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440")), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__switch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: undefined
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_group,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: undefined
  }, __jsx("div", {
    onClick: () => setLampColor("gold"),
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gold,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }), __jsx("div", {
    onClick: () => setLampColor("white"),
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_white,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: undefined
  }), __jsx("div", {
    onClick: () => setLampColor("black"),
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_black,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: undefined
  }), __jsx("div", {
    onClick: () => setLampColor("gray"),
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gray,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: undefined
  }))), __jsx("img", {
    src: "/static/images/man.png",
    alt: "man",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: undefined
  }), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__lamp_variant,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: undefined
  }, __jsx("img", {
    src: `/static/images/lamp-${lampColor}.png`,
    alt: "lamp",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: undefined
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (Content);

/***/ }),

/***/ "./src/components/sections/Header/Content/Content.module.css":
/*!*******************************************************************!*\
  !*** ./src/components/sections/Header/Content/Content.module.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "._1IWZPnFLR7Yk7rETUPeDIE {\n  display: flex;\n  height: 490px;\n  /* outline: 1px solid salmon; */\n  justify-content: space-between;\n}\n\n/*-----Content Left-----*/\n._3hoW4pvCtVakSCX-350cUr {\n  /* outline: 1px solid lightpink; */\n  flex: 1;\n}\n._3hoW4pvCtVakSCX-350cUr h1 {\n  margin-top: 65px;\n  font-size: 36px;\n  line-height: 1.4;\n  text-transform: uppercase;\n  font-family: \"MullerExtraBold\";\n}\n._1nq_F45dZ6i_VVjlfyiXPk {\n  margin-top: 30px;\n  margin-bottom: 50px;\n}\n._19ZmYfPBPDT_Jikr5VRaMm {\n  border-bottom: 2px solid #f8f8f8;\n  display: inline-block;\n  padding-bottom: 20px;\n}\n._11TWQnbe9ZC4R_-mSvZdoT {\n  width: 80px;\n  height: 80px;\n  background: #fff9f5;\n  border-radius: 40px;\n  display: inline-block;\n}\n._2JVPGqNiYiR6PVpyHVGpIp {\n  width: 54px;\n  height: 54px;\n  /* background: #ffcf0d; */\n  border-radius: 40px;\n  margin: 13px auto;\n  position: relative;\n}\n._1IGnzNbwfEpyFpRVmU-bNn {\n  width: 38px;\n  height: 38px;\n  background-image: url(\"/static/images/video-button-bg.png\");\n  border-radius: 40px;\n  position: absolute;\n  top: 8px;\n  left: 8px;\n}\n\n/*---Content Right---*/\n._3iYaxa8SbPUQs7HlobLzoM {\n  flex: 1;\n  /* outline: 1px solid lime; */\n  background-image: url(\"/static/images/Ellipse.png\");\n  background-size: 840px auto;\n  background-position: 0px -80px;\n  background-repeat: no-repeat;\n  position: relative;\n}\n._3iYaxa8SbPUQs7HlobLzoM > img {\n  position: absolute;\n  top: 130px;\n  left: 60px;\n}\n\n._3Fk1VSdooncz1IwBFpA5d7 {\n  background-color: #fff;\n  width: 235px;\n  height: 40px;\n  border-radius: 20px;\n  position: absolute;\n  top: 60px;\n  left: 20px;\n  z-index: 9999;\n}\n\n.vjM9_9HH0TF2iVSH0jdgQ {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n.vjM9_9HH0TF2iVSH0jdgQ > div {\n  border-radius: 6px;\n  height: 12px;\n  width: 12px;\n  display: inline-block;\n  margin-right: 15px;\n}\n\n.vjM9_9HH0TF2iVSH0jdgQ ._11mlvgwhRq-Tb6619OgiwF {\n  background-color: #d9c79c;\n}\n.vjM9_9HH0TF2iVSH0jdgQ ._3_W3ZrtkKFwMw8ynd8D7WO {\n  border: 1px solid #e6e6e6;\n}\n.vjM9_9HH0TF2iVSH0jdgQ ._3YBfr0h_kuwRF1F_p0Cnsp {\n  background-color: #595959;\n}\n.vjM9_9HH0TF2iVSH0jdgQ ._3J84i50mYJxP6LWwvNPHr2 {\n  background-color: #c9c9c9;\n}\n\n.vjM9_9HH0TF2iVSH0jdgQ > div:hover {\n  cursor: pointer;\n}\n\n._2gffR4MUqc_eRMwUBm3uQw {\n  width: 500px;\n  height: auto;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n}\n._2gffR4MUqc_eRMwUBm3uQw > img {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  top: 20px;\n  right: -200px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/Content.module.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,cAAc;EACd,gCAAgC;EAChC,+BAA+B;CAChC;;AAED,0BAA0B;AAC1B;EACE,mCAAmC;EACnC,QAAQ;CACT;AACD;EACE,iBAAiB;EACjB,gBAAgB;EAChB,iBAAiB;EACjB,0BAA0B;EAC1B,+BAA+B;CAChC;AACD;EACE,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,iCAAiC;EACjC,sBAAsB;EACtB,qBAAqB;CACtB;AACD;EACE,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,oBAAoB;EACpB,sBAAsB;CACvB;AACD;EACE,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,oBAAoB;EACpB,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,aAAa;EACb,4DAA4D;EAC5D,oBAAoB;EACpB,mBAAmB;EACnB,SAAS;EACT,UAAU;CACX;;AAED,uBAAuB;AACvB;EACE,QAAQ;EACR,8BAA8B;EAC9B,oDAAoD;EACpD,4BAA4B;EAC5B,+BAA+B;EAC/B,6BAA6B;EAC7B,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,WAAW;CACZ;;AAED;EACE,uBAAuB;EACvB,aAAa;EACb,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,UAAU;EACV,WAAW;EACX,cAAc;CACf;;AAED;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,sBAAsB;EACtB,mBAAmB;CACpB;;AAED;EACE,0BAA0B;CAC3B;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,0BAA0B;CAC3B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,aAAa;EACb,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,SAAS;CACV;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,cAAc;CACf","file":"Content.module.css","sourcesContent":[".header__content {\n  display: flex;\n  height: 490px;\n  /* outline: 1px solid salmon; */\n  justify-content: space-between;\n}\n\n/*-----Content Left-----*/\n.content_left {\n  /* outline: 1px solid lightpink; */\n  flex: 1;\n}\n.content_left h1 {\n  margin-top: 65px;\n  font-size: 36px;\n  line-height: 1.4;\n  text-transform: uppercase;\n  font-family: \"MullerExtraBold\";\n}\n.content_left__get_video {\n  margin-top: 30px;\n  margin-bottom: 50px;\n}\n.get_video__info {\n  border-bottom: 2px solid #f8f8f8;\n  display: inline-block;\n  padding-bottom: 20px;\n}\n.get_video__button {\n  width: 80px;\n  height: 80px;\n  background: #fff9f5;\n  border-radius: 40px;\n  display: inline-block;\n}\n.get_video__button_yellow {\n  width: 54px;\n  height: 54px;\n  /* background: #ffcf0d; */\n  border-radius: 40px;\n  margin: 13px auto;\n  position: relative;\n}\n.get_video__button_bg {\n  width: 38px;\n  height: 38px;\n  background-image: url(\"/static/images/video-button-bg.png\");\n  border-radius: 40px;\n  position: absolute;\n  top: 8px;\n  left: 8px;\n}\n\n/*---Content Right---*/\n.content_right {\n  flex: 1;\n  /* outline: 1px solid lime; */\n  background-image: url(\"/static/images/Ellipse.png\");\n  background-size: 840px auto;\n  background-position: 0px -80px;\n  background-repeat: no-repeat;\n  position: relative;\n}\n.content_right > img {\n  position: absolute;\n  top: 130px;\n  left: 60px;\n}\n\n.content_right__switch {\n  background-color: #fff;\n  width: 235px;\n  height: 40px;\n  border-radius: 20px;\n  position: absolute;\n  top: 60px;\n  left: 20px;\n  z-index: 9999;\n}\n\n.switch_group {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n.switch_group > div {\n  border-radius: 6px;\n  height: 12px;\n  width: 12px;\n  display: inline-block;\n  margin-right: 15px;\n}\n\n.switch_group .switch_gold {\n  background-color: #d9c79c;\n}\n.switch_group .switch_white {\n  border: 1px solid #e6e6e6;\n}\n.switch_group .switch_black {\n  background-color: #595959;\n}\n.switch_group .switch_gray {\n  background-color: #c9c9c9;\n}\n\n.switch_group > div:hover {\n  cursor: pointer;\n}\n\n.content_right__lamp_variant {\n  width: 500px;\n  height: auto;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n}\n.content_right__lamp_variant > img {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  top: 20px;\n  right: -200px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"header__content": "_1IWZPnFLR7Yk7rETUPeDIE",
	"content_left": "_3hoW4pvCtVakSCX-350cUr",
	"content_left__get_video": "_1nq_F45dZ6i_VVjlfyiXPk",
	"get_video__info": "_19ZmYfPBPDT_Jikr5VRaMm",
	"get_video__button": "_11TWQnbe9ZC4R_-mSvZdoT",
	"get_video__button_yellow": "_2JVPGqNiYiR6PVpyHVGpIp",
	"get_video__button_bg": "_1IGnzNbwfEpyFpRVmU-bNn",
	"content_right": "_3iYaxa8SbPUQs7HlobLzoM",
	"content_right__switch": "_3Fk1VSdooncz1IwBFpA5d7",
	"switch_group": "vjM9_9HH0TF2iVSH0jdgQ",
	"switch_gold": "_11mlvgwhRq-Tb6619OgiwF",
	"switch_white": "_3_W3ZrtkKFwMw8ynd8D7WO",
	"switch_black": "_3YBfr0h_kuwRF1F_p0Cnsp",
	"switch_gray": "_3J84i50mYJxP6LWwvNPHr2",
	"content_right__lamp_variant": "_2gffR4MUqc_eRMwUBm3uQw"
};

/***/ }),

/***/ "./src/components/sections/Header/Header.jsx":
/*!***************************************************!*\
  !*** ./src/components/sections/Header/Header.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.module.css */ "./src/components/sections/Header/Header.module.css");
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Header_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navbar/Navbar */ "./src/components/sections/Header/Navbar/Navbar.jsx");
/* harmony import */ var _Content_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Content/Content */ "./src/components/sections/Header/Content/Content.jsx");
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Header.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





const Header = () => {
  return __jsx("header", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }, __jsx(_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }), __jsx(_Content_Content__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/components/sections/Header/Header.module.css":
/*!**********************************************************!*\
  !*** ./src/components/sections/Header/Header.module.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "._1UYzSw_ddStvhkZjUVOo7y {\n  height: 740px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Header.module.css"],"names":[],"mappings":"AAAA;EACE,cAAc;CACf","file":"Header.module.css","sourcesContent":[".header {\n  height: 740px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"header": "_1UYzSw_ddStvhkZjUVOo7y"
};

/***/ }),

/***/ "./src/components/sections/Header/Navbar/Navbar.jsx":
/*!**********************************************************!*\
  !*** ./src/components/sections/Header/Navbar/Navbar.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar.module.css */ "./src/components/sections/Header/Navbar/Navbar.module.css");
/* harmony import */ var _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Navbar_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Navbar/Navbar.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Navbar = props => {
  return __jsx("div", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__navbar,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: undefined
  }, __jsx("div", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.navbar__logo,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }), __jsx("nav", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.navbar__nav,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }, __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }, "\u041E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }, "\u041E\u0442\u0437\u044B\u0432\u044B"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C")), __jsx("div", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.navbar__phone,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }, __jsx("span", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.phone__text,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  }, "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A"), __jsx("span", {
    className: `${_Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.phone__number} purpure_text`,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  }, "+7-(800)-505-65-33")));
};

/* harmony default export */ __webpack_exports__["default"] = (Navbar);

/***/ }),

/***/ "./src/components/sections/Header/Navbar/Navbar.module.css":
/*!*****************************************************************!*\
  !*** ./src/components/sections/Header/Navbar/Navbar.module.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "._2YQfWpZlvXw7b4bibBn1Uk {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  border-bottom: 7px solid #fbfbfb;\n}\n._2BcxxFH2o45uuhsm7GNzpD {\n  background-image: url(\"/static/images/Logo.png\");\n  width: 111px;\n  height: 39px;\n}\n\n.ffK5YvlOyIDDly7bfuHfp {\n  font-size: 16px;\n}\n\n._1OZo9WcZuJ8mJvFWooRaMS {\n  color: #1a1a1a;\n  text-decoration: none;\n  display: inline-block;\n  margin-left: 40px;\n}\n\n._1OZo9WcZuJ8mJvFWooRaMS:hover {\n  text-decoration: underline;\n}\n\n._32WQ89JCIyo0jUd5lRGKMI {\n  position: relative;\n  margin-left: 10px;\n}\n._1JHu-7jcsaqY79yw3VwSP9 {\n  font-size: 16px;\n  color: #9a9a9a;\n  display: inline-block;\n  left: 30px;\n  position: relative;\n}\n._3-FTtLNbZo-CaM6bKsEvyx {\n  font-size: 20px;\n  display: inline-block;\n  position: relative;\n  left: 40px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Navbar/Navbar.module.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,+BAA+B;EAC/B,oBAAoB;EACpB,kBAAkB;EAClB,qBAAqB;EACrB,iCAAiC;CAClC;AACD;EACE,iDAAiD;EACjD,aAAa;EACb,aAAa;CACd;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,eAAe;EACf,sBAAsB;EACtB,sBAAsB;EACtB,kBAAkB;CACnB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,mBAAmB;EACnB,kBAAkB;CACnB;AACD;EACE,gBAAgB;EAChB,eAAe;EACf,sBAAsB;EACtB,WAAW;EACX,mBAAmB;CACpB;AACD;EACE,gBAAgB;EAChB,sBAAsB;EACtB,mBAAmB;EACnB,WAAW;CACZ","file":"Navbar.module.css","sourcesContent":[".header__navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  border-bottom: 7px solid #fbfbfb;\n}\n.navbar__logo {\n  background-image: url(\"/static/images/Logo.png\");\n  width: 111px;\n  height: 39px;\n}\n\n.navbar__nav {\n  font-size: 16px;\n}\n\n.nav__link {\n  color: #1a1a1a;\n  text-decoration: none;\n  display: inline-block;\n  margin-left: 40px;\n}\n\n.nav__link:hover {\n  text-decoration: underline;\n}\n\n.navbar__phone {\n  position: relative;\n  margin-left: 10px;\n}\n.phone__text {\n  font-size: 16px;\n  color: #9a9a9a;\n  display: inline-block;\n  left: 30px;\n  position: relative;\n}\n.phone__number {\n  font-size: 20px;\n  display: inline-block;\n  position: relative;\n  left: 40px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"header__navbar": "_2YQfWpZlvXw7b4bibBn1Uk",
	"navbar__logo": "_2BcxxFH2o45uuhsm7GNzpD",
	"navbar__nav": "ffK5YvlOyIDDly7bfuHfp",
	"nav__link": "_1OZo9WcZuJ8mJvFWooRaMS",
	"navbar__phone": "_32WQ89JCIyo0jUd5lRGKMI",
	"phone__text": "_1JHu-7jcsaqY79yw3VwSP9",
	"phone__number": "_3-FTtLNbZo-CaM6bKsEvyx"
};

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/maximas/projects/fulogy-tz-2/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map