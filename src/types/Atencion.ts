import { FormatoAtencion } from './FormatoAtencion';
import { Plantilla } from './HistoriaClinica/Plantilla';

export class Atencion {
    _id: string;
    fechaAtencion: Date;
    modalidadAtencion: string;
    consecutivoAtencion: string;
    informacionAdicional?: string; // Opcional
    tiposAtencion: FormatoAtencion; // Relación uno a uno con FormatoAtencion
    historiaClinica?: Plantilla; // Relación uno a uno con la historia clínica

    constructor(
        _id: string,
        fechaAtencion: string, // Recibe string y convierte a Date
        modalidadAtencion: string,
        consecutivoAtencion: string,
        tiposAtencion: FormatoAtencion, // Se espera un objeto, no un array
        informacionAdicional?: string, // Valor por defecto si no viene
        historiaClinica?: Plantilla // Se espera un objeto de tipo Plantilla
    ) {
        this._id = _id;
        this.fechaAtencion = new Date(fechaAtencion); // Convertir a Date
        this.modalidadAtencion = modalidadAtencion;
        this.consecutivoAtencion = consecutivoAtencion;
        this.informacionAdicional = informacionAdicional;
        this.tiposAtencion = tiposAtencion;
        this.historiaClinica = historiaClinica;
    }
}
