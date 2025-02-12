<template>
    <v-container class="pa-6" style="max-width: 1800px">
        <!-- Header Card -->
        <v-card class="mb-6 header-card" elevation="3">
            <v-card-title class="header-title">
                <span>Listado de Pacientes</span>
            </v-card-title>
            <v-card-subtitle class="header-subtitle">Gestión y administración de pacientes</v-card-subtitle>
        </v-card>

        <!-- Button Section -->
        <v-card class="content-card" elevation="2">
            <v-card-text class="button-container">
                <v-btn color="#1f74ff" variant="elevated" @click="irACrearPaciente">Agregar Nuevo Paciente</v-btn>
            </v-card-text>

            <!-- Table Component -->
            <v-card-text class="table-container">
                <PacienteTable :pacientes="pacientes" :loading="loading" :error="error" class="expanded-table" />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePacienteStore } from '@/stores/pacienteStore';
import PacienteTable from '@/components/Paciente/PacienteTable.vue';

const router = useRouter();
const pacienteStore = usePacienteStore();
const { pacientes, loading, error, fetchPacientes } = pacienteStore;

onMounted(() => {
    fetchPacientes();
});

function irACrearPaciente() {
    router.push({ name: 'CrearPaciente' });
}
</script>

<style scoped>
/* Estilos del encabezado */
.header-card {
    background: linear-gradient(135deg, #000534 0%, #1f74ff 100%);
    color: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(31, 116, 255, 0.15);
}

.header-title {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 24px 24px 12px;
}

.header-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    padding: 0 24px 24px;
}

/* Contenedor del contenido */
.content-card {
    width: 100%;
    max-width: 100%;
    border-radius: 12px;
    padding: 24px;
    margin: auto;
}

/* Botón centrado */
.button-container {
    display: flex;
    justify-content: center;
    padding-bottom: 16px;
}

/* Expansión total de la tabla */
.table-container {
    display: flex;
    flex-grow: 1;
    width: 100%;
    justify-content: center;
}

.expanded-table {
    width: 100%;
    min-width: 100%;
    min-height: 500px;
}

@media (max-width: 600px) {
    .header-title {
        font-size: 1.5rem;
        padding: 16px 16px 8px;
    }

    .header-subtitle {
        font-size: 1rem;
        padding: 0 16px 16px;
    }
}
</style>
