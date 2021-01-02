/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_Generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Generator */ \"../src/Generator.ts\");\n/* harmony import */ var _src_Direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/Direction */ \"../src/Direction.ts\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const url = new URL(window.location.toString());\n    const params = new URLSearchParams(url.search);\n    const width = parseInt(params.get('width') || '30');\n    const height = parseInt(params.get('height') || '15');\n    drawForm(width, height);\n    generate(width, height);\n});\nfunction generateAndGetMazeHolder() {\n    const id = 'maze';\n    let el = document.getElementById(id);\n    if (el === null) {\n        el = document.createElement('div');\n        el.setAttribute('id', id);\n        document.body.appendChild(el);\n    }\n    return el;\n}\nfunction generate(width, height) {\n    const holder = generateAndGetMazeHolder();\n    const cellBorderStyle = '3px solid black';\n    const generator = new _src_Generator__WEBPACK_IMPORTED_MODULE_0__.Generator(width, height);\n    const field = generator.generate();\n    const table = document.createElement('table');\n    for (let row = 0; row < height; ++row) {\n        let tr = document.createElement('tr');\n        for (let col = 0; col < width; ++col) {\n            let td = document.createElement('td');\n            let cell = field.getCell(col, row);\n            td.style.borderTop = cell.hasPath(_src_Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.dirUp) ? 'none' : cellBorderStyle;\n            td.style.borderRight = cell.hasPath(_src_Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.dirRight) ? 'none' : cellBorderStyle;\n            td.style.borderBottom = cell.hasPath(_src_Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.dirDown) ? 'none' : cellBorderStyle;\n            td.style.borderLeft = cell.hasPath(_src_Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.dirLeft) ? 'none' : cellBorderStyle;\n            td.style.textAlign = 'center';\n            td.style.verticalAlign = 'center';\n            // debug\n            if (cell === generator.start) {\n                td.innerText = 's';\n            }\n            else if (cell === generator.finish) {\n                td.innerText = 'f';\n            }\n            else {\n                //td.innerText = Direction.getOpposite(Direction.getVectorDirection(cell.coordinate, generator.finish.coordinate));\n            }\n            tr.appendChild(td);\n        }\n        table.appendChild(tr);\n    }\n    holder.innerHTML = '';\n    holder.appendChild(table);\n}\nfunction drawForm(width, height) {\n    const form = `\n\t\t<form>\n\t\t\t<label>\n\t\t\t\twidth:\n\t\t\t\t<input type=\"number\" value=\"${width}\" name=\"width\" required/>\n\t\t\t</label>\n\t\t\t<br />\n\t\t\t<label>\n\t\t\t\theight:\n\t\t\t\t<input type=\"number\" value=\"${height}\" name=\"height\" required/>\n\t\t\t</label>\n\t\t\t<br />\n\t\t\t<button type=\"submit\">Generate</button>\n\t\t</form>\n\t`;\n    document.body.innerHTML += form;\n}\n\n\n//# sourceURL=webpack://maze/./src/main.ts?");

/***/ }),

/***/ "../src/Cell.ts":
/*!**********************!*\
  !*** ../src/Cell.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cell\": () => /* binding */ Cell\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"../src/Coordinate.ts\");\n/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Direction */ \"../src/Direction.ts\");\n\n\nclass Cell {\n    constructor(x, y) {\n        this.paths = [];\n        this.borders = [];\n        this.coordinate = new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.Coordinate(x, y);\n    }\n    addPath(p) {\n        if (_Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.directions.indexOf(p) === -1) {\n            throw new Error('Wrong direction provided');\n        }\n        if (this.paths.indexOf(p) === -1) {\n            this.paths.push(p);\n        }\n    }\n    hasPath(p) {\n        return this.paths.indexOf(p) !== -1;\n    }\n    hasAnyPaths() {\n        return this.paths.length > 0;\n    }\n    addBorder(p) {\n        if (_Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.directions.indexOf(p) === -1) {\n            throw new Error('Wrong direction provided');\n        }\n        if (this.borders.indexOf(p) === -1) {\n            this.borders.push(p);\n        }\n    }\n    hasBorder(p) {\n        return this.borders.indexOf(p) !== -1;\n    }\n    getBorders() {\n        return this.borders;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Cell.ts?");

/***/ }),

/***/ "../src/Coordinate.ts":
/*!****************************!*\
  !*** ../src/Coordinate.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Coordinate\": () => /* binding */ Coordinate\n/* harmony export */ });\nclass Coordinate {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    asString() {\n        return Coordinate.pack(this.x, this.y);\n    }\n    static pack(x, y) {\n        return x + ':' + y;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Coordinate.ts?");

/***/ }),

/***/ "../src/Direction.ts":
/*!***************************!*\
  !*** ../src/Direction.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Direction\": () => /* binding */ Direction\n/* harmony export */ });\nclass Direction {\n    static get dirUp() {\n        return '↑';\n    }\n    static get dirRight() {\n        return '→';\n    }\n    static get dirDown() {\n        return '↓';\n    }\n    static get dirLeft() {\n        return '←';\n    }\n    static get directions() {\n        return [\n            Direction.dirUp,\n            Direction.dirRight,\n            Direction.dirDown,\n            Direction.dirLeft,\n        ];\n    }\n    static getXWithOffset(x, d) {\n        if (d === this.dirRight) {\n            return x + 1;\n        }\n        else if (d === this.dirLeft) {\n            return x - 1;\n        }\n        return x;\n    }\n    static getYWithOffset(y, d) {\n        if (d === this.dirUp) {\n            return y - 1;\n        }\n        else if (d === this.dirDown) {\n            return y + 1;\n        }\n        return y;\n    }\n    static getOpposite(d) {\n        switch (d) {\n            case this.dirDown:\n                return this.dirUp;\n            case this.dirUp:\n                return this.dirDown;\n            case this.dirLeft:\n                return this.dirRight;\n            case this.dirRight:\n                return this.dirLeft;\n        }\n        throw new Error('wrong direction');\n    }\n    static getVectorDirection(from, to) {\n        const verticalDistance = from.y - to.y, horizontalDistance = from.x - to.x;\n        if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {\n            return verticalDistance > 0 ? Direction.dirUp : Direction.dirDown;\n        }\n        return horizontalDistance > 0 ? Direction.dirLeft : Direction.dirRight;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Direction.ts?");

/***/ }),

/***/ "../src/Field.ts":
/*!***********************!*\
  !*** ../src/Field.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Field\": () => /* binding */ Field\n/* harmony export */ });\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"../src/Cell.ts\");\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Coordinate */ \"../src/Coordinate.ts\");\n/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Direction */ \"../src/Direction.ts\");\n\n\n\nclass Field {\n    constructor(width = 10, height = 10) {\n        this.width = width;\n        this.height = height;\n        this.cells = [];\n        this.borderCells = [];\n        if (this.width * this.height < 2) {\n            throw new Error('size is too small');\n        }\n        for (let x = 0; x < width; ++x) {\n            for (let y = 0; y < height; ++y) {\n                this.addCell(x, y);\n            }\n        }\n    }\n    print() {\n        const buffer = [];\n        for (let cell of this.cells) {\n            let offset = cell.coordinate.y * this.width * 9 + cell.coordinate.x * 3;\n            buffer[offset + this.width * 3 + 1] = '0';\n            if (cell.hasPath(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirUp)) {\n                buffer[offset + 1] = _Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirUp;\n            }\n            if (cell.hasPath(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirRight)) {\n                buffer[offset + this.width * 3 + 2] = _Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirRight;\n            }\n            if (cell.hasPath(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirDown)) {\n                buffer[offset + this.width * 3 * 2 + 1] = _Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirDown;\n            }\n            if (cell.hasPath(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirLeft)) {\n                buffer[offset + this.width * 3] = _Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirLeft;\n            }\n        }\n        for (let y = 0; y < this.height * 3; ++y) {\n            let row = '';\n            for (let x = 0; x < this.width * 3; ++x) {\n                let val = buffer[y * this.width * 3 + x] || ' ';\n                row += ' ' + val + ' ';\n            }\n            console.log(row);\n        }\n    }\n    coordinateToNumber(c) {\n        return this.width * c.y + c.x;\n    }\n    addCell(x, y) {\n        const cell = new _Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(x, y);\n        this.cells[this.coordinateToNumber(cell.coordinate)] = cell;\n        let isAtBorder = false;\n        if (x === 0) {\n            cell.addBorder(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirLeft);\n            isAtBorder = true;\n        }\n        if (x === this.width - 1) {\n            cell.addBorder(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirRight);\n            isAtBorder = true;\n        }\n        if (y === 0) {\n            cell.addBorder(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirUp);\n            isAtBorder = true;\n        }\n        if (y === this.height - 1) {\n            cell.addBorder(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.dirDown);\n            isAtBorder = true;\n        }\n        if (isAtBorder) {\n            this.borderCells.push(cell);\n        }\n        return cell;\n    }\n    getCell(x, y) {\n        const coordinate = new _Coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, y);\n        return this.cells[this.coordinateToNumber(coordinate)] || null;\n    }\n    addPath(x, y, d) {\n        const cell1 = this.getCell(x, y), cell2 = this.getCell(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.getXWithOffset(x, d), _Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.getYWithOffset(y, d));\n        if (cell1 === null) {\n            return;\n        }\n        cell1.addPath(d);\n        if (cell2 !== null) {\n            cell2.addPath(_Direction__WEBPACK_IMPORTED_MODULE_2__.Direction.getOpposite(d));\n        }\n        return cell2;\n    }\n    getBorderCells() {\n        return this.borderCells;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Field.ts?");

/***/ }),

/***/ "../src/Generator.ts":
/*!***************************!*\
  !*** ../src/Generator.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Generator\": () => /* binding */ Generator\n/* harmony export */ });\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"../src/Field.ts\");\n/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Direction */ \"../src/Direction.ts\");\n\n\nclass Generator {\n    constructor(width, height) {\n        this.cellsWithPossiblePaths = [];\n        this.field = new _Field__WEBPACK_IMPORTED_MODULE_0__.Field(width, height);\n        this.initStartAndFinish();\n    }\n    generate() {\n        this.createPath(this.start);\n        this.addPathsToStartAndFinish();\n        return this.field;\n    }\n    createPath(c) {\n        if (c === this.finish) {\n            this.removeCellFromPossiblePathsStarts(c);\n            this.createNewBranch();\n            return;\n        }\n        const dirs = this.getPossiblePathDirections(c);\n        if (dirs.length > 1) {\n            this.cellsWithPossiblePaths.push(c); // to fill later\n        }\n        if (dirs.length > 0) {\n            let dir = this.getNextStep(dirs, c.coordinate);\n            const next = this.field.addPath(c.coordinate.x, c.coordinate.y, dir);\n            if (dirs.length === 1) { // cell has no more paths left\n                this.removeCellFromPossiblePathsStarts(c);\n            }\n            this.createPath(next);\n            return;\n        }\n        this.removeCellFromPossiblePathsStarts(c);\n        this.createNewBranch();\n    }\n    getNextStep(dirs, c) {\n        const directionToFinish = _Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.getVectorDirection(c, this.finish.coordinate);\n        const oppositeDirection = _Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.getOpposite(directionToFinish);\n        if (dirs.indexOf(oppositeDirection) !== -1 && Math.random() > .5) {\n            return oppositeDirection;\n        }\n        return dirs[Math.floor(Math.random() * dirs.length)];\n    }\n    removeCellFromPossiblePathsStarts(c) {\n        const index = this.cellsWithPossiblePaths.indexOf(c);\n        if (index !== -1) {\n            this.cellsWithPossiblePaths.splice(index, 1);\n        }\n    }\n    createNewBranch() {\n        if (this.cellsWithPossiblePaths.length === 0) { // all finished\n            return;\n        }\n        this.createPath(this.cellsWithPossiblePaths[Math.floor(this.cellsWithPossiblePaths.length * Math.random())]);\n    }\n    initStartAndFinish() {\n        const bordered = this.field.getBorderCells();\n        if (bordered.length < 2) {\n            return;\n        }\n        const startKey = Math.floor(Math.random() * bordered.length);\n        let finishKey;\n        do {\n            finishKey = Math.floor(Math.random() * bordered.length);\n        } while (startKey === finishKey);\n        this.start = bordered[startKey];\n        this.finish = bordered[finishKey];\n    }\n    addPathsToStartAndFinish() {\n        for (let dir of _Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.directions) {\n            if (this.start.hasBorder(dir)) {\n                this.start.addPath(dir);\n            }\n            if (this.finish.hasBorder(dir)) {\n                this.finish.addPath(dir);\n            }\n        }\n    }\n    getPossiblePathDirections(c) {\n        const result = [];\n        for (let direction of _Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.directions) {\n            if (c.hasPath(direction) || c.hasBorder(direction)) {\n                continue;\n            }\n            let neighbour = this.field.getCell(_Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.getXWithOffset(c.coordinate.x, direction), _Direction__WEBPACK_IMPORTED_MODULE_1__.Direction.getYWithOffset(c.coordinate.y, direction));\n            if (neighbour.hasAnyPaths()) {\n                continue;\n            }\n            result.push(direction);\n        }\n        return result;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Generator.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;