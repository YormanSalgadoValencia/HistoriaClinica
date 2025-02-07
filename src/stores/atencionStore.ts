import { defineStore } from 'pinia';
import { Atencion } from '@/types/Atencion';
import { getAtenciones, createAtencion } from '@/services/atencionService';
import { FormatoAtencion } from '@/types/FormatoAtencion';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';

// Definimos un tipo para el payload de `addAtencion`
interface AtencionPayload {
    id: string;
    fechaAtencion: Date;
    modalidadAtencion: string;
    consecutivoAtencion: string;
    informacionAdicional: string;
    tiposAtencion: FormatoAtencion;
    historiaClinica: Plantilla;
}

export const useAtencionStore = defineStore('atencion', {
    state: () => ({
        atenciones: [] as Atencion[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        /**
         * Obtiene las atenciones del backend y actualiza el estado.
         */
        async fetchAtenciones() {
            this.loading = true;
            this.error = null;
            try {
                this.atenciones = await getAtenciones();
            } catch (error: any) {
                console.error('Error al obtener las atenciones:', error);
                this.error = error.message || 'Error al obtener las atenciones';
            } finally {
                this.loading = false;
            }
        },

        /**
         * Crea una nueva atención y la agrega al estado.
         * @param payload Datos necesarios para crear la atención.
         */
        async addAtencion(payload: AtencionPayload) {
            this.loading = true;
            this.error = null;
            try {
                const nuevaAtencion = await createAtencion(payload);
                this.atenciones.push(nuevaAtencion); // Más eficiente que spread operator
            } catch (error: any) {
                console.error('Error al crear la atención:', error);
                this.error = error.message || 'Error al crear la atención';
            } finally {
                this.loading = false;
            }
        }
    }
});
