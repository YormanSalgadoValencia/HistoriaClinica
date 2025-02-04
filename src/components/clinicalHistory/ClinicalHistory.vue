<script setup lang="ts">
    import { computed, reactive, ref } from "vue";
    import PlantillaCard from "./PlantillaCard.vue";
    import PreviewPlantilla from "./PreviewPlantilla.vue";

    const plantillaBuscada = ref('');
    const isOpenModalPreview = ref(false);
    const plantillaSeleccionada = ref<Plantilla | null>(null);
    
    const plantillEnBlanco = reactive<Plantilla>({
        id: crypto.randomUUID(),
        name: "Plantilla estandar",
        description: "Plantilla básica de información personal",
        sections: [
            {
                id: crypto.randomUUID(),
                name: "Identificación del paciente",
                fields: [
                    {id: crypto.randomUUID(), name: "Nombre", type: "text", value:""},
                    {id: crypto.randomUUID(), name: "Edad", type: "number", value:""},
                ],
        
            },
            {
                id: crypto.randomUUID(),
                name: "Datos de la consulta",
                fields: [
                    { id: crypto.randomUUID(), name: "Motivo de la consulta", type: "text", value: "" },
                    { id: crypto.randomUUID(), name: "Descripción", type: "textarea", value: "" },
                ],
            },
            {
                id: crypto.randomUUID(),
                name: "Antecedentes del paciente",
                fields: [
                    { id: crypto.randomUUID(), name: "Antecedentes Personales", type: "textarea", value: "" },
                    { id: crypto.randomUUID(), name: "Antecedentes Familiares", type: "textarea", value: "" },
                ],
            },
        ]
    });

    const plantillas = reactive<Plantilla[]>([
        {
            id: crypto.randomUUID(),
            name: "Ficha de Paciente",
            description: "Información básica del paciente",
            sections: [
                {
                    id: crypto.randomUUID(),
                    name: "Datos Personales",
                    fields: [
                        { id: crypto.randomUUID(), name: "Nombre Completo", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Fecha de Nacimiento", type: "date", value: "" },
                        { id: crypto.randomUUID(), name: "DNI/Pasaporte", type: "text", value: "" },
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    name: "Datos de Contacto",
                    fields: [
                        { id: crypto.randomUUID(), name: "Teléfono", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Dirección", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Correo Electrónico", type: "email", value: "" },
                    ],
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            name: "Evaluación Médica",
            description: "Formulario para datos clínicos iniciales",
            sections: [
                {
                    id: crypto.randomUUID(),
                    name: "Signos Vitales",
                    fields: [
                        { id: crypto.randomUUID(), name: "Presión Arterial", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Frecuencia Cardíaca", type: "number", value: "" },
                        { id: crypto.randomUUID(), name: "Temperatura", type: "number", value: "" },
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    name: "Síntomas",
                    fields: [
                        { id: crypto.randomUUID(), name: "Síntoma Principal", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Duración del Síntoma", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Intensidad del Dolor", type: "number", value: "" },
                    ],
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            name: "Historia Clínica Completa",
            description: "Registro médico detallado del paciente",
            sections: [
                {
                    id: crypto.randomUUID(),
                    name: "Antecedentes Médicos",
                    fields: [
                        { id: crypto.randomUUID(), name: "Enfermedades Crónicas", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Alergias", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Cirugías Previas", type: "text", value: "" },
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    name: "Medicación Actual",
                    fields: [
                        { id: crypto.randomUUID(), name: "Nombre del Medicamento", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Dosis", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Frecuencia", type: "text", value: "" },
                    ],
                },
            ],
        },
        {
            id: crypto.randomUUID(),
            name: "Ficha de Emergencia",
            description: "Información rápida para atención en emergencias",
            sections: [
                {
                    id: crypto.randomUUID(),
                    name: "Información General",
                    fields: [
                        { id: crypto.randomUUID(), name: "Nombre Completo", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Grupo Sanguíneo", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Alergias Importantes", type: "text", value: "" },
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    name: "Contacto de Emergencia",
                    fields: [
                        { id: crypto.randomUUID(), name: "Nombre del Contacto", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Relación", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Teléfono", type: "text", value: "" },
                    ],
                },
            ],
        },
     ]);

     const searchPlantilla = computed(() =>
        plantillas.filter(p => p.name.toLowerCase().includes(plantillaBuscada.value.toLowerCase()))
    );

    function openPlantilla(plantilla:Plantilla){
        isOpenModalPreview.value = true;
        plantillaSeleccionada.value = plantilla;
    }

</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <PlantillaCard
                    :plantilla="plantillEnBlanco"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="9">
                <div class="search">
                    <v-text-field @keyup="searchPlantilla" v-model="plantillaBuscada" label="Buscar">
                        
                    </v-text-field>
                </div>
            </v-col>
            <v-col cols="3">
                <v-btn color="primary">
                    {{ 'Crear Plantilla' }}
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <div class="template-list" v-if="plantillaBuscada != ''">
                <PlantillaCard
                    v-for="plantilla in searchPlantilla"
                    :key="plantilla.id"
                    :plantilla="plantilla"
                    @click="openPlantilla(plantilla)"
                />
            </div>
            <div v-else class="template-list">
                <PlantillaCard
                    v-for="plantilla in plantillas"
                    :key="plantilla.id"
                    :plantilla="plantilla"
                    @click="openPlantilla(plantilla)"
                />
            </div>
        </v-row>
    </v-container>

    <v-dialog max-width="800" v-model="isOpenModalPreview">
        <v-card>
            <!-- Contenedor del título alineado a la derecha -->
            <v-card-title class="title-container">
                <h3 class="title">{{ plantillaSeleccionada?.name }}</h3>
            </v-card-title>

            <v-card-text class="preview-container">
                <!-- Componente de la plantilla -->
                <PreviewPlantilla
                    v-if="plantillaSeleccionada"
                    :plantilla="plantillaSeleccionada"
                />

                <!-- Descripción en un cuadro a la derecha -->
                <div class="description-box">
                    <p>{{ plantillaSeleccionada?.description }}</p>
                </div>
            </v-card-text>

            <v-card-actions>
                <!-- Acciones opcionales -->
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<style scoped lang="scss">
.title-container {
    display: flex;
    justify-content: flex-end; /* Alinea el nombre a la derecha */
    padding: 10px 20px;
}

.title {
    font-size: 20px;
    font-weight: bold;
    text-align: right;
}

.preview-container {
    display: flex;
    justify-content: space-between; /* Distribuye espacio entre el preview y la descripción */
    align-items: flex-start; /* Asegura alineación superior */
    padding: 15px;
    gap: 20px; /* Espacio entre elementos */
}

/* Estilo del preview */
.preview-container PreviewPlantilla {
    flex: 1; /* Ocupa el espacio disponible */
}

/* Descripción en un cuadro */
.description-box {
    flex: 0.5; /* Tamaño proporcional */
    border: 2px solid black;
    border-radius: 10px;
    padding: 10px;
    background-color: #f8f8f8;
    min-width: 200px; /* Tamaño mínimo */
    text-align: left;
}

/*.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.template-blanco {
  margin-bottom: 20px;
  text-align: center;
  border: 2px solid #ddd;
  padding: 10px;
  width: 200px;
}*/

.search {
  margin-bottom: 20px;
}

.search-input {
  padding: 8px;
  font-size: 16px;
  width: 250px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.template-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: start;
}
</style>