export class FormatoAtencion {
    id: string;
    tipoEspecialidad: string;
    nombrePersonalizado: string;

    constructor(id: string, tipoEspecialidad: string, nombrePersonalizado: string) {
        this.id = id;
        this.tipoEspecialidad = tipoEspecialidad;
        this.nombrePersonalizado = nombrePersonalizado;
    }

    static fromJson(data: FormatoAtencion): FormatoAtencion {
        const formatoAtencion = new FormatoAtencion(data.id, data.tipoEspecialidad, data.nombrePersonalizado);

        return formatoAtencion;
    }

    static toJson(formatoAtencion: FormatoAtencion): FormatoAtencion {
        return {
            id: formatoAtencion.id,
            tipoEspecialidad: formatoAtencion.tipoEspecialidad,
            nombrePersonalizado: formatoAtencion.nombrePersonalizado
        };
    }
}
