import { Especialidad } from './Especialidad';
export class FormatoAtencion {
    id: string;
    tipoEspecialidad: string;
    nombrePersonalizado: string;
    especialidad?: Especialidad;

    constructor(id: string, tipoEspecialidad: string, nombrePersonalizado: string, especialidad?: Especialidad) {
        this.id = id;
        this.tipoEspecialidad = tipoEspecialidad;
        this.nombrePersonalizado = nombrePersonalizado;
        this.especialidad = especialidad;
    }

    static fromJson(data: FormatoAtencion): FormatoAtencion {
        return new FormatoAtencion(
            data.id,
            data.tipoEspecialidad,
            data.nombrePersonalizado,
            data.especialidad ? Especialidad.fromJson(data.especialidad) : undefined
        );
    }

    static toJson(formatoAtencion: FormatoAtencion): FormatoAtencion {
        return new FormatoAtencion(
            formatoAtencion.id,
            formatoAtencion.tipoEspecialidad,
            formatoAtencion.nombrePersonalizado,
            formatoAtencion.especialidad ? Especialidad.toJson(formatoAtencion.especialidad) : undefined
        );
    }
}
