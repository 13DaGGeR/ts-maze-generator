import {Generator} from "../../src/Generator";
import {ViewInterface} from "../../src/view/ViewInterface";
import {TableView} from "../../src/view/TableView";

document.addEventListener("DOMContentLoaded", () => {
	const url = new URL(window.location.toString());
	const params = new URLSearchParams(url.search);
	const width: number = parseInt(params.get('width') || '30');
	const height: number = parseInt(params.get('height') || '15');
	const viewType: string = params.get('view') || 'table';

	drawForm(width, height);

	const generator = new Generator(width, height);
	const view: ViewInterface = getView(viewType);
	const field = generator.generate();
	view.display(field);
});

function getView(viewType: string): ViewInterface {
	switch (viewType) {
		case 'table':
		default:
			return new TableView();
	}
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
