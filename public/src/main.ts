import {Generator} from "../../src/Generator";
import {ViewInterface} from "../../src/view/ViewInterface";
import {TableView} from "../../src/view/TableView";
import {AStarSolver} from "../../src/Solvers/AStarSolver";
import {InlineSvgView} from "../../src/view/InlineSvgView";

document.addEventListener("DOMContentLoaded", () => {
	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);
	const width: number = parseInt(params.get('width') || '30');
	const height: number = parseInt(params.get('height') || '15');
	const viewType: string = params.get('view') || 'svg';

	drawForm(width, height, viewType);

	const generator = new Generator(width, height);
	const view: ViewInterface = getView(viewType);
	const field = generator.generate();
	view.display(field, []);

	document.getElementById('solve').addEventListener('click', () => {
		const solver = new AStarSolver();
		let path = solver.solve(field);
		view.display(field, path);
	});
});

function getView(viewType: string): ViewInterface {
	switch (viewType) {
		case 'svg':
			return new InlineSvgView();
		case 'table':
		default:
			return new TableView();
	}
}

function drawForm(width: number, height: number, view: string) {
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
			<label>
				view:
				<label><input type="radio" name="view" value="svg" ${view === 'svg' ? 'checked' : ''}/> inline svg</label>
				<label><input type="radio" name="view" value="table" ${view === 'table' ? 'checked' : ''}/> table</label>
			</label>
			<br />
			<button type="submit">Generate</button>
			<button type="button" id="solve">Solve</button>
		</form>
	`;
	document.body.innerHTML += form;
}
