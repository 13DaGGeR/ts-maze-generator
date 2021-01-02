import {Generator} from "../../src/Generator";
import {Direction} from "../../src/Direction";

document.addEventListener("DOMContentLoaded", () => {
	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);
	const width = parseInt(params.get('width') || '30');
	const height = parseInt(params.get('height') || '15');
	drawForm(width, height);
	generate(width, height);
});

function generateAndGetMazeHolder() {
	const id = 'maze';
	let el = document.getElementById(id);
	if (el === null) {
		el = document.createElement('div');
		el.setAttribute('id', id);
		document.body.appendChild(el);
	}

	return el;
}

function generate(width: number, height: number) {
	const holder = generateAndGetMazeHolder();
	const cellBorderStyle = '3px solid black';

	const generator = new Generator(width, height);
	const field = generator.generate();

	const table = document.createElement('table');
	for (let row = 0; row < height; ++row) {
		let tr = document.createElement('tr');
		for (let col = 0; col < width; ++col) {
			let td = document.createElement('td');
			let cell = field.getCell(col, row);
			td.style.borderTop = cell.hasPath(Direction.dirUp) ? 'none' : cellBorderStyle;
			td.style.borderRight = cell.hasPath(Direction.dirRight) ? 'none' : cellBorderStyle;
			td.style.borderBottom = cell.hasPath(Direction.dirDown) ? 'none' : cellBorderStyle;
			td.style.borderLeft = cell.hasPath(Direction.dirLeft) ? 'none' : cellBorderStyle;
			td.style.textAlign = 'center';
			td.style.verticalAlign = 'center';

			// debug
			if (cell === generator.start) {
				td.innerText = 's';
			} else if (cell === generator.finish) {
				td.innerText = 'f';
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

function drawForm(width: number, height: number) {
	const form = `
		<form>
			<label>
				width:
				<input type="number" value="${width}" name="width" required/>
			</label>
			<br />
			<label>
				height:
				<input type="number" value="${height}" name="height" required/>
			</label>
			<br />
			<button type="submit">Generate</button>
		</form>
	`;
	document.body.innerHTML += form;
}
