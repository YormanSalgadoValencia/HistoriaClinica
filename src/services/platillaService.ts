import axios from 'axios';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';

const API_URL = 'http://localhost:3000';

/**
 * Obtiene el listado de todas las plantillas de historias clínicas.
 */
export const getPlantillas = async (): Promise<Plantilla[]> => {
    try {
        const response = await axios.get(`${API_URL}/Plantilla`);
        return response.data.map((data: Plantilla) => Plantilla.fromJson(data));
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener las plantillas');
    }
};

/**
 * Crea una nueva plantilla de historia clínica en el backend y la retorna como una instancia de Plantilla.
 * @param payload Datos necesarios para crear la plantilla.
 */
export const createPlantilla = async (payload: {
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
            label?: string;
            category?: string;
            description?: string;
            structure?: {
                min?: number;
                max?: number;
                units?: string;
                options?: string[];
            };
            value?: string | any[] | Record<string, any>;
        }[];
    }[];
    categories: string[];
}): Promise<Plantilla> => {
    try {
        const response = await axios.post(`${API_URL}/historiasClinicas`, payload);
        console.log(response.data);
        return Plantilla.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear la plantilla');
    }
};

/**
 * Obtiene una plantilla de historia clínica específica por su ID.
 * @param id ID de la plantilla a obtener.
 */
export const getPlantillaById = async (id: string): Promise<Plantilla> => {
    try {
        const response = await axios.get(`${API_URL}/Plantilla/${id}`);
        return Plantilla.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener la plantilla');
    }
};

/**
 * Actualiza una plantilla de historia clínica en el backend.
 * @param id ID de la plantilla a actualizar.
 * @param payload Datos actualizados de la plantilla.
 */
export const updatePlantilla = async (
    id: string,
    payload: {
        name: string;
        description: string;
        sections: {
            id: string;
            name: string;
            fields: {
                id: string;
                name: string;
                type: string;
                label?: string;
                category?: string;
                description?: string;
                structure?: {
                    min?: number;
                    max?: number;
                    units?: string;
                    options?: string[];
                };
                value?: string | any[] | Record<string, any>;
            }[];
        }[];
        categories: string[];
    }
): Promise<Plantilla> => {
    try {
        const response = await axios.put(`${API_URL}/Plantilla/${id}`, payload);
        return Plantilla.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al actualizar la plantilla');
    }
};

/**
 * Elimina una plantilla de historia clínica en el backend.
 * @param id ID de la plantilla a eliminar.
 */
export const deletePlantilla = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/Plantilla/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al eliminar la plantilla');
    }
};
