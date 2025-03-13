export class Structure {
    min?: number;
    max?: number;
    units?: string;
    options?: string[];

    constructor(min?: number, max?: number, units?: string, options?: string[]) {
        this.min = min;
        this.max = max;
        this.units = units;
        this.options = options;
    }

    static fromJson(data: Structure): Structure {
        const structure = new Structure(data.min, data.max, data.units, data.options);

        return structure;
    }

    static toJSON(structure: Structure): Structure {
        return {
            min: structure.min,
            max: structure.max,
            units: structure.units,
            options: structure.options
        };
    }
}
