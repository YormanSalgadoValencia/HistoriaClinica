<template>
    <v-dialog v-model="isVisible" max-width="600px" v-if="localSeccion">
        <v-card>
            <v-card-title class="text-h5 pa-4">Crear Nueva Sección</v-card-title>
            <v-card-text class="pa-4">
                <!-- Campo para el nombre de la sección -->
                <v-text-field v-model="localSeccion.name" label="Nombre de la Sección" outlined></v-text-field>

                <!-- Listado de campos (vacío al inicio) -->
                <div v-for="(field, index) in localSeccion.fields" :key="field.id" class="mb-3">
                    <v-card outlined class="pa-3">
                        <v-card-title class="px-0">
                            Campo {{ index + 1 }}
                            <v-spacer></v-spacer>
                            <v-btn icon @click="eliminarCampo(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </v-card-title>
                        <v-card-text class="px-0">
                            <v-text-field v-model="field.name" label="Nombre del Campo" outlined></v-text-field>
                            <v-select v-model="field.type" :items="tipos" label="Tipo del Campo" outlined></v-select>
                        </v-card-text>
                    </v-card>
                </div>

                <!-- Botón para agregar un nuevo campo -->
                <v-btn text color="primary" @click="agregarCampo"> <v-icon left>mdi-plus</v-icon> Agregar Campo </v-btn>
            </v-card-text>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="cerrarModal">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarCambios">Crear</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
    // Se recibe la sección inicial (en este caso se inicializa vacía en el padre)
    seccion: {
        type: Object,
        required: false,
        default: null
    }
});

const emit = defineEmits(['createSeccion', 'cerrarModal']);

// Controla la visibilidad del diálogo
const isVisible = ref(false);
// Copia local de la sección para editarla sin mutar el objeto original
const localSeccion = ref<any>(null);

// Opciones para el tipo de campo (puedes ajustarlas según lo necesites)
const tipos = ['text', 'number', 'list', 'check', 'textarea'];

// Cada vez que cambie el prop "seccion" se crea la copia local y se muestra el diálogo
watch(
    () => props.seccion,
    (newVal) => {
        if (newVal) {
            localSeccion.value = JSON.parse(JSON.stringify(newVal));
            isVisible.value = true;
        } else {
            isVisible.value = false;
        }
    },
    { immediate: true }
);

function agregarCampo() {
    // Se crea un nuevo campo con valores por defecto
    const nuevoCampo = {
        id: Date.now().toString(),
        name: '',
        type: 'text',
        value: ''
    };

    if (!localSeccion.value.fields) {
        localSeccion.value.fields = [];
    }
    localSeccion.value.fields.push(nuevoCampo);
}

function eliminarCampo(index: number) {
    localSeccion.value.fields.splice(index, 1);
}

function cerrarModal() {
    isVisible.value = false;
    emit('cerrarModal');
}

function guardarCambios() {
    // Emite la nueva sección creada para que el componente padre la procese
    emit('createSeccion', localSeccion.value);
    cerrarModal();
}
</script>
