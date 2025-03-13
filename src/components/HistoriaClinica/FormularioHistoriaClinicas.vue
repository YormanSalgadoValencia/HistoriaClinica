<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
import { useRoute, useRouter } from 'vue-router';
import ModalNuevaSeccion from '@/components/HistoriaClinica/ModalNuevaSeccion.vue';
import { Section } from '@/types/TemplateTypes/Section';
import { Field } from '@/types/TemplateTypes/Field';
import ModalModificarSeccion from './ModalModificarSeccion.vue';

// Usamos el store que maneja la "historia clínica" (Plantilla)
const historiaStore = useHistoriaClinicaStore();
const route = useRoute();
const router = useRouter();
const historiaId = route.params.id as string;
const cargando = ref(false);

// Variables para manejar la apertura de modales y la sección/tabla seleccionada
const sectionModalOpen = ref(false);
const selectedSection = ref<Section | null>(null);

const listModalOpen = ref(false);
const selectedList = ref<any[]>([]);
const selectedListTitle = ref('');

// Nueva sección: se crea como instancia de Seccion
const nuevaSeccion = ref<Section | null>(null);

const seccionModificar = ref<any>(null);

// Función para formatear fechas a "YYYY-MM-DD"
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

onMounted(async () => {
    if (historiaId) {
        cargando.value = true;
        await historiaStore.fetchHistoriaById(historiaId);
        // Una vez cargada la historia, formateamos los campos de tipo 'date'
        if (historiaStore.historiaSeleccionada) {
            historiaStore.historiaSeleccionada.sections.forEach((section: Section) => {
                section.fields.forEach((campo) => {
                    if (campo.type === 'date' && campo.value) {
                        if (typeof campo.value === 'string') {
                            campo.value = formatDate(campo.value);
                        }
                    }
                });
            });
        }
        cargando.value = false;
    }
});

// Abre el modal para ver/modificar el detalle de la sección
function openSectionModal(seccion: Section) {
    selectedSection.value = seccion;
    seccionModificar.value = {
        id: seccion.id,
        name: seccion.name,
        fields: seccion.fields
    };  
    sectionModalOpen.value = true;
}

// Abre el modal para visualizar un campo de tipo "list"
function openListModal(campo: Field) {
    selectedList.value = Array.isArray(campo.value) ? campo.value : [];
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
    // Aquí podrías convertir la plantilla a JSON con Plantilla.toJson y llamar al store para guardar
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

const tmp = {
    "id": "1a2b3c4d",
    "name": "Sample Template",
    "description": "This is a sample template for Mockoon",
    "sections": [
      {
        "id": "section1",
        "name": "Introduction",
        "fields": [
          {
            "id": "field1",
            "name": "Patient Name",
            "type": "text",
            "label": "Full Name",
            "category": "personal_info",
            "description": "The full name of the patient",
            "value": "John Doe"
          },
          {
            "id": "field2",
            "name": "Patient Age",
            "type": "number",
            "label": "Age",
            "category": "personal_info",
            "description": "The age of the patient",
            "value": 35
          }
        ]
      },
      {
        "id": "section2",
        "name": "Medical History",
        "fields": [
          {
            "id": "field3",
            "name": "Allergies",
            "type": "text",
            "label": "Known Allergies",
            "description": "List of known allergies",
            "value": "None"
          }
        ]
      }
    ],
    "categories": ["category1", "category2"],
    "reason": {
      "idReason": "reason1",
      "reasonConsult": "Routine checkup",
      "reasonDisease": "None",
      "duracionSintomas": 0
    },
    "concept": {
      "idConcept": "concept1",
      "conceptsMedicalDetailed": "General health evaluation"
    },
    "antecedent": {
      "idAntecedent": "antecedent1",
      "medicalHistory": "No major illnesses",
      "pharmacologicalHistory": "None",
      "allergicHistory": "None",
      "surgicalHistory": "Appendectomy in 2005",
      "familyHistory": "No hereditary diseases",
      "gynecobstetricHistory": "N/A"
    },
    "sign": {
      "idSign": "sign1",
      "weight": 70,
      "height": 175,
      "imc": 22.9,
      "heartRate": 72,
      "bloodPressure": "120/80",
      "temperature": 36.6,
      "oxygenSaturation": 98
    },
    "exam": {
      "idExam": "exam1",
      "lastPhysicalExam": "2025-03-10T00:00:00Z",
      "respiratorySystem": "Normal",
      "cardiovascularSystem": "Normal",
      "digestiveSystem": "Normal",
      "nervousSystem": "Normal",
      "musculoskeletalSystem": "Normal",
      "genitourinarySystem": "Normal",
      "skinAndAnnexes": "Healthy",
      "additionalObservations": "No issues observed",
      "medicalNotes": "Patient in good health",
      "complementaryExamResults": "All tests normal"
    },
    "analysis": {
      "idAnalysis": "analysis1",
      "date": "2025-03-11T00:00:00Z",
      "detail": "Comprehensive health analysis",
      "concept": {
        "idConcept": "concept1",
        "conceptsMedicalDetailed": "General health evaluation"
      },
      "laboratories": [],
      "diagnosticImages": [],
      "pathology": [],
      "molecularTests": []
    },
    "case": {
      "idCase": "case1",
      "analysis": "Routine analysis",
      "diagnosis": "Healthy"
    },
    "management": {
      "idManagement": "management1",
      "previousPlan": "Annual checkup",
      "newPlan": "Maintain healthy lifestyle",
      "additionalNotes": "No special recommendations"
    },
    "recommendation": {
      "idRecommendation": "recommendation1",
      "recommendation": "Continue with regular exercise and balanced diet",
      "warningSigns": "None",
      "postConsultationInstructions": "Schedule next checkup in one year"
    }
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

        <!-- Vista principal cuando se ha cargado la historia clínica (Plantilla) -->
        <v-row justify="center" v-else-if="historiaStore.historiaSeleccionada">
            <v-col cols="12" md="10">
                <!-- Encabezado -->
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
                            @click="nuevaSeccion = new Section(Date.now().toString(), '', [])"
                            class="add-section-button"
                        >
                            Agregar Nueva Sección
                        </v-btn>
                    </v-card-text>
                </v-card>

                

                <!-- Itera sobre las secciones de la historia clínica -->
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
                                <!-- Bloque para cada campo, renderizado condicional según su tipo -->
                                <v-col v-for="campo in seccion.fields" :key="campo.id" cols="12" md="6">
                                    <!-- Campo de tipo 'list' -->
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
                                    <!-- Campo de tipo 'text' -->
                                    <template v-else-if="campo.type === 'text'">
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
                                    <!-- Campo de tipo 'number' -->
                                    <template v-else-if="campo.type === 'number'">
                                        <v-text-field
                                            v-model="campo.value"
                                            :label="campo.name"
                                            type="number"
                                            variant="outlined"
                                            density="comfortable"
                                            class="custom-text-field"
                                            hide-details
                                            color="#1f74ff"
                                        ></v-text-field>
                                    </template>
                                    <!-- Campo de tipo 'textarea' -->
                                    <template v-else-if="campo.type === 'textarea'">
                                        <v-textarea
                                            v-model="campo.value"
                                            :label="campo.name"
                                            variant="outlined"
                                            rows="4"
                                            class="custom-textarea"
                                            hide-details
                                            color="#1f74ff"
                                        ></v-textarea>
                                    </template>
                                    <!-- Campo de tipo 'date' -->
                                    <template v-else-if="campo.type === 'date'">
                                        <v-text-field
                                            v-model="campo.value"
                                            :label="campo.name"
                                            type="date"
                                            variant="outlined"
                                            density="comfortable"
                                            class="custom-text-field"
                                            hide-details
                                            color="#1f74ff"
                                        ></v-text-field>
                                    </template>
                                    <!-- Campo de tipo 'select' -->
                                    <template v-else-if="campo.type === 'dropdown'">
                                        <v-select
                                            v-model="campo.value"
                                            :label="campo.name"
                                            :items="campo.structure && campo.structure.options ? campo.structure.options : []"
                                            variant="outlined"
                                            density="comfortable"
                                            class="custom-text-field"
                                            hide-details
                                            color="#1f74ff"
                                        ></v-select>
                                    </template>
                                    <!-- Campo de tipo 'upload' -->
                                    <template v-else-if="campo.type === 'upload'">
                                        <v-file-input
                                            v-model="campo.value"
                                            :label="campo.name"
                                            variant="outlined"
                                            density="comfortable"
                                            class="custom-text-field"
                                            hide-details
                                            color="#1f74ff"
                                        ></v-file-input>
                                    </template>
                                    <!-- Campo de tipo 'check' -->
                                    <template v-else-if="campo.type === 'check'">
                                        <v-checkbox v-model="campo.value" :label="campo.name" color="#1f74ff"></v-checkbox>
                                    </template>
                                    <!-- Fallback: si no coincide con ningún tipo, se muestra un text field -->
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

                <div>
                    
                </div>

                <!-- Botones de acción final -->
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

        <!-- Mensaje de error si no se encontró la historia clínica -->
        <v-row justify="center" v-else>
            <v-col cols="12" md="10">
                <v-alert type="error" variant="tonal" border="start" elevation="2"> No se encontró la historia clínica. </v-alert>
            </v-col>
        </v-row>

        <!-- Modal para ver detalle de la sección -->
        <v-dialog v-model="sectionModalOpen" max-width="600">
            <!-- Modal para modificar una sección -->
            <ModalModificarSeccion
                v-if="seccionModificar"
                :seccion="seccionModificar"
                @update-seccion="
                    (seccionActualizada: Section) => {
                        if (historiaStore.historiaSeleccionada) {
                            const index = historiaStore.historiaSeleccionada.sections.findIndex(
                                (sec: Section) => sec.id === seccionActualizada.id
                            );
                            if (index !== -1) {
                                historiaStore.historiaSeleccionada.sections[index] = seccionActualizada;
                            }
                        }
                        seccionModificar = null;
                    }
                "
                @cerrarModal="sectionModalOpen = false"
            />

            <!-- <v-card>
                <v-card-title class="text-h5 pa-4">Detalle de la Sección</v-card-title>
                <v-card-text class="pa-4">
                    <div v-if="selectedSection">
                        <p class="text-subtitle-1"><strong>Nombre:</strong> {{ selectedSection.name }}</p>
                    </div>
                </v-card-text>
                <v-card-actions class="pa-4">
                    <v-spacer></v-spacer>
                    <v-btn color="error" variant="text" @click="sectionModalOpen = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card> -->
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
                    <v-btn color="error" variant="text" @click="listModalOpen = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Modal para crear nueva sección -->
        <ModalNuevaSeccion
            v-if="nuevaSeccion"
            :seccion="nuevaSeccion"
            @createSeccion="
                (seccion: Section) => {
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
/* Estilos para el encabezado */
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

/* Estilos para las secciones */
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

/* Estilos para campos tipo lista */
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

/* Estilos para la tabla de listas */
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

/* Botones de acción al final del formulario */
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

/* Responsividad */
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
