import {Cell} from "./Cell";
import {Coordinate} from "./Coordinate";
import {Direction} from "./Direction";

export class Field {
	protected cells: Cell[] = [];
	protected borderCells: Cell[] = [];

	constructor(protected width: number = 10, protected height: number = 10) {
		if (this.width * this.height < 2) {
			throw new Error('size is too small');
		}

		for (let x = 0; x < width; ++x) {
			for (let y = 0; y < height; ++y) {
				this.addCell(x, y);
			}
		}
	}

	public print() {
		const buffer = [];
		for (let cell of this.cells) {
			let offset = cell.coordinate.y * this.width * 9 + cell.coordinate.x * 3;
			buffer[offset + this.width * 3 + 1] = '0';

			if (cell.hasPath(Direction.dirUp)) {
				buffer[offset + 1] = Direction.dirUp;
			}
			if (cell.hasPath(Direction.dirRight)) {
				buffer[offset + this.width * 3 + 2] = Direction.dirRight;
			}
			if (cell.hasPath(Direction.dirDown)) {
				buffer[offset + this.width * 3 * 2 + 1] = Direction.dirDown;
			}
			if (cell.hasPath(Direction.dirLeft)) {
				buffer[offset + this.width * 3] = Direction.dirLeft;
			}
		}

		for (let y = 0; y < this.height * 3; ++y) {
			let row = '';
			for (let x = 0; x < this.width * 3; ++x) {
				let val = buffer[y * this.width * 3 + x] || ' ';
				row += ' ' + val + ' ';
			}
			console.log(row);
		}
	}

	protected coordinateToNumber(c: Coordinate): number {
		return this.width * c.y + c.x;
	}

	protected addCell(x: number, y: number): Cell {
		const cell = new Cell(x, y);
		this.cells[this.coordinateToNumber(cell.coordinate)] = cell;

		let isAtBorder = false;
		if (x === 0) {
			cell.addBorder(Direction.dirLeft);
			isAtBorder = true;
		}
		if (x === this.width - 1) {
			cell.addBorder(Direction.dirRight);
			isAtBorder = true;
		}
		if (y === 0) {
			cell.addBorder(Direction.dirUp);
			isAtBorder = true;
		}
		if (y === this.height - 1) {
			cell.addBorder(Direction.dirDown);
			isAtBorder = true;
		}

		if (isAtBorder) {
			this.borderCells.push(cell);
		}

		return cell;
	}

	public getCell(x: number, y: number): Cell|null {
		const coordinate = new Coordinate(x, y);
		return this.cells[this.coordinateToNumber(coordinate)] || null;
	}

	public addPath(x: number, y: number, d: string): Cell|null {
		const cell1 = this.getCell(x, y),
			cell2 = this.getCell(Direction.getXWithOffset(x, d), Direction.getYWithOffset(y, d));
		if (cell1 === null) {
			return;
		}

		cell1.addPath(d);
		if (cell2 !== null) {
			cell2.addPath(Direction.getOpposite(d));
		}
		return cell2;
	}

	public getBorderCells(): Cell[] {
		return this.borderCells;
	}
}
