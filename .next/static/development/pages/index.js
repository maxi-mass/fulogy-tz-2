(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["static/development/pages/index.js"],{

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/extract-css-chunks-webpack-plugin/dist/hmr/hotModuleReplacement.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/extract-css-chunks-webpack-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global document, window */
/* eslint func-names: 0 */
/* eslint no-var: 0 */
/* eslint vars-on-top: 0 */
/* eslint prefer-arrow-func: 0 */
/* eslint prefer-rest-params: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint prefer-template: 0 */

var normalizeUrl = __webpack_require__(/*! normalize-url */ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/normalize-url/index.js");

var srcByModuleId = Object.create(null);

var noDocument = typeof document === 'undefined';

var forEach = Array.prototype.forEach;

function debounce(fn, time) {
  var timeout = 0;

  // eslint-disable-next-line func-names
  return function () {
    var self = this;
    var args = arguments;

    // eslint-disable-next-line prefer-rest-params
    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}

function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src = document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName('script');
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }
    srcByModuleId[moduleId] = src;
  }

  return function (fileMap) {
    if (!src) {
      return null;
    }
    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];
    if (!filename) {
      return [src.replace('.js', '.css')];
    }
    if (!fileMap) {
      return [src.replace('.js', '.css')];
    }
    return fileMap.split(',').map(function (mapRule) {
      var reg = new RegExp(filename + '\\.js$', 'g');
      return normalizeUrl(src.replace(reg, mapRule.replace(/{fileName}/g, filename) + '.css'), { stripWWW: false });
    });
  };
}

function updateCss(el, url) {
  if (!url) {
    url = el.href.split('?')[0];
  }
  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }
  if (!url || !(url.indexOf('.css') > -1)) return;

  el.visited = true;
  var newEl = el.cloneNode(); // eslint-disable-line vars-on-top

  newEl.isLoaded = false;

  newEl.addEventListener('load', function () {
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });

  newEl.addEventListener('error', function () {
    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });

  newEl.href = url + '?' + Date.now();
  el.parentNode.appendChild(newEl);
}

function getReloadUrl(href, src) {
  var ret;
  href = normalizeUrl(href, { stripWWW: false });
  // eslint-disable-next-line array-callback-return
  src.some(function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}

function reloadStyle(src) {
  var elements = document.querySelectorAll('link');
  var loaded = false;

  forEach.call(elements, function (el) {
    var url = getReloadUrl(el.href, src);

    if (el.visited === true) return;

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });

  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll('link');
  forEach.call(elements, function (el) {
    if (el.visited === true) return;
    updateCss(el);
  });
}

module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log('no window.document found, will not HMR CSS');
    return noop;
  }

  // eslint-disable-next-line vars-on-top
  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);
    if (reloaded && !options.reloadAll) {
      console.log('[HMR] css reload %s', src.join(' '));
    } else {
      console.log('[HMR] Reload all css');
      reloadAll();
    }
  }

  return debounce(update, 10);
};

/***/ }),

/***/ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/normalize-url/index.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/extract-css-chunks-webpack-plugin/node_modules/normalize-url/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const url = __webpack_require__(/*! url */ "./node_modules/native-url/dist/index.js");
const punycode = __webpack_require__(/*! punycode */ "./node_modules/punycode/punycode.js");
const queryString = __webpack_require__(/*! query-string */ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/query-string/index.js");
const prependHttp = __webpack_require__(/*! prepend-http */ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/prepend-http/index.js");
const sortKeys = __webpack_require__(/*! sort-keys */ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/sort-keys/index.js");

const DEFAULT_PORTS = {
	'http:': 80,
	'https:': 443,
	'ftp:': 21
};

// Protocols that always contain a `//`` bit
const slashedProtocol = {
	http: true,
	https: true,
	ftp: true,
	gopher: true,
	file: true,
	'http:': true,
	'https:': true,
	'ftp:': true,
	'gopher:': true,
	'file:': true
};

function testParameter(name, filters) {
	return filters.some(filter => filter instanceof RegExp ? filter.test(name) : filter === name);
}

module.exports = (str, opts) => {
	opts = Object.assign({
		normalizeProtocol: true,
		normalizeHttps: false,
		stripFragment: true,
		stripWWW: true,
		removeQueryParameters: [/^utm_\w+/i],
		removeTrailingSlash: true,
		removeDirectoryIndex: false,
		sortQueryParameters: true
	}, opts);

	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	const hasRelativeProtocol = str.startsWith('//');

	// Prepend protocol
	str = prependHttp(str.trim()).replace(/^\/\//, 'http://');

	const urlObj = url.parse(str);

	if (opts.normalizeHttps && urlObj.protocol === 'https:') {
		urlObj.protocol = 'http:';
	}

	if (!urlObj.hostname && !urlObj.pathname) {
		throw new Error('Invalid URL');
	}

	// Prevent these from being used by `url.format`
	delete urlObj.host;
	delete urlObj.query;

	// Remove fragment
	if (opts.stripFragment) {
		delete urlObj.hash;
	}

	// Remove default port
	const port = DEFAULT_PORTS[urlObj.protocol];
	if (Number(urlObj.port) === port) {
		delete urlObj.port;
	}

	// Remove duplicate slashes
	if (urlObj.pathname) {
		urlObj.pathname = urlObj.pathname.replace(/\/{2,}/g, '/');
	}

	// Decode URI octets
	if (urlObj.pathname) {
		urlObj.pathname = decodeURI(urlObj.pathname);
	}

	// Remove directory index
	if (opts.removeDirectoryIndex === true) {
		opts.removeDirectoryIndex = [/^index\.[a-z]+$/];
	}

	if (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length > 0) {
		let pathComponents = urlObj.pathname.split('/');
		const lastComponent = pathComponents[pathComponents.length - 1];

		if (testParameter(lastComponent, opts.removeDirectoryIndex)) {
			pathComponents = pathComponents.slice(0, pathComponents.length - 1);
			urlObj.pathname = pathComponents.slice(1).join('/') + '/';
		}
	}

	// Resolve relative paths, but only for slashed protocols
	if (slashedProtocol[urlObj.protocol]) {
		const domain = urlObj.protocol + '//' + urlObj.hostname;
		const relative = url.resolve(domain, urlObj.pathname);
		urlObj.pathname = relative.replace(domain, '');
	}

	if (urlObj.hostname) {
		// IDN to Unicode
		urlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();

		// Remove trailing dot
		urlObj.hostname = urlObj.hostname.replace(/\.$/, '');

		// Remove `www.`
		if (opts.stripWWW) {
			urlObj.hostname = urlObj.hostname.replace(/^www\./, '');
		}
	}

	// Remove URL with empty query string
	if (urlObj.search === '?') {
		delete urlObj.search;
	}

	const queryParameters = queryString.parse(urlObj.search);

	// Remove query unwanted parameters
	if (Array.isArray(opts.removeQueryParameters)) {
		for (const key in queryParameters) {
			if (testParameter(key, opts.removeQueryParameters)) {
				delete queryParameters[key];
			}
		}
	}

	// Sort query parameters
	if (opts.sortQueryParameters) {
		urlObj.search = queryString.stringify(sortKeys(queryParameters));
	}

	// Decode query parameters
	if (urlObj.search !== null) {
		urlObj.search = decodeURIComponent(urlObj.search);
	}

	// Take advantage of many of the Node `url` normalizations
	str = url.format(urlObj);

	// Remove ending `/`
	if (opts.removeTrailingSlash || urlObj.pathname === '/') {
		str = str.replace(/\/$/, '');
	}

	// Restore relative protocol, if applicable
	if (hasRelativeProtocol && !opts.normalizeProtocol) {
		str = str.replace(/^http:\/\//, '//');
	}

	return str;
};


/***/ }),

/***/ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/prepend-http/index.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/extract-css-chunks-webpack-plugin/node_modules/prepend-http/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (url, opts) => {
	if (typeof url !== 'string') {
		throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof url}\``);
	}

	url = url.trim();
	opts = Object.assign({https: false}, opts);

	if (/^\.*\/|^(?!localhost)\w+:/.test(url)) {
		return url;
	}

	return url.replace(/^(?!(?:\w+:)?\/\/)/, opts.https ? 'https://' : 'http://');
};


/***/ }),

/***/ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/query-string/index.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/extract-css-chunks-webpack-plugin/node_modules/query-string/index.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/next/dist/build/polyfills/object-assign.js");
var decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),

/***/ "./node_modules/extract-css-chunks-webpack-plugin/node_modules/sort-keys/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/extract-css-chunks-webpack-plugin/node_modules/sort-keys/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isPlainObj = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js");

module.exports = (obj, opts) => {
	if (!isPlainObj(obj)) {
		throw new TypeError('Expected a plain object');
	}

	opts = opts || {};

	// DEPRECATED
	if (typeof opts === 'function') {
		throw new TypeError('Specify the compare function as an option instead');
	}

	const deep = opts.deep;
	const seenInput = [];
	const seenOutput = [];

	const sortKeys = x => {
		const seenIndex = seenInput.indexOf(x);

		if (seenIndex !== -1) {
			return seenOutput[seenIndex];
		}

		const ret = {};
		const keys = Object.keys(x).sort(opts.compare);

		seenInput.push(x);
		seenOutput.push(ret);

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const val = x[key];

			if (deep && Array.isArray(val)) {
				const retArr = [];

				for (let j = 0; j < val.length; j++) {
					retArr[j] = isPlainObj(val[j]) ? sortKeys(val[j]) : val[j];
				}

				ret[key] = retArr;
				continue;
			}

			ret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;
		}

		return ret;
	};

	return sortKeys(obj);
};


/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};


/***/ }),

/***/ "./node_modules/native-url/dist/index.js":
/*!***********************************************!*\
  !*** ./node_modules/native-url/dist/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var e,t=(e=__webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js"))&&"object"==typeof e&&"default"in e?e.default:e,r=/https?|ftp|gopher|file/;function o(e){"string"==typeof e&&(e=f(e));var o=function(e,t,r){var o=e.auth,a=e.hostname,s=e.protocol||"",h=e.pathname||"",c=e.hash||"",p=e.query||"",n=!1;o=o?encodeURIComponent(o).replace(/%3A/i,":")+"@":"",e.host?n=o+e.host:a&&(n=o+(~a.indexOf(":")?"["+a+"]":a),e.port&&(n+=":"+e.port)),p&&"object"==typeof p&&(p=t.encode(p));var l=e.search||p&&"?"+p||"";return s&&":"!==s.substr(-1)&&(s+=":"),e.slashes||(!s||r.test(s))&&!1!==n?(n="//"+(n||""),h&&"/"!==h[0]&&(h="/"+h)):n||(n=""),c&&"#"!==c[0]&&(c="#"+c),l&&"?"!==l[0]&&(l="?"+l),{protocol:s,host:n,pathname:h=h.replace(/[?#]/g,encodeURIComponent),search:l=l.replace("#","%23"),hash:c}}(e,t,r);return""+o.protocol+o.host+o.pathname+o.search+o.hash}var a="http://",s="w.w",h=a+s,c=/^https?|ftp|gopher|file/,p=/^(.+?)([#?].*)/,n=/^([a-z0-9.+-]*:)(\/{0,3})(.*)/i,l=/^([a-z0-9.+-]*:)?\/\/\/*/i,i=/^([a-z0-9.+-]*:)(\/{0,2})\[(.*)\]$/i;function u(e){try{return decodeURI(e)}catch(t){return e}}function f(e,r,a){void 0===r&&(r=!1),void 0===a&&(a=!1);var f=(e=u(e.trim())).match(p);e=f?f[1].replace(/\\/g,"/")+f[2]:e.replace(/\\/g,"/"),i.test(e)&&"/"!==e.slice(-1)&&(e+="/");var m=!/(^javascript)/.test(e)&&e.match(n),v=l.test(e),d="";m&&(c.test(m[1])||(d=m[1].toLowerCase(),e=""+m[2]+m[3]),m[2]||(v=!1,c.test(m[1])?(d=m[1],e=""+m[3]):e="//"+m[3]),3!==m[2].length&&1!==m[2].length||(d=m[1],e="/"+m[3]));var g,b=e.match(/(:[0-9]+)/),y="";b&&b[1]&&3===b[1].length&&(e=e.replace(y=b[1],y+"00"));var x={},w="",O="";try{g=new URL(e)}catch(t){w=t,d||a||!/^\/\//.test(e)||/^\/\/.+[@.]/.test(e)||(O="/",e=e.substr(1));try{g=new URL(e,h)}catch(e){return x.protocol=d,x.href=d,x}}x.slashes=v&&!O,x.host=~g.host.indexOf(s)?"":g.host,x.hostname=~g.hostname.indexOf(s)?"":g.hostname.replace(/(\[|\])/g,""),x.protocol=w?d||null:g.protocol,x.search=g.search.replace(/\\/g,"%5C"),x.hash=g.hash.replace(/\\/g,"%5C");var R=e.split("#");!x.search&&~R[0].indexOf("?")&&(x.search="?"),x.hash||""!==R[1]||(x.hash="#"),x.query=r?t.decode(g.search.substr(1)):x.search.substr(1),x.pathname=O+u(g.pathname).replace(/"/g,"%22"),"about:"===x.protocol&&"blank"===x.pathname&&(x.protocol="",x.pathname=""),w&&"/"!==e[0]&&(x.pathname=x.pathname.substr(1)),d&&!c.test(d)&&"/"!==e.slice(-1)&&"/"===x.pathname&&(x.pathname=""),x.path=x.pathname+x.search,x.auth=[g.username,g.password].map(decodeURIComponent).filter(Boolean).join(":"),x.port=g.port,y&&(x.host=x.host.replace(y+"00",y),x.port=x.port.slice(0,-2)),x.href=O?""+x.pathname+x.search+x.hash:o(x);var U=/^(file)/.test(x.href)?["host","hostname"]:[];return Object.keys(x).forEach(function(e){~U.indexOf(e)||(x[e]=x[e]||null)}),x}var m=/^([a-z0-9.+-]*:\/\/\/)([a-z0-9.+-]:\/*)?/i,v=/https?|ftp|gopher|file/;function d(e,t){var r="string"==typeof e?f(e):e;e="object"==typeof e?o(e):e;var s=f(t),c="";r.protocol&&!r.slashes&&(c=r.protocol,e=e.replace(r.protocol,""),c+="/"===t[0]||"/"===e[0]?"/":""),c&&s.protocol&&(c="",s.slashes||(c=s.protocol,t=t.replace(s.protocol,"")));var p=e.match(m);p&&!s.protocol&&(e=e.substr((c=p[1]+(p[2]||"")).length),/^\/\/[^\/]/.test(t)&&(c=c.slice(0,-1)));var n=new URL(e,h+"/"),l=new URL(t,n).toString().replace(h,""),i=s.protocol||r.protocol;return i+=r.slashes||s.slashes?"//":"",!c&&i?l=l.replace(a,i):c&&(l=l.replace(a,"")),v.test(l)||~t.indexOf(".")||"/"===e.slice(-1)||"/"===t.slice(-1)||"/"!==l.slice(-1)||(l=l.slice(0,-1)),c&&(l=c+("/"===l[0]?l.substr(1):l)),l}exports.parse=f,exports.format=o,exports.resolve=d,exports.resolveObject=function(e,t){return f(d(e,t))};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/next/dist/build/polyfills/object-assign.js":
/*!***********************************************************************************************************************!*\
  !*** delegated ./node_modules/next/dist/build/polyfills/object-assign.js from dll-reference dll_ef0ff7c60362f24a921f ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_ef0ff7c60362f24a921f */ "dll-reference dll_ef0ff7c60362f24a921f"))("./node_modules/next/dist/build/polyfills/object-assign.js");

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fuser%2Fwork%2Fprojects%2Ffulogy-tz-2%2Fpages%2Findex.js!./":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fuser%2Fwork%2Fprojects%2Ffulogy-tz-2%2Fpages%2Findex.js ***!
  \******************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/", function() {
      var mod = __webpack_require__(/*! ./pages/index.js */ "./pages/index.js")
      if(true) {
        module.hot.accept(/*! ./pages/index.js */ "./pages/index.js", function() {
          if(!next.router.components["/"]) return
          var updatedPage = __webpack_require__(/*! ./pages/index.js */ "./pages/index.js")
          next.router.update("/", updatedPage)
        })
      }
      return mod
    }]);
  

/***/ }),

/***/ "./node_modules/punycode/punycode.js":
/*!*******************************************!*\
  !*** ./node_modules/punycode/punycode.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference dll_ef0ff7c60362f24a921f ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference dll_ef0ff7c60362f24a921f */ "dll-reference dll_ef0ff7c60362f24a921f"))("./node_modules/react/index.js");

/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_components_Wrapper_Wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/components/Wrapper/Wrapper */ "./src/components/Wrapper/Wrapper.jsx");
/* harmony import */ var _src_components_sections_Header_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/components/sections/Header/Header */ "./src/components/sections/Header/Header.jsx");
/* harmony import */ var _src_components_sections_Features_Features__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/components/sections/Features/Features */ "./src/components/sections/Features/Features.jsx");
/* harmony import */ var _src_components_sections_Portfolio_Portfolio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/components/sections/Portfolio/Portfolio */ "./src/components/sections/Portfolio/Portfolio.jsx");
/* harmony import */ var _src_components_sections_Slider_Slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/components/sections/Slider/Slider */ "./src/components/sections/Slider/Slider.jsx");
/* harmony import */ var _src_components_sections_AboutPrice_AboutPrice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/components/sections/AboutPrice/AboutPrice */ "./src/components/sections/AboutPrice/AboutPrice.jsx");
/* harmony import */ var _src_components_sections_LampConstructor_LampConstructor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/components/sections/LampConstructor/LampConstructor */ "./src/components/sections/LampConstructor/LampConstructor.jsx");
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/pages/index.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;









var Index = function Index() {
  return __jsx(_src_components_Wrapper_Wrapper__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, __jsx(_src_components_sections_Header_Header__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }), __jsx(_src_components_sections_Features_Features__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }), __jsx(_src_components_sections_Portfolio_Portfolio__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }), __jsx(_src_components_sections_Slider_Slider__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }), __jsx(_src_components_sections_AboutPrice_AboutPrice__WEBPACK_IMPORTED_MODULE_6__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wrapper.module.css */ "./src/components/Wrapper/Wrapper.module.css");
/* harmony import */ var _Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/Wrapper/Wrapper.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var Wrapper = function Wrapper(props) {
  return __jsx("div", {
    className: _Wrapper_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.main_wrapper,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, props.children);
};

/* harmony default export */ __webpack_exports__["default"] = (Wrapper);

/***/ }),

/***/ "./src/components/common/Button/Button.jsx":
/*!*************************************************!*\
  !*** ./src/components/common/Button/Button.jsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Button.module.css */ "./src/components/common/Button/Button.module.css");
/* harmony import */ var _Button_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Button_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/common/Button/Button.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var Button = function Button(props) {
  return __jsx("button", {
    className: _Button_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.button,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, props.children);
};

/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),

/***/ "./src/components/sections/AboutPrice/AboutPrice.jsx":
/*!***********************************************************!*\
  !*** ./src/components/sections/AboutPrice/AboutPrice.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AboutPrice_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AboutPrice.module.css */ "./src/components/sections/AboutPrice/AboutPrice.module.css");
/* harmony import */ var _AboutPrice_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_AboutPrice_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/AboutPrice/AboutPrice.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var AboutPrice = function AboutPrice(props) {
  return __jsx("div", {
    className: _AboutPrice_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.about_price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, __jsx("div", {
    className: _AboutPrice_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.about_price__inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, "\u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430,"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, "\u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0435\u0433\u043E \u043A \u0412\u0430\u0448\u0435\u043C\u0443 \u0434\u0438\u0437\u0430\u0439\u043D\u0443,", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }), " \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440\u043E\u043C \u0440\u0430\u0441\u0447\u0435\u0442\u0430 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438:")), __jsx("div", {
    className: _AboutPrice_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.about_price__arrow_down,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }), __jsx("div", {
    className: _AboutPrice_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.about_price__lamp_bg,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/lamp-bg.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (AboutPrice);

/***/ }),

/***/ "./src/components/sections/Features/Features.jsx":
/*!*******************************************************!*\
  !*** ./src/components/sections/Features/Features.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Features_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Features.module.css */ "./src/components/sections/Features/Features.module.css");
/* harmony import */ var _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Features_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/Button/Button */ "./src/components/common/Button/Button.jsx");
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Features/Features.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var Features = function Features(props) {
  return __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__header,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, "\u0421\u0422\u041E\u0418\u041C\u041E\u0421\u0422\u042C"), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__desc,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u043E\u0433\u043E\u043D\u043D\u043E\u0433\u043E \u043C\u0435\u0442\u0440\u0430 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430 fulogy \u043E\u0442 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), __jsx("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, "2000"), " \u0440\u0443\u0431."), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "\u0412 \u0446\u0435\u043D\u0443 \u0432\u0445\u043E\u0434\u0438\u0442:"), __jsx(_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A"), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__phone,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "\u0438\u043B\u0438 \u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443:", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }), __jsx("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "+7-(800)-505-65-33")), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__social,
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
  }, __jsx("img", {
    src: "/static/images/whatsapp.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/viber.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  })), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/telega.svg",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }))), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left_inner__arrow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  })), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__left__quotes,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  })), __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: this
  }, __jsx("table", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, __jsx("tr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: this
  }, "01"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, "\u0411\u043B\u043E\u043A \u043F\u0438\u0442\u0430\u043D\u0438\u044F ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }), " (\u043D\u0435 \u0441\u0432\u0438\u0441\u0442\u0438\u0442, ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }), " \u043D\u0435 \u0436\u0443\u0436\u0436\u0438\u0442);"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "02"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u043E\u0435 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }), " \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }), " \u0434\u043B\u044F \u0412\u0430\u0448\u0435\u0439 \u043A\u0443\u0445\u043D\u0438;"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, "03"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, "\u0421\u0435\u043D\u0441\u043E\u0440 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }), " \u0441\u0432\u0435\u0442\u043E\u043C \u043E\u0447\u0435\u043D\u044C \u0443\u0434\u043E\u0431\u043D\u044B\u0439, ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }), "\u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u043D\u044B\u0439 \u0438 \u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0439;")))), __jsx("tr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }, "04"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }, "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F 5 \u043B\u0435\u0442;"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }, "05"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, "\u0414\u0435\u043C\u043E\u043D\u0442\u0430\u0436 \u0441\u0442\u0430\u0440\u044B\u0445 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }), " \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u043E\u0432 \u0438 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }), " \u043C\u043E\u043D\u0442\u0430\u0436 \u043D\u0430\u0448\u0438\u0445;"))), __jsx("td", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.features__right_inner__feature,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }, __jsx("div", {
    className: _Features_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.feature_number,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  }, "06"), __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, "\u0421\u0432\u0435\u0442\u043E\u0434\u0438\u043E\u0434\u044B \u0432\u044B\u0441\u043E\u043A\u043E\u0439 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }), " \u0446\u0432\u0435\u0442\u043E\u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }), "\u0441\u0432\u0435\u0442 \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u043D\u044B\u043C \u043A ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: this
  }), " \u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043E\u043C\u0443 \u0441\u043E\u043B\u043D\u0435\u0447\u043D\u043E\u043C\u0443 \u0446\u0432\u0435\u0442\u0443."))))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Features);

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
/* harmony import */ var _LampSlider_LampSlider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LampSlider/LampSlider */ "./src/components/sections/Header/Content/LampSlider/LampSlider.jsx");
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Header/Content/Content.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






var Content = function Content(props) {
  return __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__content,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "\u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u043D\u0441\u043E\u0440\u043D\u044B\u0435 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0438 \u0434\u043B\u044F \u043A\u0443\u0445\u043D\u0438"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, "8 \u043B\u0435\u0442"), " \u043E\u0441\u043D\u0430\u0449\u0430\u0435\u043C \u0412\u0430\u0448\u0438 \u043A\u0443\u0445\u043D\u0438 \u043D\u0430\u0448\u0438\u043C\u0438 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u043C\u0438 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }), " \u043F\u043E \u0446\u0435\u043D\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F."), __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_left__get_video,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, __jsx("div", {
    className: _Content_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__info,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435"), " \u0432\u0438\u0434\u0435\u043E\u043F\u0440\u0435\u0437\u0435\u043D\u0442\u0430\u0446\u0438\u044E", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }), " \u043E \u043D\u0430\u0448\u0438\u0445 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0430\u0445!"), __jsx(_VideoButton_VideoButton__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  })), __jsx(_common_Button_Button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "\u043E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440")), __jsx(_LampSlider_LampSlider__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Content);

/***/ }),

/***/ "./src/components/sections/Header/Content/LampSlider/LampSlider.jsx":
/*!**************************************************************************!*\
  !*** ./src/components/sections/Header/Content/LampSlider/LampSlider.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LampSlider.module.css */ "./src/components/sections/Header/Content/LampSlider/LampSlider.module.css");
/* harmony import */ var _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Header/Content/LampSlider/LampSlider.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var LampSlider = function LampSlider(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])("gold"),
      lampColor = _useState[0],
      setLampColor = _useState[1];

  return __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__switch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_group,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __jsx("div", {
    onClick: function onClick() {
      return setLampColor("gold");
    },
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gold,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("white");
    },
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_white,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("black");
    },
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_black,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }), __jsx("div", {
    onClick: function onClick() {
      return setLampColor("gray");
    },
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.switch_gray,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }))), __jsx("img", {
    src: "/static/images/man.png",
    alt: "man",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }), __jsx("div", {
    className: _LampSlider_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.content_right__lamp_variant,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/lamp-".concat(lampColor, ".png"),
    alt: "lamp",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (LampSlider);

/***/ }),

/***/ "./src/components/sections/Header/Content/VideoButton/VideoButton.jsx":
/*!****************************************************************************!*\
  !*** ./src/components/sections/Header/Content/VideoButton/VideoButton.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoButton.module.css */ "./src/components/sections/Header/Content/VideoButton/VideoButton.module.css");
/* harmony import */ var _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Header/Content/VideoButton/VideoButton.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var VideoButton = function VideoButton(props) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    opacity: 1.0,
    opDirection: "down"
  }),
      yellowСircle = _useState[0],
      setYellowСircle = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    opacity: 0.0,
    opDirection: "up"
  }),
      pinkСircle = _useState2[0],
      setPinkСircle = _useState2[1];

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

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setTimeout(function () {
      return changeCircle(yellowСircle, setYellowСircle);
    }, 35);
  }, [yellowСircle]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    setTimeout(function () {
      return changeCircle(pinkСircle, setPinkСircle);
    }, 35);
  }, [pinkСircle]);
  return __jsx("div", {
    style: {
      background: "rgba(255, 249, 245, ".concat(pinkСircle.opacity, ")")
    },
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button,
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
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_yellow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, __jsx("div", {
    className: _VideoButton_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.get_video__button_bg,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (VideoButton);

/***/ }),

/***/ "./src/components/sections/Header/Header.jsx":
/*!***************************************************!*\
  !*** ./src/components/sections/Header/Header.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header.module.css */ "./src/components/sections/Header/Header.module.css");
/* harmony import */ var _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Header_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Navbar/Navbar */ "./src/components/sections/Header/Navbar/Navbar.jsx");
/* harmony import */ var _Content_Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Content/Content */ "./src/components/sections/Header/Content/Content.jsx");
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Header/Header.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;





var Header = function Header() {
  return __jsx("header", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, __jsx(_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }), __jsx(_Content_Content__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, __jsx("div", {
    className: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/prop-1.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u043F\u043E\u0434 \u0440\u0430\u0437\u043C\u0435\u0440 \u0412\u0430\u0448\u0435\u0439 \u043A\u0443\u0445\u043D\u0438 \u0437\u0430 72 \u0447\u0430\u0441\u0430;")), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, __jsx("div", {
    className: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/prop-2.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F 5 \u043B\u0435\u0442;")), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, __jsx("div", {
    className: "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/prop-3.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "\u0411\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0435 ", __jsx("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), " \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0432\u0435\u0442\u043E\u043C;")), __jsx("div", {
    className: _Header_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__props_prop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  }, __jsx("div", {
    className: "icon1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/prop-4.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  })), __jsx("div", {
    className: "prop_desc",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, " \u042D\u043A\u0441\u043A\u043B\u044E\u0437\u0438\u0432\u043D\u043E\u0441\u0442\u044C."))));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/components/sections/Header/Navbar/Navbar.jsx":
/*!**********************************************************!*\
  !*** ./src/components/sections/Header/Navbar/Navbar.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navbar.module.css */ "./src/components/sections/Header/Navbar/Navbar.module.css");
/* harmony import */ var _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Navbar_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Header/Navbar/Navbar.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var Navbar = function Navbar(props) {
  return __jsx("div", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.header__navbar,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, __jsx("div", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.navbar__logo,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }), __jsx("nav", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.navbar__nav,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, "\u041E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, "\u041F\u043E\u0447\u0435\u043C\u0443 \u043C\u044B"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "\u041E\u0442\u0437\u044B\u0432\u044B"), __jsx("a", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.nav__link,
    href: "#",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C")), __jsx("div", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.navbar__phone,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, __jsx("span", {
    className: _Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.phone__text,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A"), __jsx("span", {
    className: "".concat(_Navbar_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.phone__number, " purpure_text"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, "+7-(800)-505-65-33")));
};

/* harmony default export */ __webpack_exports__["default"] = (Navbar);

/***/ }),

/***/ "./src/components/sections/LampConstructor/LampConstructor.jsx":
/*!*********************************************************************!*\
  !*** ./src/components/sections/LampConstructor/LampConstructor.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LampConstructor_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LampConstructor.module.css */ "./src/components/sections/LampConstructor/LampConstructor.module.css");
/* harmony import */ var _LampConstructor_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_LampConstructor_module_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RangePicker_RangePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RangePicker/RangePicker */ "./src/components/sections/LampConstructor/RangePicker/RangePicker.jsx");
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/LampConstructor/LampConstructor.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;




var LampConstructor = function LampConstructor(props) {
  return __jsx("div", {
    className: _LampConstructor_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.lamp_constructor,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, __jsx("div", {
    className: _LampConstructor_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.lamp_constructor_inner,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, __jsx(_RangePicker_RangePicker__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (LampConstructor);

/***/ }),

/***/ "./src/components/sections/LampConstructor/RangePicker/RangePicker.jsx":
/*!*****************************************************************************!*\
  !*** ./src/components/sections/LampConstructor/RangePicker/RangePicker.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RangePicker_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RangePicker.module.css */ "./src/components/sections/LampConstructor/RangePicker/RangePicker.module.css");
/* harmony import */ var _RangePicker_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_RangePicker_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/LampConstructor/RangePicker/RangePicker.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var RangePicker = function RangePicker(props) {
  return __jsx("div", {
    className: _RangePicker_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.range_picker,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: this
  }, "RANGE PICKER");
};

/* harmony default export */ __webpack_exports__["default"] = (RangePicker);

/***/ }),

/***/ "./src/components/sections/Portfolio/Portfolio.jsx":
/*!*********************************************************!*\
  !*** ./src/components/sections/Portfolio/Portfolio.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Portfolio.module.css */ "./src/components/sections/Portfolio/Portfolio.module.css");
/* harmony import */ var _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/user/work/projects/fulogy-tz-2/src/components/sections/Portfolio/Portfolio.jsx";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;



var Portfolio = function Portfolio(props) {
  return __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.portfolio,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.portfolio__inner_wrapper,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: this
  }, __jsx("p", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.inner_wrapper__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0435 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A\u0438:"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.inner_wrapper__works,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/work-item-1.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 3,49 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: this
  }, "\u0414\u043B\u0438\u043D\u0430: 1,2 \u043C. + 1,86 \u043C. + 0,4\u043C;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }, "5016 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: this
  }, "\u0440\u0443\u0431.")))), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/work-item-2.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: this
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 3,9 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }, "\u0414\u043B\u0438\u043D\u0430: 1,33 \u043C. + 1,57 \u043C. + 0,9\u043C;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: this
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }, "7975 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: this
  }, "\u0440\u0443\u0431.")))), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/work-item-3.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 3,47 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "\u0414\u043B\u0438\u043D\u0430: 1,54 \u043C. + 1,03 \u043C. + 0,9\u043C;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  }, "8176 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, "\u0440\u0443\u0431.")))), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__img,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }, __jsx("img", {
    src: "/static/images/work-item-4.png",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  })), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__label,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: this
  }, "\u0423\u0433\u043B\u043E\u0432\u043E\u0439 \u0441\u0432\u0435\u0442\u0438\u043B\u044C\u043D\u0438\u043A 4,55 \u043C\u0435\u0442\u0440\u0430:"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: this
  }, "\u0414\u043B\u0438\u043D\u0430: 1,05 \u043C. + 2,1 \u043C. + 1,4\u043C."), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, "LED \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0441\u0432\u0435\u0442\u0430 LUX, \u0434\u043D\u0435\u0432\u043D\u043E\u0439;"), __jsx("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }, "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u0431\u0435\u0441\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 \u0434\u0438\u043C\u043C\u0435\u0440 (\u0441\u0435\u043D\u0441\u043E\u0440);"), __jsx("div", {
    className: _Portfolio_module_css__WEBPACK_IMPORTED_MODULE_1___default.a.work_item__price,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }, "\u0426\u0435\u043D\u0430:", " ", __jsx("span", {
    className: "purpure_text",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, "12837 ", __jsx("strong", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, "\u0440\u0443\u0431.")))))));
};

/* harmony default export */ __webpack_exports__["default"] = (Portfolio);

/***/ }),

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
  }, currentImage), " / 6"), __jsx("div", {
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

/***/ }),

/***/ 1:
/*!**********************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F&absolutePagePath=%2Fhome%2Fuser%2Fwork%2Fprojects%2Ffulogy-tz-2%2Fpages%2Findex.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2F&absolutePagePath=%2Fhome%2Fuser%2Fwork%2Fprojects%2Ffulogy-tz-2%2Fpages%2Findex.js! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F&absolutePagePath=%2Fhome%2Fuser%2Fwork%2Fprojects%2Ffulogy-tz-2%2Fpages%2Findex.js!./");


/***/ }),

/***/ "dll-reference dll_ef0ff7c60362f24a921f":
/*!*******************************************!*\
  !*** external "dll_ef0ff7c60362f24a921f" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dll_ef0ff7c60362f24a921f;

/***/ })

},[[1,"static/runtime/webpack.js","styles"]]]);
//# sourceMappingURL=index.js.map