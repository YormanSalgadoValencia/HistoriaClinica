type Field = {
    id: string;
    name: string;
    type: string;
    value: string;
}

type Section = {
    id: string;
    name: string;
    fields: Field[];
}

type Plantilla = {
    id: string;
    name: string;
    description: string;
    categories?: string[];
    sections: Section[];
}