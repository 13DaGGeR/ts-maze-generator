import {Coordinate} from "./Coordinate";

export const enum Direction {
	up = '↑',
	right = '→',
	down = '↓',
	left = '←',
}

export class DirectionHelper {
	static get directions(): Direction[] {
		return [
			Direction.up,
			Direction.right,
			Direction.down,
			Direction.left,
		];
	}

	static getXWithOffset(x: number, d: Direction): number {
		if (d === Direction.right) {
			return x + 1;
		} else if (d === Direction.left) {
			return x - 1;
		}
		return x;
	}

	static getYWithOffset(y: number, d: Direction): number {
		if (d === Direction.up) {
			return y - 1;
		} else if (d === Direction.down) {
			return y + 1;
		}
		return y;
	}

	static getOpposite(d: Direction): Direction {
		switch (d) {
			case Direction.down:
				return Direction.up;
			case Direction.up:
				return Direction.down;
			case Direction.left:
				return Direction.right;
			case Direction.right:
				return Direction.left;
		}

		throw new Error('wrong direction');
	}

	static getVectorDirection(from: Coordinate, to: Coordinate): Direction {
		const verticalDistance: number = from.y - to.y,
			horizontalDistance = from.x - to.x;
		if (Math.abs(verticalDistance) > Math.abs(horizontalDistance)) {
			return verticalDistance > 0 ? Direction.up : Direction.down;
		}
		return  horizontalDistance > 0 ? Direction.left : Direction.right;
	}
}
