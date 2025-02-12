import axios from 'axios';
import { Atencion } from '../types/Atencion';
import { FormatoAtencion } from '../types/FormatoAtencion';
import { Plantilla } from '../types/HistoriaClinica/Plantilla';

const API_URL = 'http://localhost:3000';

//Obtiene el listado de atenciones desde el backend y las mapea a instancias de Atencion.
export const getAtenciones = async (): Promise<Atencion[]> => {
    try {
        const response = await axios.get(`${API_URL}/atencion`);
        // Se asume que cada objeto recibido se mapea a través del método estático fromJSON.
        return response.data.map((data: Atencion) => Atencion.fromJson(data));
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener las atenciones');
    }
};

// Crea una nueva atención en el backend y la retorna como una instancia de Atencion.
// @param payload Datos necesarios para crear la atención.
// Si la historia clínica posee un método para serializarse, se invoca; de lo contrario, se envía tal cual.
export const createAtencion = async (payload: {
    id: string;
    fechaAtencion: Date;
    modalidadAtencion: string;
    consecutivoAtencion: string;
    informacionAdicional?: string;
    tiposAtencion: FormatoAtencion;
    historiaClinica?: Plantilla;
}): Promise<Atencion> => {
    try {
        const requestBody = {
            ...payload,
            historiaClinica:
                payload.historiaClinica && typeof Plantilla.toJson === 'function'
                    ? Plantilla.toJson(payload.historiaClinica)
                    : payload.historiaClinica
        };

        const response = await axios.post(`${API_URL}/atencion`, requestBody);
        return Atencion.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear la atención');
    }
};
