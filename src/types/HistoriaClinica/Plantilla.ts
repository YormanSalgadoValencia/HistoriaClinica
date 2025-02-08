import { Seccion } from './Seccion';

export class Plantilla {
    id: string;
    name: string;
    description: string;
    sections: Seccion[];
    categories: string[];

    constructor(_id: string, name: string, description: string, sections: Seccion[], categories: string[]) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.sections = sections;
        this.categories = categories;
    }
}
