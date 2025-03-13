import type { Analysis } from './Analysis';
import type { Antecedent } from './Antecedent';
import type { Case } from './Case';
import type { Concept } from './Concept';
import type { Exam } from './Exam';
import type { Management } from './Management';
import type { Reason } from './Reason';
import type { Recommendation } from './Recommendation';
import { Section } from './Section';
import type { Sign } from './Sign';

export class Template {
    id: string;
    name: string;
    description: string;
    sections: Section[];
    categories: string[];
    reason: Reason;
    concept: Concept;
    antecedent: Antecedent;
    sign: Sign;
    exam: Exam;
    analysis: Analysis;
    case: Case;
    management: Management;
    recommendation: Recommendation

    constructor(
        id: string,
        name: string,
        description: string,
        sections: Section[],
        categories: string[] = [],
        reason: Reason,
        concept: Concept,
        antecedent: Antecedent,
        sign: Sign,
        exam: Exam,
        analysis: Analysis,
        caseData: Case,
        management: Management,
        recommendation: Recommendation
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sections = sections;
        this.categories = categories;
        this.reason = reason;
        this.concept = concept;
        this.antecedent = antecedent;
        this.sign = sign;
        this.exam = exam;
        this.analysis = analysis;
        this.case = caseData;
        this.management = management;
        this.recommendation = recommendation;
    }

    static fromJson(data: Template): Template {
        const plantilla = new Template(
            data.id,
            data.name,
            data.description,
            data.sections.map((section) => Section.fromJson(section)),
            data.categories,
            data.reason,
            data.concept,
            data.antecedent,
            data.sign,
            data.exam,
            data.analysis,
            data.case,
            data.management,
            data.recommendation
        );

        return plantilla;
    }

    static toJson(plantilla: Template): Template {
        return {
            id: plantilla.id,
            name: plantilla.name,
            description: plantilla.description,
            sections: plantilla.sections.map((section) => Section.toJSON(section)),
            categories: plantilla.categories,
            reason: plantilla.reason,
            concept: plantilla.concept,
            antecedent: plantilla.antecedent,
            sign: plantilla.sign,
            exam: plantilla.exam,
            analysis: plantilla.analysis,
            case: plantilla.case,
            management: plantilla.management,
            recommendation: plantilla.recommendation
        };
    }
}
