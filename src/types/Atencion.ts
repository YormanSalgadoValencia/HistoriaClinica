import { FormatoAtencion } from './FormatoAtencion';
import { Plantilla } from './HistoriaClinica/Plantilla';

export class Atencion {
    id: string;
    fechaAtencion: Date;
    modalidadAtencion: string;
    consecutivoAtencion: string;
    informacionAdicional?: string;
    tiposAtencion: FormatoAtencion;
    historiaClinica?: Plantilla;

    constructor(
        id: string,
        fechaAtencion: string,
        modalidadAtencion: string,
        consecutivoAtencion: string,
        tiposAtencion: FormatoAtencion,
        informacionAdicional?: string,
        historiaClinica?: Plantilla
    ) {
        this.id = id;
        this.fechaAtencion = new Date(fechaAtencion);
        this.modalidadAtencion = modalidadAtencion;
        this.consecutivoAtencion = consecutivoAtencion;
        this.informacionAdicional = informacionAdicional;
        this.tiposAtencion = tiposAtencion;
        this.historiaClinica = historiaClinica;
    }

    // Convertir a instancia de FormatoAtencion
    // Método para convertir de JSON a instancia de Atencion
    // Convertir a instancia de Plantilla
    
    static fromJson(data: Atencion): Atencion {
        return new Atencion(
            data.id,
            data.fechaAtencion.toString(),
            data.modalidadAtencion,
            data.consecutivoAtencion,
            FormatoAtencion.fromJson(data.tiposAtencion), 
            data.informacionAdicional,
            data.historiaClinica ? Plantilla.fromJson(data.historiaClinica) : undefined 
        );
    }

    // Método para convertir de instancia de Atencion a JSON
    // Convertir a JSON
    // Convertir a JSON

    static toJson(atencion: Atencion): Atencion {
        return new Atencion(
            atencion.id,
            atencion.fechaAtencion.toString(),
            atencion.modalidadAtencion,
            atencion.consecutivoAtencion,
            FormatoAtencion.toJson(atencion.tiposAtencion), 
            atencion.informacionAdicional,
            atencion.historiaClinica ? Plantilla.toJson(atencion.historiaClinica) : undefined 
        );
    }
}
