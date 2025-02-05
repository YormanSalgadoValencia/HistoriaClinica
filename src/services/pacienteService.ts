import axios from 'axios';
import { Paciente } from '../types/Paciente';

// Cambia esta URL por la de tu API
const API_URL = 'http://localhost:3000';

// Si el backend retorna un array con la misma estructura de la clase,
// podemos mapear los datos a instancias de Paciente:
export const getPacientes = async (): Promise<Paciente[]> => {
    try {
        const response = await axios.get(`${API_URL}/paciente`);

        return response.data.map(
            (paciente: Paciente) =>
                new Paciente(
                    paciente._id,
                    paciente.nombre,
                    paciente.apellido,
                    paciente.fechaNacimiento,
                    paciente.genero,
                    paciente.numeroDocumento,
                    paciente.acompanante,
                    paciente.responsable
                )
        );
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener los pacientes');
    }
};
