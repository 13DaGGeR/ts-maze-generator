import {Cell} from "./Cell";
import {Coordinate} from "./Coordinate";
import {Direction, DirectionHelper} from "./Direction";

export class Field {
	protected cells: Cell[] = [];
	protected borderCells: Cell[] = [];
	public finishCells: Cell[] = [];

	constructor(public readonly width: number = 10, public readonly height: number = 10) {
		if (this.width * this.height < 2) {
			throw new Error('size is too small');
		}

		for (let x: number = 0; x < width; ++x) {
			for (let y: number = 0; y < height; ++y) {
				this.addCell(x, y);
			}
		}
	}

	public print() {
		const buffer: string[] = [];
		for (let cell of this.cells) {
			let offset: number = cell.coordinate.y * this.width * 9 + cell.coordinate.x * 3;
			buffer[offset + this.width * 3 + 1] = '0';

			if (cell.hasPath(Direction.up)) {
				buffer[offset + 1] = Direction.up;
			}
			if (cell.hasPath(Direction.right)) {
				buffer[offset + this.width * 3 + 2] = Direction.right;
			}
			if (cell.hasPath(Direction.down)) {
				buffer[offset + this.width * 3 * 2 + 1] = Direction.down;
			}
			if (cell.hasPath(Direction.left)) {
				buffer[offset + this.width * 3] = Direction.left;
			}
		}

		for (let y: number = 0; y < this.height * 3; ++y) {
			let row = '';
			for (let x: number = 0; x < this.width * 3; ++x) {
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
		const cell: Cell = new Cell(x, y);
		this.cells[this.coordinateToNumber(cell.coordinate)] = cell;

		let isAtBorder: boolean = false;
		if (x === 0) {
			cell.addBorder(Direction.left);
			isAtBorder = true;
		}
		if (x === this.width - 1) {
			cell.addBorder(Direction.right);
			isAtBorder = true;
		}
		if (y === 0) {
			cell.addBorder(Direction.up);
			isAtBorder = true;
		}
		if (y === this.height - 1) {
			cell.addBorder(Direction.down);
			isAtBorder = true;
		}

		if (isAtBorder) {
			this.borderCells.push(cell);
		}

		return cell;
	}

	public getCell(x: number, y: number): Cell|null {
		const coordinate: Coordinate = new Coordinate(x, y);
		return this.cells[this.coordinateToNumber(coordinate)] || null;
	}

	public addPath(x: number, y: number, d: Direction): Cell|null {
		const cell1: Cell = this.getCell(x, y),
			cell2: Cell = this.getCell(DirectionHelper.getXWithOffset(x, d), DirectionHelper.getYWithOffset(y, d));
		if (cell1 === null) {
			return;
		}

		cell1.addPath(d);
		if (cell2 !== null) {
			cell2.addPath(DirectionHelper.getOpposite(d));
		}
		return cell2;
	}

	public getBorderCells(): Cell[] {
		return this.borderCells;
	}
}
