<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Paciente } from '@/types/Paciente';
import { usePacienteStore } from '@/stores/pacienteStore';

const router = useRouter();
const menu = ref(false);
const pacienteStore = usePacienteStore();
const paciente = ref<Paciente>(new Paciente('', '', '', '', '', '', '', ''));

async function guardarPaciente() {
    try {
        await pacienteStore.addPaciente(paciente.value);
        router.push({ name: 'Pacientes' });
    } catch (error) {
        console.error('Error al crear el paciente:', error);
    }
}

function cancelar() {
    router.push({ name: 'Pacientes' });
}
</script>

<template>
    <v-container class="pa-6" style="max-width: 800px">
        <!-- Header Card -->
        <v-card class="header-card" elevation="3">
            <v-card-title class="header-title">
                <span>Crear Nuevo Paciente</span>
            </v-card-title>
            <v-card-subtitle class="header-subtitle">Ingrese los datos del paciente</v-card-subtitle>
        </v-card>

        <!-- Form Card -->
        <v-card class="content-card" elevation="2">
            <v-card-text>
                <v-form @submit.prevent="guardarPaciente">
                    <v-text-field v-model="paciente.nombre" label="Nombre" required clearable class="input-field"></v-text-field>
                    <v-text-field v-model="paciente.apellido" label="Apellido" required clearable class="input-field"></v-text-field>
                    <v-text-field
                        v-model="paciente.numeroDocumento"
                        label="Documento"
                        required
                        clearable
                        class="input-field"
                    ></v-text-field>

                    <!-- Date Picker -->
                    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="paciente.fechaNacimiento"
                                label="Fecha de Nacimiento"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                class="input-field"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="paciente.fechaNacimiento"
                            @update:modelValue="
                                (value: any) => {
                                    paciente.fechaNacimiento = new Date(value).toISOString();
                                    menu = false;
                                }
                            "
                        ></v-date-picker>
                    </v-menu>

                    <v-select
                        v-model="paciente.genero"
                        label="Género"
                        :items="['Masculino', 'Femenino', 'Otro']"
                        required
                        class="input-field"
                    ></v-select>
                    <v-text-field v-model="paciente.acompanante" label="Acompañante" clearable class="input-field"></v-text-field>
                    <v-text-field v-model="paciente.responsable" label="Responsable" clearable class="input-field"></v-text-field>

                    <v-card-actions class="mt-4">
                        <v-btn type="submit" color="primary" class="action-btn">Guardar</v-btn>
                        <v-btn color="secondary" @click="cancelar" class="action-btn">Cancelar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style scoped lang="scss">
/* Estilo para la tarjeta del encabezado */
.header-card {
    margin-bottom: 20px;
    padding: 16px;
    text-align: center;
    background-color: #1f74ff; /* Color gris oscuro para el encabezado */
    border-radius: 10px;
}

.header-title {
    font-size: 24px;
    font-weight: bold;
    color: white;
}

.header-subtitle {
    font-size: 16px;
    color: white; /* Gris suave para subtítulos */
    margin-top: 5px;
}

/* Estilo para la tarjeta de contenido */
.content-card {
    padding: 20px;
    border-radius: 10px;
    background-color: #f5f5f5; /* Color de fondo claro para el formulario */
}

/* Estilos para los campos de entrada */
.input-field {
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff; /* Fondo blanco para campos de texto */
    border: 1px solid #cfd8dc; /* Borde gris claro */
}

.input-field input,
.input-field .v-select__selections {
    color: black; /* Color gris oscuro para los textos dentro de los campos */
}

/* Estilo para los botones */
.action-btn {
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 20px;
    transition: all 0.3s ease;
}

/* Botón de guardar */
.action-btn[type='submit'] {
    background-color: #0288d1; /* Azul para el botón de guardar */
    color: white;
}

/* Botón de cancelar */
.action-btn[color='secondary'] {
    background-color: #d32f2f; /* Rojo para el botón de cancelar */
    color: white;
}

/* Botón en hover */
.action-btn:hover {
    transform: scale(1.05);
}

/* Estilos adicionales para la disposición */
.v-btn {
    margin-top: 10px;
}
</style>
