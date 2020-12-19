import {Field} from "./Field";
import {Generator} from "./Generator";

const field = new Field(20, 15);
const generator = new Generator(field);
generator.generate();

//field.print();

export {field};
