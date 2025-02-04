<script setup lang="ts">
    import { computed, reactive, ref } from "vue";
    import PlantillaCard from "./PlantillaCard.vue";

    const plantillaBuscada = ref('');

    const plantillas = reactive([
        {
            id: crypto.randomUUID(),
            name: "Primera Plantilla",
            description: "Plantilla básica de información personal",
            sections: [
                {
                    id: crypto.randomUUID(),
                    name: "Información personal",
                    fields: [
                        {id: crypto.randomUUID(), name: "Nombre", type: "text", value:""},
                        {id: crypto.randomUUID(), name: "Edad", type: "number", value:""},
                    ],
        
                },
                {
                    id: crypto.randomUUID(),
                    name: "Contacto",
                    fields: [
                        { id: crypto.randomUUID(), name: "Correo Electrónico", type: "email", value: "" },
                        { id: crypto.randomUUID(), name: "Teléfono", type: "text", value: "" },
                    ],
                },
            ]
        },
        {
            id: crypto.randomUUID(),
            name: "Plantilla de Trabajo",
            description: "Formulario para datos laborales",
            sections: [
                {
                    id: crypto.randomUUID(),
                    name: "Datos de la Empresa",
                    fields: [
                        { id: crypto.randomUUID(), name: "Nombre de la Empresa", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Cargo", type: "text", value: "" },
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    name: "Información Salarial",
                    fields: [
                        { id: crypto.randomUUID(), name: "Salario Mensual", type: "number", value: "" },
                        { id: crypto.randomUUID(), name: "Tipo de Contrato", type: "text", value: "" },
                    ],
                },
            ],
        }, 
        {
            id: crypto.randomUUID(),
            name: "Plantilla de Salud",
            description: "Formulario para datos médicos",
            sections: [
                {
                    id: crypto.randomUUID(),
                    name: "Historial Médico",
                    fields: [
                        { id: crypto.randomUUID(), name: "Enfermedades Crónicas", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Alergias", type: "text", value: "" },
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    name: "Datos de Contacto Médico",
                    fields: [
                        { id: crypto.randomUUID(), name: "Nombre del Médico", type: "text", value: "" },
                        { id: crypto.randomUUID(), name: "Teléfono del Médico", type: "text", value: "" },
                    ],
                },
            ],
        },       
     ]);

     const searchPlantilla = computed(() =>
        plantillas.filter(p => p.name.toLowerCase().includes(plantillaBuscada.value.toLowerCase()))
    );

    function openPlantilla(plantilla:any){
        console.log(plantilla);
    }

</script>

<template>
    <v-container>
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
</template>

<style scoped lang="scss">
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