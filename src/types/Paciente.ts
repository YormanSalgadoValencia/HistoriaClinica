import { Atencion } from './Atencion';

export class Paciente {
    id: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    genero: string;
    numeroDocumento: string;
    acompanante: string;
    responsable: string;

    atenciones: Atencion[];

    constructor(
        id: string,
        nombre: string,
        apellido: string,
        fechaNacimiento: string,
        genero: string,
        numeroDocumento: string,
        acompanante: string,
        responsable: string
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.genero = genero;
        this.numeroDocumento = numeroDocumento;
        this.acompanante = acompanante;
        this.responsable = responsable;
        this.atenciones = [];
    }

    static fromJson(data: Paciente): Paciente {
        const paciente = new Paciente(
            data.id,
            data.nombre,
            data.apellido,
            data.fechaNacimiento,
            data.genero,
            data.numeroDocumento,
            data.acompanante,
            data.responsable
        );
        paciente.atenciones = data.atenciones || [];
        return paciente;
    }

    static toJson(paciente: Paciente): Paciente {
        return {
            id: paciente.id,
            nombre: paciente.nombre,
            apellido: paciente.apellido,
            fechaNacimiento: paciente.fechaNacimiento,
            genero: paciente.genero,
            numeroDocumento: paciente.numeroDocumento,
            acompanante: paciente.acompanante,
            responsable: paciente.responsable,
            atenciones: paciente.atenciones
        };
    }
}
