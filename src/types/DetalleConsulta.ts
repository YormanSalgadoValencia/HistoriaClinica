export class DetalleConsulta {
    id: string;
    fecha: string;
    especialidad: string;
    detalle: string;

    constructor(id: string, fecha: string, especialidad: string, detalle: string) {
        this.id = id;
        this.fecha = fecha;
        this.especialidad = especialidad;
        this.detalle = detalle;
    }
}
