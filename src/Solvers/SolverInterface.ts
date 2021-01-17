import {Field} from "../Field";

export interface SolverInterface {
	solve(field: Field): string[];
}
