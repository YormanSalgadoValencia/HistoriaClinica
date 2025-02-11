<template>
    <v-container class="pa-6" style="max-width: 1200px">
        <v-row justify="center" v-if="cargando">
            <v-col cols="12" md="10">
                <v-progress-linear indeterminate color="#1f74ff"></v-progress-linear>
            </v-col>
        </v-row>

        <v-row justify="center" v-else-if="historiaStore.historiaSeleccionada">
            <v-col cols="12" md="10">
                <!-- Encabezado -->
                <v-card class="mb-6 header-card" elevation="3">
                    <v-card-title class="header-title">
                        <span>Modificar Historia Clínica: {{ historiaStore.historiaSeleccionada.name }}</span>
                    </v-card-title>
                    <v-card-subtitle class="header-subtitle">
                        {{ historiaStore.historiaSeleccionada.description }}
                    </v-card-subtitle>
                </v-card>

                <!-- Botón para agregar nueva sección -->
                <v-card class="mb-6 add-section-card" elevation="0">
                    <v-card-text class="text-center">
                        <v-btn
                            color="#1f74ff"
                            variant="elevated"
                            size="large"
                            prepend-icon="mdi-plus"
                            @click="agregarSeccion"
                            class="add-section-button"
                        >
                            Agregar Nueva Sección
                        </v-btn>
                    </v-card-text>
                </v-card>

                <!-- Lista de secciones -->
                <div v-for="seccion in historiaStore.historiaSeleccionada.sections" :key="seccion.id" class="mb-4">
                    <v-card class="section-card" elevation="2">
                        <div class="section-header">
                            <div class="section-info">
                                <h3 class="section-title">{{ seccion.name }}</h3>
                                <div class="section-fields">{{ seccion.fields.length }} campos</div>
                            </div>
                            <div class="section-actions">
                                <v-btn
                                    v-if="seccion.name !== 'Identificación del Paciente' && seccion.name !== 'Datos de Contacto'"
                                    icon="mdi-pencil"
                                    variant="text"
                                    color="#1f74ff"
                                    class="action-button"
                                    @click="editarSeccion(seccion)"
                                ></v-btn>
                                <v-btn
                                    v-if="seccion.name !== 'Identificación del Paciente' && seccion.name !== 'Datos de Contacto'"
                                    icon="mdi-delete"
                                    variant="text"
                                    color="error"
                                    class="action-button"
                                    @click="eliminarSeccion(seccion.id)"
                                ></v-btn>
                            </div>
                        </div>
                    </v-card>
                </div>

                <!-- Botones de acción -->
                <v-row justify="center" class="mt-6">
                    <v-col cols="12" class="text-center">
                        <div class="button-group">
                            <v-btn color="error" size="large" variant="elevated" @click="volver" class="action-button"> Cancelar </v-btn>
                            <v-btn color="#1f74ff" size="large" variant="elevated" @click="guardarCambios" class="action-button">
                                Guardar Cambios
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row justify="center" v-else>
            <v-col cols="12" md="10">
                <v-alert type="error" variant="tonal" border="start" elevation="2"> No se encontró la historia clínica. </v-alert>
            </v-col>
        </v-row>

        <!-- Modal para editar sección -->
        <ModalSeccion :seccion="seccionEditar" @updateSeccion="actualizarSeccion" @cerrarModal="cerrarModalSeccion" />
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
import { useRoute, useRouter } from 'vue-router';
import ModalSeccion from '@/components/HistoriaClinica/ModalModificarSeccion.vue';
import { Seccion } from '@/types/HistoriaClinica/Seccion';

const historiaStore = useHistoriaClinicaStore();
const route = useRoute();
const router = useRouter();
const historiaId = route.params.id as string;
const cargando = ref(false);

// Estado para la sección a editar
const seccionEditar = ref<any>(null);

onMounted(async () => {
    if (historiaId) {
        cargando.value = true;
        await historiaStore.fetchHistoriaById(historiaId);
        cargando.value = false;
    }
});

function agregarSeccion() {
    console.log('Agregar nueva sección');
}

function eliminarSeccion(seccionId: string) {
    console.log('Eliminar sección:', seccionId);
}

function editarSeccion(seccion: Seccion) {
    // Se puede clonar la sección si es necesario
    seccionEditar.value = { ...seccion };
}

// Actualizamos la sección en la historia seleccionada
function actualizarSeccion(seccionActualizada: Seccion) {
    if (historiaStore.historiaSeleccionada) {
        const index = historiaStore.historiaSeleccionada.sections.findIndex((s) => s.id === seccionActualizada.id);
        if (index !== -1) {
            historiaStore.historiaSeleccionada.sections[index] = seccionActualizada;
        }
    }
    // Se cierra el modal
    seccionEditar.value = null;
}

function guardarCambios() {
    console.log('Guardar cambios');
}

function cerrarModalSeccion() {
    seccionEditar.value = null;
}

function volver() {
    router.back();
}
</script>

<style scoped>
/* Tus estilos existentes */
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
    padding: 24px 24px 12px;
}

.header-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    padding: 0 24px 24px;
}

.add-section-card {
    background: transparent;
}

.add-section-button {
    font-size: 1.1rem;
    text-transform: none;
    letter-spacing: 0.5px;
    padding: 0 32px;
    height: 48px;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.add-section-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(31, 116, 255, 0.2);
}

.section-card {
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.section-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
}

.section-info {
    flex: 1;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #000534;
    margin: 0;
}

.section-fields {
    font-size: 0.9rem;
    color: #666;
    margin-top: 4px;
}

.section-actions {
    display: flex;
    gap: 8px;
}

.action-button {
    transition: all 0.3s ease;
}

.action-button:hover {
    transform: translateY(-1px);
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin: 32px 0;
}

.button-group .action-button {
    min-width: 180px;
    height: 48px;
    font-size: 1.1rem;
    text-transform: none;
    letter-spacing: 0.5px;
    border-radius: 12px;
}

@media (max-width: 960px) {
    .header-title {
        font-size: 1.5rem;
    }

    .button-group {
        flex-direction: column;
        gap: 16px;
    }

    .button-group .action-button {
        width: 100%;
        max-width: 300px;
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

    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    .section-actions {
        width: 100%;
        justify-content: flex-end;
    }
}
</style>
