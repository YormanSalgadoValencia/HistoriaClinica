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

                <!-- Tabla de atenciones -->
                <v-card v-if="!loading && atenciones.length">
                    <v-data-table
                        :headers="headers"
                        :items="atenciones"
                        :search="search"
                        items-per-page-text="Elementos por página"
                        no-data-text="No hay datos disponibles"
                        class="elevation-1"
                        disable-sort
                    >
                        <!-- Formatear la columna Fecha -->
                        <template v-slot:item.fechaAtencion="{ item }">
                            {{ new Date(item.fechaAtencion).toLocaleDateString() }}
                        </template>
                        <!-- Columna de Acciones -->
                        <template v-slot:item.acciones="{ item }">
                            <v-row no-gutters class="d-flex align-center">
                                <v-btn color="warning" size="small" @click="modificarAtencion(item)" class="mr-2"> Editar </v-btn>
                                <v-btn color="error" size="small" @click="eliminarAtencion(item)" class="mr-2"> Eliminar </v-btn>
                                <v-btn color="info" size="small" @click="verHistoriaClinica(item)"> Historia Clínica </v-btn>
                            </v-row>
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
import { ref, onMounted } from 'vue';
import { getAtenciones } from '@/services/atencionService';
import { Atencion } from '@/types/Atencion';

const atenciones = ref<Atencion[]>([]);
const search = ref(''); // Estado para la barra de búsqueda
const loading = ref(true);
const error = ref<string | null>(null);

// Definición de las cabeceras de la tabla
const headers = [
    { text: 'Fecha', value: 'fechaAtencion' },
    { text: 'Modalidad', value: 'modalidadAtencion' },
    { text: 'Consecutivo', value: 'consecutivoAtencion' },
    { text: 'Información Adicional', value: 'informacionAdicional' },
    { text: 'Acciones', value: 'acciones', sortable: false }
];

onMounted(async () => {
    try {
        atenciones.value = await getAtenciones();
    } catch (err: any) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

// Funciones de acción para cada atención
const editarAtencion = (atencion: Atencion) => {
    console.log('Editar', atencion);
};

const modificarAtencion = (atencion: Atencion) => {
    console.log('Modificar', atencion);
};

const eliminarAtencion = (atencion: Atencion) => {
    console.log('Eliminar', atencion);
};

const verHistoriaClinica = (atencion: Atencion) => {
    console.log('Ver Historia Clínica', atencion);
};
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
