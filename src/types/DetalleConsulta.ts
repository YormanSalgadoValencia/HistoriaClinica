export class DetalleConsulta {
    _id: string;
    fecha: string;
    especialidad: string;
    detalle: string;

    constructor(_id: string, fecha: string, especialidad: string, detalle: string) {
        this._id = _id;
        this.fecha = fecha;
        this.especialidad = especialidad;
        this.detalle = detalle;
    }
}
