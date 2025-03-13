export class Concept {
    idConcept: string;
    conceptsMedicalDetailed: string;

    constructor(idConcept: string, conceptsMedicalDetailed: string) {
        this.idConcept = idConcept;
        this.conceptsMedicalDetailed = conceptsMedicalDetailed;
    }

    static fromJSON(data: Concept): Concept {
        return new Concept(data.idConcept, data.conceptsMedicalDetailed);
    }

    static toJson(consult: Concept): Concept {
        return new Concept(consult.idConcept, consult.conceptsMedicalDetailed);
    }
}