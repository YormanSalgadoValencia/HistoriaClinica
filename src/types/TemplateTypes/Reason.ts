export class Reason {
    idReason: string;
    reasonConsult: string;
    reasonDisease: string;
    durationSymptoms: number;

    constructor(
        idReason: string,
        reasonConsult: string,
        reasonDisease: string,
        durationSymptoms: number
    ) {
        this.idReason = idReason;
        this.reasonConsult = reasonConsult;
        this.reasonDisease = reasonDisease;
        this.durationSymptoms = durationSymptoms;
    }

    // Método estático para mapear un JSON a una instancia de Campo, aprovechando Structure.fromJSON
    static fromJSON(data: Reason): Reason {
        return new Reason(data.idReason, data.reasonConsult, data.reasonDisease, data.durationSymptoms);
    }

    static toJson(reason: Reason): Reason {
        return new Reason(reason.idReason, reason.reasonConsult, reason.reasonDisease, reason.durationSymptoms);
    }
}
