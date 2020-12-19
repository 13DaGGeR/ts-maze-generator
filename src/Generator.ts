import {Field} from "./Field";
import {Cell} from "./Cell";
import {Direction} from "./Direction";

export class Generator {
	protected start: Cell;
	protected finish: Cell;
	protected processed: Cell[] = [];
	protected parentPerCell: Map<Cell, Cell> = new Map<Cell, Cell>();
	protected cellsWithPossiblePaths: Cell[] = [];

	constructor(protected field: Field) {
	}

	public generate(): void {
		this.initStartAndFinish();
		this.createPath(this.start);
	}

	protected createPath(c: Cell): void {
		if (c === this.finish) {
			this.removeCellFromPossiblePathsStarts(c);
			this.createNewBranch();
			return;
		}

		const dirs = this.getPossiblePathDirections(c);

		if (dirs.length > 1) {
			this.cellsWithPossiblePaths.push(c); // to fill later
		}

		if (dirs.length > 0) {
			let dir = dirs[Math.floor(Math.random() * dirs.length)];
			const next = this.field.addPath(c.coordinate.x, c.coordinate.y, dir);
			if (dirs.length === 1) { // cell has no more paths left
				this.removeCellFromPossiblePathsStarts(c);
			}

			this.createPath(next);
			return;
		}

		this.removeCellFromPossiblePathsStarts(c);
		this.createNewBranch();
	}

	private removeCellFromPossiblePathsStarts(c: Cell) {
		const index = this.cellsWithPossiblePaths.indexOf(c);
		if (index !== -1) {
			this.cellsWithPossiblePaths.splice(index, 1);
		}
	}

	protected createNewBranch(): void {
		if (this.cellsWithPossiblePaths.length === 0) { // all finished
			return;
		}

		this.createPath(this.cellsWithPossiblePaths[Math.floor(this.cellsWithPossiblePaths.length * Math.random())])
	}

	protected initStartAndFinish() {
		const bordered = this.field.getBorderCells();
		if (bordered.length < 2) {
			return;
		}

		const startKey = Math.floor(Math.random() * bordered.length);
		let finishKey;
		do {
			finishKey = Math.floor(Math.random() * bordered.length);
		} while (startKey === finishKey);
		this.start = bordered[startKey];
		this.finish = bordered[finishKey];

		console.log('from ', this.start.coordinate.asString(), 'to', this.finish.coordinate.asString());
	}

	protected getPossiblePathDirections(c: Cell): string[] {
		const result = [];
		for (let direction of Direction.directions) {
			if (c.hasPath(direction) || c.hasBorder(direction)) {
				continue;
			}
			let neighbour = this.field.getCell(
				Direction.getXWithOffset(c.coordinate.x, direction),
				Direction.getYWithOffset(c.coordinate.y, direction)
			);
			if (neighbour.hasAnyPaths()) {
				continue;
			}

			result.push(direction);
		}

		return result;
	}
}
