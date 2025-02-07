import { Seccion } from './Seccion';

export class Plantilla {
    id: string;
    name: string;
    description: string;
    sections: Seccion[];

    constructor(_id: string, name: string, description: string, sections: Seccion[]) {
        this.id = _id;
        this.name = name;
        this.description = description;
        this.sections = sections;
    }
}
