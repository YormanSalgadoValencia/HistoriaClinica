export class Recommendation {
    idRecommendation: string;
    recommendation: string;
    warningSigns: string;
    postConsultationInstructions: string;

    constructor(
        idRecommendation: string,
        recommendation: string,
        warningSigns: string,
        postConsultationInstructions: string
    ) {
        this.idRecommendation = idRecommendation;
        this.recommendation = recommendation;
        this.warningSigns = warningSigns;
        this.postConsultationInstructions = postConsultationInstructions;
    }

    static fromJSON(data: Recommendation): Recommendation {
        return new Recommendation(
            data.idRecommendation,
            data.recommendation,
            data.warningSigns,
            data.postConsultationInstructions
        );
    }

    static toJson(recommendationData: Recommendation): Recommendation {
        return new Recommendation(
            recommendationData.idRecommendation,
            recommendationData.recommendation,
            recommendationData.warningSigns,
            recommendationData.postConsultationInstructions
        );
    }
}
