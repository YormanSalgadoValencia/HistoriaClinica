import axios from 'axios';
import { Atencion } from '../types/Atencion';
import { FormatoAtencion } from '../types/FormatoAtencion';
import { Plantilla } from '../types/HistoriaClinica/Plantilla';
import { Seccion } from '../types/HistoriaClinica/Seccion';
import { Campo } from '../types/HistoriaClinica/Campo';

const API_URL = 'http://localhost:3000';

/**
 * Obtiene el listado de atenciones desde el backend y las mapea a instancias de Atencion.
 */
export const getAtenciones = async (): Promise<Atencion[]> => {
    try {
        const response = await axios.get(`${API_URL}/atencion`);

        return response.data.map((atencion: Atencion) => {
            return new Atencion(
                atencion.id,
                new Date(atencion.fechaAtencion).toISOString(),
                atencion.modalidadAtencion,
                atencion.consecutivoAtencion,
                new FormatoAtencion(
                    atencion.tiposAtencion.id,
                    atencion.tiposAtencion.tipoEspecialidad,
                    atencion.tiposAtencion.nombrePersonalizado
                ),
                atencion.informacionAdicional || '',
                atencion.historiaClinica
                    ? new Plantilla(
                          atencion.historiaClinica.id,
                          atencion.historiaClinica.name,
                          atencion.historiaClinica.description,
                          atencion.historiaClinica.sections.map(
                              (seccion: Seccion) =>
                                  new Seccion(
                                      seccion.id,
                                      seccion.name,
                                      seccion.fields.map(
                                          (campo: Campo) =>
                                              new Campo(
                                                  campo.id,
                                                  campo.name,
                                                  campo.type,
                                                  Array.isArray(campo.value) ? JSON.stringify(campo.value) : campo.value
                                              )
                                      )
                                  )
                          )
                      )
                    : undefined // Si no hay historia clínica, se deja como undefined
            );
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener las atenciones');
    }
};

/**
 * Crea una nueva atención en el backend y la retorna como una instancia de Atencion.
 * @param payload Datos necesarios para crear la atención.
 */
export const createAtencion = async (payload: {
    id: string;
    fechaAtencion: Date;
    modalidadAtencion: string;
    consecutivoAtencion: string;
    informacionAdicional?: string;
    tiposAtencion: FormatoAtencion;
    historiaClinica?: Plantilla; // Ahora es opcional
}): Promise<Atencion> => {
    try {
        // Crear objeto de envío sin incluir historia clínica si no está presente
        const requestBody = {
            ...payload,
            historiaClinica: payload.historiaClinica
                ? {
                      id: payload.historiaClinica.id,
                      name: payload.historiaClinica.name,
                      description: payload.historiaClinica.description,
                      sections: payload.historiaClinica.sections.map((seccion) => ({
                          id: seccion.id,
                          name: seccion.name,
                          fields: seccion.fields.map((campo) => ({
                              id: campo.id,
                              name: campo.name,
                              type: campo.type,
                              value: campo.value
                          }))
                      }))
                  }
                : undefined // Si no hay historia clínica, no se envía
        };

        const response = await axios.post(`${API_URL}/atencion`, requestBody);
        const atencion = response.data;

        return new Atencion(
            atencion.id,
            atencion.fechaAtencion,
            atencion.modalidadAtencion,
            atencion.consecutivoAtencion,
            new FormatoAtencion(
                atencion.tiposAtencion.id,
                atencion.tiposAtencion.tipoEspecialidad,
                atencion.tiposAtencion.nombrePersonalizado
            ),
            atencion.informacionAdicional || '',
            atencion.historiaClinica
                ? new Plantilla(
                      atencion.historiaClinica.id,
                      atencion.historiaClinica.name,
                      atencion.historiaClinica.description,
                      atencion.historiaClinica.sections.map(
                          (seccion: Seccion) =>
                              new Seccion(
                                  seccion.id,
                                  seccion.name,
                                  seccion.fields.map(
                                      (campo: Campo) =>
                                          new Campo(
                                              campo.id,
                                              campo.name,
                                              campo.type,
                                              Array.isArray(campo.value) ? JSON.stringify(campo.value) : campo.value
                                          )
                                  )
                              )
                      )
                  )
                : undefined
        );
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear la atención');
    }
};
