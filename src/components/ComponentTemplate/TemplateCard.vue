<script setup lang="ts">
import type { Structure } from '@/types/TemplateTypes/Structure';
import { Template } from '@/types/TemplateTypes/Template';

defineProps<{ 
  plantilla: Template | null;
}>();



</script>

<template>
    <div class="template-card">
        <h4 class="template-title">{{ plantilla?.name }}</h4>
        <div class="mini-template">
            <div 
                v-for="section in plantilla?.sections"
                :key="section.name"
                class="section-mini"
            >
                <h5>{{ section.name }}</h5>
                <div class="fields-mini">
                    <span
                        v-for="field in section.fields"
                        :key="field.name"
                        class="field-mini"
                    >
                        {{ field.name }}
                    </span>
                </div>
            </div>
            <div class="section-mini">
              <h5>{{ 'Reason' }}</h5>
              <div class="fields-mini">
                <span class="field-mini">
                  {{ plantilla?.reason.reasonConsult }}
                </span>
                <span class="field-mini">
                  {{ plantilla?.reason.reasonDisease }}
                </span>
                <span class="field-mini">
                  {{ plantilla?.reason.durationSymptoms }}
                </span>
              </div>
            </div>
            <div class="section-mini">
              <h5>{{ 'Management' }}</h5>
              <div class="fields-mini">
                <span class="field-mini">
                  {{ plantilla?.management.previousPlan }}
                </span>
                <span class="field-mini">
                  {{ plantilla?.management.newPlan }}
                </span>
                <span class="field-mini">
                  {{ plantilla?.management.additionalNotes }}
                </span>
              </div>
            </div>
        </div>
        
        
    </div>
</template>



<style scoped>
/* Diseño de la Tarjeta */
.template-card {
  width: 200px;
  height: 250px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.template-card:hover {
  transform: scale(1.05);
  box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.2);
}

/* Título */
.template-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Miniatura de la Plantilla */
.mini-template {
  width: 90%;
  height: 180px;
  background: #f8f8f8;
  border-radius: 6px;
  padding: 10px;
  text-align: left;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

/* Secciones */
.section-mini {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
  padding-bottom: 3px;
  border-bottom: 1px solid #ddd;
}

/* Campos */
.fields-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.field-mini {
  background: #ddd;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 10px;
}
</style>