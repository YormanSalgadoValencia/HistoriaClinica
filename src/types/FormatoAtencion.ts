export class FormatoAtencion {
    _id: string;
    tipoEspecialidad: string;
    nombrePersonalizado: string;

    constructor(_id: string, tipoEspecialidad: string, nombrePersonalizado: string) {
        this._id = _id;
        this.tipoEspecialidad = tipoEspecialidad;
        this.nombrePersonalizado = nombrePersonalizado;
    }
}
