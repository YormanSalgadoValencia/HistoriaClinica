<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import ClinicalHistory from '@/components/clinicalHistory/ClinicalHistory.vue';

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
    <ClinicalHistory></ClinicalHistory>
</template>
