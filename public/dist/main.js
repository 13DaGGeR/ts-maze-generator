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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_Generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/Generator */ \"../src/Generator.ts\");\n/* harmony import */ var _src_view_TableView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/view/TableView */ \"../src/view/TableView.ts\");\n/* harmony import */ var _src_Solvers_AStarSolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../src/Solvers/AStarSolver */ \"../src/Solvers/AStarSolver.ts\");\n/* harmony import */ var _src_view_InlineSvgView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../src/view/InlineSvgView */ \"../src/view/InlineSvgView.ts\");\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const url = new URL(window.location.toString());\n    const params = new URLSearchParams(url.search);\n    const width = parseInt(params.get('width') || '30');\n    const height = parseInt(params.get('height') || '15');\n    const viewType = params.get('view') || 'svg';\n    drawForm(width, height, viewType);\n    const generator = new _src_Generator__WEBPACK_IMPORTED_MODULE_0__.Generator(width, height);\n    const view = getView(viewType);\n    const field = generator.generate();\n    view.display(field, []);\n    document.getElementById('solve').addEventListener('click', () => {\n        const solver = new _src_Solvers_AStarSolver__WEBPACK_IMPORTED_MODULE_2__.AStarSolver();\n        let path = solver.solve(field);\n        view.display(field, path);\n    });\n});\nfunction getView(viewType) {\n    switch (viewType) {\n        case 'svg':\n            return new _src_view_InlineSvgView__WEBPACK_IMPORTED_MODULE_3__.InlineSvgView();\n        case 'table':\n        default:\n            return new _src_view_TableView__WEBPACK_IMPORTED_MODULE_1__.TableView();\n    }\n}\nfunction drawForm(width, height, view) {\n    const form = `\n\t\t<form>\n\t\t\t<label>\n\t\t\t\twidth:\n\t\t\t\t<input type=\"number\" value=\"${width}\" name=\"width\" required/>\n\t\t\t</label>\n\t\t\t<br />\n\t\t\t<label>\n\t\t\t\theight:\n\t\t\t\t<input type=\"number\" value=\"${height}\" name=\"height\" required/>\n\t\t\t</label>\n\t\t\t<br />\n\t\t\t<label>\n\t\t\t\tview:\n\t\t\t\t<label><input type=\"radio\" name=\"view\" value=\"svg\" ${view === 'svg' ? 'checked' : ''}/> inline svg</label>\n\t\t\t\t<label><input type=\"radio\" name=\"view\" value=\"table\" ${view === 'table' ? 'checked' : ''}/> table</label>\n\t\t\t</label>\n\t\t\t<br />\n\t\t\t<button type=\"submit\">Generate</button>\n\t\t\t<button type=\"button\" id=\"solve\">Solve</button>\n\t\t</form>\n\t`;\n    document.body.innerHTML += form;\n}\n\n\n//# sourceURL=webpack://maze/./src/main.ts?");

/***/ }),

/***/ "../src/Cell.ts":
/*!**********************!*\
  !*** ../src/Cell.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cell\": () => /* binding */ Cell\n/* harmony export */ });\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Coordinate */ \"../src/Coordinate.ts\");\n\nclass Cell {\n    constructor(x, y) {\n        this.isFinish = false;\n        this.paths = [];\n        this.borders = [];\n        this.coordinate = new _Coordinate__WEBPACK_IMPORTED_MODULE_0__.Coordinate(x, y);\n    }\n    addPath(p) {\n        if (this.paths.indexOf(p) === -1) {\n            this.paths.push(p);\n        }\n    }\n    hasPath(p) {\n        return this.paths.indexOf(p) !== -1;\n    }\n    hasAnyPaths() {\n        return this.paths.length > 0;\n    }\n    addBorder(p) {\n        if (this.borders.indexOf(p) === -1) {\n            this.borders.push(p);\n        }\n    }\n    hasBorder(p) {\n        return this.borders.indexOf(p) !== -1;\n    }\n    getBorders() {\n        return this.borders;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Cell.ts?");

/***/ }),

/***/ "../src/Coordinate.ts":
/*!****************************!*\
  !*** ../src/Coordinate.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Coordinate\": () => /* binding */ Coordinate\n/* harmony export */ });\nclass Coordinate {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    asString() {\n        return Coordinate.pack(this.x, this.y);\n    }\n    static pack(x, y) {\n        return x + ':' + y;\n    }\n    distanceTo(to) {\n        let dx = this.x - to.x, dy = this.y - to.y;\n        return Math.sqrt(dx ** 2 + dy ** 2);\n    }\n    static unpack(packed) {\n        const c = packed.split(':');\n        if (c.length !== 2) {\n            throw new Error('bad string to unpack:' + packed);\n        }\n        const x = parseInt(c[0]);\n        const y = parseInt(c[1]);\n        if (x < 0 || y < 0) {\n            throw new Error('bad string to unpack:' + packed);\n        }\n        return new Coordinate(x, y);\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Coordinate.ts?");

/***/ }),

/***/ "../src/Direction.ts":
/*!***************************!*\
  !*** ../src/Direction.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DirectionHelper\": () => /* binding */ DirectionHelper\n/* harmony export */ });\nclass DirectionHelper {\n    static get directions() {\n        return [\n            \"\\u2191\" /* up */,\n            \"\\u2192\" /* right */,\n            \"\\u2193\" /* down */,\n            \"\\u2190\" /* left */,\n        ];\n    }\n    static getXWithOffset(x, d) {\n        if (d === \"\\u2192\" /* right */) {\n            return x + 1;\n        }\n        else if (d === \"\\u2190\" /* left */) {\n            return x - 1;\n        }\n        return x;\n    }\n    static getYWithOffset(y, d) {\n        if (d === \"\\u2191\" /* up */) {\n            return y - 1;\n        }\n        else if (d === \"\\u2193\" /* down */) {\n            return y + 1;\n        }\n        return y;\n    }\n    static getOpposite(d) {\n        switch (d) {\n            case \"\\u2193\" /* down */:\n                return \"\\u2191\" /* up */;\n            case \"\\u2191\" /* up */:\n                return \"\\u2193\" /* down */;\n            case \"\\u2190\" /* left */:\n                return \"\\u2192\" /* right */;\n            case \"\\u2192\" /* right */:\n                return \"\\u2190\" /* left */;\n        }\n        throw new Error('wrong direction');\n    }\n    static getVectorDirection(from, to) {\n        const verticalDistance = from.y - to.y, horizontalDistance = from.x - to.x;\n        if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {\n            return verticalDistance > 0 ? \"\\u2191\" /* up */ : \"\\u2193\" /* down */;\n        }\n        return horizontalDistance > 0 ? \"\\u2190\" /* left */ : \"\\u2192\" /* right */;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Direction.ts?");

/***/ }),

/***/ "../src/Field.ts":
/*!***********************!*\
  !*** ../src/Field.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Field\": () => /* binding */ Field\n/* harmony export */ });\n/* harmony import */ var _Cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cell */ \"../src/Cell.ts\");\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Coordinate */ \"../src/Coordinate.ts\");\n/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Direction */ \"../src/Direction.ts\");\n\n\n\nclass Field {\n    constructor(width = 10, height = 10) {\n        this.width = width;\n        this.height = height;\n        this.cells = [];\n        this.borderCells = [];\n        this.finishCells = [];\n        if (this.width * this.height < 2) {\n            throw new Error('size is too small');\n        }\n        for (let x = 0; x < width; ++x) {\n            for (let y = 0; y < height; ++y) {\n                this.addCell(x, y);\n            }\n        }\n    }\n    print() {\n        const buffer = [];\n        for (let cell of this.cells) {\n            let offset = cell.coordinate.y * this.width * 9 + cell.coordinate.x * 3;\n            buffer[offset + this.width * 3 + 1] = '0';\n            if (cell.hasPath(\"\\u2191\" /* up */)) {\n                buffer[offset + 1] = \"\\u2191\" /* up */;\n            }\n            if (cell.hasPath(\"\\u2192\" /* right */)) {\n                buffer[offset + this.width * 3 + 2] = \"\\u2192\" /* right */;\n            }\n            if (cell.hasPath(\"\\u2193\" /* down */)) {\n                buffer[offset + this.width * 3 * 2 + 1] = \"\\u2193\" /* down */;\n            }\n            if (cell.hasPath(\"\\u2190\" /* left */)) {\n                buffer[offset + this.width * 3] = \"\\u2190\" /* left */;\n            }\n        }\n        for (let y = 0; y < this.height * 3; ++y) {\n            let row = '';\n            for (let x = 0; x < this.width * 3; ++x) {\n                let val = buffer[y * this.width * 3 + x] || ' ';\n                row += ' ' + val + ' ';\n            }\n            console.log(row);\n        }\n    }\n    coordinateToNumber(c) {\n        return this.width * c.y + c.x;\n    }\n    addCell(x, y) {\n        const cell = new _Cell__WEBPACK_IMPORTED_MODULE_0__.Cell(x, y);\n        this.cells[this.coordinateToNumber(cell.coordinate)] = cell;\n        let isAtBorder = false;\n        if (x === 0) {\n            cell.addBorder(\"\\u2190\" /* left */);\n            isAtBorder = true;\n        }\n        if (x === this.width - 1) {\n            cell.addBorder(\"\\u2192\" /* right */);\n            isAtBorder = true;\n        }\n        if (y === 0) {\n            cell.addBorder(\"\\u2191\" /* up */);\n            isAtBorder = true;\n        }\n        if (y === this.height - 1) {\n            cell.addBorder(\"\\u2193\" /* down */);\n            isAtBorder = true;\n        }\n        if (isAtBorder) {\n            this.borderCells.push(cell);\n        }\n        return cell;\n    }\n    getCell(x, y) {\n        const coordinate = new _Coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate(x, y);\n        return this.cells[this.coordinateToNumber(coordinate)] || null;\n    }\n    addPath(x, y, d) {\n        const cell1 = this.getCell(x, y), cell2 = this.getCell(_Direction__WEBPACK_IMPORTED_MODULE_2__.DirectionHelper.getXWithOffset(x, d), _Direction__WEBPACK_IMPORTED_MODULE_2__.DirectionHelper.getYWithOffset(y, d));\n        if (cell1 === null) {\n            return;\n        }\n        cell1.addPath(d);\n        if (cell2 !== null) {\n            cell2.addPath(_Direction__WEBPACK_IMPORTED_MODULE_2__.DirectionHelper.getOpposite(d));\n        }\n        return cell2;\n    }\n    getBorderCells() {\n        return this.borderCells;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Field.ts?");

/***/ }),

/***/ "../src/Generator.ts":
/*!***************************!*\
  !*** ../src/Generator.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Generator\": () => /* binding */ Generator\n/* harmony export */ });\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"../src/Field.ts\");\n/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Direction */ \"../src/Direction.ts\");\n\n\nclass Generator {\n    constructor(width, height) {\n        this.cellsWithPossiblePaths = [];\n        this.minStartToFinishPerDiagCoefficient = .5;\n        this.field = new _Field__WEBPACK_IMPORTED_MODULE_0__.Field(width, height);\n        this.diagonal = Math.floor(Math.sqrt(width ** 2 + height ** 2));\n    }\n    generate() {\n        this.initStartAndFinish();\n        this.createPath();\n        this.addPathsToStartAndFinish();\n        return this.field;\n    }\n    createPath() {\n        let currentCell = this.start;\n        while (currentCell !== null) {\n            if (currentCell === this.finish) {\n                this.removeCellFromPossiblePathsStarts(currentCell);\n                currentCell = this.getNextCellOrNull();\n                continue;\n            }\n            let dirs = this.getPossiblePathDirections(currentCell);\n            if (dirs.length > 1) {\n                this.cellsWithPossiblePaths.push(currentCell); // to fill later\n            }\n            if (dirs.length > 0) {\n                let dir = this.getNextStep(dirs, currentCell.coordinate);\n                const next = this.field.addPath(currentCell.coordinate.x, currentCell.coordinate.y, dir);\n                if (dirs.length === 1) { // cell has no more paths left\n                    this.removeCellFromPossiblePathsStarts(currentCell);\n                }\n                currentCell = next;\n                continue;\n            }\n            this.removeCellFromPossiblePathsStarts(currentCell);\n            currentCell = this.getNextCellOrNull();\n        }\n    }\n    getNextCellOrNull() {\n        if (this.cellsWithPossiblePaths.length === 0) { // all finished\n            return null;\n        }\n        return this.cellsWithPossiblePaths[Math.floor(this.cellsWithPossiblePaths.length * Math.random())];\n    }\n    getNextStep(dirs, c) {\n        const directionToFinish = _Direction__WEBPACK_IMPORTED_MODULE_1__.DirectionHelper.getVectorDirection(c, this.finish.coordinate);\n        const oppositeDirection = _Direction__WEBPACK_IMPORTED_MODULE_1__.DirectionHelper.getOpposite(directionToFinish);\n        if (dirs.indexOf(oppositeDirection) !== -1 && Math.random() > .5) {\n            return oppositeDirection;\n        }\n        return dirs[Math.floor(Math.random() * dirs.length)];\n    }\n    removeCellFromPossiblePathsStarts(c) {\n        const index = this.cellsWithPossiblePaths.indexOf(c);\n        if (index !== -1) {\n            this.cellsWithPossiblePaths.splice(index, 1);\n        }\n    }\n    initStartAndFinish() {\n        const bordered = this.field.getBorderCells();\n        if (bordered.length < 2) {\n            return;\n        }\n        const startKey = Math.floor(Math.random() * bordered.length);\n        this.start = bordered[startKey];\n        let finishKey, tries = 100;\n        const minDistance = this.minStartToFinishPerDiagCoefficient * this.diagonal;\n        do {\n            finishKey = Math.floor(Math.random() * bordered.length);\n            this.finish = bordered[finishKey];\n        } while (--tries > 0\n            && (startKey === finishKey\n                || this.start.coordinate.distanceTo(this.finish.coordinate) < minDistance));\n        this.start.isFinish = true;\n        this.finish.isFinish = true;\n        this.field.finishCells.push(this.start);\n        this.field.finishCells.push(this.finish);\n    }\n    addPathsToStartAndFinish() {\n        for (let dir of _Direction__WEBPACK_IMPORTED_MODULE_1__.DirectionHelper.directions) {\n            if (this.start.hasBorder(dir)) {\n                this.start.addPath(dir);\n            }\n            if (this.finish.hasBorder(dir)) {\n                this.finish.addPath(dir);\n            }\n        }\n    }\n    getPossiblePathDirections(c) {\n        const result = [];\n        for (let direction of _Direction__WEBPACK_IMPORTED_MODULE_1__.DirectionHelper.directions) {\n            if (this.isPossibleDirection(c, direction)) {\n                result.push(direction);\n            }\n        }\n        return result;\n    }\n    isPossibleDirection(c, direction) {\n        if (c.hasPath(direction) || c.hasBorder(direction)) {\n            return false;\n        }\n        let neighbour = this.field.getCell(_Direction__WEBPACK_IMPORTED_MODULE_1__.DirectionHelper.getXWithOffset(c.coordinate.x, direction), _Direction__WEBPACK_IMPORTED_MODULE_1__.DirectionHelper.getYWithOffset(c.coordinate.y, direction));\n        return !neighbour.hasAnyPaths();\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Generator.ts?");

/***/ }),

/***/ "../src/Solvers/AStarSolver.ts":
/*!*************************************!*\
  !*** ../src/Solvers/AStarSolver.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AStarSolver\": () => /* binding */ AStarSolver\n/* harmony export */ });\n/* harmony import */ var _Direction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Direction */ \"../src/Direction.ts\");\n/* harmony import */ var _Coordinate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Coordinate */ \"../src/Coordinate.ts\");\n\n\nclass AStarSolver {\n    constructor() {\n        this.field = null;\n        this.parentsCoordinates = {};\n        this.cellWeights = {};\n        this.processedCoordinates = [];\n        this.queue = [];\n        this.start = null;\n        this.finish = null;\n    }\n    solve(field) {\n        this.field = field;\n        this.start = field.finishCells[0];\n        this.finish = field.finishCells[1];\n        this.enqueueCellNeighbours(this.start);\n        let limit = field.width * field.height * 2;\n        while (1) {\n            let currentCell = this.getOptimalCell();\n            if (currentCell === this.finish || --limit < 0) {\n                break;\n            }\n            this.enqueueCellNeighbours(currentCell);\n        }\n        return this.getPath();\n    }\n    getPath() {\n        const result = [];\n        let current = this.finish;\n        let limit = this.field.width * this.field.height;\n        let parentK;\n        do {\n            result.push(current.coordinate.asString());\n            parentK = this.parentsCoordinates[current.coordinate.asString()] || null;\n            if (parentK !== null) {\n                let c = _Coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate.unpack(parentK);\n                current = this.field.getCell(c.x, c.y);\n            }\n        } while (parentK !== null && limit > 0);\n        return result;\n    }\n    getOptimalCell() {\n        let minWeight = Infinity;\n        let optimalCellKey;\n        for (let key of this.queue) {\n            if (this.processedCoordinates.indexOf(key) !== -1) {\n                continue;\n            }\n            let weight = this.cellWeights[key];\n            if (weight < minWeight) {\n                minWeight = weight;\n                optimalCellKey = key;\n            }\n        }\n        this.processedCoordinates.push(optimalCellKey);\n        this.queue.splice(this.queue.indexOf(optimalCellKey), 1);\n        const optimalCellCoordinate = _Coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate.unpack(optimalCellKey);\n        return this.field.getCell(optimalCellCoordinate.x, optimalCellCoordinate.y);\n    }\n    enqueueCellNeighbours(c) {\n        for (let dir of _Direction__WEBPACK_IMPORTED_MODULE_0__.DirectionHelper.directions) {\n            let dx = _Direction__WEBPACK_IMPORTED_MODULE_0__.DirectionHelper.getXWithOffset(c.coordinate.x, dir), dy = _Direction__WEBPACK_IMPORTED_MODULE_0__.DirectionHelper.getYWithOffset(c.coordinate.y, dir);\n            if (this.parentsCoordinates[c.coordinate.asString()] !== _Coordinate__WEBPACK_IMPORTED_MODULE_1__.Coordinate.pack(dx, dy)\n                && c.hasPath(dir)\n                && !c.hasBorder(dir)) {\n                let neighbour = this.field.getCell(dx, dy);\n                if (neighbour === null) {\n                    continue;\n                }\n                this.enqueueCell(neighbour, c);\n            }\n        }\n    }\n    enqueueCell(c, parent) {\n        const weight = this.getWeight(c, parent);\n        const key = c.coordinate.asString();\n        const currentWeight = this.cellWeights[key] || Infinity;\n        if (weight < currentWeight) {\n            this.cellWeights[key] = weight;\n            this.parentsCoordinates[key] = parent.coordinate.asString();\n        }\n        this.queue.push(key);\n    }\n    getWeight(c, parent) {\n        const parentWeight = this.cellWeights[parent.coordinate.asString()] || 0;\n        const distanceToFinish = c.coordinate.distanceTo(this.finish.coordinate);\n        return 1 + parentWeight + distanceToFinish;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/Solvers/AStarSolver.ts?");

/***/ }),

/***/ "../src/view/AbstractHtmlView.ts":
/*!***************************************!*\
  !*** ../src/view/AbstractHtmlView.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AbstractHtmlView\": () => /* binding */ AbstractHtmlView\n/* harmony export */ });\nclass AbstractHtmlView {\n    generateAndGetMazeHolder() {\n        const id = 'maze';\n        let el = document.getElementById(id);\n        if (el === null) {\n            el = document.createElement('div');\n            el.setAttribute('id', id);\n            document.body.appendChild(el);\n        }\n        return el;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/view/AbstractHtmlView.ts?");

/***/ }),

/***/ "../src/view/InlineSvgView.ts":
/*!************************************!*\
  !*** ../src/view/InlineSvgView.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"InlineSvgView\": () => /* binding */ InlineSvgView\n/* harmony export */ });\n/* harmony import */ var _AbstractHtmlView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractHtmlView */ \"../src/view/AbstractHtmlView.ts\");\n\nclass InlineSvgView extends _AbstractHtmlView__WEBPACK_IMPORTED_MODULE_0__.AbstractHtmlView {\n    constructor() {\n        super(...arguments);\n        this.borderWidth = 2;\n        this.strokeColor = 'black';\n        this.cellSize = 10;\n    }\n    display(field, path) {\n        const holder = this.generateAndGetMazeHolder();\n        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');\n        svg.setAttribute('viewBox', `${-this.borderWidth / 2} ${-this.borderWidth / 2} ${this.cellSize * field.width + this.borderWidth} ${this.cellSize * field.height + this.borderWidth}`);\n        svg.setAttribute('version', '1.1');\n        for (let row = 0; row < field.height; ++row) {\n            for (let col = 0; col < field.width; ++col) {\n                let cell = field.getCell(col, row), x1 = col * this.cellSize, x2 = (col + 1) * this.cellSize, y1 = row * this.cellSize, y2 = (row + 1) * this.cellSize, cx = col * this.cellSize + this.cellSize / 2, cy = row * this.cellSize + this.cellSize / 2;\n                if (!cell.hasPath(\"\\u2191\" /* up */)) {\n                    svg.appendChild(this.getLine(x1, x2, y1, y1));\n                }\n                if (!cell.hasPath(\"\\u2193\" /* down */)) {\n                    svg.appendChild(this.getLine(x1, x2, y2, y2));\n                }\n                if (!cell.hasPath(\"\\u2190\" /* left */)) {\n                    svg.appendChild(this.getLine(x1, x1, y1, y2));\n                }\n                if (!cell.hasPath(\"\\u2192\" /* right */)) {\n                    svg.appendChild(this.getLine(x2, x2, y1, y2));\n                }\n                if (cell.isFinish) {\n                    svg.appendChild(this.getCircle(cx, cy, 'black'));\n                }\n                else {\n                    // td.innerText = cell.coordinate.asString();\n                }\n                if (path.indexOf(cell.coordinate.asString()) !== -1) {\n                    svg.appendChild(this.getCircle(cx, cy));\n                }\n            }\n        }\n        holder.innerHTML = '';\n        holder.appendChild(svg);\n    }\n    getCircle(cx, cy, color = 'rgb(240, 240, 240)') {\n        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');\n        circle.setAttribute('cx', '' + cx);\n        circle.setAttribute('cy', '' + cy);\n        circle.setAttribute('r', this.cellSize / 5 + '');\n        circle.setAttribute('fill', color);\n        return circle;\n    }\n    getLine(x1, x2, y1, y2) {\n        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');\n        line.setAttribute('stroke', this.strokeColor);\n        line.setAttribute('strokeWidth', '' + this.borderWidth);\n        line.setAttribute('stroke-linecap', 'round');\n        line.setAttribute('x1', '' + x1);\n        line.setAttribute('x2', '' + x2);\n        line.setAttribute('y1', '' + y1);\n        line.setAttribute('y2', '' + y2);\n        return line;\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/view/InlineSvgView.ts?");

/***/ }),

/***/ "../src/view/TableView.ts":
/*!********************************!*\
  !*** ../src/view/TableView.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TableView\": () => /* binding */ TableView\n/* harmony export */ });\n/* harmony import */ var _AbstractHtmlView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbstractHtmlView */ \"../src/view/AbstractHtmlView.ts\");\n\nclass TableView extends _AbstractHtmlView__WEBPACK_IMPORTED_MODULE_0__.AbstractHtmlView {\n    display(field, path = []) {\n        const holder = this.generateAndGetMazeHolder();\n        const cellBorderStyle = '3px solid black';\n        const table = document.createElement('table');\n        for (let row = 0; row < field.height; ++row) {\n            let tr = document.createElement('tr');\n            for (let col = 0; col < field.width; ++col) {\n                let td = document.createElement('td');\n                let cell = field.getCell(col, row);\n                td.style.borderTop = cell.hasPath(\"\\u2191\" /* up */) ? 'none' : cellBorderStyle;\n                td.style.borderRight = cell.hasPath(\"\\u2192\" /* right */) ? 'none' : cellBorderStyle;\n                td.style.borderBottom = cell.hasPath(\"\\u2193\" /* down */) ? 'none' : cellBorderStyle;\n                td.style.borderLeft = cell.hasPath(\"\\u2190\" /* left */) ? 'none' : cellBorderStyle;\n                td.style.textAlign = 'center';\n                td.style.verticalAlign = 'center';\n                // debug\n                if (cell.isFinish) {\n                    td.innerText = '*';\n                }\n                else {\n                    // td.innerText = cell.coordinate.asString();\n                }\n                if (path.indexOf(cell.coordinate.asString()) !== -1) {\n                    td.style.backgroundColor = '#eee';\n                }\n                tr.appendChild(td);\n            }\n            table.appendChild(tr);\n        }\n        const style = document.createElement('style');\n        style.innerText = `\n\t\t\ttable {\n\t\t\t\tborder-collapse: collapse;\n\t\t\t}\n\t\t\ttd {\n\t\t\t\twidth: 50px;\n\t\t\t\theight: 50px;\n\t\t\t}\n\t\t`;\n        holder.innerHTML = '';\n        holder.appendChild(table);\n        holder.appendChild(style);\n    }\n}\n\n\n//# sourceURL=webpack://maze/../src/view/TableView.ts?");

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