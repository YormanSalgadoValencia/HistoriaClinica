export class Antecedent {
    idAntecedent: string;
    medicalHistory: string;
    pharmacologicalHistory: string;
    allergicHistory: string;
    surgicalHistory: string;
    familyHistory: string;
    gynecobstetricHistory: string;

    constructor(
        idAntecedent: string,
        medicalHistory: string,
        pharmacologicalHistory: string,
        allergicHistory: string,
        surgicalHistory: string,
        familyHistory: string,
        gynecobstetricHistory: string
    ) {
        this.idAntecedent = idAntecedent;
        this.medicalHistory = medicalHistory;
        this.pharmacologicalHistory = pharmacologicalHistory;
        this.allergicHistory = allergicHistory;
        this.surgicalHistory = surgicalHistory;
        this.familyHistory = familyHistory;
        this.gynecobstetricHistory = gynecobstetricHistory;
    }

    static fromJSON(data: Antecedent): Antecedent {
        return new Antecedent(
            data.idAntecedent,
            data.medicalHistory,
            data.pharmacologicalHistory,
            data.allergicHistory,
            data.surgicalHistory,
            data.familyHistory,
            data.gynecobstetricHistory
        );
    }

    static toJson(antecedent: Antecedent): Antecedent {
        return new Antecedent(
            antecedent.idAntecedent,
            antecedent.medicalHistory,
            antecedent.pharmacologicalHistory,
            antecedent.allergicHistory,
            antecedent.surgicalHistory,
            antecedent.familyHistory,
            antecedent.gynecobstetricHistory
        );
    }
}
