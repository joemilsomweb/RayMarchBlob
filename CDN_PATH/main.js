/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/CDN_PATH/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/CDN_PATH/js/JRM_lib/JRM_gl_helper.js":
/*!**************************************************!*\
  !*** ./src/CDN_PATH/js/JRM_lib/JRM_gl_helper.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//utility class to handle webgl boilerplate\nconst GlHelper = {\n\n    \tcreateProgram : function(){\n\n    \t},\n    \n    \tcreatePositionBuffer : function(){\n\n    \t},\n    \n    \tcompileShader : function(glContext, shaderText, shaderType){\n\t\t\t   var shader = glContext.createShader(shaderType);\n\t  \t\tglContext.shaderSource(shader, shaderText);\n\t  \t\tglContext.compileShader(shader);\n\n\t\t\tif (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {\n    \t\t\tconsole.error('An error occurred compiling the shaders: ' + glContext.getShaderInfoLog(shader));\n    \t\t\tglContext.deleteShader(shader);\n    \t\t\treturn null;\n  \t\t\t}\n\n\t  \t\treturn shader;\n    \t},\n\n    \t//code from the mdn.\n    \tloadTexture : function(glContext, src){\n    \t\tvar texture = glContext.createTexture();\n    \t\tglContext.bindTexture(glContext.TEXTURE_2D, texture);\n\n    \t\tvar level = 0;\n  \t\t\tvar internalFormat = glContext.RGBA;\n  \t\t\tvar width = 1;\n  \t\t\tvar height = 1;\n  \t\t\tvar border = 0;\n  \t\t\tvar srcFormat = glContext.RGBA;\n  \t\t\tvar srcType = glContext.UNSIGNED_BYTE;\n\n  \t\t\tvar pixel = new Uint8Array([0, 0, 255, 255]);\n  \t\t\tglContext.texImage2D(glContext.TEXTURE_2D, level, internalFormat,\n                width, height, border, srcFormat, srcType,\n                pixel);\n\n  \t\t\tvar image = new Image();\n\n  \t\t\tvar self = this;\n\n  \t\t\timage.onload = function(){\n\t\t\t\tglContext.bindTexture(glContext.TEXTURE_2D, texture);\n\t\t\t    glContext.texImage2D(glContext.TEXTURE_2D, level, internalFormat,\n\t\t\t                  srcFormat, srcType, image);\n\n\t\t\t    if (self.isPowerOf2(image.width) && self.isPowerOf2(image.height)) {\n\t\t\t       glContext.generateMipmap(glContext.TEXTURE_2D);\n\t\t\t    } else {\n\t\t\t       glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);\n\t\t\t       glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);\n\t\t\t       glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.LINEAR);\n    \t\t\t}\t\n  \t\t\t};\n\n  \t\t\timage.src = src;\n\n    \t\treturn texture;\n    \t},\n\n    \tisPowerOf2 : function(value) {\n  \t\t\treturn (value & (value - 1)) == 0;\n\t\t},\n\n\t\tcreateAttributeBuffer : function(glContext, data, numComponents, type, attribPos){\n\t\t\t//create buffer\n\t\t\tvar buffer = glContext.createBuffer();\n\t\t\t//bind to an array buffer\n  \t\t\tglContext.bindBuffer(glContext.ARRAY_BUFFER, buffer);\n  \t\t\t//assign data to buffer\n  \t\t\tglContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(data), glContext.STATIC_DRAW);\n\n\t \t\tglContext.enableVertexAttribArray(attribPos);\n\n  \t\t\tglContext.vertexAttribPointer(\n\t\t\t\tattribPos,\n\t\t\t\tnumComponents,\n\t\t\t\ttype,\n\t\t\t\tfalse,\n\t\t\t\t0,\n\t\t\t\t0\n\t\t\t);\n\n  \t\t\treturn buffer;\n\t\t}\n  };\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GlHelper);\n\n//# sourceURL=webpack:///./src/CDN_PATH/js/JRM_lib/JRM_gl_helper.js?");

/***/ }),

/***/ "./src/CDN_PATH/js/main.js":
/*!*********************************!*\
  !*** ./src/CDN_PATH/js/main.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var JRM_lib_JRM_gl_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! JRM_lib/JRM_gl_helper */ \"./src/CDN_PATH/js/JRM_lib/JRM_gl_helper.js\");\n\n\nfunction loadData(path, success, error)\n{\n\tvar xhr = new XMLHttpRequest();\n\txhr.onreadystatechange = function()\n\t{\n\t\tif (xhr.readyState === XMLHttpRequest.DONE) {\n\t\t\tif (xhr.status === 200) {\n\t\t\t\tif (success)\n\t\t\t\t\tsuccess(xhr.responseText);\n\t\t\t} else {\n\t\t\t\tif (error)\n\t\t\t\t\terror(xhr);\n\t\t\t}\n\t\t}\n\t}\n\txhr.open(\"GET\", path, true);\n\txhr.send();\n}\n\n\n\nfunction onErr(error){\n\tconsole.error(\"Error loading shader \", error);\n}\n\nfunction loadShaders(vertexPath, fragmentPath, error){\n\tvar vertexShader;\n\tvar fragmentShader;\n\n\tvar onVertexLoadSuccess = function(result){\n\t\tvertexShader = result;\n\t\tloadData(fragmentPath, onFragmentLoadSuccess, error);\n\t}\n\n\tvar onFragmentLoadSuccess = function(result){\n\t\tfragmentShader = result;\n\t\tinit(vertexShader, fragmentShader);\n\t}\n\n\tloadData(vertexPath, onVertexLoadSuccess, error);\n}\n\nfunction init(vertexShader, fragmentShader){\n\tvar scene = new Scene({\n\t\tvertexShader : vertexShader,\n\t\tfragmentShader : fragmentShader,\n\t\tcanvas : document.getElementById(\"raymarchCanvas\")\n\t});\n\n\tscene.render(0);\n}\n\nvar SHAPE = {\n\tSQUARE : {\n\t\tvertices : {\n\t\t\tnumComponents : 2,\n\t\t\tdata : [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0],\n\t\t\ttype : \"FLOAT\"\n\t\t},\n\t\tuv : {\n\t\t\tnumComponents : 2,\n\t\t\tdata : [1.0, 1.0, 0, 1.0, 1.0, 0, 0, 0],\n\t\t\ttype : \"FLOAT\"\n\t\t}\n\t}\n};\n\nfunction Scene(options){\n\tthis.canvas = options.canvas;\n\tvar gl = this.canvas.getContext(\"webgl\");\n\n\tvar vertShader = JRM_lib_JRM_gl_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].compileShader(gl, options.vertexShader, gl.VERTEX_SHADER);\n\tvar fragShader = JRM_lib_JRM_gl_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].compileShader(gl, options.fragmentShader, gl.FRAGMENT_SHADER);\n\n\t  \t//create the program to use the shaders\n\t  \tvar program = gl.createProgram();\n\t  \tgl.attachShader(program, vertShader);\n\t  \tgl.attachShader(program, fragShader);\n\t  \tgl.linkProgram(program);\n\t  \tgl.useProgram(program);\n\n\t  \tgl.clearColor(0, 0, 0, 1);\n\t  \tgl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\n\n\t  \tvar programInfo = {\n\t  \t\tprogram: program,\n\t  \t\tattribLocations: {\n\t  \t\t\tposition: gl.getAttribLocation(program, 'position'),\n\t  \t\t\tuv: gl.getAttribLocation(program, 'uv')\n\t  \t\t},\n\t  \t\tuniformLocations: {\n\t  \t\t\ttime: gl.getUniformLocation(program, 'iTime'),\n\t  \t\t\tresolution: gl.getUniformLocation(program, 'iResolution'),\n\t  \t\t\tmouse: gl.getUniformLocation(program, 'iMouse'),\n\t  \t\t\tmainTex: gl.getUniformLocation(program, 'texture')\n\t  \t\t}\n\t  \t};\n\n\n\t\t//create buffer for square\n\t\tvar sqVData = SHAPE.SQUARE.vertices;\n\t\tvar positionBuffer = JRM_lib_JRM_gl_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createAttributeBuffer(gl, \n\t\t\tsqVData.data, \n\t\t\tsqVData.numComponents, \n\t\t\tgl[sqVData.type], \n\t\t\tprogramInfo.attribLocations.position\n\t\t\t);\n\t\t\n\t\t//buffer for uvs\n\t\tvar sqTexData = SHAPE.SQUARE.uv;\n\t\tvar textureBuffer = JRM_lib_JRM_gl_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createAttributeBuffer(\n\t\t\tgl, \n\t\t\tsqVData.data, \n\t\t\tsqVData.numComponents, \n\t\t\tgl[sqVData.type], \n\t\t\tprogramInfo.attribLocations.uv);\n\n\t\tgl.enable(gl.DEPTH_TEST);          \n\t\tgl.depthFunc(gl.LEQUAL); \n\n\t\tgl.enableVertexAttribArray(programInfo.attribLocations.position);\n\t\tgl.enableVertexAttribArray(programInfo.attribLocations.uv);\n\t\tgl.useProgram(programInfo.program);\n\n\t\tvar texture = JRM_lib_JRM_gl_helper__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadTexture(gl, \"images/norm2.jpg\");\n\n\t\tvar self = this;\n\n\t\tthis.render = function(time) {\n\t\t\tgl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\n\n\t\t\t//set uniforms\n\t\t\tgl.uniform1f(programInfo.uniformLocations.time, time/1000.);\n\t\t\tgl.uniform2fv(programInfo.uniformLocations.resolution, [self.canvas.width, self.canvas.height]);\n\t\t\tgl.uniform4fv(programInfo.uniformLocations.mouse, [0, 0, 0, 0]);\n\t\t\tgl.uniform1i(programInfo.uniformLocations.texture, 0);\n\t\t\t\n\t\t\t//quite cool, dont need to set all the vertices!!\n\t\t\tvar offset = 0;\n\t\t\tvar vertexCount = 4;\n\t\t\tgl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);\n\n\t\t\trequestAnimationFrame(self.render);\n\t\t}\n\t}\n\nloadShaders(\"CDN_PATH/shaders/vertex.glsl\", \"CDN_PATH/shaders/fragment.glsl\", onErr);\n\n\n//# sourceURL=webpack:///./src/CDN_PATH/js/main.js?");

/***/ })

/******/ });