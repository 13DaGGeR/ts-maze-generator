import {ViewInterface} from "./ViewInterface";
import {Field} from "../Field";
import {AbstractHtmlView} from "./AbstractHtmlView";
import {Direction} from "../Direction";

export class TableView extends AbstractHtmlView implements ViewInterface {
	display(field: Field, path: string[] = []): void {
		const holder = this.generateAndGetMazeHolder();
		const cellBorderStyle = '3px solid black';
		const table = document.createElement('table');
		for (let row = 0; row < field.height; ++row) {
			let tr = document.createElement('tr');
			for (let col = 0; col < field.width; ++col) {
				let td = document.createElement('td');
				let cell = field.getCell(col, row);
				td.style.borderTop = cell.hasPath(Direction.up) ? 'none' : cellBorderStyle;
				td.style.borderRight = cell.hasPath(Direction.right) ? 'none' : cellBorderStyle;
				td.style.borderBottom = cell.hasPath(Direction.down) ? 'none' : cellBorderStyle;
				td.style.borderLeft = cell.hasPath(Direction.left) ? 'none' : cellBorderStyle;
				td.style.textAlign = 'center';
				td.style.verticalAlign = 'center';

				// debug
				if (cell.isFinish) {
					td.innerText = '*';
				} else {
					// td.innerText = cell.coordinate.asString();
				}

				if (path.indexOf(cell.coordinate.asString()) !== -1) {
					td.style.backgroundColor = '#eee';
				}

				tr.appendChild(td);
			}
			table.appendChild(tr);
		}

		const style = document.createElement('style');
		style.innerText = `
			table {
				border-collapse: collapse;
			}
			td {
				width: 50px;
				height: 50px;
			}
		`;

		holder.innerHTML = '';
		holder.appendChild(table);
		holder.appendChild(style);
	}
}

