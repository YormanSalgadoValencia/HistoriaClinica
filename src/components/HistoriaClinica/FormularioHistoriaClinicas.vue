<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
import { useRoute, useRouter } from 'vue-router';
import ModalNuevaSeccion from '@/components/HistoriaClinica/ModalNuevaSeccion.vue'; // Ajusta la ruta según tu proyecto

const historiaStore = useHistoriaClinicaStore();
const route = useRoute();
const router = useRouter();
const historiaId = route.params.id as string;
const cargando = ref(false);

const sectionModalOpen = ref(false);
const selectedSection = ref<any>(null);

const listModalOpen = ref(false);
const selectedList = ref<any[]>([]);
const selectedListTitle = ref('');

// Nueva sección (para el modal de creación)
const nuevaSeccion = ref<any>(null);

onMounted(async () => {
    if (historiaId) {
        cargando.value = true;
        await historiaStore.fetchHistoriaById(historiaId);
        cargando.value = false;
    }
});

function openSectionModal(seccion: any) {
    selectedSection.value = seccion;
    sectionModalOpen.value = true;
}

function openListModal(campo: any) {
    selectedList.value = campo.value;
    selectedListTitle.value = campo.name;
    listModalOpen.value = true;
}

function viewRow(row: any) {
    console.log('Ver fila:', row);
}

function editRow(row: any) {
    console.log('Editar fila:', row);
}

function deleteRow(row: any) {
    console.log('Eliminar fila:', row);
}

async function guardarCambios() {
    console.log('Guardando cambios...');
}

function modificarHistoriaClinica() {
    router.push(`/historia-clinica/${historiaId}/modificar`);
}

function volver() {
    router.back();
}

function getTableColumns(rows: any[]): string[] {
    return rows && rows.length > 0 ? Object.keys(rows[0]) : [];
}

const tableHeaders = computed(() => {
    if (selectedList.value && selectedList.value.length > 0) {
        const keys = Object.keys(selectedList.value[0]);
        return [...keys.map((key) => ({ text: key, value: key })), { text: 'Acciones', value: 'acciones' }];
    }
    return [];
});
</script>

<template>
    <v-container class="pa-6" style="max-width: 1200px">
        <v-row justify="center" v-if="cargando">
            <v-col cols="12" md="10">
                <v-progress-linear indeterminate color="#1f74ff"></v-progress-linear>
            </v-col>
        </v-row>

        <v-row justify="center" v-else-if="historiaStore.historiaSeleccionada">
            <v-col cols="12" md="10">
                <v-card class="mb-6 header-card" elevation="3">
                    <v-card-title class="header-title">
                        <span>Historia Clínica: {{ historiaStore.historiaSeleccionada.name }}</span>
                        <v-btn prepend-icon="mdi-tools" variant="text" color="white" @click="modificarHistoriaClinica">
                            Modificar Historia Clínica
                        </v-btn>
                    </v-card-title>
                    <v-card-subtitle class="header-subtitle">
                        {{ historiaStore.historiaSeleccionada.description }}
                    </v-card-subtitle>
                </v-card>

                <!-- Botón para agregar nueva sección -->
                <v-card class="mb-6" elevation="0">
                    <v-card-text class="text-center">
                        <v-btn
                            color="#1f74ff"
                            variant="elevated"
                            size="large"
                            prepend-icon="mdi-plus"
                            @click="nuevaSeccion = { id: Date.now().toString(), name: '', fields: [] }"
                            class="add-section-button"
                        >
                            Agregar Nueva Sección
                        </v-btn>
                    </v-card-text>
                </v-card>

                <div v-for="seccion in historiaStore.historiaSeleccionada.sections" :key="seccion.id" class="mb-6">
                    <v-card class="section-card" elevation="2">
                        <div class="section-header">
                            <div class="section-title">{{ seccion.name }}</div>
                            <v-btn
                                v-if="seccion.name !== 'Identificación del Paciente' && seccion.name !== 'Datos de Contacto'"
                                prepend-icon="mdi-tools"
                                variant="text"
                                color="#1f74ff"
                                @click.stop="openSectionModal(seccion)"
                            >
                                Modificar Sección
                            </v-btn>
                        </div>

                        <v-card-text class="section-content">
                            <v-row>
                                <v-col v-for="campo in seccion.fields" :key="campo.id" cols="12" md="6">
                                    <template v-if="campo.type === 'list'">
                                        <v-card class="list-field-card" variant="outlined">
                                            <v-card-text>
                                                <div class="list-field-title">{{ campo.name }}</div>
                                                <v-btn
                                                    color="#1f74ff"
                                                    prepend-icon="mdi-eye"
                                                    variant="elevated"
                                                    @click="openListModal(campo)"
                                                >
                                                    Ver lista
                                                </v-btn>
                                            </v-card-text>
                                        </v-card>
                                    </template>
                                    <template v-else>
                                        <v-text-field
                                            v-model="campo.value"
                                            :label="campo.name"
                                            variant="outlined"
                                            density="comfortable"
                                            class="custom-text-field"
                                            hide-details
                                            color="#1f74ff"
                                        ></v-text-field>
                                    </template>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>

                <v-row justify="center" class="mt-6">
                    <v-col cols="12" class="text-center">
                        <div class="button-group">
                            <v-btn color="error" size="large" variant="elevated" @click="volver" class="back-button"> Volver </v-btn>
                            <v-btn color="#1f74ff" size="large" variant="elevated" @click="guardarCambios" class="save-button">
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

        <!-- Modal para ver detalle de sección -->
        <v-dialog v-model="sectionModalOpen" max-width="600">
            <v-card>
                <v-card-title class="text-h5 pa-4"> Detalle de la Sección </v-card-title>
                <v-card-text class="pa-4">
                    <div v-if="selectedSection">
                        <p class="text-subtitle-1"><strong>Nombre:</strong> {{ selectedSection.name }}</p>
                    </div>
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="error" variant="text" @click="sectionModalOpen = false"> Cerrar </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Modal para ver lista -->
        <v-dialog v-model="listModalOpen" max-width="900">
            <v-card>
                <v-card-title class="text-h5 pa-4">
                    {{ selectedListTitle }}
                </v-card-title>
                <v-card-text class="pa-4">
                    <div v-if="selectedList && selectedList.length">
                        <v-table density="comfortable" class="styled-data-table">
                            <thead>
                                <tr>
                                    <th v-for="column in getTableColumns(selectedList)" :key="column" class="text-left">
                                        {{ column }}
                                    </th>
                                    <th class="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in selectedList" :key="index">
                                    <td v-for="column in getTableColumns(selectedList)" :key="column">
                                        {{ item[column] }}
                                    </td>
                                    <td class="action-buttons">
                                        <v-btn icon="mdi-eye" size="small" color="#1f74ff" variant="text" @click="viewRow(item)"></v-btn>
                                        <v-btn icon="mdi-pencil" size="small" color="warning" variant="text" @click="editRow(item)"></v-btn>
                                        <v-btn icon="mdi-delete" size="small" color="error" variant="text" @click="deleteRow(item)"></v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </div>
                    <div v-else class="text-center pa-4">No hay datos disponibles.</div>
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="error" variant="text" @click="listModalOpen = false"> Cerrar </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Modal para crear nueva sección -->
        <ModalNuevaSeccion
            :seccion="nuevaSeccion"
            @createSeccion="
                (seccion: any) => {
                    if (historiaStore.historiaSeleccionada) {
                        historiaStore.historiaSeleccionada.sections.push(seccion);
                    }
                    nuevaSeccion = null;
                }
            "
            @cerrarModal="nuevaSeccion = null"
        />
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

.section-card {
    border-radius: 12px;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
    overflow: hidden;
}

.section-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    background-color: #f8fafc;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #000534;
}

.section-content {
    padding: 24px;
}

.list-field-card {
    background-color: #f8fafc;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    transition: all 0.2s ease;
}

.list-field-card:hover {
    border-color: #1f74ff;
    box-shadow: 0 4px 12px rgba(31, 116, 255, 0.1);
}

.list-field-title {
    font-weight: 600;
    color: #000534;
    margin-bottom: 16px;
}

.styled-data-table {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 8px;
}

.button-group {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin: 32px 0;
}

.save-button,
.back-button {
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
        flex-direction: column;
        gap: 16px;
        align-items: flex-start;
    }

    .button-group {
        flex-direction: column;
        gap: 16px;
    }

    .save-button,
    .back-button {
        width: 100%;
        max-width: 300px;
    }
}

@media (max-width: 600px) {
    .header-card {
        border-radius: 12px;
    }

    .section-card {
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
}
</style>
