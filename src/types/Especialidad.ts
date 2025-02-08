export class Especialidad {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    static fromJson(data: Especialidad): Especialidad {
        const especialidad = new Especialidad(data.id, data.name);

        return especialidad;
    }

    static toJson(especialidad: Especialidad): Especialidad {
        return {
            id: especialidad.id,
            name: especialidad.name
        };
    }
}
