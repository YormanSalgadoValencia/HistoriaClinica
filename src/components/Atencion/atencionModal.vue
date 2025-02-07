<template>
    <!-- Modal principal de atención con Vuetify -->
    <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
            <v-card-title class="headline"> Nueva Atención </v-card-title>

            <v-card-text>
                <v-form ref="form" @submit.prevent="crearAtencion">
                    <!-- Fila para Fecha y Modalidad -->
                    <v-row dense>
                        <v-col cols="6">
                            <v-text-field v-model="fechaAtencionString" label="Fecha de Atención" type="date" required></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                v-model="atencion.modalidadAtencion"
                                :items="['Presencial', 'Virtual']"
                                label="Modalidad"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>

                    <!-- Campo para Consecutivo -->
                    <v-text-field v-model="atencion.consecutivoAtencion" label="Consecutivo" required></v-text-field>

                    <!-- Campo para Especialidad -->
                    <v-row dense class="d-flex align-center">
                        <v-col cols="10">
                            <v-select
                                :key="especialidades.length"
                                :items="especialidades"
                                item-value="_id"
                                item-title="nombrePersonalizado"
                                v-model="atencion.tiposAtencion"
                                label="Especialidad"
                                outlined
                                return-object
                                required
                            ></v-select>
                        </v-col>
                        <v-col cols="2" class="d-flex justify-center">
                            <!-- Botón para abrir modal de agregar especialidad -->
                            <v-btn icon color="primary" @click="abrirAddEspecialidadModal">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>

                    <!-- Campo para Información Adicional -->
                    <v-textarea v-model="atencion.informacionAdicional" label="Información Adicional" rows="3"></v-textarea>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text @click="cerrarModal">
                    <v-icon left>mdi-close</v-icon>
                    Cancelar
                </v-btn>
                <v-btn color="green" text @click="crearAtencion">
                    <v-icon left>mdi-content-save</v-icon>
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Modal para agregar especialidad -->
    <ModalFormatoAtencion :isOpen="isAddEspecialidadModalOpen" @close="cerrarAddEspecialidadModal" @agregar="agregarEspecialidad" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps, defineEmits, watch } from 'vue';
import { useAtencionStore } from '@/stores/atencionStore';
import { useFormatoAtencionStore } from '@/stores/formatoAtencionStore';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
import ModalFormatoAtencion from '@/components/FormatoAtencion/ModalFormatoAtencion.vue';

// Props y emisión para controlar la visibilidad del modal principal
const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

// Variables reactivas para sincronizar el prop con el diálogo de Vuetify
const dialog = ref(props.isOpen);
watch(
    () => props.isOpen,
    (val) => {
        dialog.value = val;
    }
);
watch(dialog, (val) => {
    if (!val) {
        cerrarModal();
    }
});

// Accedemos a los stores
const atencionStore = useAtencionStore();
const formatoAtencionStore = useFormatoAtencionStore();
const { formatosAtencion } = storeToRefs(formatoAtencionStore);
const especialidades = computed(() => formatosAtencion.value);

// Estado para la nueva atención
const atencion = ref({
    id: '',
    fechaAtencion: new Date(),
    modalidadAtencion: 'Presencial',
    consecutivoAtencion: '',
    informacionAdicional: '',
    tiposAtencion: { id: '', tipoEspecialidad: '', nombrePersonalizado: '' },
    historiaClinica: {
        id: '',
        name: '',
        description: '',
        sections: []
    }
});

// Computed para formatear la fecha
const fechaAtencionString = computed({
    get: () => atencion.value.fechaAtencion.toISOString().split('T')[0],
    set: (val: string) => (atencion.value.fechaAtencion = new Date(val))
});

// Estado para el modal de agregar especialidad
const isAddEspecialidadModalOpen = ref(false);

// Función para crear la atención
const crearAtencion = async () => {
    try {
        if (!atencion.value.fechaAtencion || !atencion.value.consecutivoAtencion) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos obligatorios.'
            });
            return;
        }

        // Validación de la nueva especialidad si se seleccionó "agregar"
        if (
            atencion.value.tiposAtencion.tipoEspecialidad === 'agregar' &&
            !atencion.value.tiposAtencion.nombrePersonalizado &&
            !atencion.value.tiposAtencion.nombrePersonalizado
        ) {
            Swal.fire({
                icon: 'error',
                title: 'Especialidad requerida',
                text: 'Por favor, ingresa el nombre de la nueva especialidad.'
            });
            return;
        }

        // En caso de que se haya agregado la especialidad a través del modal
        if (atencion.value.tiposAtencion.tipoEspecialidad === 'agregar') {
            atencion.value.tiposAtencion.tipoEspecialidad = atencion.value.tiposAtencion.nombrePersonalizado;
        }

        const atencionConFecha = {
            ...atencion.value,
            fechaAtencion: new Date(atencion.value.fechaAtencion),
            historiaClinica: {
                id: '',
                name: '',
                description: '',
                sections: []
            }
        };

        await atencionStore.addAtencion(atencionConFecha);

        Swal.fire({
            icon: 'success',
            title: 'Atención creada',
            text: 'La atención se ha registrado exitosamente.',
            timer: 2000,
            showConfirmButton: false
        });

        resetFormulario();
        cerrarModal();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al registrar la atención. Intenta de nuevo.'
        });
    }
};

// Función para reiniciar el formulario
const resetFormulario = () => {
    atencion.value = {
        id: Date.now().toString(),
        fechaAtencion: new Date(),
        modalidadAtencion: 'Presencial',
        consecutivoAtencion: '',
        informacionAdicional: '',
        tiposAtencion: { id: '', tipoEspecialidad: '', nombrePersonalizado: '' },
        historiaClinica: {
            id: '',
            name: '',
            description: '',
            sections: []
        }
    };
};

// Función para cerrar el modal principal
const cerrarModal = () => {
    resetFormulario();
    emit('close');
};

// Funciones para el modal de agregar especialidad
const abrirAddEspecialidadModal = () => {
    isAddEspecialidadModalOpen.value = true;
};

const cerrarAddEspecialidadModal = () => {
    isAddEspecialidadModalOpen.value = false;
};

const agregarEspecialidad = async (nombreEspecialidad: string) => {
    if (!nombreEspecialidad) {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor ingresa un nombre para la especialidad.'
        });
        return;
    }

    const nueva = {
        id: Date.now().toString(),
        tipoEspecialidad: '', // Puedes asignar algún tipo o dejarlo vacío
        nombrePersonalizado: nombreEspecialidad
    };

    try {
        await formatoAtencionStore.addFormatoAtencion(nueva);
        cerrarAddEspecialidadModal();

        // Establecemos la nueva especialidad como la seleccionada
        atencion.value.tiposAtencion = nueva;

        Swal.fire({
            icon: 'success',
            title: 'Especialidad agregada',
            text: 'La nueva especialidad se ha agregado exitosamente.'
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al agregar la especialidad.'
        });
    }
};

onMounted(async () => {
    await formatoAtencionStore.fetchFormatosAtencion();
});
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.modal-container {
    background-color: #ffffff;
    width: 600px;
    max-width: 95%;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.modal-header {
    background-color: #f8f9fa;
    padding: 1rem;
    border-bottom: 1px solid #e9ecef;
}

.modal-title {
    margin: 0;
    color: #2c3e50;
    font-size: 1.25rem;
    font-weight: 600;
}

.modal-form {
    padding: 1.5rem;
    overflow-y: auto;
}

.form-section {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    margin-bottom: 0;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
    font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 0.625rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background-color: #fff;
    color: #2d3748;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #3b82f6;
    outline: none;
}

.specialty-container {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
}

.specialty-select {
    flex: 1;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    gap: 0.5rem;
    height: 38px;
}

.btn-add {
    background-color: #3b82f6;
    color: white;
    white-space: nowrap;
}

.btn-add:hover {
    background-color: #2563eb;
}

.btn-cancel {
    background-color: #ef4444;
    color: white;
}

.btn-cancel:hover {
    background-color: #dc2626;
}

.btn-save {
    background-color: #10b981;
    color: white;
}

.btn-save:hover {
    background-color: #059669;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e9ecef;
}

textarea {
    resize: vertical;
    min-height: 80px;
    max-height: 150px;
}

@media (max-width: 640px) {
    .form-row {
        grid-template-columns: 1fr;
    }

    .specialty-container {
        flex-direction: column;
    }

    .btn-add {
        width: 100%;
    }

    .modal-container {
        height: 90vh;
        max-height: 90vh;
    }
}
</style>
