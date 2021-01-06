import {Coordinate} from "./Coordinate";

export class Direction {
	static get dirUp(): string {
		return '↑';
	}

	static get dirRight(): string {
		return '→';
	}

	static get dirDown(): string {
		return '↓';
	}

	static get dirLeft(): string {
		return '←';
	}

	static get directions(): string[] {
		return [
			Direction.dirUp,
			Direction.dirRight,
			Direction.dirDown,
			Direction.dirLeft,
		];
	}

	static getXWithOffset(x: number, d: string) {
		if (d === this.dirRight) {
			return x + 1;
		} else if (d === this.dirLeft) {
			return x - 1;
		}
		return x;
	}

	static getYWithOffset(y: number, d: string) {
		if (d === this.dirUp) {
			return y - 1;
		} else if (d === this.dirDown) {
			return y + 1;
		}
		return y;
	}

	static getOpposite(d: string) {
		switch (d) {
			case this.dirDown:
				return this.dirUp;
			case this.dirUp:
				return this.dirDown;
			case this.dirLeft:
				return this.dirRight;
			case this.dirRight:
				return this.dirLeft;
		}

		throw new Error('wrong direction');
	}

	static getVectorDirection(from: Coordinate, to: Coordinate): string {
		const verticalDistance: number = from.y - to.y,
			horizontalDistance = from.x - to.x;
		if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
			return verticalDistance > 0 ? Direction.dirUp : Direction.dirDown;
		}
		return  horizontalDistance > 0 ? Direction.dirLeft : Direction.dirRight;
	}
}
