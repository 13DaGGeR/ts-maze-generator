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

	public static unpack(packed: string): Coordinate {
		const c: string[] = packed.split(':');
		if (c.length !== 2) {
			throw new Error('bad string to unpack:' + packed);
		}

		const x = parseInt(c[0]);
		const y = parseInt(c[1]);
		if (x < 0 || y < 0) {
			throw new Error('bad string to unpack:' + packed);
		}

		return new Coordinate(x, y);
	}
}