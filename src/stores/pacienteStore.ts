import { defineStore } from 'pinia';
import { Paciente } from '../types/Paciente';
import { getPacientes } from '../services/pacienteService';

export const usePacienteStore = defineStore('paciente', {
    state: () => ({
        pacientes: [] as Paciente[],
        loading: false,
        error: null as string | null
    }),
    actions: {
        async fetchPacientes() {
            this.loading = true;
            this.error = null;
            try {
                const data = await getPacientes();
                console.log(data);
                this.pacientes = data;
            } catch (error: any) {
                this.error = error.message || 'Error al obtener pacientes';
            } finally {
                this.loading = false;
            }
        }
    }
});
