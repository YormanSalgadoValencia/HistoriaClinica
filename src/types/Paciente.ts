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
}
