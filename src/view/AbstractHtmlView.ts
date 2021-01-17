import {Field} from "../Field";
import {ViewInterface} from "./ViewInterface";

export abstract class AbstractHtmlView implements ViewInterface {
	protected generateAndGetMazeHolder() {
		const id = 'maze';
		let el = document.getElementById(id);
		if (el === null) {
			el = document.createElement('div');
			el.setAttribute('id', id);
			document.body.appendChild(el);
		}

		return el;
	}

	abstract display(field: Field, path: string[]): void;
}
