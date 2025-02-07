import { Seccion } from './Seccion';

export class Plantilla {
    id: string;
    name: string;
    description: string;
    sections: Seccion[];

    constructor(id: string, name: string, description: string, sections: Seccion[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sections = sections;
    }
}
