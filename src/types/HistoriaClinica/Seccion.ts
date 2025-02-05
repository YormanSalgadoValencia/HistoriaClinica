import { Campo } from './Campo';

export class Seccion {
    _id: string;
    name: string;
    fields: Campo[];

    constructor(_id: string, name: string, fields: Campo[]) {
        this._id = _id;
        this.name = name;
        this.fields = fields;
    }
}
