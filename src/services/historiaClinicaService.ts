import axios from 'axios';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';
import { Seccion } from '@/types/HistoriaClinica/Seccion';
import { Campo } from '@/types/HistoriaClinica/Campo';

const API_URL = 'http://localhost:3000';

/**
 * Obtiene el listado de historias clínicas desde el backend y las mapea a instancias de Plantilla.
 */
export const getHistoriasClinicas = async (): Promise<Plantilla[]> => {
    try {
        const response = await axios.get(`${API_URL}/historiasClinicas`);

        // Se mapea cada objeto de la respuesta a una instancia de Plantilla.
        return response.data.map(
            (plantilla: Plantilla) =>
                new Plantilla(
                    plantilla._id,
                    plantilla.name,
                    plantilla.description,
                    plantilla.sections.map(
                        (section: Seccion) =>
                            new Seccion(
                                section._id,
                                section.name,
                                section.fields.map((field: Campo) => new Campo(field._id, field.name, field.type, field.value))
                            )
                    )
                )
        );
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
        const plantilla = response.data;

        return new Plantilla(
            plantilla.id,
            plantilla.name,
            plantilla.description,
            plantilla.sections.map(
                (section: any) =>
                    new Seccion(
                        section.id,
                        section.name,
                        section.fields.map((field: any) => new Campo(field.id, field.name, field.type, field.value))
                    )
            )
        );
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear la historia clínica');
    }
};

/**
 * Obtiene una historia clínica específica por su ID.
 * @param id ID de la historia clínica a buscar.
 */
export const getHistoriaClinicaById = async (id: string): Promise<Plantilla> => {
    try {
        const response = await axios.get(`${API_URL}/historiasClinicas/${id}`);
        const plantilla = response.data;

        return new Plantilla(
            plantilla._id,
            plantilla.name,
            plantilla.description,
            plantilla.sections.map(
                (section: Seccion) =>
                    new Seccion(
                        section._id,
                        section.name,
                        section.fields.map((field: Campo) => new Campo(field._id, field.name, field.type, field.value))
                    )
            )
        );
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener la historia clínica por ID');
    }
};
