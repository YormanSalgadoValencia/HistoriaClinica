<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="10">
                <!-- Barra de búsqueda -->
                <v-text-field
                    v-model="search"
                    label="Buscar..."
                    prepend-inner-icon="mdi-magnify"
                    clearable
                    class="mb-4"
                    dense
                    outlined
                ></v-text-field>

                <!-- Indicador de carga -->
                <v-row justify="center" v-if="loading">
                    <v-col class="text-center" cols="12">
                        <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
                    </v-col>
                </v-row>

                <!-- Mensaje de error -->
                <v-alert v-if="error" type="error" prominent class="mb-4">
                    {{ error }}
                </v-alert>

                <!-- Tabla de pacientes -->
                <v-card v-if="!loading && pacientes.length">
                    <v-data-table
                        :headers="headers"
                        :items="pacientesComputados"
                        :search="search"
                        items-per-page-text="Elementos por página"
                        no-data-text="No hay pacientes registrados"
                        class="elevation-1"
                    >
                        <!-- Slot para formatear la columna de Fecha Nacimiento -->
                        <template v-slot:item.fechaNacimiento="{ item }">
                            {{ formatearFecha(item.fechaNacimiento) }}
                        </template>

                        <!-- Slot para la columna de Acciones -->
                        <template v-slot:item.acciones="{ item }">
                            <div class="d-flex flex-row align-center">
                                <v-btn color="info" size="small" class="mr-2" @click="verPaciente(item)"> Ver </v-btn>
                                <v-btn color="warning" size="small" class="mr-2" @click="editarPaciente(item)"> Editar </v-btn>
                                <v-btn color="error" size="small" class="mr-2" @click="eliminarPaciente(item)"> Eliminar </v-btn>
                                <v-btn color="primary" size="small" @click="Atenciones(item)"> Atenciones </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>

                <!-- Mensaje cuando no hay pacientes -->
                <v-alert v-if="!loading && pacientes.length === 0" type="info" class="mt-4" border="left" colored-border>
                    No hay pacientes registrados.
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { Paciente } from '@/types/Paciente';
import { getPacientes } from '@/services/pacienteService';

// Estados locales
const pacientes = ref<Paciente[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const search = ref('');

// Cargar datos al montar el componente
onMounted(async () => {
    try {
        pacientes.value = await getPacientes();
    } catch (err: any) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

// Propiedad computada para ordenar la lista de pacientes por nombre
const pacientesComputados = computed(() => pacientes.value.slice().sort((a, b) => a.nombre.localeCompare(b.nombre)));

// Watcher para depuración
watch(
    () => pacientes.value,
    (newValue) => {
        console.log('La lista de pacientes se ha actualizado:', newValue);
    },
    { deep: true }
);

// Definición de los encabezados de la tabla para Vuetify 3
const headers = [
    { title: 'Nombre', key: 'nombre' },
    { title: 'Apellido', key: 'apellido' },
    { title: 'Fecha Nacimiento', key: 'fechaNacimiento' },
    { title: 'Género', key: 'genero' },
    { title: 'Documento', key: 'numeroDocumento' },
    { title: 'Acompañante', key: 'acompanante' },
    { title: 'Responsable', key: 'responsable' },
    { title: 'Acciones', key: 'acciones', sortable: false }
];

// Función para formatear la fecha
function formatearFecha(fecha: string) {
    return new Date(fecha).toLocaleDateString();
}

// Funciones de acción para cada botón
function verPaciente(paciente: Paciente) {
    console.log('Ver paciente:', paciente);
    // Implementa la lógica para ver el detalle del paciente
}

function editarPaciente(paciente: Paciente) {
    console.log('Editar paciente:', paciente);
    // Implementa la lógica para editar el paciente
}

function eliminarPaciente(paciente: Paciente) {
    console.log('Eliminar paciente:', paciente);
    // Implementa la lógica para eliminar el paciente
}

function Atenciones(paciente: Paciente) {
    console.log('Crear historial clínico para paciente:', paciente);
    // Implementa la lógica para crear el historial clínico
}
</script>

<style scoped lang="scss">
.v-data-table {
    border-radius: 8px;
}

.v-alert {
    font-size: 1.1rem;
}

.v-card {
    overflow-x: auto;
}
</style>
