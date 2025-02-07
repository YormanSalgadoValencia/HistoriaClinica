import { defineStore } from 'pinia';
import { Paciente } from '../types/Paciente';
import { getPacientes, getPacienteById, createPaciente } from '../services/pacienteService';

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
        },

        async fetchPacienteById(id: string) {
            this.loading = true;
            this.error = null;
            try {
                const data = await getPacienteById(id);
                console.log(data);
                this.pacientes = [data];
            } catch (error: any) {
                this.error = error.message || 'Error al obtener el paciente';
            } finally {
                this.loading = false;
            }
        },

        async addPaciente(payload: {
            nombre: string;
            apellido: string;
            fechaNacimiento: string;
            genero: string;
            numeroDocumento: string;
            acompanante: string;
            responsable: string;
        }) {
            this.loading = true;
            this.error = null;
            try {
                const data = await createPaciente({
                    ...payload,
                    fechaNacimiento: new Date(payload.fechaNacimiento)
                });
                this.pacientes.push(data);
            } catch (error: any) {
                this.error = error.message || 'Error al crear el paciente';
            } finally {
                this.loading = false;
            }
        }
    }
});
