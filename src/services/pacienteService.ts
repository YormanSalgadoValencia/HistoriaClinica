import axios from 'axios';
import { Paciente } from '../types/Paciente';

// URL base de tu API
const API_URL = 'http://localhost:3000';

/**
 * Obtiene todos los pacientes y los mapea a instancias de Paciente,
 * incluyendo la propiedad "atenciones" que pueda venir en la respuesta.
 */
export const getPacientes = async (): Promise<Paciente[]> => {
    try {
        const response = await axios.get(`${API_URL}/paciente`);
        return response.data.map((paciente: Paciente) => {
            // Se crea la instancia del paciente usando _id y demás propiedades.
            const nuevoPaciente = new Paciente(
                paciente.id,
                paciente.nombre,
                paciente.apellido,
                paciente.fechaNacimiento,
                paciente.genero,
                paciente.numeroDocumento,
                paciente.acompanante,
                paciente.responsable
            );
            // Se asigna el array de atenciones (o se deja vacío si no existe)
            nuevoPaciente.atenciones = paciente.atenciones || [];
            return nuevoPaciente;
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener los pacientes');
    }
};

/**
 * Obtiene un paciente por su id y lo mapea a una instancia de Paciente.
 * Se asegura de asignar el array de atenciones que viene desde el backend.
 */
export const getPacienteById = async (id: string): Promise<Paciente> => {
    try {
        const response = await axios.get(`${API_URL}/paciente/${id}`);
        const data = response.data;

        // Se crea la instancia del paciente usando _id y demás propiedades.
        const nuevoPaciente = new Paciente(
            data.id,
            data.nombre,
            data.apellido,
            data.fechaNacimiento,
            data.genero,
            data.numeroDocumento,
            data.acompanante,
            data.responsable
        );
        // Se asigna el array de atenciones recibido, o un array vacío si no existe.
        nuevoPaciente.atenciones = data.atenciones || [];

        return nuevoPaciente;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener el paciente');
    }
};

/**
 * Crea un nuevo paciente en el backend y lo retorna como una instancia de Paciente.
 * @param payload Datos necesarios para crear el paciente.
 */

export const createPaciente = async (payload: {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero: string;
    numeroDocumento: string;
    acompanante: string;
    responsable: string;
    atenciones?: string[];
    // Opcional, ya que puede no estar presente al crear el paciente.
}): Promise<Paciente> => {
    try {
        const response = await axios.post(`${API_URL}/paciente`, payload);
        const data = response.data;

        // Se crea la instancia del paciente usando _id y demás propiedades.
        const nuevoPaciente = new Paciente(
            data.id,
            data.nombre,
            data.apellido,
            data.fechaNacimiento,
            data.genero,
            data.numeroDocumento,
            data.acompanante,
            data.responsable
        );
        // Se asigna el array de atenciones recibido, o un array vacío si no existe.
        nuevoPaciente.atenciones = data.atenciones || [];

        return nuevoPaciente;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear el paciente');
    }
};
