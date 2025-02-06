<template>
    <div>
        <h1 class="title-lista-pacientes">Listado de Pacientes</h1>
        <PacienteTable :pacientes="pacientes" :loading="loading" :error="error" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePacienteStore } from '@/stores/pacienteStore';
import PacienteTable from '@/components/Paciente/pacienteTable.vue';

const pacienteStore = usePacienteStore();
const { pacientes, loading, error, fetchPacientes } = pacienteStore;

onMounted(() => {
    fetchPacientes();
});
</script>

<style scoped lang="scss">
.title-lista-pacientes {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #333;
}
</style>
