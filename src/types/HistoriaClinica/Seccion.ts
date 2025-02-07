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
}
