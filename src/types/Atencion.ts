import { FormatoAtencion } from './FormatoAtencion';
import { Plantilla } from './HistoriaClinica/Plantilla';

export class Atencion {
    id: string;
    fechaAtencion: Date;
    modalidadAtencion: string;
    consecutivoAtencion: string;
    informacionAdicional?: string; // Opcional
    tiposAtencion: FormatoAtencion; // Relación uno a uno con FormatoAtencion
    historiaClinica?: Plantilla; // Relación uno a uno con la historia clínica

    constructor(
        id: string,
        fechaAtencion: string, // Recibe string y convierte a Date
        modalidadAtencion: string,
        consecutivoAtencion: string,
        tiposAtencion: FormatoAtencion, // Se espera un objeto, no un array
        informacionAdicional?: string, // Valor por defecto si no viene
        historiaClinica?: Plantilla // Se espera un objeto de tipo Plantilla
    ) {
        this.id = id;
        this.fechaAtencion = new Date(fechaAtencion); // Convertir a Date
        this.modalidadAtencion = modalidadAtencion;
        this.consecutivoAtencion = consecutivoAtencion;
        this.informacionAdicional = informacionAdicional;
        this.tiposAtencion = tiposAtencion;
        this.historiaClinica = historiaClinica;
    }

    // Método para convertir de JSON a instancia de Atencion
    static fromJson(data: Atencion): Atencion {
        return new Atencion(
            data.id,
            data.fechaAtencion.toString(),
            data.modalidadAtencion,
            data.consecutivoAtencion,
            FormatoAtencion.fromJson(data.tiposAtencion), // Convertir a instancia de FormatoAtencion
            data.informacionAdicional,
            data.historiaClinica ? Plantilla.fromJson(data.historiaClinica) : undefined // Convertir a instancia de Plantilla
        );
    }

    // Método para convertir de instancia de Atencion a JSON
    static toJson(atencion: Atencion): Atencion {
        return new Atencion(
            atencion.id,
            atencion.fechaAtencion.toString(),
            atencion.modalidadAtencion,
            atencion.consecutivoAtencion,
            FormatoAtencion.toJson(atencion.tiposAtencion), // Convertir a JSON
            atencion.informacionAdicional,
            atencion.historiaClinica ? Plantilla.toJson(atencion.historiaClinica) : undefined // Convertir a JSON
        );
    }
}
