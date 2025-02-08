import { Campo } from './Campo';

export class Seccion {
    id: string;
    name: string;
    fields: Campo[];

    constructor(id: string, name: string, fields: Campo[]) {
        this.id = id;
        this.name = name;
        this.fields = fields;
    }

    static fromJson(data: Seccion): Seccion {
        const seccion = new Seccion(
            data.id,
            data.name,
            data.fields.map((field) => Campo.fromJSON(field))
        );

        return seccion;
    }

    static toJSON(seccion: Seccion): Seccion {
        return {
            id: seccion.id,
            name: seccion.name,
            fields: seccion.fields.map((field) => Campo.toJson(field))
        };
    }
}
