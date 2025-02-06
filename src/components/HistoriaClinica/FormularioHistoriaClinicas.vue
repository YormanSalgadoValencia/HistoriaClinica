<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
import { useRoute } from 'vue-router';

const historiaStore = useHistoriaClinicaStore();
const route = useRoute();
const historiaId = route.params.id as string; // ID desde la URL
const cargando = ref(false);

// Variables para el modal de sección
const sectionModalOpen = ref(false);
const selectedSection = ref<any>(null);

onMounted(async () => {
    if (historiaId) {
        cargando.value = true;
        await historiaStore.fetchHistoriaById(historiaId);
        cargando.value = false;
    }
});

// Función para abrir el modal de sección
function openSectionModal(seccion: any) {
    selectedSection.value = seccion;
    sectionModalOpen.value = true;
}
</script>

<template>
    <v-container class="pa-6" style="max-width: 1200px">
        <!-- Indicador de carga -->
        <v-row justify="center" v-if="cargando">
            <v-col cols="12" md="10">
                <v-progress-linear indeterminate color="#1f74ff"></v-progress-linear>
            </v-col>
        </v-row>

        <!-- Contenido de la historia clínica -->
        <v-row justify="center" v-else-if="historiaStore.historiaSeleccionada">
            <v-col cols="12" md="10">
                <!-- Tarjeta de cabecera con datos generales -->
                <v-card class="mb-6 header-card" outlined>
                    <v-card-title class="header-title"> Historia Clínica: {{ historiaStore.historiaSeleccionada.name }} </v-card-title>
                    <v-card-subtitle class="header-subtitle">
                        {{ historiaStore.historiaSeleccionada.description }}
                    </v-card-subtitle>
                </v-card>

                <!-- Secciones separadas (estáticas: siempre visibles) -->
                <div v-for="seccion in historiaStore.historiaSeleccionada.sections" :key="seccion._id" class="mb-6">
                    <v-card outlined class="section-card">
                        <v-card-title class="section-header">
                            <div class="section-title">{{ seccion.name }}</div>
                            <v-spacer></v-spacer>
                            <!-- Botón que abrirá otro modal (no togglea la sección) -->
                            <v-btn text small color="#1f74ff" @click.stop="openSectionModal(seccion)"> Ver Sección </v-btn>
                        </v-card-title>
                        <!-- Contenido siempre visible -->
                        <v-card-text>
                            <v-row>
                                <v-col v-for="campo in seccion.fields" :key="campo._id" cols="12" md="6">
                                    <v-text-field
                                        v-model="campo.value"
                                        :label="campo.name"
                                        outlined
                                        dense
                                        class="custom-text-field"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>

        <!-- Mensaje en caso de no encontrar la historia clínica -->
        <v-row justify="center" v-else>
            <v-col cols="12" md="10">
                <v-alert type="error" border="left" colored-border elevation="2"> No se encontró la historia clínica. </v-alert>
            </v-col>
        </v-row>

        <!-- Modal de prueba -->
        <v-dialog v-model="sectionModalOpen" max-width="600px">
            <v-card>
                <v-card-title class="headline"> Detalle de la Sección </v-card-title>
                <v-card-text>
                    <!-- Aquí puedes mostrar información adicional o permitir editar la sección -->
                    <div v-if="selectedSection">
                        <p><strong>Nombre:</strong> {{ selectedSection.name }}</p>
                        <!-- Puedes agregar más información o campos de edición según sea necesario -->
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="red" @click="sectionModalOpen = false"> Cerrar </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped>
/* Tarjeta de cabecera */
.header-card {
    background-color: #000534;
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
}
.header-title {
    font-size: 1.75rem;
    font-weight: bold;
    padding: 16px;
}
.header-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    padding: 0 16px 16px;
}

/* Sección (tarjeta de sección) */
.section-card {
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* Encabezado de cada sección: sin fondo llamativo */
.section-header {
    background-color: transparent;
    color: #000;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 16px;
}

/* Campo de texto personalizado */
.custom-text-field .v-input__control {
    background-color: white;
    border-radius: 6px;
}

/* Ajustes responsivos */
@media (max-width: 960px) {
    .header-title {
        font-size: 1.5rem;
    }
}
</style>
