import type { Concept } from "./Concept";

export class Analysis {
    idAnalysis: string;
    date: Date;
    detail: string;

    constructor(
        idAnalysis: string,
        date: Date,
        detail: string,
    ) {
        this.idAnalysis = idAnalysis;
        this.date = date;
        this.detail = detail;
    }

    static fromJSON(data: Analysis): Analysis {
        return new Analysis(
            data.idAnalysis,
            data.date,
            data.detail
        );
    }

    static toJson(analysis: Analysis): Analysis {
        return new Analysis(
            analysis.idAnalysis,
            analysis.date,
            analysis.detail
        );
    }
}