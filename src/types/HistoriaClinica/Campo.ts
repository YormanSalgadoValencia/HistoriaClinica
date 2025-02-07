export class Campo {
    id: string;
    name: string;
    type: string;
    value: string | any[];

    constructor(id: string, name: string, type: string, value: string = '') {
        this.id = id;
        this.name = name;
        this.type = type;
        this.value = value;
    }
}
