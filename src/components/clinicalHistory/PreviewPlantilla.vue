<script setup lang="ts">
    defineProps<{ plantilla: 
        { name: string; 
          sections: 
          { name: string; 
            fields: 
            { name: string
              type: string; 
             }[] }[] 
        } 
    }>();
</script>

<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12" v-for="(section, index) in plantilla.sections" :key="index">
          <v-card class="pa-4" elevation="2">
            <v-card-title class="text-h6 font-weight-bold">{{ section.name }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="6" v-for="(field, index) in section.fields" :key="index">
                  <v-text-field
                    :type="field.type"
                    :label="field.name"
                    outlined
                    dense
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

<style scoped lang="scss">


</style>