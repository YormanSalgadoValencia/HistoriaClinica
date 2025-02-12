<script setup lang="ts">
    import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
import { Seccion } from '@/types/HistoriaClinica/Seccion';
    import { onMounted, ref } from 'vue';
  
    const historiaClinicaEstandar = useHistoriaClinicaStore();
    const editSectionModal = ref(false);
    const sectionEditable = ref<Seccion | null>(null);
    const addFieldModal = ref(false);

    onMounted(async () => {
        await historiaClinicaEstandar.fetchHistoriaStandard();
    });

    const newVariable = ref({ name: '', type: '' });

    const variableTypes = [
        { value: 'numeric', label: 'Numerico' },
        { value: 'text', label: 'Texto' },
        { value: 'date', label: 'Fecha' },
        { value: 'category', label: 'Lista' },
        { value: 'checklist', label: 'Verificación' }
    ];

    defineProps<{ plantilla: 
        { name: string; 
          description: string;
          sections: 
          { 
            id: string;
            name: string; 
            fields: 
            { 
              id: string;
              name: string;
              type: string;
              value: string; 
             }[] }[] 
        } 
    }>();

    function deleteSection(id: string){
        if (historiaClinicaEstandar.historiaEstandar) {
            historiaClinicaEstandar.historiaEstandar.sections = 
            historiaClinicaEstandar.historiaEstandar.sections.filter(section => section.id !== id);
        }   
    }

    function editSection(section: Seccion) {
        editSectionModal.value = true;
        sectionEditable.value = { ...section };
    }

    function deleteField(sectionId: string, fieldId: string){
        const section = historiaClinicaEstandar.historiaEstandar?.sections.find(sec => sec.id === sectionId);
        if (section) {
            section.fields = section.fields.filter(field => field.id !== fieldId);
        }
    }

    function deleteField2(sectionId: string, fieldId: string){
        const section = historiaClinicaEstandar.historiaEstandar?.sections.find(sec => sec.id === sectionId);
        if (section) {
            section.fields = section.fields.filter(field => field.id !== fieldId);
        }
    }

    function editField(sectionId: string, fieldId: string){

    }

    function addField(sectionId: string) {
        if (!sectionEditable.value || !sectionEditable.value.fields) return;

        const newField = {
            id: (sectionEditable.value.fields.length + 1).toString(),
            name: newVariable.value.name,
            type: newVariable.value.type,
            value: ""
        };

        sectionEditable.value.fields.push(newField);

        newVariable.value = { name: '', type: '' };
        addFieldModal.value = false; 
    }


</script>

<template>
    <v-container fluid>
        <v-row class="d-flex justify-end">
            <v-col  cols="12">
                <v-btn
                    color="#B71C1C"
                >Agregar Sección</v-btn>
            </v-col>
        </v-row>
      <v-row justify="center" v-if="historiaClinicaEstandar.historiaEstandar">
            <v-col cols="12" md="10">
                <v-card class="mb-6 header-card" elevation="3">
                    <v-card-title class="header-title">
                        <span>Historia Clínica</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    type="text"
                                    label="Nombre de la plantilla"
                                >

                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    type="text"
                                    label="Descripción"
                                >

                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>

                <div v-for="seccion in historiaClinicaEstandar.historiaEstandar.sections" :key="seccion.id" class="mb-6">
                    <v-card class="section-card" elevation="2">
                        <div class="section-header">
                            <div class="section-title">{{ seccion.name }}</div>
                            <v-btn
                                v-if="seccion.name !== 'Identificación del Paciente' && seccion.name !== 'Datos de Contacto'"
                                prepend-icon="mdi-tools"
                                variant="text"
                                color="#FFEB3B"
                                @click="editSection(seccion)"
                            >
                                Modificar Sección
                            </v-btn>
                            <v-btn
                                v-if="seccion.name !== 'Identificación del Paciente' && seccion.name !== 'Datos de Contacto'"
                                prepend-icon="mdi-delete"
                                variant="text"
                                color="#1f74ff"
                                @click="deleteSection(seccion.id)"
                            >
                                Eliminar Sección
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
                                        >
                                        </v-text-field>          
                                    </template>
                                </v-col>
                            </v-row>
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
    

    <v-dialog max-width="800" v-model="editSectionModal">
        <v-card>
        <v-card-title>
            {{ sectionEditable?.name }}
        </v-card-title>
        <v-card-text>
            <div>
                <v-row>
                    <v-col col="10">
                        <span>Nombre de la sección: </span>
                        <v-text-field
                            :label="sectionEditable?.name"
                        >

                        </v-text-field>
                    </v-col>
                    <v-col col="2">
                        <v-btn 
                            icon 
                            color="red"
                        >
                            <v-icon>mdi-tools</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                
            </div>
            <div v-for="field in sectionEditable?.fields" :key="field.id">
                <v-row align="center">
                    <!-- Campo de texto -->
                    <v-col cols="8">
                        <v-text-field
                            v-model="field.value"
                            :type="field.type"
                            :label="field.name"
                            variant="outlined"
                            disabled="true"
                        />
                    </v-col>

                    <!-- Botón de eliminar -->
                    <v-col cols="2" class="text-right">
                        <v-btn 
                            icon 
                            color="red" 
                            @click="deleteField2(sectionEditable?.id || '', field.id)"
                        >
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </v-col>

                    <!-- Botón de editar -->
                    <v-col cols="2" class="text-right">
                        <v-btn 
                            icon 
                            color="red" 
                            @click="editField(sectionEditable?.id || '', field.id)"
                        >
                            <v-icon>mdi-tools</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn color="blue" @click="editSectionModal = false">Cerrar</v-btn>
            <v-btn color="#FFEB3B" @click="addFieldModal = true">Agregar campo</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>

    <v-dialog v-model="addFieldModal" max-width="800">
        <v-card>
            <v-card-title>
                <h4>Agregar campo</h4>
            </v-card-title>
            <v-card-text>
                
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            :label="'Nombre de la variable'"
                            v-model="newVariable.name"
                            outlined
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-select
                            :label="'Tipo de campo'"
                            v-model="newVariable.type"
                            :items="variableTypes"
                            item-value="value"
                            item-title="label"
                            outlined
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actios>
                <v-btn @click="addField(sectionEditable?.id || '')">Agregar</v-btn>
                <v-btn @click="addFieldModal = false">Cancelar</v-btn>
            </v-card-actios>
        </v-card>
    </v-dialog>


</template>



<style scoped lang="scss">
.no-hover:hover {
    background-color: transparent !important;
    background-color: red;
}
</style>