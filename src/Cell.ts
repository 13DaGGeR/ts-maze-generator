import {Coordinate} from "./Coordinate";
import {Direction} from "./Direction";

export class Cell {
	public coordinate: Coordinate;
	public isFinish: boolean = false;

	protected paths: Direction[] = [];
	protected borders: Direction[] = [];

	constructor(x: number, y: number) {
		this.coordinate = new Coordinate(x, y);
	}

	public addPath(p: Direction): void {
		if (this.paths.indexOf(p) === -1) {
			this.paths.push(p);
		}
	}

	public hasPath(p: Direction): boolean {
		return this.paths.indexOf(p) !== -1;
	}

	public hasAnyPaths(): boolean {
		return this.paths.length > 0;
	}

	public addBorder(p: Direction): void {
		if (this.borders.indexOf(p) === -1) {
			this.borders.push(p);
		}
	}

	public hasBorder(p: Direction): boolean {
		return this.borders.indexOf(p) !== -1;
	}

	public getBorders(): Direction[] {
		return this.borders;
	}
}
