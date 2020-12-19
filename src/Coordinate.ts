export class Coordinate {
	constructor(public x: number, public y: number) {}

	public asString(): string {
		return Coordinate.pack(this.x, this.y);
	}

	public static pack(x: number, y: number): string {
		return x + ':' + y;
	}
}