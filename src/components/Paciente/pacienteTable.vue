<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Paciente } from '@/types/Paciente';
import { getPacientes } from '@/services/pacienteService';

const pacientes = ref<Paciente[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const search = ref('');
const router = useRouter();

onMounted(async () => {
    try {
        const data = await getPacientes();
        pacientes.value = data.filter((p) => {
            const fecha = new Date(p.fechaNacimiento);
            return p.fechaNacimiento && !isNaN(fecha.getTime());
        });
    } catch (err: any) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

const pacientesComputados = computed(() => pacientes.value.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)));

watch(
    () => pacientes.value,
    (newValue) => {
        console.log('La lista de pacientes se ha actualizado:', newValue);
    },
    { deep: true }
);

const headers = [
    { title: 'Nombre', key: 'nombreCompleto', align: 'start' },
    { title: 'Fecha Nacimiento', key: 'fechaNacimiento', align: 'start' },
    { title: 'Género', key: 'genero', align: 'start' },
    { title: 'Documento', key: 'numeroDocumento', align: 'start' },
    { title: 'Acciones', key: 'acciones', sortable: false, align: 'center' }
];

function formatearFecha(fecha: string) {
    if (!fecha) return 'Fecha inválida';
    const fechaObj = new Date(fecha);
    return isNaN(fechaObj.getTime()) ? 'Fecha inválida' : fechaObj.toLocaleDateString('es-ES');
}

function verPaciente(paciente: Paciente) {
    console.log('Ver paciente:', paciente);
}

function editarPaciente(paciente: Paciente) {
    console.log('Editar paciente:', paciente);
}

function eliminarPaciente(paciente: Paciente) {
    console.log('Eliminar paciente:', paciente);
}

function Atenciones(paciente: Paciente) {
    console.log('Redirigiendo a atenciones del paciente:', paciente);
    router.push({ name: 'Atenciones', params: { pacienteId: paciente.id } });
}
</script>

<template>
    <v-container class="pa-6" style="max-width: 1400px">
        <v-card class="content-card" elevation="2">
            <v-card-text class="search-section">
                <v-text-field
                    v-model="search"
                    label="Buscar paciente..."
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    class="search-field"
                    clearable
                ></v-text-field>
            </v-card-text>

            <v-row justify="center" v-if="loading">
                <v-col class="text-center" cols="12">
                    <v-progress-linear indeterminate color="#1f74ff"></v-progress-linear>
                </v-col>
            </v-row>

            <v-alert v-if="error" type="error" variant="tonal" border="start" elevation="2" class="ma-4">
                {{ error }}
            </v-alert>

            <v-card-text v-if="!loading && pacientes.length" class="pa-0">
                <v-data-table :headers="headers" :items="pacientesComputados" :search="search" class="styled-data-table" hover>
                    <template v-slot:item.nombreCompleto="{ item }">
                        <span class="font-weight-medium">{{ item.nombre }} {{ item.apellido }}</span>
                    </template>

                    <template v-slot:item.fechaNacimiento="{ item }">
                        <span class="font-weight-medium">{{ formatearFecha(item.fechaNacimiento) }}</span>
                    </template>

                    <template v-slot:item.acciones="{ item }">
                        <div class="action-buttons">
                            <v-btn icon="mdi-eye" size="small" color="#1f74ff" variant="text" @click="verPaciente(item)"></v-btn>
                            <v-btn icon="mdi-pencil" size="small" color="warning" variant="text" @click="editarPaciente(item)"></v-btn>
                            <v-btn icon="mdi-delete" size="small" color="error" variant="text" @click="eliminarPaciente(item)"></v-btn>
                            <v-btn icon="mdi-file-document" size="small" color="success" variant="text" @click="Atenciones(item)"></v-btn>
                        </div>
                    </template>
                </v-data-table>
            </v-card-text>

            <v-card-text v-if="!loading && pacientes.length === 0" class="text-center pa-8">
                <v-icon icon="mdi-account-group" size="64" color="#1f74ff" class="mb-4"></v-icon>
                <h3 class="text-h6 mb-2">No hay pacientes registrados</h3>
                <p class="text-body-1 text-medium-emphasis">Comienza agregando un nuevo paciente usando el botón superior.</p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped>
.header-card {
    background: linear-gradient(135deg, #000534 0%, #1f74ff 100%);
    color: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(31, 116, 255, 0.15);
}

.header-title {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 24px 12px;
}

.header-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    padding: 0 24px 24px;
}

.content-card {
    border-radius: 12px;
    overflow: hidden;
}

.search-section {
    background-color: #f8fafc;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 24px;
}

.search-field {
    max-width: 400px;
}

.styled-data-table {
    border-radius: 0;
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 8px;
}

.action-buttons .v-btn {
    transition: transform 0.2s;
}

.action-buttons .v-btn:hover {
    transform: translateY(-2px);
}

@media (max-width: 960px) {
    .header-title {
        font-size: 1.5rem;
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
    }

    .search-field {
        max-width: 100%;
    }
}

@media (max-width: 600px) {
    .header-card {
        border-radius: 12px;
    }

    .header-title {
        font-size: 1.25rem;
        padding: 16px 16px 8px;
    }

    .header-subtitle {
        font-size: 1rem;
        padding: 0 16px 16px;
    }

    .content-card {
        border-radius: 8px;
    }

    .action-buttons {
        flex-wrap: wrap;
    }
}
</style>
