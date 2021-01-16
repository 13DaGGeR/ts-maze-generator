import {Field} from "./Field";
import {Cell} from "./Cell";
import {Direction, DirectionHelper} from "./Direction";
import {Coordinate} from "./Coordinate";

export class Generator {
	public readonly field: Field;
	public start: Cell;
	public finish: Cell;
	protected diagonal: number;
	protected cellsWithPossiblePaths: Cell[] = [];
	protected minStartToFinishPerDiagCoefficient = .5;

	constructor(width: number, height: number) {
		this.field = new Field(width, height);
		this.diagonal = Math.floor(Math.sqrt(width ** 2 + height ** 2));
	}

	public generate(): Field {
		this.initStartAndFinish();
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

		const dirs: Direction[] = this.getPossiblePathDirections(c);

		if (dirs.length > 1) {
			this.cellsWithPossiblePaths.push(c); // to fill later
		}

		if (dirs.length > 0) {
			let dir: Direction = this.getNextStep(dirs, c.coordinate);
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

	private getNextStep(dirs: Direction[], c: Coordinate): Direction {
		const directionToFinish: Direction = DirectionHelper.getVectorDirection(c, this.finish.coordinate);
		const oppositeDirection: Direction = DirectionHelper.getOpposite(directionToFinish);

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
		this.start.isFinish = true;
		this.finish.isFinish = true;
	}

	private addPathsToStartAndFinish() {
		for (let dir of DirectionHelper.directions) {
			if (this.start.hasBorder(dir)) {
				this.start.addPath(dir);
			}
			if (this.finish.hasBorder(dir)) {
				this.finish.addPath(dir);
			}
		}
	}

	protected getPossiblePathDirections(c: Cell): Direction[] {
		const result: Direction[] = [];
		for (let direction of DirectionHelper.directions) {
			if (this.isPossibleDirection(c, direction)) {
				result.push(direction);
			}
		}

		return result;
	}

	protected isPossibleDirection(c: Cell, direction: Direction): boolean {
		if (c.hasPath(direction) || c.hasBorder(direction)) {
			return false;
		}
		let neighbour: Cell = this.field.getCell(
			DirectionHelper.getXWithOffset(c.coordinate.x, direction),
			DirectionHelper.getYWithOffset(c.coordinate.y, direction)
		);
		return !neighbour.hasAnyPaths();
	}
}
