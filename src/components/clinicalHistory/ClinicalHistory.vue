<script setup lang="ts">
import { computed, ref } from 'vue';
import PlantillaCard from './PlantillaCard.vue';
import PreviewPlantilla from './PreviewPlantilla.vue';
import { useHistoriaClinicaStore } from '@/stores/historiaClinicaStore';
import { onMounted } from 'vue';
import type { Plantilla } from '@/types/HistoriaClinica/Plantilla';
import ModalCrearPlantilla from '../HistoriaClinica/ModalCrearPlantilla.vue';
import { router } from '@/router';

const plantillaBuscada = ref('');
const selectedCategory = ref('');
const isOpenModalPreview = ref(false);
const isOpenModalCrear = ref(false);
const plantillaSeleccionada = ref<Plantilla | null>(null);
const confirmModal = ref(false);
const categories = ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta'];
const historiaStore = useHistoriaClinicaStore();
const historiaClinicaEstandar = useHistoriaClinicaStore();

onMounted(async () => {
    await historiaStore.fetchHistorias();
    await historiaClinicaEstandar.fetchHistoriaStandard();
});

const searchPlantilla = computed(() =>
    historiaStore.historias.filter((p) => p.name.toLowerCase().includes(plantillaBuscada.value.toLowerCase()))
);

function openPlantilla(plantilla: Plantilla) {
    isOpenModalPreview.value = true;
    plantillaSeleccionada.value = plantilla;
}

const searchPlantillaByCategory = computed(() => historiaStore.historias.filter((p) => p.categories.includes(selectedCategory.value)));

const searchPlantillaFiltered = computed(() => {
    return historiaStore.historias.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(plantillaBuscada.value.toLowerCase());
        const matchesCategory = selectedCategory.value === '' || p.categories?.includes(selectedCategory.value);
        return matchesSearch && matchesCategory;
    });
});

function usarPlantilla(idPlantilla: string | undefined) {
    router.push('historia-clinica/' + idPlantilla);
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <PlantillaCard
                    v-if="historiaClinicaEstandar.historiaEstandar"
                    :plantilla="historiaClinicaEstandar.historiaEstandar"
                    @click="openPlantilla(historiaClinicaEstandar.historiaEstandar)"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="9">
                <div class="search">
                    <v-text-field @keyup="searchPlantilla" v-model="plantillaBuscada" label="Buscar"> </v-text-field>
                </div>
            </v-col>
            <v-col cols="3">
                <v-btn color="primary" @click="isOpenModalCrear = true">
                    {{ 'Crear Plantilla' }}
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="mb-5 align-center">
            <p class="mr-3">Categorías:</p>
            <v-btn-toggle v-model="selectedCategory" mandatory>
                <v-btn :value="''" variant="outlined"> Todas </v-btn>
                <v-btn v-for="(category, index) in categories" :key="index" :value="category" variant="outlined">
                    {{ category }}
                </v-btn>
            </v-btn-toggle>
        </v-row>

        <v-row>
            <div class="template-list" v-if="plantillaBuscada != ''">
                <PlantillaCard v-for="plantilla in searchPlantillaFiltered" :plantilla="plantilla" @click="openPlantilla(plantilla)" />
            </div>
            <div class="template-list" v-else-if="selectedCategory != ''">
                <PlantillaCard v-for="plantilla in searchPlantillaByCategory" :plantilla="plantilla" @click="openPlantilla(plantilla)" />
            </div>
            <div v-else class="template-list">
                <PlantillaCard v-for="plantilla in historiaStore.historias" :plantilla="plantilla" @click="openPlantilla(plantilla)" />
            </div>
        </v-row>

        <ModalCrearPlantilla v-model="isOpenModalCrear" />
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
                            <PreviewPlantilla v-if="plantillaSeleccionada" :plantilla="plantillaSeleccionada" />
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
                <v-btn color="primary" @click="usarPlantilla(plantillaSeleccionada?.id)"> Usar esta plantilla </v-btn>
                <v-btn text @click="isOpenModalPreview = false"> Cancelar </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="confirmModal">
        <v-card>
            <v-card-title> Confirmación </v-card-title>
            <v-card-text> Desea usar la plantilla base o crear desde 0 </v-card-text>
            <v-card-actios>
                <v-btn :to="'/nueva-plantilla-desde-base'">Usar plantilla base</v-btn>
                <v-btn>Empezar de 0</v-btn>
            </v-card-actios>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">
.preview-box {
    transform: scale(0.8);
    border: 2px solid #ccc;
    border-radius: 5px;
    max-height: 75vh;
    overflow: scroll;
    overflow-x: hidden;
}
.description-box {
    max-height: 150px;
    overflow-y: auto;
    word-wrap: break-word;
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
