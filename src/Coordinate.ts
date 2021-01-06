export class Coordinate {
	constructor(public x: number, public y: number) {}

	public asString(): string {
		return Coordinate.pack(this.x, this.y);
	}

	public static pack(x: number, y: number): string {
		return x + ':' + y;
	}

	public distanceTo(to: Coordinate): number {
		let dx: number = this.x - to.x,
			dy: number = this.y - to.y;
		return Math.sqrt(dx ** 2 + dy ** 2);
	}
}