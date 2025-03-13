export class Management {
    idManagement: string;
    previousPlan: string;
    newPlan: string;
    additionalNotes: string;

    constructor(
        idManagement: string,
        previousPlan: string,
        newPlan: string,
        additionalNotes: string
    ) {
        this.idManagement = idManagement;
        this.previousPlan = previousPlan;
        this.newPlan = newPlan;
        this.additionalNotes = additionalNotes;
    }

    static fromJSON(data: Management): Management {
        return new Management(
            data.idManagement,
            data.previousPlan,
            data.newPlan,
            data.additionalNotes
        );
    }

    static toJson(managementData: Management): Management {
        return new Management(
            managementData.idManagement,
            managementData.previousPlan,
            managementData.newPlan,
            managementData.additionalNotes
        );
    }
}
