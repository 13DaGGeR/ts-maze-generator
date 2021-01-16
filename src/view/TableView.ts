import {ViewInterface} from "./ViewInterface";
import {Field} from "../Field";
import {AbstractHtmlView} from "./AbstractHtmlView";
import {Direction} from "../Direction";

export class TableView extends AbstractHtmlView implements ViewInterface {
	display(field: Field): void {
		const holder = this.generateAndGetMazeHolder();
		const cellBorderStyle = '3px solid black';
		const table = document.createElement('table');
		for (let row = 0; row < field.height; ++row) {
			let tr = document.createElement('tr');
			for (let col = 0; col < field.width; ++col) {
				let td = document.createElement('td');
				let cell = field.getCell(col, row);
				td.style.borderTop = cell.hasPath(Direction.dirUp) ? 'none' : cellBorderStyle;
				td.style.borderRight = cell.hasPath(Direction.dirRight) ? 'none' : cellBorderStyle;
				td.style.borderBottom = cell.hasPath(Direction.dirDown) ? 'none' : cellBorderStyle;
				td.style.borderLeft = cell.hasPath(Direction.dirLeft) ? 'none' : cellBorderStyle;
				td.style.textAlign = 'center';
				td.style.verticalAlign = 'center';

				// debug
				if (cell.isFinish) {
					td.innerText = '*';
				} else {
					//td.innerText = '';
				}

				tr.appendChild(td);
			}
			table.appendChild(tr);
		}

		holder.innerHTML = '';
		holder.appendChild(table);
	}
}

