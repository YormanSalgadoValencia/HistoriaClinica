export class Exam {
    idExam: string;
    lastPhysicalExam: Date;
    respiratorySystem: string;
    cardiovascularSystem: string;
    digestiveSystem: string;
    nervousSystem: string;
    musculoskeletalSystem: string;
    genitourinarySystem: string;
    skinAndAnnexes: string;
    additionalObservations: string;
    medicalNotes: string;
    complementaryExamResults: string;

    constructor(
        idExam: string,
        lastPhysicalExam: Date,
        respiratorySystem: string,
        cardiovascularSystem: string,
        digestiveSystem: string,
        nervousSystem: string,
        musculoskeletalSystem: string,
        genitourinarySystem: string,
        skinAndAnnexes: string,
        additionalObservations: string,
        medicalNotes: string,
        complementaryExamResults: string
    ) {
        this.idExam = idExam;
        this.lastPhysicalExam = lastPhysicalExam;
        this.respiratorySystem = respiratorySystem;
        this.cardiovascularSystem = cardiovascularSystem;
        this.digestiveSystem = digestiveSystem;
        this.nervousSystem = nervousSystem;
        this.musculoskeletalSystem = musculoskeletalSystem;
        this.genitourinarySystem = genitourinarySystem;
        this.skinAndAnnexes = skinAndAnnexes;
        this.additionalObservations = additionalObservations;
        this.medicalNotes = medicalNotes;
        this.complementaryExamResults = complementaryExamResults;
    }

    static fromJSON(data: Exam): Exam {
        return new Exam(
            data.idExam,
            data.lastPhysicalExam,
            data.respiratorySystem,
            data.cardiovascularSystem,
            data.digestiveSystem,
            data.nervousSystem,
            data.musculoskeletalSystem,
            data.genitourinarySystem,
            data.skinAndAnnexes,
            data.additionalObservations,
            data.medicalNotes,
            data.complementaryExamResults
        );
    }

    static toJson(exam: Exam): Exam {
        return new Exam(
            exam.idExam,
            exam.lastPhysicalExam,
            exam.respiratorySystem,
            exam.cardiovascularSystem,
            exam.digestiveSystem,
            exam.nervousSystem,
            exam.musculoskeletalSystem,
            exam.genitourinarySystem,
            exam.skinAndAnnexes,
            exam.additionalObservations,
            exam.medicalNotes,
            exam.complementaryExamResults
        );
    }
}
