export class Case {
    idCase: string;
    analysis: string;
    diagnosis: string;

    constructor(
        idCase: string,
        analysis: string,
        diagnosis: string
    ) {
        this.idCase = idCase;
        this.analysis = analysis;
        this.diagnosis = diagnosis;
    }

    static fromJSON(data: Case): Case {
        return new Case(
            data.idCase,
            data.analysis,
            data.diagnosis
        );
    }

    static toJson(caseData: Case): Case {
        return new Case(
            caseData.idCase,
            caseData.analysis,
            caseData.diagnosis
        );
    }
}
