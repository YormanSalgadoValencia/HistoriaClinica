export class FormatoAtencion {
    id: string;
    tipoEspecialidad: string;
    nombrePersonalizado: string;

    constructor(id: string, tipoEspecialidad: string, nombrePersonalizado: string) {
        this.id = id;
        this.tipoEspecialidad = tipoEspecialidad;
        this.nombrePersonalizado = nombrePersonalizado;
    }
}
