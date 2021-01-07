import {Coordinate} from "./Coordinate";
import {Direction} from "./Direction";

export class Cell {
	public coordinate: Coordinate;
	public isStart: boolean = false;
	public isFinish: boolean = false;

	protected paths: string[] = [];
	protected borders: string[] = [];

	constructor(x: number, y: number) {
		this.coordinate = new Coordinate(x, y);
	}

	public addPath(p: string): void {
		if (Direction.directions.indexOf(p) === -1) {
			throw new Error('Wrong direction provided');
		}

		if (this.paths.indexOf(p) === -1) {
			this.paths.push(p);
		}
	}

	public hasPath(p: string): boolean {
		return this.paths.indexOf(p) !== -1;
	}

	public hasAnyPaths(): boolean {
		return this.paths.length > 0;
	}

	public addBorder(p: string): void {
		if (Direction.directions.indexOf(p) === -1) {
			throw new Error('Wrong direction provided');
		}

		if (this.borders.indexOf(p) === -1) {
			this.borders.push(p);
		}
	}

	public hasBorder(p: string): boolean {
		return this.borders.indexOf(p) !== -1;
	}

	public getBorders(): string[] {
		return this.borders;
	}
}
