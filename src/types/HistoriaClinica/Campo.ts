import { Structure } from './Structure';
export class Campo {
    id: string;
    name: string;
    label?: string;
    type: string;
    category?: string;
    description?: string;
    structure?: Structure;
    value?: string | any[] | Record<string, any>;

    constructor(
        id: string,
        name: string,
        type: string,
        label?: string,
        category?: string,
        description?: string,
        structure?: Structure,
        value?: string | any[] | Record<string, any>
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.label = label;
        this.category = category;
        this.description = description;
        this.structure = structure;
        this.value = value;
    }

    // Método estático para mapear un JSON a una instancia de Campo, aprovechando Structure.fromJSON
    static fromJSON(data: Campo): Campo {
        let structure;
        if (data.structure) {
            structure = Structure.fromJson(data.structure);
        }
        return new Campo(data.id, data.name, data.type, data.label, data.category, data.description, structure, data.value);
    }

    static toJson(campo: Campo): Campo {
        let structure;
        if (campo.structure) {
            structure = Structure.toJSON(campo.structure);
        }
        return new Campo(campo.id, campo.name, campo.type, campo.label, campo.category, campo.description, structure, campo.value);
    }
}
