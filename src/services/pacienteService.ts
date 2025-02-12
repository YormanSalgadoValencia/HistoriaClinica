import axios from 'axios';
import { Paciente } from '../types/Paciente';

const API_URL = 'http://localhost:3000';

//Obtiene todos los pacientes y los mapea a instancias de Paciente.

export const getPacientes = async (): Promise<Paciente[]> => {
    try {
        const response = await axios.get(`${API_URL}/paciente`);
        return response.data.map((data: any) => Paciente.fromJson(data));
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener los pacientes');
    }
};

//Obtiene un paciente por su id y lo mapea a una instancia de Paciente.

export const getPacienteById = async (id: string): Promise<Paciente> => {
    try {
        const response = await axios.get(`${API_URL}/paciente/${id}`);
        return Paciente.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener el paciente');
    }
};

//Crea un nuevo paciente en el backend y lo retorna como una instancia de Paciente.
//@param payload Datos necesarios para crear el paciente.

export const createPaciente = async (payload: {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero: string;
    numeroDocumento: string;
    acompanante: string;
    responsable: string;
    atenciones?: string[];
}): Promise<Paciente> => {
    try {
        const response = await axios.post(`${API_URL}/paciente`, payload);
        return Paciente.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear el paciente');
    }
};
