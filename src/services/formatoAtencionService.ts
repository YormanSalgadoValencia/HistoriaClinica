import axios from 'axios';
import { FormatoAtencion } from '../types/FormatoAtencion';

const API_URL = 'http://localhost:3000';

// Función para listar los formatos de atención
export const getFormatosAtencion = async (): Promise<FormatoAtencion[]> => {
    try {
        const response = await axios.get(`${API_URL}/formatosAtencion`);
        return response.data.map((item: FormatoAtencion) => new FormatoAtencion(item.id, item.tipoEspecialidad, item.nombrePersonalizado));
    } catch (error) {
        console.error('Error al obtener los formatos de atención:', error);
        throw error;
    }
};

// Función para crear un nuevo formato de atención
export const createFormatoAtencion = async (formato: FormatoAtencion): Promise<FormatoAtencion> => {
    try {
        const response = await axios.post(`${API_URL}/formatosAtencion`, {
            tipoEspecialidad: formato.tipoEspecialidad,
            nombrePersonalizado: formato.nombrePersonalizado
        });
        // Retorna el nuevo formato de atención creado, transformado en un objeto de la clase FormatoAtencion
        return new FormatoAtencion(response.data._id, response.data.tipoEspecialidad, response.data.nombrePersonalizado);
    } catch (error) {
        console.error('Error al crear el formato de atención:', error);
        throw error;
    }
};
