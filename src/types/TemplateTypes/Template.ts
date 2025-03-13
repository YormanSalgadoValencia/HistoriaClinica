import { Section } from './Section';

export class Template {
    id: string;
    name: string;
    description: string;
    sections: Section[];
    categories: string[];

    constructor(id: string, name: string, description: string, sections: Section[], categories: string[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sections = sections;
        this.categories = categories;
    }

    static fromJson(data: Template): Template {
        const plantilla = new Template(
            data.id,
            data.name,
            data.description,
            data.sections.map((section) => Section.fromJson(section)),
            data.categories
        );

        return plantilla;
    }

    static toJson(plantilla: Template): Template {
        return {
            id: plantilla.id,
            name: plantilla.name,
            description: plantilla.description,
            sections: plantilla.sections.map((section) => Section.toJSON(section)),
            categories: plantilla.categories
        };
    }
}
