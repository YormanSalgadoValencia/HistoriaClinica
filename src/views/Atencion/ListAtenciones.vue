<template>
    <v-container fluid class="pa-0">
        <v-row justify="center">
            <v-col cols="12">
                <!-- Título principal -->
                <v-row>
                    <v-col>
                        <h1 class="headline blue--text text--darken-3 text-center">Lista de Atenciones</h1>
                    </v-col>
                </v-row>

                <!-- Botón para abrir modal de nueva atención -->
                <v-row justify="center" class="mb-2">
                    <v-col cols="auto">
                        <v-btn color="primary" @click="abrirModal" dark> Nueva Atención </v-btn>
                    </v-col>
                </v-row>

                <!-- Modal para agregar una nueva atención -->
                <AtencionModal :isOpen="modalAbierto" @close="cerrarModal" />

                <ModalFormatoAtencion :isOpen="mostrarFormatoModal" @close="mostrarFormatoModal = false" />

                <!-- Tabla de atenciones -->
                <TableAtencion :atenciones="formattedAtenciones" />

                <!-- Mensaje cuando no hay atenciones registradas -->
                <v-alert v-if="atencionStore.atenciones.length === 0" type="info" border="left" colored-border class="mt-2">
                    No hay atenciones registradas.
                </v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAtencionStore } from '@/stores/atencionStore';
import AtencionModal from '@/components/Atencion/atencionModal.vue';
import TableAtencion from '@/components/Atencion/atencionTable.vue';
import ModalFormatoAtencion from '@/components/FormatoAtencion/ModalFormatoAtencion.vue';

const modalAbierto = ref(false);
const atencionStore = useAtencionStore();
const mostrarFormatoModal = ref(false);

const abrirModal = () => {
    modalAbierto.value = true;
};

const cerrarModal = () => {
    modalAbierto.value = false;
};

const formattedAtenciones = computed(() => {
    return atencionStore.atenciones.map((atencion) => ({
        ...atencion,
        fechaAtencion: atencion.fechaAtencion.toString()
    }));
});

onMounted(() => {
    atencionStore.fetchAtenciones(); // Cargar atenciones al montar la vista
});
</script>

<style scoped>
/* Puedes agregar o ajustar estilos específicos si es necesario. Aquí se reducen márgenes y padding para evitar espacios excesivos. */

h1 {
    margin-bottom: 1rem;
}

.v-btn {
    margin-bottom: 1rem;
}

.v-alert {
    margin-top: 1rem;
}
</style>
