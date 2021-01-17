import {Field} from "../Field";

export interface ViewInterface {
	display(field: Field, path: string[]): void;
}
