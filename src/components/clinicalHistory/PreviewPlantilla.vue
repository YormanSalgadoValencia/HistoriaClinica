<script setup lang="ts">
    defineProps({
        plantilla: Object
    });
</script>

<template>
    <v-container class="preview">
        <div v-for="(section, index) in plantilla?.sections">
            <h3>{{ section.name }}</h3>
            <div v-for="(field, index) in section.fields">
                <v-text-field
                    :type="field.type"
                    :label="field.name"
                >

                </v-text-field>
            </div>
        </div>
        
    </v-container>
</template>

<style scoped lang="scss">



</style>