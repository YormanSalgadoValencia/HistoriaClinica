<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="10">
                <!-- Barra de búsqueda -->
                <v-text-field v-model="search" label="Buscar..." prepend-inner-icon="mdi-magnify" clearable class="mb-4" dense outlined />

                <!-- Indicador de carga -->
                <v-row justify="center" v-if="loading">
                    <v-col cols="12" class="text-center">
                        <v-progress-circular indeterminate color="primary" size="48" />
                    </v-col>
                </v-row>

                <!-- Mensaje de error -->
                <v-alert v-if="error" type="error" prominent class="mb-4">
                    {{ error }}
                </v-alert>

                <!-- Tabla de atenciones -->
                <v-card v-if="!loading && atenciones.length">
                    <v-data-table
                        :headers="headers"
                        :items="atenciones"
                        :search="search"
                        items-per-page-text="Elementos por página"
                        no-data-text="No hay atenciones registradas."
                        class="elevation-1"
                    >
                        <!-- Slot para formatear la columna Fecha de Atención -->
                        <template v-slot:item.fechaAtencion="{ item }">
                            {{ new Date(item.fechaAtencion).toLocaleDateString() }}
                        </template>

                        <!-- Slot para mostrar Modalidad -->
                        <template v-slot:item.modalidadAtencion="{ item }">
                            {{ item.modalidadAtencion }}
                        </template>

                        <!-- Slot para mostrar Consecutivo -->
                        <template v-slot:item.consecutivoAtencion="{ item }">
                            {{ item.consecutivoAtencion }}
                        </template>

                        <!-- Slot para mostrar Información Adicional -->
                        <template v-slot:item.informacionAdicional="{ item }">
                            {{ item.informacionAdicional }}
                        </template>

                        <!-- Slot para la columna de Acciones -->
                        <template v-slot:item.acciones="{ item }">
                            <div class="d-flex flex-row align-center">
                                <v-btn color="primary" small class="mr-2" @click="verAtencion(item)">Ver</v-btn>
                                <v-btn color="warning" small class="mr-2" @click="modificarAtencion(item)">Editar</v-btn>
                                <v-btn color="error" small class="mr-2" @click="eliminarAtencion(item)">Eliminar</v-btn>
                                <v-btn color="info" small @click="verHistoriaClinica(item)">Historia Clínica</v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-card>

                <!-- Mensaje cuando no hay atenciones -->
                <v-alert v-if="!loading && atenciones.length === 0" type="info" class="mt-4" border="left" colored-border>
                    No hay atenciones registradas.
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePacienteStore } from '@/stores/pacienteStore'; // Ajusta la ruta según tu proyecto
import type { Atencion } from '@/types/Atencion';

// Instancia del store de pacientes
const pacienteStore = usePacienteStore();

// Obtenemos el parámetro 'pacienteId' desde la URL
const route = useRoute();
const pacienteId = route.params.pacienteId as string;

// Variable para la búsqueda
const search = ref('');

// Definición de los encabezados (usando 'title' y 'key' para Vuetify 3)
const headers = ref([
    { title: 'Fecha de Atención', key: 'fechaAtencion' },
    { title: 'Modalidad', key: 'modalidadAtencion' },
    { title: 'Consecutivo', key: 'consecutivoAtencion' },
    { title: 'Información Adicional', key: 'informacionAdicional' },
    { title: 'Acciones', key: 'acciones', sortable: false }
]);

// Computed para obtener el estado de carga y error del store
const loading = computed(() => pacienteStore.loading);
const error = computed(() => pacienteStore.error);

// Computed para extraer las atenciones del paciente seleccionado
const atenciones = computed(() => {
    const paciente = pacienteStore.pacientes.find((p) => p.id === pacienteId);
    return paciente ? paciente.atenciones : [];
});

// Funciones de acción para cada botón
const verAtencion = (atencion: Atencion) => {
    console.log('Ver atención:', atencion);
    // Implementa la lógica necesaria
};

const modificarAtencion = (atencion: Atencion) => {
    console.log('Modificar atención:', atencion);
    // Implementa la lógica necesaria
};

const eliminarAtencion = (atencion: Atencion) => {
    console.log('Eliminar atención:', atencion);
    // Implementa la lógica necesaria
};

const verHistoriaClinica = (atencion: Atencion) => {
    console.log('Ver Historia Clínica:', atencion);
    // Implementa la lógica necesaria
};

// Al montar el componente, se solicita al store que obtenga el paciente (incluyendo sus atenciones)
onMounted(async () => {
    await pacienteStore.fetchPacienteById(pacienteId);
});
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

/* Asegura que los botones se alineen horizontalmente */
.d-flex {
    display: flex;
}

.flex-row {
    flex-direction: row;
}

.align-center {
    align-items: center;
}

.mr-2 {
    margin-right: 0.5rem;
}
</style>
