export class Campo {
    _id: string;
    name: string;
    type: string;
    value: string | any[];

    constructor(_id: string, name: string, type: string, value: string = '') {
        this._id = _id;
        this.name = name;
        this.type = type;
        this.value = value;
    }
}
