<template>
    <v-container class="pa-6" style="max-width: 1200px">
        <!-- Encabezado principal -->
        <v-card class="mb-6 header-card" elevation="3">
            <v-card-title class="header-title">
                <v-icon large class="mr-2">mdi-hospital-building</v-icon>
                Crear Plantilla de Historia Clínica
            </v-card-title>
            <v-card-subtitle class="header-subtitle">
                <v-icon small class="mr-2">mdi-information-outline</v-icon>
                Personaliza el formato de la historia clínica según tus necesidades.
            </v-card-subtitle>
        </v-card>

        <!-- Información General -->
        <InformacionGeneral
            v-model:plantillaName="plantillaName"
            v-model:plantillaDescription="plantillaDescription"
            v-model:plantillaCategories="plantillaCategories"
        />

        <!-- Agregar Sección (para crear una sección nueva) -->
        <v-card class="mb-6 form-card" elevation="2">
            <v-card-title class="form-card-title">
                <v-icon class="mr-2">mdi-folder-plus</v-icon>
                Agregar Sección
            </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="newSection.name"
                    label="Nombre de la Sección"
                    prepend-inner-icon="mdi-folder"
                    variant="outlined"
                    class="input-field mb-4"
                ></v-text-field>

                <!-- Agregar Campo a la nueva sección -->
                <v-card class="mb-4 field-card" outlined>
                    <v-card-title class="field-card-title">
                        <v-icon class="mr-2">mdi-plus-box</v-icon>
                        Agregar Campo a esta Sección
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="fieldReactive.name"
                                    label="Nombre del Campo"
                                    prepend-inner-icon="mdi-form-textbox"
                                    variant="outlined"
                                    class="input-field"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-select
                                    v-model="fieldReactive.type"
                                    :items="fieldTypes"
                                    item-title="label"
                                    item-value="value"
                                    label="Tipo"
                                    prepend-inner-icon="mdi-format-list-checks"
                                    variant="outlined"
                                    class="input-field"
                                >
                                    <template v-slot:item="{ props, item }">
                                        <v-list-item v-bind="props">
                                            <template v-slot:prepend>
                                                <v-icon :icon="item.icon"></v-icon>
                                            </template>
                                            <v-list-item-title>{{ item.label }}</v-list-item-title>
                                            <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                                        </v-list-item>
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-text-field
                                    v-model="fieldReactive.label"
                                    label="Etiqueta (opcional)"
                                    prepend-inner-icon="mdi-label"
                                    variant="outlined"
                                    class="input-field"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" v-if="fieldReactive.type === 'dropdown'">
                                <v-text-field
                                    v-model="fieldReactive.options"
                                    label="Opciones (separadas por coma)"
                                    prepend-inner-icon="mdi-format-list-bulleted"
                                    variant="outlined"
                                    class="input-field"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" v-if="fieldReactive.type === 'number'">
                                <v-text-field
                                    v-model.number="fieldReactive.structure.min"
                                    label="Valor Mínimo"
                                    prepend-inner-icon="mdi-numeric"
                                    variant="outlined"
                                    type="number"
                                    class="input-field"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" v-if="fieldReactive.type === 'number'">
                                <v-text-field
                                    v-model.number="fieldReactive.structure.max"
                                    label="Valor Máximo"
                                    prepend-inner-icon="mdi-numeric"
                                    variant="outlined"
                                    type="number"
                                    class="input-field"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" v-if="fieldReactive.type === 'number'">
                                <v-text-field
                                    v-model="fieldReactive.structure.units"
                                    label="Unidades"
                                    prepend-inner-icon="mdi-ruler"
                                    variant="outlined"
                                    class="input-field"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-btn color="primary" variant="elevated" @click="agregarCampo" class="mb-2 add-field-btn" prepend-icon="mdi-plus">
                            Agregar Campo
                        </v-btn>
                    </v-card-text>
                </v-card>

                <!-- Lista de Campos (drag & drop) en la nueva sección -->
                <draggable
                    v-model="newSection.fields"
                    group="fields"
                    item-key="id"
                    class="fields-list"
                    handle=".drag-handle"
                    v-if="newSection.fields.length > 0"
                >
                    <template #item="{ element: campo, index }">
                        <div class="field-item">
                            <v-icon class="drag-handle mr-2">mdi-drag</v-icon>
                            <div class="field-content">
                                <div class="field-info">
                                    <v-icon :icon="fieldTypes.find((t) => t.value === campo.type)?.icon" class="mr-2"></v-icon>
                                    <span class="field-label">{{ campo.label }}</span>
                                    <span class="field-type">({{ campo.type }})</span>
                                </div>
                                <div class="field-actions">
                                    <v-btn icon small color="info" @click="editarCampoNew(index, campo)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon small color="error" @click="eliminarCampoNew(index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>

                <v-btn color="primary" variant="elevated" @click="agregarSeccion" class="mt-4 add-section-btn" prepend-icon="mdi-plus">
                    Agregar Sección a la Plantilla
                </v-btn>
            </v-card-text>
        </v-card>

        <!-- Lista de Secciones (drag & drop) -->
        <draggable
            v-model="sections"
            group="sections"
            item-key="id"
            class="sections-list"
            handle=".section-drag-handle"
            v-if="sections.length > 0"
        >
            <template #item="{ element: sec, index: sectionIndex }">
                <v-card class="mb-4 section-card" elevation="2">
                    <v-card-title class="section-card-title">
                        <v-icon class="section-drag-handle mr-2">mdi-drag</v-icon>
                        {{ sec.name }}
                        <v-spacer></v-spacer>
                        <!-- Agrupamos los botones en un contenedor con la clase "btn-group-spacing" -->
                        <div class="btn-group-spacing">
                            <v-btn icon small color="info" @click="editarSeccion(sectionIndex, sec)">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon small color="error" @click="eliminarSeccion(sectionIndex)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <!-- Lista de Campos en la sección creada -->
                        <draggable
                            v-model="sec.fields"
                            group="section-fields"
                            item-key="id"
                            class="section-fields-list"
                            handle=".field-drag-handle"
                        >
                            <template #item="{ element: campo, index: fieldIndex }">
                                <div class="section-field-item">
                                    <v-icon class="field-drag-handle mr-2">mdi-drag</v-icon>
                                    <!-- Vista previa dinámica del campo -->
                                    <component
                                        :is="getPreviewComponent(campo.type)"
                                        v-model="campo.value"
                                        :label="campo.label"
                                        variant="outlined"
                                        density="comfortable"
                                        v-bind="getPreviewProps(campo)"
                                    ></component>
                                </div>
                            </template>
                        </draggable>
                    </v-card-text>
                </v-card>
            </template>
        </draggable>

        <!-- Botones de Acción Final -->
        <v-row justify="center" class="mt-6">
            <v-col cols="12" class="text-center">
                <v-btn color="error" variant="elevated" @click="cancelar" class="action-btn mr-4" prepend-icon="mdi-close">
                    Cancelar
                </v-btn>
                <v-btn color="primary" variant="elevated" @click="guardarPlantilla" class="action-btn" prepend-icon="mdi-content-save">
                    Guardar Plantilla
                </v-btn>
            </v-col>
        </v-row>

        <!-- Diálogo para Editar Campo (para campos en newSection o en secciones fuera del modo de edición total de sección) -->
        <v-dialog v-model="isEditingField" max-width="500px">
            <v-card v-if="editingField">
                <v-card-title class="dialog-title">
                    <v-icon class="mr-2">mdi-pencil</v-icon>
                    Editar Campo
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="editingField.campo.name"
                        label="Nombre"
                        prepend-inner-icon="mdi-form-textbox"
                        variant="outlined"
                        class="mb-2"
                    ></v-text-field>
                    <v-text-field
                        v-model="editingField.campo.label"
                        label="Etiqueta"
                        prepend-inner-icon="mdi-label"
                        variant="outlined"
                        class="mb-2"
                    ></v-text-field>
                    <v-select
                        v-model="editingField.campo.type"
                        :items="fieldTypes"
                        item-title="label"
                        item-value="value"
                        label="Tipo"
                        prepend-inner-icon="mdi-format-list-checks"
                        variant="outlined"
                        class="mb-2"
                    ></v-select>
                    <!-- Para campos dropdown -->
                    <v-text-field
                        v-if="editingField.campo.type === 'dropdown'"
                        v-model="editingFieldDropdown"
                        label="Opciones (separadas por coma)"
                        prepend-inner-icon="mdi-format-list-bulleted"
                        variant="outlined"
                    ></v-text-field>
                    <!-- Para campos number -->
                    <v-text-field
                        v-if="editingField.campo.type === 'number'"
                        :model-value="editingField.campo.structure?.min"
                        @update:model-value="updateFieldStructure('min', $event)"
                        label="Valor Mínimo"
                        prepend-inner-icon="mdi-numeric"
                        variant="outlined"
                        class="input-field"
                    ></v-text-field>
                    <v-text-field
                        v-if="editingField.campo.type === 'number'"
                        :model-value="editingField.campo.structure?.max"
                        @update:model-value="updateFieldStructure('max', $event)"
                        label="Valor Máximo"
                        prepend-inner-icon="mdi-numeric"
                        variant="outlined"
                        class="input-field"
                    ></v-text-field>
                    <v-text-field
                        v-if="editingField.campo.type === 'number'"
                        :model-value="editingField.campo.structure?.units"
                        @update:model-value="updateFieldStructure('units', $event)"
                        label="Unidades"
                        prepend-inner-icon="mdi-ruler"
                        variant="outlined"
                        class="input-field"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="isEditingField = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="guardarEdicionCampo">Guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Diálogo para Editar Sección (edita toda la sección, campos incluidos) -->
        <v-dialog v-model="isEditingSection" max-width="600px">
            <v-card v-if="editingSection">
                <v-card-title class="dialog-title">
                    <v-icon class="mr-2">mdi-pencil</v-icon>
                    Editar Sección
                </v-card-title>
                <v-card-text>
                    <!-- Nombre de la sección -->
                    <v-text-field v-model="editingSection.section.name" label="Nombre de la Sección" variant="outlined"></v-text-field>
                    <!-- Card para agregar un nuevo campo a la sección en edición -->
                    <v-card class="mb-4 field-card" outlined>
                        <v-card-title class="field-card-title">
                            <v-icon class="mr-2">mdi-plus-box</v-icon>
                            Agregar Campo a esta Sección
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="fieldReactive.name"
                                        label="Nombre del Campo"
                                        prepend-inner-icon="mdi-form-textbox"
                                        variant="outlined"
                                        class="input-field"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                        v-model="fieldReactive.type"
                                        :items="fieldTypes"
                                        item-title="label"
                                        item-value="value"
                                        label="Tipo"
                                        prepend-inner-icon="mdi-format-list-checks"
                                        variant="outlined"
                                        class="input-field"
                                    >
                                        <template v-slot:item="{ props, item }">
                                            <v-list-item v-bind="props">
                                                <template v-slot:prepend>
                                                    <v-icon :icon="item.icon"></v-icon>
                                                </template>
                                                <v-list-item-title>{{ item.label }}</v-list-item-title>
                                                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
                                            </v-list-item>
                                        </template>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="fieldReactive.label"
                                        label="Etiqueta (opcional)"
                                        prepend-inner-icon="mdi-label"
                                        variant="outlined"
                                        class="input-field"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" v-if="fieldReactive.type === 'dropdown'">
                                    <v-text-field
                                        v-model="fieldReactive.options"
                                        label="Opciones (separadas por coma)"
                                        prepend-inner-icon="mdi-format-list-bulleted"
                                        variant="outlined"
                                        class="input-field"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" v-if="fieldReactive.type === 'number'">
                                    <v-text-field
                                        v-model.number="fieldReactive.structure.min"
                                        label="Valor Mínimo"
                                        prepend-inner-icon="mdi-numeric"
                                        variant="outlined"
                                        class="input-field"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" v-if="fieldReactive.type === 'number'">
                                    <v-text-field
                                        v-model.number="fieldReactive.structure.max"
                                        label="Valor Máximo"
                                        prepend-inner-icon="mdi-numeric"
                                        variant="outlined"
                                        class="input-field"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="4" v-if="fieldReactive.type === 'number'">
                                    <v-text-field
                                        v-model="fieldReactive.structure.units"
                                        label="Unidades"
                                        prepend-inner-icon="mdi-ruler"
                                        variant="outlined"
                                        class="input-field"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-btn
                                color="primary"
                                variant="elevated"
                                @click="agregarCampoEditingSection"
                                class="mb-2 add-field-btn"
                                prepend-icon="mdi-plus"
                            >
                                Agregar Campo
                            </v-btn>
                        </v-card-text>
                    </v-card>
                    <!-- Lista de Campos en la sección en edición -->
                    <draggable
                        v-model="editingSection.section.fields"
                        group="editing-section-fields"
                        item-key="id"
                        class="fields-list"
                        handle=".drag-handle"
                        v-if="editingSection.section.fields.length > 0"
                    >
                        <template #item="{ element: campo, index }">
                            <div class="field-item">
                                <v-icon class="drag-handle mr-2">mdi-drag</v-icon>
                                <div class="field-content">
                                    <div class="field-info">
                                        <v-icon :icon="fieldTypes.find((t) => t.value === campo.type)?.icon" class="mr-2"></v-icon>
                                        <span class="field-label">{{ campo.label }}</span>
                                        <span class="field-type">({{ campo.type }})</span>
                                    </div>
                                    <div class="field-actions">
                                        <v-btn icon small color="info" @click="editarCampoInEditingSection(index, campo)">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn icon small color="error" @click="eliminarCampoInEditingSection(index)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="isEditingSection = false">Cancelar</v-btn>
                    <v-btn color="primary" @click="guardarEdicionSeccion">Guardar Sección</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import draggable from 'vuedraggable';
import Swal from 'sweetalert2';
import { Plantilla } from '@/types/HistoriaClinica/Plantilla';
import { Seccion } from '@/types/HistoriaClinica/Seccion';
import { Campo } from '@/types/HistoriaClinica/Campo';
import { Structure } from '@/types/HistoriaClinica/Structure';
import InformacionGeneral from './InformacionGeneral.vue';
import { usePlantillaStore } from '@/stores/platillaStore';

const plantillaStore = usePlantillaStore();

// Datos generales de la plantilla
const plantillaId = ref('');
const plantillaName = ref('');
const plantillaDescription = ref('');
const plantillaCategories = ref<string[]>([]);

// Array reactivo de secciones
const sections = reactive<Seccion[]>([]);

// Modelo para la nueva sección (para creación)
const newSection = reactive({
    name: '',
    fields: [] as Campo[]
});

// Modelo para un nuevo campo en la nueva sección
const fieldReactive = reactive({
    id: '',
    name: '',
    label: '',
    type: '',
    options: '',
    structure: {
        min: null,
        max: null,
        units: ''
    }
});

// Estado de edición para campos (se usa para editar campos ya existentes en newSection o en secciones)
const editingField = ref<{ sectionIndex: number | null; fieldIndex: number; campo: Campo } | null>(null);
const isEditingField = computed({
    get: () => editingField.value !== null,
    set: (val: boolean) => {
        if (!val) editingField.value = null;
    }
});
const editingFieldDropdown = computed<string>({
    get() {
        if (editingField.value && editingField.value.campo.type === 'dropdown') {
            return editingField.value.campo.structure?.options?.join(', ') ?? '';
        }
        return '';
    },
    set(newValue: string) {
        if (editingField.value && editingField.value.campo.type === 'dropdown') {
            const optionsArray = newValue.split(',').map((opt) => opt.trim());
            if (editingField.value.campo.structure) {
                editingField.value.campo.structure.options = optionsArray;
            } else {
                editingField.value.campo.structure = new Structure(undefined, undefined, undefined, optionsArray);
            }
        }
    }
});

// Estado de edición para secciones (cuando se edita una sección completa)
const editingSection = ref<{ index: number; section: Seccion } | null>(null);
const isEditingSection = computed({
    get: () => editingSection.value !== null,
    set: (val: boolean) => {
        if (!val) editingSection.value = null;
    }
});

// Tipos de campos permitidos
const fieldTypes = [
    { value: 'text', label: 'Texto', icon: 'mdi-form-textbox', description: 'Campo de texto simple' },
    { value: 'number', label: 'Número', icon: 'mdi-numeric', description: 'Campo numérico' },
    { value: 'check', label: 'Casilla', icon: 'mdi-checkbox-marked-outline', description: 'Casilla de verificación' },
    { value: 'textarea', label: 'Área de texto', icon: 'mdi-form-textarea', description: 'Campo de texto multilínea' },
    { value: 'date', label: 'Fecha', icon: 'mdi-calendar', description: 'Selector de fecha' },
    { value: 'dropdown', label: 'Lista desplegable', icon: 'mdi-menu-down', description: 'Lista de opciones' }
];

// FUNCIONES PARA CAMPOS EN "newSection"
function agregarCampo() {
    if (!fieldReactive.name || !fieldReactive.type) return;
    const campo = new Campo(
        uuidv4(),
        fieldReactive.name,
        fieldReactive.type,
        fieldReactive.label || fieldReactive.name,
        undefined,
        undefined,
        fieldReactive.type === 'dropdown'
            ? new Structure(
                  undefined,
                  undefined,
                  undefined,
                  fieldReactive.options.split(',').map((opt) => opt.trim())
              )
            : fieldReactive.type === 'number'
              ? new Structure(
                    fieldReactive.structure.min ?? undefined,
                    fieldReactive.structure.max ?? undefined,
                    fieldReactive.structure.units
                )
              : undefined,
        fieldReactive.type === 'check' ? '' : ''
    );
    newSection.fields.push(campo);
    fieldReactive.name = '';
    fieldReactive.label = '';
    fieldReactive.type = '';
    fieldReactive.options = '';
    fieldReactive.structure.min = null;
    fieldReactive.structure.max = null;
    fieldReactive.structure.units = '';
}
function editarCampoNew(fieldIndex: number, campo: Campo) {
    editingField.value = { sectionIndex: null, fieldIndex, campo: { ...campo } };
}
function eliminarCampoNew(fieldIndex: number) {
    newSection.fields.splice(fieldIndex, 1);
}

// FUNCIONES PARA CAMPOS EN LA SECCIÓN EN EDICIÓN (dentro del diálogo de editar sección)
function editarCampoInEditingSection(fieldIndex: number, campo: Campo) {
    // Usamos sectionIndex = -1 para distinguir que el campo pertenece a editingSection
    editingField.value = { sectionIndex: -1, fieldIndex, campo: { ...campo } };
}
function eliminarCampoInEditingSection(fieldIndex: number) {
    if (editingSection.value) {
        editingSection.value.section.fields.splice(fieldIndex, 1);
    }
}
function guardarEdicionCampo() {
    if (!editingField.value) return;
    const { sectionIndex, fieldIndex, campo } = editingField.value;
    if (sectionIndex === null) {
        // Campo en newSection
        newSection.fields[fieldIndex] = new Campo(
            campo.id,
            campo.name,
            campo.type,
            campo.label,
            campo.category,
            campo.description,
            campo.structure,
            campo.value
        );
    } else if (sectionIndex === -1 && editingSection.value) {
        // Campo en la sección en edición
        editingSection.value.section.fields[fieldIndex] = new Campo(
            campo.id,
            campo.name,
            campo.type,
            campo.label,
            campo.category,
            campo.description,
            campo.structure,
            campo.value
        );
    } else {
        // Campo en una sección ya creada
        sections[sectionIndex].fields[fieldIndex] = new Campo(
            campo.id,
            campo.name,
            campo.type,
            campo.label,
            campo.category,
            campo.description,
            campo.structure,
            campo.value
        );
    }
    editingField.value = null;
}

// FUNCIONES PARA SECCIONES
function agregarSeccion() {
    if (!newSection.name) return;
    const seccion = new Seccion(uuidv4(), newSection.name, [...newSection.fields]);
    sections.push(seccion);
    newSection.name = '';
    newSection.fields = [];
}
function eliminarSeccion(index: number) {
    sections.splice(index, 1);
}
function editarSeccion(index: number, section: Seccion) {
    // Creamos una copia local para editar
    editingSection.value = { index, section: { ...section, fields: [...section.fields] } };
    // Reiniciamos el objeto para agregar nuevos campos en este contexto
    fieldReactive.name = '';
    fieldReactive.label = '';
    fieldReactive.type = '';
    fieldReactive.options = '';
    fieldReactive.structure.min = null;
    fieldReactive.structure.max = null;
    fieldReactive.structure.units = '';
}
function guardarEdicionSeccion() {
    if (!editingSection.value) return;
    const { index, section } = editingSection.value;
    sections[index] = new Seccion(section.id, section.name, [...section.fields]);
    editingSection.value = null;
}

// FUNCIONES PARA AGREGAR CAMPOS DENTRO DEL DIÁLOGO DE EDITAR SECCIÓN
function agregarCampoEditingSection() {
    if (!fieldReactive.name || !fieldReactive.type) return;
    let structure;
    if (fieldReactive.type === 'dropdown' && fieldReactive.options) {
        structure = new Structure(
            undefined,
            undefined,
            undefined,
            fieldReactive.options.split(',').map((opt) => opt.trim())
        );
    } else if (fieldReactive.type === 'number') {
        structure = new Structure(
            fieldReactive.structure.min ?? undefined,
            fieldReactive.structure.max ?? undefined,
            fieldReactive.structure.units
        );
    }
    const campo = new Campo(
        uuidv4(),
        fieldReactive.name,
        fieldReactive.type,
        fieldReactive.label || fieldReactive.name,
        undefined,
        undefined,
        structure,
        fieldReactive.type === 'check' ? '' : ''
    );
    if (editingSection.value) {
        editingSection.value.section.fields.push(campo);
    }
    fieldReactive.name = '';
    fieldReactive.label = '';
    fieldReactive.type = '';
    fieldReactive.options = '';
    fieldReactive.structure.min = null;
    fieldReactive.structure.max = null;
    fieldReactive.structure.units = '';
}

// FUNCIONES PARA VISTA PREVIA DE CAMPOS
function getPreviewComponent(type: string) {
    const componentMap: Record<string, string> = {
        text: 'v-text-field',
        number: 'v-text-field',
        date: 'v-text-field',
        textarea: 'v-textarea',
        check: 'v-checkbox',
        dropdown: 'v-select'
    };
    return componentMap[type] || 'v-text-field';
}

function getPreviewProps(field: Campo) {
    const props: Record<string, any> = {
        dense: true,
        class: 'field-preview'
    };
    switch (field.type) {
        case 'number':
            props.type = 'number';
            break;
        case 'date':
            props.type = 'date';
            break;
        case 'dropdown':
            props.items = field.structure?.options;
            props.clearable = true;
            break;
    }
    return props;
}

async function guardarPlantilla() {
    try {
        const plantilla = new Plantilla(uuidv4(), plantillaName.value, plantillaDescription.value, sections, plantillaCategories.value);
        await plantillaStore.addPlantilla({
            id: plantilla.id,
            name: plantilla.name,
            description: plantilla.description,
            sections: plantilla.sections.map((section) => ({
                id: section.id,
                name: section.name,
                fields: section.fields.map((field) => ({
                    id: field.id,
                    name: field.name,
                    type: field.type,
                    value: field.value?.toString() || ''
                }))
            })),
            categories: plantilla.categories
        });
        Swal.fire({
            icon: 'success',
            title: 'Plantilla guardada',
            text: 'La plantilla se ha guardado correctamente.',
            timer: 2000,
            showConfirmButton: false
        });
        cancelar();
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al guardar la plantilla.',
            timer: 2000,
            showConfirmButton: false
        });
        console.error('Error al guardar la plantilla:', error);
    }
}

function cancelar() {
    plantillaName.value = '';
    plantillaDescription.value = '';
    plantillaCategories.value = [];
    sections.splice(0, sections.length);
}

function updateFieldStructure(key: 'min' | 'max' | 'units', value: any) {
    if (editingField.value && editingField.value.campo.structure) {
        editingField.value.campo.structure[key] = value;
    } else if (editingField.value) {
        editingField.value.campo.structure = new Structure();
        editingField.value.campo.structure[key] = value;
    }
}

onMounted(async () => {
    await plantillaStore.fetchPlantillas();
});
</script>

<style scoped>
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
    padding: 24px;
}
.header-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    padding: 0 24px 24px;
}

.input-field {
    transition: all 0.3s ease;
}
.input-field:hover {
    transform: translateY(-1px);
}
.field-card {
    border: 1px solid #e9ecef;
    border-radius: 8px;
}
.field-card-title {
    background-color: #f8f9fa;
    font-size: 1.1rem;
}
.fields-list {
    min-height: 50px;
    padding: 8px;
    background-color: #f8f9fa;
    border-radius: 8px;
}
.field-item {
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 8px 0;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
}
.field-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.field-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
}
.field-info {
    display: flex;
    align-items: center;
}
.field-label {
    font-weight: 500;
    margin-right: 8px;
}
.field-type {
    color: #6c757d;
    font-size: 0.9rem;
}
.field-actions {
    display: flex;
    gap: 8px;
}
.drag-handle {
    cursor: move;
    color: #6c757d;
}
.sections-list {
    min-height: 50px;
}
.section-card {
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}
.section-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.section-card-title {
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
}
.section-drag-handle,
.field-drag-handle {
    cursor: move;
    color: #6c757d;
}
.section-fields-list {
    min-height: 50px;
    padding: 8px 0;
}
.section-field-item {
    display: flex;
    align-items: center;
    padding: 8px;
    margin: 8px 0;
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: all 0.2s ease;
}
.section-field-item:hover {
    transform: translateX(4px);
    background-color: #f1f3f5;
}
.add-field-btn,
.add-section-btn {
    transition: all 0.3s ease;
}
.add-field-btn:hover,
.add-section-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(31, 116, 255, 0.2);
}
.action-btn {
    min-width: 150px;
    transition: all 0.3s ease;
}
.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.dialog-title {
    background-color: #f8f9fa;
    padding: 16px;
}
/* Animaciones para drag & drop */
.sortable-ghost {
    opacity: 0.5;
    background-color: #e9ecef;
}
.sortable-drag {
    opacity: 0.9;
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
/* Estilos para los campos de vista previa */
.field-preview {
    transition: all 0.2s ease;
}
.field-preview:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-group-spacing {
    display: flex;
    align-items: center;
}

.btn-group-spacing > *:not(:last-child) {
    margin-right: 5px;
}

.v-card-text {
    padding-top: 15px;
}
</style>
