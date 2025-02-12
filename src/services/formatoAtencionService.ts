import axios from 'axios';
import { FormatoAtencion } from '../types/FormatoAtencion';

const API_URL = 'http://localhost:3000';

// Función para listar los formatos de atención
//Mapea cada objeto de la respuesta a una instancia de FormatoAtencion mediante fromJSON

export const getFormatosAtencion = async (): Promise<FormatoAtencion[]> => {
    try {
        const response = await axios.get(`${API_URL}/formatosAtencion`);
        return response.data.map((item: FormatoAtencion) => FormatoAtencion.fromJson(item));
    } catch (error: any) {
        console.error('Error al obtener los formatos de atención:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

// Función para crear un nuevo formato de atención
// Transforma la respuesta a una instancia de FormatoAtencion usando fromJSON

export const createFormatoAtencion = async (formato: FormatoAtencion): Promise<FormatoAtencion> => {
    try {
        const response = await axios.post(`${API_URL}/formatosAtencion`, {
            tipoEspecialidad: formato.tipoEspecialidad,
            nombrePersonalizado: formato.nombrePersonalizado
        });

        return FormatoAtencion.fromJson(response.data);
    } catch (error: any) {
        console.error('Error al crear el formato de atención:', error);
        throw new Error(error.response?.data?.message || error.message);
    }
};
