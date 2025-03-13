export class Sign {
    idSign: string;
    weight: number;
    height: number;
    imc: number;
    heartRate: number;
    bloodPressure: number;
    temperature: number;
    oxygenSaturation: number;

    constructor(
        idSign: string,
        weight: number,
        height: number,
        imc: number,
        heartRate: number,
        bloodPressure: number,
        temperature: number,
        oxygenSaturation: number
    ) {
        this.idSign = idSign;
        this.weight = weight;
        this.height = height;
        this.imc = imc;
        this.heartRate = heartRate;
        this.bloodPressure = bloodPressure;
        this.temperature = temperature;
        this.oxygenSaturation = oxygenSaturation;
    }

    static fromJSON(data: Sign): Sign {
        return new Sign(
            data.idSign,
            data.weight,
            data.height,
            data.imc,
            data.heartRate,
            data.bloodPressure,
            data.temperature,
            data.oxygenSaturation
        );
    }

    static toJson(sign: Sign): Sign {
        return new Sign(
            sign.idSign,
            sign.weight,
            sign.height,
            sign.imc,
            sign.heartRate,
            sign.bloodPressure,
            sign.temperature,
            sign.oxygenSaturation
        );
    }
}
