    <script setup lang="ts">
    import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
    import { onMounted } from 'vue';
    import { Template } from '@/types/TemplateTypes/Template';
    const historiaStore = useHistoriaClinicaStore();


    onMounted(async () => {
        await historiaStore.fetchHistoriaStandard();
    });

    defineProps<{ 
    plantilla: Template | null;
    }>();
    </script>

    <template>
        <v-container fluid>
        <v-row justify="center" v-if="plantilla">
                <v-col cols="12" md="10">
                    <v-card class="mb-6 header-card" elevation="3">
                        <v-card-title class="header-title">
                            <span>Historia Clínica: {{ plantilla.name }}</span>
                        </v-card-title>
                        <v-card-subtitle class="header-subtitle">
                            {{ plantilla.description.length > 100 ? plantilla.description.substring(0, 100) + '...' : plantilla.description }}
                        </v-card-subtitle>
                    </v-card>

                    <div v-for="seccion in plantilla.sections" :key="seccion.id" class="mb-6">
                        <v-card class="section-card" elevation="2">
                            <div class="section-header">
                                <div class="section-title">{{ seccion.name }}</div>
                                <v-btn
                                    v-if="seccion.name !== 'Identificación del Paciente' && seccion.name !== 'Datos de Contacto'"
                                    prepend-icon="mdi-tools"
                                    variant="text"
                                    color="#1f74ff"
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

                    <!-- Información adicional fuera de secciones -->
        <div v-if="plantilla.reason" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Razón de Consulta</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="plantilla.reason.reasonConsult"
                    label="Razón de Consulta"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    color="#1f74ff"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="plantilla.reason.reasonDisease"
                    label="Enfermedad"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    color="#1f74ff"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="plantilla.reason.durationSymptoms"
                    label="Duración de Síntomas"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    color="#1f74ff"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.concept" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Concepto</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="plantilla.concept.conceptsMedicalDetailed"
                label="Concepto Médico Detallado"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.antecedent" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Antecedentes</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="plantilla.antecedent.medicalHistory"
                label="Historial Médico"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
              <!-- Agrega aquí más campos de antecedentes si es necesario -->
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.sign" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Signos Vitales</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" md="3">
                  <v-text-field
                    v-model="plantilla.sign.weight"
                    label="Peso (kg)"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    color="#1f74ff"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    v-model="plantilla.sign.height"
                    label="Altura (cm)"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    color="#1f74ff"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    v-model="plantilla.sign.imc"
                    label="IMC"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    color="#1f74ff"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    v-model="plantilla.sign.heartRate"
                    label="Frecuencia Cardíaca"
                    variant="outlined"
                    density="comfortable"
                    hide-details
                    color="#1f74ff"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.exam" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Examen Físico</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="plantilla.exam.lastPhysicalExam"
                label="Último Examen Físico"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
              <v-text-field
                v-model="plantilla.exam.medicalNotes"
                label="Notas Médicas"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.analysis" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Análisis</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="plantilla.analysis.detail"
                label="Detalle del Análisis"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.case" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Caso</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="plantilla.case.diagnosis"
                label="Diagnóstico"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.management" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Plan de Manejo</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="plantilla.management.previousPlan"
                label="Plan Anterior"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
              <v-text-field
                v-model="plantilla.management.newPlan"
                label="Nuevo Plan"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>

        <div v-if="plantilla.recommendation" class="mb-6">
          <v-card class="extra-field-card" elevation="2">
            <v-card-title>Recomendación</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="plantilla.recommendation.recommendation"
                label="Recomendación"
                variant="outlined"
                density="comfortable"
                hide-details
                color="#1f74ff"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </div>

                    <v-row justify="center" class="mt-6">
                        <v-col cols="12" class="text-center">
                            <div class="button-group">
                                <v-btn color="error" size="large" variant="elevated" @click="'volver'" class="back-button"> Volver </v-btn>
                                <v-btn color="#1f74ff" size="large" variant="elevated" @click="'guardarCambios'" class="save-button">
                                    Guardar Cambios
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </template>
    

    <style scoped lang="scss">

    .header-subtitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
    max-width: 100%; 
    }

    </style>