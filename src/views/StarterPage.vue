<script setup lang="ts">
import { ref } from 'vue';



const page = ref({ title: 'Sample Page' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Sample Page',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <v-row>
        <v-col>
            <h1>Componente de clinical history</h1>
        </v-col>
    </v-row>
</template>
