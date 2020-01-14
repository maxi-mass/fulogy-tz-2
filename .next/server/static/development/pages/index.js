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
/* harmony import */ var _src_components_sections_Features_Features__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/components/sections/Features/Features */ "./src/components/sections/Features/Features.jsx");
/* harmony import */ var _src_components_sections_Portfolio_Portfolio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/components/sections/Portfolio/Portfolio */ "./src/components/sections/Portfolio/Portfolio.jsx");
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const Index = () => {
  return __jsx(_src_components_Wrapper_Wrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, __jsx(_src_components_sections_Header_Header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }), __jsx(_src_components_sections_Features_Features__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }), __jsx(_src_components_sections_Portfolio_Portfolio__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
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
exports.push([module.i, ".xpfRyPW7TUnFYOuM8lndk {\n  background-color: #ffcf0d;\n  border: none;\n  height: 55px;\n  width: 254px;\n  text-transform: uppercase;\n  border-radius: 5px;\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  padding-left: 25px;\n  padding-right: 25px;\n  transition: background 0.2s linear;\n}\n\n.xpfRyPW7TUnFYOuM8lndk:hover {\n  cursor: pointer;\n  background: #ffe013;\n}\n\n.xpfRyPW7TUnFYOuM8lndk:active {\n  background: #ffcf0d;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/common/Button/Button.module.css"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,aAAa;EACb,aAAa;EACb,aAAa;EACb,0BAA0B;EAC1B,mBAAmB;EACnB,gBAAgB;EAChB,0BAA0B;EAC1B,mBAAmB;EACnB,oBAAoB;EACpB,mCAAmC;CACpC;;AAED;EACE,gBAAgB;EAChB,oBAAoB;CACrB;;AAED;EACE,oBAAoB;CACrB","file":"Button.module.css","sourcesContent":[".button {\n  background-color: #ffcf0d;\n  border: none;\n  height: 55px;\n  width: 254px;\n  text-transform: uppercase;\n  border-radius: 5px;\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  padding-left: 25px;\n  padding-right: 25px;\n  transition: background 0.2s linear;\n}\n\n.button:hover {\n  cursor: pointer;\n  background: #ffe013;\n}\n\n.button:active {\n  background: #ffcf0d;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"button": "xpfRyPW7TUnFYOuM8lndk"
};

/***/ }),

/***/ "./src/components/sections/Features/Features.jsx":
/*!*******************************************************!*\
  !*** ./src/components/sections/Features/Features.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Features_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Features.module.css */ "./src/components/sections/Features/Features.module.css");
/* harmony import */ var _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Features_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.jsx");
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Features/Features.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




const Features = props => {
  return __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__header,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }, "\u0421\u0422\u041E\u0418\u041C\u041E\u0421\u0422\u042C"), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__desc,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E\u0433\u043E\u043D\u043D\u043E\u0433\u043E \u043C\u0435\u0442\u0440\u0430 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430 fulogy \u043E\u0442 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }), __jsx("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }, "2000"), " \u0440\u0443\u0431."), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }, "\u0412 \u0446\u0435\u043D\u0443 \u0432\u0445\u043E\u0434\u0438\u0442:"), __jsx(_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }, "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A"), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__phone,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: undefined
  }, "\u0438\u043B\u0438 \u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443:", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }), __jsx("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, "+7-(800)-505-65-33")), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__social,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/whatsapp.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: undefined
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/viber.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/telega.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: undefined
  }))), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__arrow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: undefined
  })), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left__quotes,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: undefined
  })), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: undefined
  }, __jsx("table", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: undefined
  }, __jsx("tr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: undefined
  }, __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: undefined
  }, "01"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: undefined
  }, "\u0411\u043B\u043E\u043A \u043F\u0438\u0442\u0430\u043D\u0438\u044F ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: undefined
  }), " (\u043D\u0435 \u0441\u0432\u0438\u0441\u0442\u0438\u0442, ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: undefined
  }), " \u043D\u0435 \u0436\u0443\u0436\u0436\u0438\u0442);"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: undefined
  }, "02"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: undefined
  }, "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: undefined
  }), " \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: undefined
  }), " \u0434\u043B\u044F \u0412\u0430\u0448\u0435\u0439 \u043A\u0443\u0445\u043D\u0438;"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: undefined
  }, "03"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: undefined
  }, "\u0421\u0435\u043D\u0441\u043E\u0440 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: undefined
  }), " \u0441\u0432\u0435\u0442\u043E\u043C \u043E\u0447\u0435\u043D\u044C \u0443\u0434\u043E\u0431\u043D\u044B\u0439, ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: undefined
  }), "\u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u043D\u044B\u0439 \u0438 \u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0439;")))), __jsx("tr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: undefined
  }, __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: undefined
  }, "04"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }, "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F 5 \u043B\u0435\u0442;"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: undefined
  }, "05"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: undefined
  }, "\u0414\u0435\u043C\u043E\u043D\u0442\u0430\u0436 \u0441\u0442\u0430\u0440\u044B\u0445 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: undefined
  }), " \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u043E\u0432 \u0438 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: undefined
  }), " \u043C\u043E\u043D\u0442\u0430\u0436 \u043D\u0430\u0448\u0438\u0445;"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: undefined
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: undefined
  }, "06"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: undefined
  }, "\u0421\u0432\u0435\u0442\u043E\u0434\u0438\u043E\u0434\u044B \u0432\u044B\u0441\u043E\u043A\u043E\u0439 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: undefined
  }), " \u0446\u0432\u0435\u0442\u043E\u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: undefined
  }), "\u0441\u0432\u0435\u0442 \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u043D\u044B\u043C \u043A ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: undefined
  }), " \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043E\u043C\u0443 \u0441\u043E\u043B\u043D\u0435\u0447\u043D\u043E\u043C\u0443 \u0446\u0432\u0435\u0442\u0443."))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Features);

/***/ }),

/***/ "./src/components/sections/Features/Features.module.css":
/*!**************************************************************!*\
  !*** ./src/components/sections/Features/Features.module.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "._1tt5hGJvwe1wY43PioYRL- {\n  position: relative;\n  height: 555px;\n  background-image: url(\"/static/images/fetures-bg.png\");\n  display: flex;\n  color: #fff;\n}\n/*-----------LEFT----------*/\n.YmUyCD7VYi8wyU106LtBw {\n  width: 436px;\n  /* outline: 1px solid sandybrown; */\n  margin-left: 36px;\n  display: flex;\n  justify-content: center;\n}\n._2rdaz6hSz_ooq5NXmRmWes {\n  width: 276px;\n  z-index: 9999;\n  position: relative;\n  /* outline: 1px solid red; */\n}\n._17YJwJQtnI1ZfZoAAzTL1i {\n  margin-top: 60px;\n  font-family: \"MullerExtraBold\";\n  font-size: 30px;\n}\n._83cD3cqbafvmXkgvjmO4 {\n  font-size: 20px;\n  margin-top: 28px;\n  line-height: 1.5;\n}\n._83cD3cqbafvmXkgvjmO4 span,\n._3Ez4u-40QODAPmRIPohzyF span {\n  font-family: \"MullerExtraBold\";\n  color: #ffcf0d;\n  font-size: 20px;\n}\n.EDlFqY0bMzH_2I_M8sOBz {\n  margin-top: 46px;\n  margin-bottom: 66px;\n  font-family: \"MullerBold\";\n  text-transform: uppercase;\n}\n\n._3Ez4u-40QODAPmRIPohzyF {\n  margin-top: 25px;\n  font-size: 16px;\n}\n\n.RMFAMXrl4-GwmIQlpqEoc {\n  width: 88px;\n  height: 62px;\n  background-image: url(\"/static/images/features-arrow.png\");\n  position: absolute;\n  top: 240px;\n  right: 10px;\n}\n\n._32TM9UolTxogFvtcKCsX41 {\n  position: absolute;\n  top: 20px;\n  left: 15px;\n  width: 178px;\n  height: 134px;\n  background-image: url(\"/static/images/features-quotes.png\");\n}\n\n._3LLT1Tmb48kOEt33kVAYlh {\n  width: 95px;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 18px;\n}\n._3LLT1Tmb48kOEt33kVAYlh div {\n  height: 19px;\n  width: 19px;\n  display: inline-block;\n  background-color: #fff;\n  border-radius: 10px;\n}\n._3LLT1Tmb48kOEt33kVAYlh img {\n  height: 19px;\n  width: 19px;\n}\n\n/*-------RIGHT---------*/\n._2D3yCkInqOgjQ6JcAicSRZ {\n  width: 681px;\n  height: 403px;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 60px;\n}\n._2D3yCkInqOgjQ6JcAicSRZ table {\n  width: 100%;\n  height: 100%;\n}\n._2D3yCkInqOgjQ6JcAicSRZ table tr {\n  vertical-align: top;\n}\n._2D3yCkInqOgjQ6JcAicSRZ table tr:nth-child(2) ._3LHKQb7TK2_sT9RA8gsp5w {\n  margin-top: 40px;\n}\n._2D3yCkInqOgjQ6JcAicSRZ table td {\n  margin-bottom: 30px;\n}\n\n._1Lh30CTTZXRrn2i4pRAdb {\n  display: flex;\n  flex-direction: column;\n  max-width: 250px;\n  font-size: 20px;\n}\n._3LHKQb7TK2_sT9RA8gsp5w {\n  font-size: 36px;\n  font-family: \"MullerBold\";\n  margin-bottom: 30px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Features/Features.module.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,cAAc;EACd,uDAAuD;EACvD,cAAc;EACd,YAAY;CACb;AACD,6BAA6B;AAC7B;EACE,aAAa;EACb,oCAAoC;EACpC,kBAAkB;EAClB,cAAc;EACd,wBAAwB;CACzB;AACD;EACE,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,6BAA6B;CAC9B;AACD;EACE,iBAAiB;EACjB,+BAA+B;EAC/B,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,iBAAiB;EACjB,iBAAiB;CAClB;AACD;;EAEE,+BAA+B;EAC/B,eAAe;EACf,gBAAgB;CACjB;AACD;EACE,iBAAiB;EACjB,oBAAoB;EACpB,0BAA0B;EAC1B,0BAA0B;CAC3B;;AAED;EACE,iBAAiB;EACjB,gBAAgB;CACjB;;AAED;EACE,YAAY;EACZ,aAAa;EACb,2DAA2D;EAC3D,mBAAmB;EACnB,WAAW;EACX,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,UAAU;EACV,WAAW;EACX,aAAa;EACb,cAAc;EACd,4DAA4D;CAC7D;;AAED;EACE,YAAY;EACZ,cAAc;EACd,+BAA+B;EAC/B,iBAAiB;CAClB;AACD;EACE,aAAa;EACb,YAAY;EACZ,sBAAsB;EACtB,uBAAuB;EACvB,oBAAoB;CACrB;AACD;EACE,aAAa;EACb,YAAY;CACb;;AAED,yBAAyB;AACzB;EACE,aAAa;EACb,cAAc;EACd,cAAc;EACd,+BAA+B;EAC/B,iBAAiB;CAClB;AACD;EACE,YAAY;EACZ,aAAa;CACd;AACD;EACE,oBAAoB;CACrB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,oBAAoB;CACrB;;AAED;EACE,cAAc;EACd,uBAAuB;EACvB,iBAAiB;EACjB,gBAAgB;CACjB;AACD;EACE,gBAAgB;EAChB,0BAA0B;EAC1B,oBAAoB;CACrB","file":"Features.module.css","sourcesContent":[".features {\n  position: relative;\n  height: 555px;\n  background-image: url(\"/static/images/fetures-bg.png\");\n  display: flex;\n  color: #fff;\n}\n/*-----------LEFT----------*/\n.features__left {\n  width: 436px;\n  /* outline: 1px solid sandybrown; */\n  margin-left: 36px;\n  display: flex;\n  justify-content: center;\n}\n.features__left_inner {\n  width: 276px;\n  z-index: 9999;\n  position: relative;\n  /* outline: 1px solid red; */\n}\n.features__left_inner__header {\n  margin-top: 60px;\n  font-family: \"MullerExtraBold\";\n  font-size: 30px;\n}\n.features__left_inner__desc {\n  font-size: 20px;\n  margin-top: 28px;\n  line-height: 1.5;\n}\n.features__left_inner__desc span,\n.features__left_inner__phone span {\n  font-family: \"MullerExtraBold\";\n  color: #ffcf0d;\n  font-size: 20px;\n}\n.features__left_inner__label {\n  margin-top: 46px;\n  margin-bottom: 66px;\n  font-family: \"MullerBold\";\n  text-transform: uppercase;\n}\n\n.features__left_inner__phone {\n  margin-top: 25px;\n  font-size: 16px;\n}\n\n.features__left_inner__arrow {\n  width: 88px;\n  height: 62px;\n  background-image: url(\"/static/images/features-arrow.png\");\n  position: absolute;\n  top: 240px;\n  right: 10px;\n}\n\n.features__left__quotes {\n  position: absolute;\n  top: 20px;\n  left: 15px;\n  width: 178px;\n  height: 134px;\n  background-image: url(\"/static/images/features-quotes.png\");\n}\n\n.features__left_inner__social {\n  width: 95px;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 18px;\n}\n.features__left_inner__social div {\n  height: 19px;\n  width: 19px;\n  display: inline-block;\n  background-color: #fff;\n  border-radius: 10px;\n}\n.features__left_inner__social img {\n  height: 19px;\n  width: 19px;\n}\n\n/*-------RIGHT---------*/\n.features__right_inner {\n  width: 681px;\n  height: 403px;\n  display: flex;\n  justify-content: space-between;\n  margin-top: 60px;\n}\n.features__right_inner table {\n  width: 100%;\n  height: 100%;\n}\n.features__right_inner table tr {\n  vertical-align: top;\n}\n.features__right_inner table tr:nth-child(2) .feature_number {\n  margin-top: 40px;\n}\n.features__right_inner table td {\n  margin-bottom: 30px;\n}\n\n.features__right_inner__feature {\n  display: flex;\n  flex-direction: column;\n  max-width: 250px;\n  font-size: 20px;\n}\n.feature_number {\n  font-size: 36px;\n  font-family: \"MullerBold\";\n  margin-bottom: 30px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"features": "_1tt5hGJvwe1wY43PioYRL-",
	"features__left": "YmUyCD7VYi8wyU106LtBw",
	"features__left_inner": "_2rdaz6hSz_ooq5NXmRmWes",
	"features__left_inner__header": "_17YJwJQtnI1ZfZoAAzTL1i",
	"features__left_inner__desc": "_83cD3cqbafvmXkgvjmO4",
	"features__left_inner__phone": "_3Ez4u-40QODAPmRIPohzyF",
	"features__left_inner__label": "EDlFqY0bMzH_2I_M8sOBz",
	"features__left_inner__arrow": "RMFAMXrl4-GwmIQlpqEoc",
	"features__left__quotes": "_32TM9UolTxogFvtcKCsX41",
	"features__left_inner__social": "_3LLT1Tmb48kOEt33kVAYlh",
	"features__right_inner": "_2D3yCkInqOgjQ6JcAicSRZ",
	"feature_number": "_3LHKQb7TK2_sT9RA8gsp5w",
	"features__right_inner__feature": "_1Lh30CTTZXRrn2i4pRAdb"
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
/* harmony import */ var _VideoButton_VideoButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VideoButton/VideoButton */ "./src/components/sections/Header/Content/VideoButton/VideoButton.jsx");
/* harmony import */ var _LampSlider_LampSlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LampSlider/LampSlider */ "./src/components/sections/Header/Content/LampSlider/LampSlider.jsx");
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/Content.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






const Content = props => {
  return __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__content,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, "\u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043D\u0441\u043E\u0440\u043D\u044B\u0435 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0438 \u0434\u043B\u044F \u043A\u0443\u0445\u043D\u0438"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }, "8 \u043B\u0435\u0442"), " \u043E\u0441\u043D\u0430\u0449\u0430\u0435\u043C \u0412\u0430\u0448\u0438 \u043A\u0443\u0445\u043D\u0438 \u043D\u0430\u0448\u0438\u043C\u0438 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u043C\u0438 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: undefined
  }), " \u043F\u043E \u0446\u0435\u043D\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F."), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left__get_video,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: undefined
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__info,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: undefined
  }, "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435"), " \u0432\u0438\u0434\u0435\u043E\u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }), " \u043E \u043D\u0430\u0448\u0438\u0445 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u0445!"), __jsx(_VideoButton_VideoButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  })), __jsx(_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, "\u043E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440")), __jsx(_LampSlider_LampSlider__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  }));
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
exports.push([module.i, "._1IWZPnFLR7Yk7rETUPeDIE {\n  display: flex;\n  height: 490px;\n  /* outline: 1px solid salmon; */\n  justify-content: space-between;\n}\n\n/*-----Content Left-----*/\n._3hoW4pvCtVakSCX-350cUr {\n  /* outline: 1px solid lightpink; */\n  flex: 1;\n}\n._3hoW4pvCtVakSCX-350cUr h1 {\n  margin-top: 65px;\n  font-size: 36px;\n  line-height: 1.4;\n  text-transform: uppercase;\n  font-family: \"MullerExtraBold\";\n}\n._1nq_F45dZ6i_VVjlfyiXPk {\n  margin-top: 25px;\n  margin-bottom: 25px;\n  width: 358px;\n  height: 80px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n._19ZmYfPBPDT_Jikr5VRaMm {\n  border-bottom: 2px solid #f8f8f8;\n  display: inline-block;\n  padding-bottom: 20px;\n  font-size: 16px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/Content.module.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,cAAc;EACd,gCAAgC;EAChC,+BAA+B;CAChC;;AAED,0BAA0B;AAC1B;EACE,mCAAmC;EACnC,QAAQ;CACT;AACD;EACE,iBAAiB;EACjB,gBAAgB;EAChB,iBAAiB;EACjB,0BAA0B;EAC1B,+BAA+B;CAChC;AACD;EACE,iBAAiB;EACjB,oBAAoB;EACpB,aAAa;EACb,aAAa;EACb,cAAc;EACd,+BAA+B;EAC/B,oBAAoB;CACrB;AACD;EACE,iCAAiC;EACjC,sBAAsB;EACtB,qBAAqB;EACrB,gBAAgB;CACjB","file":"Content.module.css","sourcesContent":[".header__content {\n  display: flex;\n  height: 490px;\n  /* outline: 1px solid salmon; */\n  justify-content: space-between;\n}\n\n/*-----Content Left-----*/\n.content_left {\n  /* outline: 1px solid lightpink; */\n  flex: 1;\n}\n.content_left h1 {\n  margin-top: 65px;\n  font-size: 36px;\n  line-height: 1.4;\n  text-transform: uppercase;\n  font-family: \"MullerExtraBold\";\n}\n.content_left__get_video {\n  margin-top: 25px;\n  margin-bottom: 25px;\n  width: 358px;\n  height: 80px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.get_video__info {\n  border-bottom: 2px solid #f8f8f8;\n  display: inline-block;\n  padding-bottom: 20px;\n  font-size: 16px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"header__content": "_1IWZPnFLR7Yk7rETUPeDIE",
	"content_left": "_3hoW4pvCtVakSCX-350cUr",
	"content_left__get_video": "_1nq_F45dZ6i_VVjlfyiXPk",
	"get_video__info": "_19ZmYfPBPDT_Jikr5VRaMm"
};

/***/ }),

/***/ "./src/components/sections/Header/Content/LampSlider/LampSlider.jsx":
/*!**************************************************************************!*\
  !*** ./src/components/sections/Header/Content/LampSlider/LampSlider.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LampSlider.module.css */ "./src/components/sections/Header/Content/LampSlider/LampSlider.module.css");
/* harmony import */ var _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/LampSlider/LampSlider.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const LampSlider = props => {
  const {
    0: lampColor,
    1: setLampColor
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("gold");
  return __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }, __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__switch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }, __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_group,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, __jsx("div", {
    onClick: () => setLampColor("gold"),
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gold,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }), __jsx("div", {
    onClick: () => setLampColor("white"),
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_white,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  }), __jsx("div", {
    onClick: () => setLampColor("black"),
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_black,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: undefined
  }), __jsx("div", {
    onClick: () => setLampColor("gray"),
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gray,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }))), __jsx("img", {
    src: "/static/images/man.png",
    alt: "man",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  }), __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__lamp_variant,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  }, __jsx("img", {
    src: `/static/images/lamp-${lampColor}.png`,
    alt: "lamp",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (LampSlider);

/***/ }),

/***/ "./src/components/sections/Header/Content/LampSlider/LampSlider.module.css":
/*!*********************************************************************************!*\
  !*** ./src/components/sections/Header/Content/LampSlider/LampSlider.module.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "._3eXmOpB5uw2LJu2wWU498P {\n  flex: 1;\n  /* outline: 1px solid lime; */\n  background-image: url(\"/static/images/Ellipse.png\");\n  background-size: 840px auto;\n  background-position: 0px -80px;\n  background-repeat: no-repeat;\n  position: relative;\n}\n._3eXmOpB5uw2LJu2wWU498P > img {\n  position: absolute;\n  top: 130px;\n  left: 60px;\n}\n\n._241UdVFb4FNYAqCy91RFkw {\n  background-color: #fff;\n  width: 235px;\n  height: 40px;\n  border-radius: 20px;\n  position: absolute;\n  top: 60px;\n  left: 20px;\n  z-index: 9999;\n}\n\n._2dE8vaSAvhW9UeJ5TO78dv {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n._2dE8vaSAvhW9UeJ5TO78dv > div {\n  border-radius: 6px;\n  height: 12px;\n  width: 12px;\n  display: inline-block;\n  margin-right: 15px;\n}\n\n._2dE8vaSAvhW9UeJ5TO78dv ._3zohH3lK7tytolXka2sqkP {\n  background-color: #d9c79c;\n}\n._2dE8vaSAvhW9UeJ5TO78dv .e4YssttZsuODe2mZGZZ-q {\n  border: 1px solid #e6e6e6;\n}\n._2dE8vaSAvhW9UeJ5TO78dv ._13KP-huGdS-TnheiDekU87 {\n  background-color: #595959;\n}\n._2dE8vaSAvhW9UeJ5TO78dv .at1Wa3FD-MDA0GrzIogKz {\n  background-color: #c9c9c9;\n}\n\n._2dE8vaSAvhW9UeJ5TO78dv > div:hover {\n  cursor: pointer;\n}\n\n._3CgKAEOL-TuaQMuGOo7j9C {\n  width: 500px;\n  height: auto;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n}\n._3CgKAEOL-TuaQMuGOo7j9C > img {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  top: 20px;\n  right: -200px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/LampSlider/LampSlider.module.css"],"names":[],"mappings":"AAAA;EACE,QAAQ;EACR,8BAA8B;EAC9B,oDAAoD;EACpD,4BAA4B;EAC5B,+BAA+B;EAC/B,6BAA6B;EAC7B,mBAAmB;CACpB;AACD;EACE,mBAAmB;EACnB,WAAW;EACX,WAAW;CACZ;;AAED;EACE,uBAAuB;EACvB,aAAa;EACb,aAAa;EACb,oBAAoB;EACpB,mBAAmB;EACnB,UAAU;EACV,WAAW;EACX,cAAc;CACf;;AAED;EACE,mBAAmB;EACnB,YAAY;EACZ,UAAU;CACX;AACD;EACE,mBAAmB;EACnB,aAAa;EACb,YAAY;EACZ,sBAAsB;EACtB,mBAAmB;CACpB;;AAED;EACE,0BAA0B;CAC3B;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,0BAA0B;CAC3B;AACD;EACE,0BAA0B;CAC3B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,aAAa;EACb,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,SAAS;CACV;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,cAAc;CACf","file":"LampSlider.module.css","sourcesContent":[".content_right {\n  flex: 1;\n  /* outline: 1px solid lime; */\n  background-image: url(\"/static/images/Ellipse.png\");\n  background-size: 840px auto;\n  background-position: 0px -80px;\n  background-repeat: no-repeat;\n  position: relative;\n}\n.content_right > img {\n  position: absolute;\n  top: 130px;\n  left: 60px;\n}\n\n.content_right__switch {\n  background-color: #fff;\n  width: 235px;\n  height: 40px;\n  border-radius: 20px;\n  position: absolute;\n  top: 60px;\n  left: 20px;\n  z-index: 9999;\n}\n\n.switch_group {\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n.switch_group > div {\n  border-radius: 6px;\n  height: 12px;\n  width: 12px;\n  display: inline-block;\n  margin-right: 15px;\n}\n\n.switch_group .switch_gold {\n  background-color: #d9c79c;\n}\n.switch_group .switch_white {\n  border: 1px solid #e6e6e6;\n}\n.switch_group .switch_black {\n  background-color: #595959;\n}\n.switch_group .switch_gray {\n  background-color: #c9c9c9;\n}\n\n.switch_group > div:hover {\n  cursor: pointer;\n}\n\n.content_right__lamp_variant {\n  width: 500px;\n  height: auto;\n  overflow: hidden;\n  position: absolute;\n  right: 0;\n}\n.content_right__lamp_variant > img {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  top: 20px;\n  right: -200px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"content_right": "_3eXmOpB5uw2LJu2wWU498P",
	"content_right__switch": "_241UdVFb4FNYAqCy91RFkw",
	"switch_group": "_2dE8vaSAvhW9UeJ5TO78dv",
	"switch_gold": "_3zohH3lK7tytolXka2sqkP",
	"switch_white": "e4YssttZsuODe2mZGZZ-q",
	"switch_black": "_13KP-huGdS-TnheiDekU87",
	"switch_gray": "at1Wa3FD-MDA0GrzIogKz",
	"content_right__lamp_variant": "_3CgKAEOL-TuaQMuGOo7j9C"
};

/***/ }),

/***/ "./src/components/sections/Header/Content/VideoButton/VideoButton.jsx":
/*!****************************************************************************!*\
  !*** ./src/components/sections/Header/Content/VideoButton/VideoButton.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoButton.module.css */ "./src/components/sections/Header/Content/VideoButton/VideoButton.module.css");
/* harmony import */ var _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/VideoButton/VideoButton.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const VideoButton = props => {
  const {
    0: yellowСircle,
    1: setYellowСircle
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    opacity: 1.0,
    opDirection: "down"
  });
  const {
    0: pinkСircle,
    1: setPinkСircle
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    opacity: 0.0,
    opDirection: "up"
  });

  const changeCircle = (circle, setCircle) => {
    if (circle.opDirection === "down" && circle.opacity > 0.2) {
      setCircle(prev => ({
        opacity: Number((prev.opacity - 0.03).toFixed(2)),
        opDirection: prev.opDirection
      }));
    } else if (circle.opDirection === "down" && circle.opacity <= 0.2) {
      setCircle(prev => ({
        opacity: prev.opacity,
        opDirection: "up"
      }));
    } else if (circle.opDirection === "up" && circle.opacity < 1.0) {
      setCircle(prev => ({
        opacity: Number((prev.opacity + 0.03).toFixed(2)),
        opDirection: prev.opDirection
      }));
    } else if (circle.opDirection === "up" && circle.opacity >= 1) {
      setCircle(prev => ({
        opacity: prev.opacity,
        opDirection: "down"
      }));
    }
  };

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setTimeout(() => changeCircle(yellowСircle, setYellowСircle), 35);
  }, [yellowСircle]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setTimeout(() => changeCircle(pinkСircle, setPinkСircle), 35);
  }, [pinkСircle]);
  return __jsx("div", {
    style: {
      background: `rgba(255, 249, 245, ${pinkСircle.opacity})`
    },
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button,
    onClick: () => console.log("Video"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: undefined
  }, __jsx("div", {
    style: {
      background: `rgba(255, 207, 13, ${yellowСircle.opacity})`
    },
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_yellow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: undefined
  }, __jsx("div", {
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_bg,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: undefined
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (VideoButton);

/***/ }),

/***/ "./src/components/sections/Header/Content/VideoButton/VideoButton.module.css":
/*!***********************************************************************************!*\
  !*** ./src/components/sections/Header/Content/VideoButton/VideoButton.module.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".Jw1YrivAMa1ZgQtkmCJBo {\n  width: 80px;\n  height: 80px;\n  /* background: #fff9f5; */\n  border-radius: 40px;\n  display: inline-block;\n  cursor: pointer;\n}\n\n.OxV8J_BMeO3tokAICc8JY {\n  width: 54px;\n  height: 54px;\n  /* background: #ffcf0d; */\n  border-radius: 40px;\n  margin: 13px auto;\n  position: relative;\n}\n.rNng5fjQdei4Wu-4FqcZ4 {\n  width: 38px;\n  height: 38px;\n  background-image: url(\"/static/images/video-button-bg.png\");\n  border-radius: 40px;\n  position: absolute;\n  top: 8px;\n  left: 8px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Content/VideoButton/VideoButton.module.css"],"names":[],"mappings":"AAAA;EACE,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,oBAAoB;EACpB,sBAAsB;EACtB,gBAAgB;CACjB;;AAED;EACE,YAAY;EACZ,aAAa;EACb,0BAA0B;EAC1B,oBAAoB;EACpB,kBAAkB;EAClB,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,aAAa;EACb,4DAA4D;EAC5D,oBAAoB;EACpB,mBAAmB;EACnB,SAAS;EACT,UAAU;CACX","file":"VideoButton.module.css","sourcesContent":[".get_video__button {\n  width: 80px;\n  height: 80px;\n  /* background: #fff9f5; */\n  border-radius: 40px;\n  display: inline-block;\n  cursor: pointer;\n}\n\n.get_video__button_yellow {\n  width: 54px;\n  height: 54px;\n  /* background: #ffcf0d; */\n  border-radius: 40px;\n  margin: 13px auto;\n  position: relative;\n}\n.get_video__button_bg {\n  width: 38px;\n  height: 38px;\n  background-image: url(\"/static/images/video-button-bg.png\");\n  border-radius: 40px;\n  position: absolute;\n  top: 8px;\n  left: 8px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"get_video__button": "Jw1YrivAMa1ZgQtkmCJBo",
	"get_video__button_yellow": "OxV8J_BMeO3tokAICc8JY",
	"get_video__button_bg": "rNng5fjQdei4Wu-4FqcZ4"
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
  }), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, __jsx("div", {
    className: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/prop-1.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }, "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u043E\u0434 \u0440\u0430\u0437\u043C\u0435\u0440 \u0412\u0430\u0448\u0435\u0439 \u043A\u0443\u0445\u043D\u0438 \u0437\u0430 72 \u0447\u0430\u0441\u0430;")), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }, __jsx("div", {
    className: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/prop-2.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F 5 \u043B\u0435\u0442;")), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: undefined
  }, __jsx("div", {
    className: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/prop-3.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: undefined
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  }, "\u0411\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0435 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: undefined
  }), " \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0432\u0435\u0442\u043E\u043C;")), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: undefined
  }, __jsx("div", {
    className: "icon1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/prop-4.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: undefined
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, " \u042D\u043A\u0441\u043A\u043B\u044E\u0437\u0438\u0432\u043D\u043E\u0441\u0442\u044C."))));
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
exports.push([module.i, "._1UYzSw_ddStvhkZjUVOo7y {\n  height: 740px;\n}\n.Zr1fwkeaTJFonWLdkKucE {\n  display: flex;\n  justify-content: flex-start;\n}\n\n._31WzPc3o1QZXRh1l5nucmN {\n  display: flex;\n  justify-content: center;\n  width: 302px;\n  height: 97px;\n  align-items: center;\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  text-transform: uppercase;\n  border: 1px solid #edf1f2;\n  border-right: none;\n}\n._31WzPc3o1QZXRh1l5nucmN:last-child {\n  border-right: 1px solid #edf1f2;\n}\n\n._31WzPc3o1QZXRh1l5nucmN div {\n  margin-left: 14px;\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Header/Header.module.css"],"names":[],"mappings":"AAAA;EACE,cAAc;CACf;AACD;EACE,cAAc;EACd,4BAA4B;CAC7B;;AAED;EACE,cAAc;EACd,wBAAwB;EACxB,aAAa;EACb,aAAa;EACb,oBAAoB;EACpB,gBAAgB;EAChB,0BAA0B;EAC1B,0BAA0B;EAC1B,0BAA0B;EAC1B,mBAAmB;CACpB;AACD;EACE,gCAAgC;CACjC;;AAED;EACE,kBAAkB;CACnB","file":"Header.module.css","sourcesContent":[".header {\n  height: 740px;\n}\n.header__props {\n  display: flex;\n  justify-content: flex-start;\n}\n\n.header__props_prop {\n  display: flex;\n  justify-content: center;\n  width: 302px;\n  height: 97px;\n  align-items: center;\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  text-transform: uppercase;\n  border: 1px solid #edf1f2;\n  border-right: none;\n}\n.header__props_prop:last-child {\n  border-right: 1px solid #edf1f2;\n}\n\n.header__props_prop div {\n  margin-left: 14px;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"header": "_1UYzSw_ddStvhkZjUVOo7y",
	"header__props": "Zr1fwkeaTJFonWLdkKucE",
	"header__props_prop": "_31WzPc3o1QZXRh1l5nucmN"
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

/***/ "./src/components/sections/Portfolio/Portfolio.jsx":
/*!*********************************************************!*\
  !*** ./src/components/sections/Portfolio/Portfolio.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Portfolio.module.css */ "./src/components/sections/Portfolio/Portfolio.module.css");
/* harmony import */ var _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/maximas/projects/fulogy-tz-2/src/components/sections/Portfolio/Portfolio.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



const Portfolio = props => {
  return __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.portfolio,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: undefined
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.portfolio__inner_wrapper,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: undefined
  }, __jsx("p", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.inner_wrapper__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: undefined
  }, "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0438:"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.inner_wrapper__works,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: undefined
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: undefined
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/work-item-1.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: undefined
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: undefined
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 3,49 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: undefined
  }, "\u0414\u043B\u0438\u043D\u0430: 1,2 \u043C. + 1,86 \u043C. + 0,4\u043C;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: undefined
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }, "5016 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: undefined
  }, "\u0440\u0443\u0431.")))), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: undefined
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/work-item-2.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: undefined
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: undefined
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 3,9 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: undefined
  }, "\u0414\u043B\u0438\u043D\u0430: 1,33 \u043C. + 1,57 \u043C. + 0,9\u043C;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: undefined
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: undefined
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: undefined
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: undefined
  }, "7975 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: undefined
  }, "\u0440\u0443\u0431.")))), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: undefined
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/work-item-3.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: undefined
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: undefined
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 3,47 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: undefined
  }, "\u0414\u043B\u0438\u043D\u0430: 1,54 \u043C. + 1,03 \u043C. + 0,9\u043C;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: undefined
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: undefined
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: undefined
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: undefined
  }, "8176 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: undefined
  }, "\u0440\u0443\u0431.")))), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: undefined
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: undefined
  }, __jsx("img", {
    src: "/static/images/work-item-4.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: undefined
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: undefined
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 4,55 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: undefined
  }, "\u0414\u043B\u0438\u043D\u0430: 1,05 \u043C. + 2,1 \u043C. + 1,4\u043C."), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: undefined
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: undefined
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: undefined
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: undefined
  }, "12837 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: undefined
  }, "\u0440\u0443\u0431.")))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Portfolio);

/***/ }),

/***/ "./src/components/sections/Portfolio/Portfolio.module.css":
/*!****************************************************************!*\
  !*** ./src/components/sections/Portfolio/Portfolio.module.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "._1dloP2T5epKEfPFoTgGQQq {\n  height: 665px;\n  margin-bottom: 100px;\n  background-color: #f8f7fd;\n}\n._1SzEY0eYC5u4OsOg-NBahO {\n  height: 505px;\n  padding-top: 50px;\n}\n._1PL6KMTl2V2aKEVxIQnmFT {\n  margin-top: 0;\n  font-family: \"MullerExtraBold\";\n  font-size: 30px;\n  text-transform: uppercase;\n}\n._1k3fnLEJedO00V4nJET0JZ {\n  display: flex;\n  justify-content: space-between;\n}\n._35-ajRnDCD3NSOOkJ2ONSg {\n  width: 276px;\n  background-color: #fff;\n  border: 1px solid #efeef4;\n  padding-left: 12px;\n  transition: box-shadow 0.4s linear;\n}\n._35-ajRnDCD3NSOOkJ2ONSg:hover {\n  box-shadow: 0 10px 25px 0 #e3d1ff;\n}\n.lmw9mttGjdZO3XoEsBvsn {\n  margin-top: 13px;\n}\n.tthiUD0qMbNbjH5xAinp {\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  text-transform: uppercase;\n  margin-top: 25px;\n  line-height: 1.4;\n  margin-bottom: 25px;\n}\n\n._35-ajRnDCD3NSOOkJ2ONSg p {\n  font-size: 18px;\n  margin-top: 20px;\n}\n\n._2aaae5z7_Z_G5hbYv03WSR {\n  margin-top: 40px;\n  margin-bottom: 30px;\n  font-size: 18px;\n}\n._2aaae5z7_Z_G5hbYv03WSR strong {\n  text-transform: uppercase;\n  font-family: \"MullerBold\";\n}\n", "", {"version":3,"sources":["/home/maximas/projects/fulogy-tz-2/src/components/sections/Portfolio/Portfolio.module.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,qBAAqB;EACrB,0BAA0B;CAC3B;AACD;EACE,cAAc;EACd,kBAAkB;CACnB;AACD;EACE,cAAc;EACd,+BAA+B;EAC/B,gBAAgB;EAChB,0BAA0B;CAC3B;AACD;EACE,cAAc;EACd,+BAA+B;CAChC;AACD;EACE,aAAa;EACb,uBAAuB;EACvB,0BAA0B;EAC1B,mBAAmB;EACnB,mCAAmC;CACpC;AACD;EACE,kCAAkC;CACnC;AACD;EACE,iBAAiB;CAClB;AACD;EACE,gBAAgB;EAChB,0BAA0B;EAC1B,0BAA0B;EAC1B,iBAAiB;EACjB,iBAAiB;EACjB,oBAAoB;CACrB;;AAED;EACE,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,iBAAiB;EACjB,oBAAoB;EACpB,gBAAgB;CACjB;AACD;EACE,0BAA0B;EAC1B,0BAA0B;CAC3B","file":"Portfolio.module.css","sourcesContent":[".portfolio {\n  height: 665px;\n  margin-bottom: 100px;\n  background-color: #f8f7fd;\n}\n.portfolio__inner_wrapper {\n  height: 505px;\n  padding-top: 50px;\n}\n.inner_wrapper__label {\n  margin-top: 0;\n  font-family: \"MullerExtraBold\";\n  font-size: 30px;\n  text-transform: uppercase;\n}\n.inner_wrapper__works {\n  display: flex;\n  justify-content: space-between;\n}\n.work_item {\n  width: 276px;\n  background-color: #fff;\n  border: 1px solid #efeef4;\n  padding-left: 12px;\n  transition: box-shadow 0.4s linear;\n}\n.work_item:hover {\n  box-shadow: 0 10px 25px 0 #e3d1ff;\n}\n.work_item__img {\n  margin-top: 13px;\n}\n.work_item__label {\n  font-size: 16px;\n  font-family: \"MullerBold\";\n  text-transform: uppercase;\n  margin-top: 25px;\n  line-height: 1.4;\n  margin-bottom: 25px;\n}\n\n.work_item p {\n  font-size: 18px;\n  margin-top: 20px;\n}\n\n.work_item__price {\n  margin-top: 40px;\n  margin-bottom: 30px;\n  font-size: 18px;\n}\n.work_item__price strong {\n  text-transform: uppercase;\n  font-family: \"MullerBold\";\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"portfolio": "_1dloP2T5epKEfPFoTgGQQq",
	"portfolio__inner_wrapper": "_1SzEY0eYC5u4OsOg-NBahO",
	"inner_wrapper__label": "_1PL6KMTl2V2aKEVxIQnmFT",
	"inner_wrapper__works": "_1k3fnLEJedO00V4nJET0JZ",
	"work_item": "_35-ajRnDCD3NSOOkJ2ONSg",
	"work_item__img": "lmw9mttGjdZO3XoEsBvsn",
	"work_item__label": "tthiUD0qMbNbjH5xAinp",
	"work_item__price": "_2aaae5z7_Z_G5hbYv03WSR"
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