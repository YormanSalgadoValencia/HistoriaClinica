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

    static fromJson(data: DetalleConsulta): DetalleConsulta {
        const detalleConsulta = new DetalleConsulta(data.id, data.fecha, data.especialidad, data.detalle);

        return detalleConsulta;
    }

    static toJson(detalleConsulta: DetalleConsulta): DetalleConsulta {
        return {
            id: detalleConsulta.id,
            fecha: detalleConsulta.fecha,
            especialidad: detalleConsulta.especialidad,
            detalle: detalleConsulta.detalle
        };
    }
}
