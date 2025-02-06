<script setup lang="ts">
    import { computed, reactive, ref } from "vue";
    import PlantillaCard from "./PlantillaCard.vue";
    import PreviewPlantilla from "./PreviewPlantilla.vue";

    const plantillaBuscada = ref('');
    const selectedCategory = ref('');
    const isOpenModalPreview = ref(false);
    const plantillaSeleccionada = ref<Plantilla | null>(null);
    const categories = ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta'];
    
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
            description: "Registro detallado de la información básica del paciente, incluyendo sus datos personales y de contacto. Permite almacenar información esencial para la identificación y comunicación con el paciente, asegurando un acceso rápido y organizado a estos datos en cualquier momento.",
            categories: ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta'],
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
                {
                    id: crypto.randomUUID(),
                    name: "Datos de Contacto",
                    fields: [
                        { id: crypto.randomUUID(), name: "Teléfono", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Dirección", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Correo Electrónico", type: "email", value: "" },
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
            description: "Formulario estructurado para recopilar datos clínicos iniciales de un paciente. Contiene información clave sobre signos vitales y síntomas, lo que facilita una evaluación rápida y eficiente para el diagnóstico y tratamiento médico.",
            categories: ['Primera', 'Quinta'],
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
            description: "Documento detallado que recoge información sobre los antecedentes médicos del paciente, incluyendo enfermedades crónicas, alergias, cirugías previas y medicación actual. Es fundamental para un seguimiento adecuado de la salud del paciente y la toma de decisiones médicas informadas.",
            categories: ['Cuarta', 'Quinta'],
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
            description: "Registro diseñado para situaciones de emergencia, proporcionando información crítica sobre el paciente, como su grupo sanguíneo, alergias importantes y contactos de emergencia. Facilita una respuesta rápida y efectiva en casos donde cada segundo cuenta.",
            categories: ['Tercera'],
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

    const searchPlantillaByCategory = computed(() =>
        plantillas.filter(p => p.categories?.includes(selectedCategory.value))
    );

    const searchPlantillaFiltered = computed(() => {
        return plantillas.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(plantillaBuscada.value.toLowerCase());
            const matchesCategory = selectedCategory.value === '' || p.categories?.includes(selectedCategory.value);
            return matchesSearch && matchesCategory;
        });
    });
    

</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <PlantillaCard
                    :plantilla="plantillEnBlanco"
                    @click="openPlantilla(plantillEnBlanco)"
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

        <v-row class="mb-5 align-center">
            <p class="mr-3">Categorías:</p>
            <v-btn-toggle v-model="selectedCategory" mandatory>
                <v-btn :value="''" variant="outlined">
                Todas
                </v-btn>
                <v-btn
                v-for="(category, index) in categories" 
                    :key="index"
                    :value="category"
                    variant="outlined"
                    >
                    {{ category }}
                </v-btn>
            </v-btn-toggle>
        </v-row>



        <v-row>
            <div class="template-list" v-if="plantillaBuscada != ''">
                <PlantillaCard
                    v-for="plantilla in searchPlantillaFiltered"
                    :plantilla="plantilla"
                    @click="openPlantilla(plantilla)"
                />
            </div>
            <div class="template-list" v-else-if="selectedCategory != ''">
                <PlantillaCard
                    v-for="plantilla in searchPlantillaByCategory"
                    :plantilla="plantilla"
                    @click="openPlantilla(plantilla)"
                />
            </div>
            <div v-else class="template-list">
                <PlantillaCard
                    v-for="plantilla in plantillas"
                    :plantilla="plantilla"
                    @click="openPlantilla(plantilla)"
                />
            </div>
        </v-row>
    </v-container>

    <v-dialog max-width="900" max-height="700" v-model="isOpenModalPreview">
        <v-card class="modal-content">
            <v-card-title class="d-flex justify-end">
                <h3 class="mb-0">{{ plantillaSeleccionada?.name }}</h3>
            </v-card-title>
            <v-card-text class="modal-body">
                <v-row class="d-flex justify-center align-center">
                    <v-col cols="8">
                    <div class="preview-box">
                        <PreviewPlantilla
                        v-if="plantillaSeleccionada"
                        :plantilla="plantillaSeleccionada"
                        />
                    </div>
                    </v-col>
                    <v-col cols="4">
                    <div class="description-box">
                        <p>{{ plantillaSeleccionada?.description }}</p>
                    </div>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" @click="">
                Usar esta plantilla
            </v-btn>
            <v-btn text @click="isOpenModalPreview = false">
                Cancelar
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>



</template>

<style scoped lang="scss">

.preview-box{
    transform: scale(0.8);
    border: 2px solid #ccc;
    border-radius: 5px;
    max-height: 75vh;
    overflow: scroll;
    overflow-x: hidden;
}
/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #547ca0 #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 16px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #547ca0;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }


.modal-content {
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.modal-body {
    display: flex;
    gap: 10px;
    overflow: hidden;
}


.search {
  margin-bottom: 20px;
}

.template-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: start;
}
</style>