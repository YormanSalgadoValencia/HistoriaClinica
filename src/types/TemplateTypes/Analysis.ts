import type { Concept } from "./Concept";

export class Analysis {
    idAnalysis: string;
    date: Date;
    //specialty: Specialty;
    detail: string;
    concept: Concept;
    laboratories: Document[];
    diagnosticImages: Document[];
    pathology: Document[];
    molecularTests: Document[];

    constructor(
        idAnalysis: string,
        date: Date,
        //specialty: Specialty,
        detail: string,
        concept: Concept,
        laboratories: Document[],
        diagnosticImages: Document[],
        pathology: Document[],
        molecularTests: Document[]
    ) {
        this.idAnalysis = idAnalysis;
        this.date = date;
        //this.specialty = specialty;
        this.detail = detail;
        this.concept = concept;
        this.laboratories = laboratories;
        this.diagnosticImages = diagnosticImages;
        this.pathology = pathology;
        this.molecularTests = molecularTests;
    }

    // Static method to map a JSON to an instance of Analysis
    static fromJSON(data: Analysis): Analysis {
        return new Analysis(
            data.idAnalysis,
            data.date,
            //data.specialty,
            data.detail,
            data.concept,
            data.laboratories,
            data.diagnosticImages,
            data.pathology,
            data.molecularTests
        );
    }

    static toJson(analysis: Analysis): Analysis {
        return new Analysis(
            analysis.idAnalysis,
            analysis.date,
            //analysis.specialty,
            analysis.detail,
            analysis.concept,
            analysis.laboratories,
            analysis.diagnosticImages,
            analysis.pathology,
            analysis.molecularTests
        );
    }
}