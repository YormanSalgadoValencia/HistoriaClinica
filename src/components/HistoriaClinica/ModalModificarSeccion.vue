<template>
    <!-- El diálogo se muestra si existe la sección a editar -->
    <v-dialog v-model="isVisible" max-width="800px" v-if="localSeccion">
        <v-card>
            <v-card-title>
                <span class="headline">Editar Sección: {{ localSeccion.name }}</span>
            </v-card-title>

            <v-card-text>
                <!-- Edición del nombre de la sección -->
                <v-text-field v-model="localSeccion.name" label="Nombre de la Sección" outlined></v-text-field>

                <!-- Listado de campos -->
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
                            <v-select
                                v-model="field.type"
                                :items="fieldTypes"
                                item-title="label"
                                item-value="value"
                                label="Tipo del Campo"
                                outlined
                            ></v-select>
                        </v-card-text>
                    </v-card>
                </div>

                <!-- Botón para agregar un nuevo campo -->
                <v-btn text color="primary" @click="agregarCampo"> <v-icon left>mdi-plus</v-icon> Agregar Campo </v-btn>
            </v-card-text>

            <v-card-actions>
                <v-btn text @click="cerrarModal">Cancelar</v-btn>
                <v-btn color="primary" @click="guardarCambios">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

// Se espera recibir la sección a editar; se permite que sea null para indicar que no hay sección activa.
const props = defineProps({
    seccion: {
        type: Object,
        required: false,
        default: null
    }
});

const emit = defineEmits(['updateSeccion', 'cerrarModal']);

// Controla la visibilidad del diálogo
const isVisible = ref(false);

// Creamos una copia local de la sección para editarla sin modificar la original directamente
const localSeccion = ref<any>(null);

// Opciones para el tipo de campo; puedes agregar o modificar según tus necesidades
const fieldTypes = [
    { value: 'text', label: 'Texto', icon: 'mdi-form-textbox', description: 'Campo de texto simple' },
    { value: 'number', label: 'Número', icon: 'mdi-numeric', description: 'Campo numérico' },
    { value: 'check', label: 'Casilla', icon: 'mdi-checkbox-marked-outline', description: 'Casilla de verificación' },
    { value: 'textarea', label: 'Área de texto', icon: 'mdi-form-textarea', description: 'Campo de texto multilínea' },
    { value: 'date', label: 'Fecha', icon: 'mdi-calendar', description: 'Selector de fecha' },
    { value: 'dropdown', label: 'Lista desplegable', icon: 'mdi-menu-down', description: 'Lista de opciones' }
];

// Cuando cambie el prop "seccion" se crea o se reinicializa la copia local y se muestra el diálogo
watch(
    () => props.seccion,
    (newVal) => {
        if (newVal) {
            // Se hace una copia profunda (puedes usar alguna librería o JSON para clonar)
            localSeccion.value = JSON.parse(JSON.stringify(newVal));
            isVisible.value = true;
        } else {
            isVisible.value = false;
        }
    },
    { immediate: true }
);

function agregarCampo() {
    // Se crea un nuevo campo con valores por defecto.
    // En este ejemplo se utiliza Date.now() para asignar un  único temporal.
    const nuevoCampo = {
        id: Date.now().toString(),
        name: '',
        type: 'text',
        value: ''
    };

    // Si la sección aún no tiene campo, se inicializa el arreglo
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
    console.log('Buenas');
    
    // Emitimos la sección actualizada para que el componente padre la procese
    emit('updateSeccion', localSeccion.value);
    cerrarModal();
}
</script>

<style lang="scss" scoped>
</style>
