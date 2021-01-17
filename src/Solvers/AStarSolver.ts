import {SolverInterface} from "./SolverInterface";
import {Field} from "../Field";
import {Cell} from "../Cell";
import {DirectionHelper} from "../Direction";
import {Coordinate} from "../Coordinate";

export class AStarSolver implements SolverInterface {
	protected field: Field = null;
	protected parentsCoordinates: { [id: string]: string } = {};
	protected cellWeights: { [id: string]: number } = {};
	protected processedCoordinates: string[] = [];
	protected queue: string[] = [];

	protected start: Cell = null;
	protected finish: Cell = null;

	solve(field: Field): string[] {
		this.field = field;
		this.start = field.finishCells[0];
		this.finish = field.finishCells[1];
		this.enqueueCellNeighbours(this.start);

		let limit = field.width * field.height * 2;
		while (1) {
			let currentCell = this.getOptimalCell();
			if (currentCell === this.finish || --limit < 0) {
				break;
			}
			this.enqueueCellNeighbours(currentCell);
		}
		return this.getPath();
	}

	protected getPath(): string[] {
		const result: string[] = [];
		let current: Cell = this.finish;
		let limit = this.field.width * this.field.height;
		let parentK: string | null;
		do {
			result.push(current.coordinate.asString());
			parentK = this.parentsCoordinates[current.coordinate.asString()] || null;
			if (parentK !== null) {
				let c = Coordinate.unpack(parentK);
				current = this.field.getCell(c.x, c.y);
			}
		} while (parentK !== null && limit > 0)
		return result;
	}

	protected getOptimalCell(): Cell {
		let minWeight: number = Infinity;
		let optimalCellKey: string;
		for (let key of this.queue) {
			if (this.processedCoordinates.indexOf(key) !== -1) {
				continue;
			}

			let weight = this.cellWeights[key];
			if (weight < minWeight) {
				minWeight = weight;
				optimalCellKey = key;
			}
		}

		this.processedCoordinates.push(optimalCellKey);
		this.queue.splice(this.queue.indexOf(optimalCellKey), 1);
		const optimalCellCoordinate = Coordinate.unpack(optimalCellKey);
		return this.field.getCell(optimalCellCoordinate.x, optimalCellCoordinate.y);
	}

	protected enqueueCellNeighbours(c: Cell): void {
		for (let dir of DirectionHelper.directions) {
			let dx = DirectionHelper.getXWithOffset(c.coordinate.x, dir),
				dy = DirectionHelper.getYWithOffset(c.coordinate.y, dir);
			if (
				this.parentsCoordinates[c.coordinate.asString()] !== Coordinate.pack(dx, dy)
				&& c.hasPath(dir)
				&& !c.hasBorder(dir)
			) {
				let neighbour = this.field.getCell(dx, dy);
				if (neighbour === null) {
					continue;
				}
				this.enqueueCell(neighbour, c);
			}
		}
	}

	protected enqueueCell(c: Cell, parent: Cell): void {
		const weight = this.getWeight(c, parent);
		const key = c.coordinate.asString();
		const currentWeight = this.cellWeights[key] || Infinity;
		if (weight < currentWeight) {
			this.cellWeights[key] = weight;
			this.parentsCoordinates[key] = parent.coordinate.asString();
		}
		this.queue.push(key);
	}

	protected getWeight(c: Cell, parent: Cell): number {
		const parentWeight = this.cellWeights[parent.coordinate.asString()] || 0;
		const distanceToFinish = c.coordinate.distanceTo(this.finish.coordinate);
		return 1 + parentWeight + distanceToFinish;
	}

}