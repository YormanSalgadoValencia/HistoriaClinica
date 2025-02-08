import { defineStore } from 'pinia';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';
import { getHistoriasClinicas, 
         createHistoriaClinica, 
         getHistoriaClinicaById,
         getHistoriaClinicaStandard    } from '@/services/historiaClinicaService';

export const useHistoriaClinicaStore = defineStore('historiaClinica', {
    state: () => ({
        historias: [] as Plantilla[],
        historiaSeleccionada: null as Plantilla | null,
        historiaEstandar: null as Plantilla | null,
        loading: false,
        error: null as string | null
    }),
    actions: {
        /**
         * Obtiene todas las historias clínicas del backend y actualiza el estado.
         */
        async fetchHistorias() {
            this.loading = true;
            this.error = null;
            try {
                this.historias = await getHistoriasClinicas();
            } catch (error: any) {
                this.error = error.message || 'Error al obtener las historias clínicas';
            } finally {
                this.loading = false;
            }
        },

        /**
         * Obtiene una historia clínica por su ID y la guarda en el estado.
         * @param id ID de la historia clínica a obtener.
         */
        async fetchHistoriaById(id: string) {
            this.loading = true;
            this.error = null;
            try {
                this.historiaSeleccionada = await getHistoriaClinicaById(id);
                console.log(this.historiaSeleccionada);
            } catch (error: any) {
                this.error = error.message || 'Error al obtener la historia clínica por ID';
            } finally {
                this.loading = false;
            }
        },

        async fetchHistoriaStandard() {
            this.loading = true;
            this.error = null;
            try {
                return this.historiaEstandar = await getHistoriaClinicaStandard();
                
            } catch (error: any) {
                this.error = error.message || 'Error al obtener la historia clínica estandar';
            } finally {
                this.loading = false;
            }
        },

        /**
         * Crea una nueva historia clínica y la agrega al estado.
         * @param payload Datos necesarios para crear la historia clínica.
         */
        async addHistoria(payload: {
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
        }) {
            this.loading = true;
            this.error = null;
            try {
                const nuevaHistoria = await createHistoriaClinica(payload);
                this.historias = [...this.historias, nuevaHistoria];
            } catch (error: any) {
                this.error = error.message || 'Error al crear la historia clínica';
            } finally {
                this.loading = false;
            }
        }
    }
});
