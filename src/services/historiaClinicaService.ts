import axios from 'axios';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';
import { Seccion } from '@/types/HistoriaClinica/Seccion';
import { Campo } from '@/types/HistoriaClinica/Campo';

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

/**
 * Actualiza una historia clínica en el backend.
 * @param id ID de la historia clínica a actualizar.
 * @param payload Datos actualizados de la historia clínica.
 */
export const updateHistoriaClinica = async (
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
        const response = await axios.put(`${API_URL}/historiasClinicas/${id}`, payload);
        return Plantilla.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al actualizar la historia clínica');
    }
};

/**
 * Elimina una historia clínica en el backend.
 * @param id ID de la historia clínica a eliminar.
 */
export const deleteHistoriaClinica = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/historiasClinicas/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al eliminar la historia clínica');
    }
};

export const getHistoriaClinicaStandard = async (): Promise<Plantilla> => {
    try {
        const response = await axios.get(`${API_URL}/historiaClinicaEstandar`);
        const plantilla = response.data;

        console.log(JSON.stringify(response.data));
        
        return new Plantilla(
            plantilla.id,
            plantilla.name,
            plantilla.description,
            plantilla.sections.map(
                (section: Seccion) =>
                    new Seccion(
                        section.id,
                        section.name,
                        section.fields.map(
                            (field: Campo) =>
                                new Campo(
                                    field.id,
                                    field.name,
                                    field.type,
                                    field.type === 'list' && typeof field.value === 'string' ? JSON.parse(field.value) : field.value
                                )
                        )
                    )
            ),
            plantilla.categories,
        );
        
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Si buenas');
    }
};
