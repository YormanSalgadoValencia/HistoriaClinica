<template>
    <div class="table-container">
        <!-- Indicador de carga -->
        <div v-if="loading" class="loading">Cargando...</div>

        <!-- Mostrar error si lo hay -->
        <div v-if="error" class="error">{{ error }}</div>

        <!-- Tabla de pacientes -->
        <table v-if="!loading && pacientesComputados.length">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha Nacimiento</th>
                    <th>Género</th>
                    <th>Documento</th>
                    <th>Acompañante</th>
                    <th>Responsable</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="paciente in pacientesComputados" :key="paciente._id">
                    <td>{{ paciente.nombre }}</td>
                    <td>{{ paciente.apellido }}</td>
                    <td>{{ paciente.fechaNacimiento }}</td>
                    <td>{{ paciente.genero }}</td>
                    <td>{{ paciente.numeroDocumento }}</td>
                    <td>{{ paciente.acompanante }}</td>
                    <td>{{ paciente.responsable }}</td>
                    <td>
                        <button class="btn-historia">Crear historial clínico</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Mensaje cuando no hay pacientes -->
        <div v-if="!loading && pacientesComputados.length === 0" class="no-data">No hay pacientes registrados.</div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { Paciente } from '@/types/Paciente';
import { getPacientes } from '@/services/pacienteService'; // Asegúrate de tener esta función correctamente importada

// Estados locales
const pacientes = ref<Paciente[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Cargar datos al montar el componente
onMounted(async () => {
    try {
        pacientes.value = await getPacientes();
    } catch (err: any) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

// Propiedad computada para procesar la lista (por ejemplo, ordenada alfabéticamente)
const pacientesComputados = computed(() => {
    return pacientes.value.slice().sort((a, b) => a.nombre.localeCompare(b.nombre));
});

// Watcher opcional para depuración
watch(
    () => pacientes.value,
    (newValue) => {
        console.log('La lista de pacientes se ha actualizado:', newValue);
    },
    { deep: true }
);
</script>

<style scoped lang="scss">
/* Contenedor centrado y más amplio */
.table-container {
    margin: 2rem auto;
    padding: 1rem;
    box-sizing: border-box;
}

/* Indicadores y mensajes */
.loading,
.error,
.no-data {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.error {
    color: #d32f2f;
    font-weight: bold;
}

/* Estilo general para la tabla */
table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Encabezado de la tabla */
thead {
    background-color: #1565c0; /* Azul oscuro */
    color: #fff;
}

th,
td {
    padding: 1rem 1.25rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
}

/* Filas alternas y efecto hover */
tbody tr:nth-child(even) {
    background-color: #e3f2fd; /* Azul claro */
}

tbody tr:hover {
    background-color: #bbdefb; /* Azul intermedio en hover */
    transition: background-color 0.3s ease;
}

/* Botón para crear historial clínico */
.btn-historia {
    background-color: #1976d2; /* Azul medio */
    border: none;
    color: #fff;
    padding: 0.6rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 0.95rem;
}

.btn-historia:hover {
    background-color: #0d47a1; /* Azul más oscuro */
}

/* Ajustes responsivos */
@media (max-width: 768px) {
    th,
    td {
        padding: 0.75rem 1rem;
    }
}
</style>
