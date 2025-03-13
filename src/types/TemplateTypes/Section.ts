import { Field } from './Field';

export class Section {
    id: string;
    name: string;
    fields: Field[];

    constructor(id: string, name: string, fields: Field[]) {
        this.id = id;
        this.name = name;
        this.fields = fields;
    }

    static fromJson(data: Section): Section {
        const seccion = new Section(
            data.id,
            data.name,
            data.fields.map((field) => Field.fromJSON(field))
        );

        return seccion;
    }

    static toJSON(seccion: Section): Section {
        return {
            id: seccion.id,
            name: seccion.name,
            fields: seccion.fields.map((field) => Field.toJson(field))
        };
    }
}
