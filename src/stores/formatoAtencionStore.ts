import { defineStore } from 'pinia';
import { ref } from 'vue';
import { FormatoAtencion } from '../types/FormatoAtencion';
import { getFormatosAtencion, createFormatoAtencion } from '../services/formatoAtencionService';

export const useFormatoAtencionStore = defineStore('formatoAtencion', () => {
    // Estado
    const formatosAtencion = ref<FormatoAtencion[]>([]);

    // Acción para obtener los formatos de atención desde la API
    const fetchFormatosAtencion = async () => {
        try {
            const response = await getFormatosAtencion();
            console.log('Formatos de atención obtenidos:', response);
            formatosAtencion.value = response;
        } catch (error) {
            console.error('Error al cargar los formatos de atención:', error);
        }
    };

    // Acción para crear un nuevo formato de atención
    const addFormatoAtencion = async (formato: FormatoAtencion) => {
        try {
            const response = await createFormatoAtencion(formato);
            formatosAtencion.value.push(response); // Agregar el nuevo formato al arreglo
        } catch (error) {
            console.error('Error al crear el formato de atención:', error);
        }
    };

    return {
        formatosAtencion,
        fetchFormatosAtencion,
        addFormatoAtencion
    };
});
