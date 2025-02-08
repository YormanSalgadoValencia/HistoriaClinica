<template>
    <!-- Dialog de Vuetify para el modal -->
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title class="headline">Agregar Formato de Atención</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-select
                        v-model="nuevoFormato.tipoEspecialidad"
                        :items="especialidades"
                        item-title="name"
                        item-value="id"
                        label="Tipo de Especialidad"
                        attach
                        required
                    ></v-select>
                    <v-text-field v-model="nuevoFormato.nombrePersonalizado" label="Nombre Personalizado" required></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="cerrarModal">
                    <v-icon left>mdi-close</v-icon>
                    Cancelar
                </v-btn>
                <v-btn color="blue" text @click="agregarFormatoAtencion">
                    <v-icon left>mdi-content-save</v-icon>
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useFormatoAtencionStore } from '@/stores/formatoAtencionStore';
import Swal from 'sweetalert2';
import { especialidades } from '@/data/especialidades';

// Definición de props y emisión de eventos
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

// Estado reactivo para el formulario
const nuevoFormato = ref({
    id: Date.now().toString(),
    tipoEspecialidad: '', // Ahora es un string, por lo que debe coincidir con los id de la lista
    nombrePersonalizado: ''
});

// Obtenemos el store de Formato de Atención
const formatoAtencionStore = useFormatoAtencionStore();

// Estado local para controlar el diálogo de Vuetify
const dialog = ref(props.isOpen);

// Sincronizamos el prop isOpen con la variable local dialog
watch(
    () => props.isOpen,
    (val) => {
        dialog.value = val;
    }
);

// Si el diálogo se cierra localmente, emitimos el evento para notificar al componente padre
watch(dialog, (val) => {
    if (!val) {
        cerrarModal();
    }
});

// Método para agregar un formato de atención
const agregarFormatoAtencion = async () => {
    try {
        await formatoAtencionStore.addFormatoAtencion(nuevoFormato.value);
        await Swal.fire({
            icon: 'success',
            title: 'Formato de Atención Guardado',
            text: 'El formato de atención se ha guardado correctamente.',
            confirmButtonText: 'Aceptar'
        });
        resetFormulario();
        cerrarModal();
    } catch (error) {
        console.error('Error al agregar el formato de atención:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar el formato de atención.'
        });
    }
};

// Método para resetear el formulario
const resetFormulario = () => {
    nuevoFormato.value = {
        id: Date.now().toString(),
        tipoEspecialidad: '',
        nombrePersonalizado: ''
    };
};

// Método para cerrar el modal
const cerrarModal = () => {
    resetFormulario();
    emit('close');
};
</script>

<style scoped>
/* Estilos personalizados para el modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-container {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    padding: 2rem;
    max-width: 400px;
    width: 90%;
    animation: slideDown 0.4s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
}

.form-group input:focus {
    border-color: #1f74ff;
    box-shadow: 0 0 5px rgba(31, 116, 255, 0.5);
    outline: none;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
}

.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn-cancel {
    background: #f44336;
    color: #fff;
}

.btn-cancel:hover {
    background: #e53935;
}

.btn-save {
    background: #1f74ff;
    color: #fff;
}

.btn-save:hover {
    background: #1565c0;
}
</style>
