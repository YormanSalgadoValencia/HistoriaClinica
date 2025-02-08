import axios from 'axios';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';

const API_URL = 'http://localhost:3000';

/**
 * Obtiene el listado de historias clínicas y las mapea a instancias de Plantilla.
 */
export const getHistoriasClinicas = async (): Promise<Plantilla[]> => {
    try {
        const response = await axios.get(`${API_URL}/historiasClinicas`);
        return response.data.map((data: Plantilla) => Plantilla.fromJson(data));
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener las historias clínicas');
    }
};

/**
 * Crea una nueva historia clínica en el backend y la retorna como una instancia de Plantilla.
 * @param payload Datos necesarios para crear la historia clínica.
 */
export const createHistoriaClinica = async (payload: {
    id: string;
    name: string;
    description: string;
    sections: {
        id: string;
        name: string;
        fields: {
            id: string;
            name: string;
            type: string;
            value: string;
        }[];
    }[];
}): Promise<Plantilla> => {
    try {
        const response = await axios.post(`${API_URL}/historiasClinicas`, payload);
        return Plantilla.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear la historia clínica');
    }
};

/**
 * Obtiene una historia clínica específica por su ID y la mapea a una instancia de Plantilla.
 * @param id ID de la historia clínica a buscar.
 */
export const getHistoriaClinicaById = async (id: string): Promise<Plantilla> => {
    try {
        const response = await axios.get(`${API_URL}/historiasClinicas/${id}`);
        return Plantilla.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener la historia clínica por ID');
    }
};
