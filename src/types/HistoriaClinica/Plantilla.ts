import { Seccion } from './Seccion';

export class Plantilla {
    id: string;
    name: string;
    description: string;
    sections: Seccion[];
    categories: string[];

    constructor(id: string, name: string, description: string, sections: Seccion[], categories: string[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sections = sections;
        this.categories = categories;
    }

    static fromJson(data: Plantilla): Plantilla {
        const plantilla = new Plantilla(
            data.id,
            data.name,
            data.description,
            data.sections.map((section) => Seccion.fromJson(section)),
            data.categories
        );

        return plantilla;
    }

    static toJson(plantilla: Plantilla): Plantilla {
        return {
            id: plantilla.id,
            name: plantilla.name,
            description: plantilla.description,
            sections: plantilla.sections.map((section) => Seccion.toJSON(section)),
            categories: plantilla.categories
        };
    }
}
