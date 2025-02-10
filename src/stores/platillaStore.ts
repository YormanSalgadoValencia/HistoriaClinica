import { defineStore } from 'pinia';
import { getPlantillas, createPlantilla, getPlantillaById, updatePlantilla, deletePlantilla } from '@/services/platillaService';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';

export const usePlantillaStore = defineStore('plantilla', {
    state: () => ({
        plantillas: [] as Plantilla[],
        selectedPlantilla: null as Plantilla | null,
        loading: false,
        error: null as string | null
    }),

    actions: {
        async fetchPlantillas() {
            this.loading = true;
            this.error = null;
            try {
                this.plantillas = await getPlantillas();
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },

        async fetchPlantillaById(id: string) {
            this.loading = true;
            this.error = null;
            try {
                this.selectedPlantilla = await getPlantillaById(id);
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },

        async addPlantilla(payload: any) {
            this.loading = true;
            this.error = null;
            try {
                const newPlantilla = await createPlantilla(payload);
                this.plantillas.push(newPlantilla);
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },

        async editPlantilla(id: string, payload: any) {
            this.loading = true;
            this.error = null;
            try {
                const updatedPlantilla = await updatePlantilla(id, payload);
                this.plantillas = this.plantillas.map((p) => (p.id === id ? updatedPlantilla : p));
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },

        async removePlantilla(id: string) {
            this.loading = true;
            this.error = null;
            try {
                await deletePlantilla(id);
                this.plantillas = this.plantillas.filter((p) => p.id !== id);
            } catch (error: any) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        }
    }
});
