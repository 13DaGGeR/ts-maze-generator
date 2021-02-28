import {AbstractHtmlView} from "./AbstractHtmlView";
import {ViewInterface} from "./ViewInterface";
import {Field} from "../Field";
import {Direction} from "../Direction";

export class InlineSvgView extends AbstractHtmlView implements ViewInterface {
	private borderWidth: number = 2;
	private strokeColor: string = 'black';
	private cellSize: number = 10;

	display(field: Field, path: string[]): void {
		const holder = this.generateAndGetMazeHolder();
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('viewBox', `${-this.borderWidth / 2} ${-this.borderWidth / 2} ${this.cellSize * field.width + this.borderWidth} ${this.cellSize * field.height + this.borderWidth}`);
		svg.setAttribute('version', '1.1');

		for (let row = 0; row < field.height; ++row) {
			for (let col = 0; col < field.width; ++col) {
				let cell = field.getCell(col, row),
					x1 = col * this.cellSize,
					x2 = (col + 1) * this.cellSize,
					y1 = row * this.cellSize,
					y2 = (row + 1) * this.cellSize,
					cx = col * this.cellSize + this.cellSize / 2,
					cy = row * this.cellSize + this.cellSize / 2;

				if (!cell.hasPath(Direction.up)) {
					svg.appendChild(this.getLine(x1, x2, y1, y1))
				}
				if (!cell.hasPath(Direction.down)) {
					svg.appendChild(this.getLine(x1, x2, y2, y2))
				}
				if (!cell.hasPath(Direction.left)) {
					svg.appendChild(this.getLine(x1, x1, y1, y2))
				}
				if (!cell.hasPath(Direction.right)) {
					svg.appendChild(this.getLine(x2, x2, y1, y2))
				}

				if (cell.isFinish) {
					svg.appendChild(this.getCircle(cx, cy, 'black'));
				} else {
					// td.innerText = cell.coordinate.asString();
				}


				if (path.indexOf(cell.coordinate.asString()) !== -1) {
					svg.appendChild(this.getCircle(cx, cy));
				}
			}
		}

		holder.innerHTML = '';
		holder.appendChild(svg);
	}

	private getCircle(cx: number, cy: number, color: string = 'rgb(240, 240, 240)'): SVGCircleElement {
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circle.setAttribute('cx', '' + cx);
		circle.setAttribute('cy', '' + cy);
		circle.setAttribute('r', this.cellSize / 5 + '');
		circle.setAttribute('fill', color);

		return circle;
	}

	private getLine(x1: number, x2: number, y1: number, y2: number): SVGLineElement {
		const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		line.setAttribute('stroke', this.strokeColor);
		line.setAttribute('strokeWidth', '' + this.borderWidth);
		line.setAttribute('stroke-linecap', 'round');
		line.setAttribute('x1', '' + x1);
		line.setAttribute('x2', '' + x2);
		line.setAttribute('y1', '' + y1);
		line.setAttribute('y2', '' + y2);

		return line;
	}
}