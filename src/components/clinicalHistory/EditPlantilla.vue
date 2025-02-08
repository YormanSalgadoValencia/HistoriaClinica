<script setup lang="ts">
    import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
    import { onMounted } from 'vue';
  
    const historiaClinicaEstandar = useHistoriaClinicaStore();

    onMounted(async () => {
        await historiaClinicaEstandar.fetchHistoriaStandard();

        console.log('COMPONENTE EDIT:' + JSON.stringify(historiaClinicaEstandar));
        
    });

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


</script>

<template>
    <v-container fluid>
      <v-row justify="center" v-if="historiaClinicaEstandar.historiaEstandar">
            <v-col cols="12" md="10">
                <v-card class="mb-6 header-card" elevation="3">
                    <v-card-title class="header-title">
                        <span>Historia Clínica: {{ historiaClinicaEstandar.historiaEstandar.name }}</span>
                    </v-card-title>
                    <v-card-subtitle class="header-subtitle">
                        {{ historiaClinicaEstandar.historiaEstandar.description }}
                    </v-card-subtitle>
                </v-card>

                <div v-for="seccion in historiaClinicaEstandar.historiaEstandar.sections" :key="seccion.id" class="mb-6">
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

</style>