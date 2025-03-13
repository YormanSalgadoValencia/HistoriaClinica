import axios from 'axios';
import { Template } from '@/types/TemplateTypes/Template';
import { Section } from '@/types/TemplateTypes/Section';
import { Field } from '@/types/TemplateTypes/Field';

const API_URL = 'http://localhost:3000';

export const getTemplates = async (): Promise<Template[]> => {
    try {
        const response = await axios.get(`${API_URL}/templates`);
        return response.data.map((data: Template) => Template.fromJson(data));
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener las plantillas');
    }
};

export const createTemplate= async (payload: {
    id: string;
    name: string;
    description: string;
    sections: {
        id: string;
        name: string;
        fields: {
            id: string;
            name: string;
            type: string;
            label?: string;
            category?: string;
            description?: string;
            structure?: {
                min?: number;
                max?: number;
                units?: string;
                options?: string[];
            };
            value?: string | any[] | Record<string, any>;
        }[];
    }[];
    categories: string[];
}): Promise<Template> => {
    try {
        const response = await axios.post(`${API_URL}/templates`, payload);
        return Template.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al crear la plantilla');
    }
};

export const getPlantillaById = async (id: string): Promise<Template> => {
    try {
        const response = await axios.get(`${API_URL}/templates/${id}`);
        return Template.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al obtener la plantila por ID');
    }
};

export const updatePlantilla = async (
    id: string,
    payload: {
        name: string;
        description: string;
        sections: {
            id: string;
            name: string;
            fields: {
                id: string;
                name: string;
                type: string;
                label?: string;
                category?: string;
                description?: string;
                structure?: {
                    min?: number;
                    max?: number;
                    units?: string;
                    options?: string[];
                };
                value?: string | any[] | Record<string, any>;
            }[];
        }[];
        categories: string[];
    }
): Promise<Template> => {
    try {
        const response = await axios.put(`${API_URL}/plantillas/${id}`, payload);
        return Template.fromJson(response.data);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al actualizar la plantilla');
    }
};

export const deleteTemplate = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/templates/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error al eliminar la plantilla');
    }
};

export const getStandardTemplate = async (): Promise<Template> => {
    try {
        const response = await axios.get(`${API_URL}/standardTemplate`);
        const plantilla = response.data;

        console.log('Data nueva:' + JSON.stringify(response.data));

        return new Template(
            plantilla.id,
            plantilla.name,
            plantilla.description,
            plantilla.sections.map(
                (section: Section) =>
                    new Section(
                        section.id,
                        section.name,
                        section.fields.map(
                            (field: Field) =>
                                new Field(
                                    field.id,
                                    field.name,
                                    field.type,
                                    field.type === 'list' && typeof field.value === 'string' ? JSON.parse(field.value) : field.value
                                )
                        )
                    )
            ),
            plantilla.categories,
            plantilla.reason,
            plantilla.concept,
            plantilla.antecedent,
            plantilla.sign,
            plantilla.exam,
            plantilla.analysis,
            plantilla.caseData,
            plantilla.management,
            plantilla.recommendation
        );
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Si buenas');
    }
};
