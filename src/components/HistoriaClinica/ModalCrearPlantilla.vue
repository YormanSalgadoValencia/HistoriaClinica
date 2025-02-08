<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});

const emits = defineEmits(['update:modelValue', 'crearDesdeCero', 'crearConDefecto']);

const isDialogOpen = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
        isDialogOpen.value = newVal;
    }
);

watch(isDialogOpen, (newVal) => {
    emits('update:modelValue', newVal);
});

function crearDesdeCero() {
    emits('crearDesdeCero');
    isDialogOpen.value = false;
}

function crearConDefecto() {
    emits('crearConDefecto');
    isDialogOpen.value = false;
}

function cerrarModal() {
    isDialogOpen.value = false;
}
</script>

<template>
    <v-dialog v-model="isDialogOpen" max-width="500" transition="dialog-bottom-transition" class="template-dialog">
        <v-card class="modal-card">
            <v-card-title class="modal-header">
                <v-icon icon="mdi-file-document-plus" class="mr-2" color="white"></v-icon>
                Crear Nueva Plantilla
            </v-card-title>

            <v-card-text class="modal-card-text">
                <div class="text-subtitle-1 font-weight-medium mb-4">¿Cómo deseas comenzar?</div>
                <div class="options-container">
                    <v-btn block variant="elevated" color="primary" height="56" class="option-button mb-3" @click="crearDesdeCero">
                        <div class="button-content">
                            <div class="button-main">
                                <v-icon icon="mdi-pencil" class="mr-2"></v-icon>
                                <span class="button-title">Crear desde cero</span>
                            </div>
                            <span class="option-description">Comienza con una plantilla en blanco</span>
                        </div>
                    </v-btn>

                    <v-btn block variant="elevated" color="secondary" height="56" class="option-button" @click="crearConDefecto">
                        <div class="button-content">
                            <div class="button-main">
                                <v-icon icon="mdi-content-copy" class="mr-2"></v-icon>
                                <span class="button-title">Usar plantilla por defecto</span>
                            </div>
                            <span class="option-description">Comienza con una estructura predefinida</span>
                        </div>
                    </v-btn>
                </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="modal-card-actions">
                <v-btn variant="text" color="error" @click="cerrarModal" class="close-button">
                    <v-icon icon="mdi-close" class="mr-1"></v-icon>
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.template-dialog {
    backdrop-filter: blur(8px);
}

.modal-card {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
    background: linear-gradient(135deg, #000534 0%, #1f74ff 100%);
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 20px 24px;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
}

.modal-card-text {
    padding: 24px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.05), transparent);
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.option-button {
    position: relative;
    text-align: left;
    height: auto !important;
    padding: 12px 20px;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.option-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.button-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
}

.button-main {
    display: flex;
    align-items: center;
}

.button-title {
    font-size: 1rem;
    font-weight: 500;
}

.option-description {
    display: block;
    font-size: 0.8rem;
    opacity: 0.7;
    font-weight: normal;
    margin-left: 28px; /* Alinea con el texto principal (icon width + margin) */
}

.modal-card-actions {
    padding: 16px 24px;
    display: flex;
    justify-content: flex-start;
    background: rgba(0, 0, 0, 0.02);
}

.close-button {
    font-weight: 500;
    letter-spacing: 0.5px;
}

/* Animaciones */
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
    transition:
        transform 0.3s ease,
        opacity 0.3s ease;
}

.dialog-bottom-transition-enter-from,
.dialog-bottom-transition-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
