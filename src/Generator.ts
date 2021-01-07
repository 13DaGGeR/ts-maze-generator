import {Field} from "./Field";
import {Cell} from "./Cell";
import {Direction} from "./Direction";
import {Coordinate} from "./Coordinate";

export class Generator {
	protected field: Field;
	public start: Cell;
	public finish: Cell;
	protected diagonal: number;
	protected cellsWithPossiblePaths: Cell[] = [];
	protected minStartToFinishPerDiagCoefficient = .5;

	constructor(width: number, height: number) {
		this.field = new Field(width, height);
		this.diagonal = Math.floor(Math.sqrt(width ** 2 + height ** 2));
		this.initStartAndFinish();
	}

	public generate(): Field {
		this.createPath(this.start);
		this.addPathsToStartAndFinish();
		return this.field;
	}

	protected createPath(c: Cell): void {
		if (c === this.finish) {
			this.removeCellFromPossiblePathsStarts(c);
			this.createNewBranch();
			return;
		}

		const dirs: string[] = this.getPossiblePathDirections(c);

		if (dirs.length > 1) {
			this.cellsWithPossiblePaths.push(c); // to fill later
		}

		if (dirs.length > 0) {
			let dir: string = this.getNextStep(dirs, c.coordinate);
			const next: Cell = this.field.addPath(c.coordinate.x, c.coordinate.y, dir);
			if (dirs.length === 1) { // cell has no more paths left
				this.removeCellFromPossiblePathsStarts(c);
			}

			this.createPath(next);
			return;
		}

		this.removeCellFromPossiblePathsStarts(c);
		this.createNewBranch();
	}

	private getNextStep(dirs: string[], c: Coordinate): string {
		const directionToFinish: string = Direction.getVectorDirection(c, this.finish.coordinate);
		const oppositeDirection: string = Direction.getOpposite(directionToFinish);

		if (dirs.indexOf(oppositeDirection) !== -1 && Math.random() > .5) {
			return oppositeDirection;
		}

		return dirs[Math.floor(Math.random() * dirs.length)];
	}

	private removeCellFromPossiblePathsStarts(c: Cell) {
		const index: number = this.cellsWithPossiblePaths.indexOf(c);
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

		const startKey: number = Math.floor(Math.random() * bordered.length);
		this.start = bordered[startKey];

		let finishKey: number,
			tries: number = 100;
		const minDistance = this.minStartToFinishPerDiagCoefficient * this.diagonal;
		do {
			finishKey = Math.floor(Math.random() * bordered.length);
			this.finish = bordered[finishKey];
		} while (
			--tries > 0
			&& (
				startKey === finishKey
				|| this.start.coordinate.distanceTo(this.finish.coordinate) < minDistance
			)
		);
		this.start.isStart = true;
		this.finish.isFinish = true;
	}

	private addPathsToStartAndFinish() {
		for (let dir of Direction.directions) {
			if (this.start.hasBorder(dir)) {
				this.start.addPath(dir);
			}
			if (this.finish.hasBorder(dir)) {
				this.finish.addPath(dir);
			}
		}
	}

	protected getPossiblePathDirections(c: Cell): string[] {
		const result: string[] = [];
		for (let direction of Direction.directions) {
			if (this.isPossibleDirection(c, direction)) {
				result.push(direction);
			}
		}

		return result;
	}

	protected isPossibleDirection(c: Cell, direction: string): boolean {
		if (c.hasPath(direction) || c.hasBorder(direction)) {
			return false;
		}
		let neighbour: Cell = this.field.getCell(
			Direction.getXWithOffset(c.coordinate.x, direction),
			Direction.getYWithOffset(c.coordinate.y, direction)
		);
		if (neighbour.hasAnyPaths()) {
			return false;
		}
		return true;
	}
}
