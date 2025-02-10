<template>
    <v-card class="mb-6 form-card" elevation="2">
        <v-card-title class="form-card-title">
            <v-icon class="mr-2">mdi-file-document-edit</v-icon>
            Información General
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="plantillaName"
                        label="Nombre de la Plantilla"
                        prepend-inner-icon="mdi-format-title"
                        variant="outlined"
                        class="input-field"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="plantillaDescription"
                        label="Descripción"
                        prepend-inner-icon="mdi-text"
                        variant="outlined"
                        class="input-field"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select
                        v-model="plantillaCategories"
                        label="Categorías (opcional)"
                        :items="especialidades"
                        item-title="name"
                        prepend-inner-icon="mdi-tag-multiple"
                        multiple
                        chips
                        variant="outlined"
                        class="input-field"
                    ></v-select>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { especialidades } from '@/data/especialidades';

const props = defineProps({
    plantillaName: String,
    plantillaDescription: String,
    plantillaCategories: Array
});

const emit = defineEmits(['update:plantillaName', 'update:plantillaDescription', 'update:plantillaCategories']);

const plantillaName = ref(props.plantillaName);
const plantillaDescription = ref(props.plantillaDescription);
const plantillaCategories = ref(props.plantillaCategories);
</script>

<style scoped>
.input-field {
    width: 100%;
}
.form-card {
    border-radius: 12px;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}
.form-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.form-card-title {
    background-color: #f8f9fa;
    padding: 16px;
    border-bottom: 1px solid #e9ecef;
    margin-bottom: 16px;
}

.form-card-text {
    font-size: 1rem;
    color: #666;
}

.form-card-actions {
    margin-top: 1rem;
}
</style>
