
export class FilterCategory {
    category: string;
    choices: {key: string , value: string}[] = [];

    constructor(options: {
        category?: string
        choices?: {key: string , value: string}[]
                } = {}) {
        this.category = options.category || '';
        this.choices = options.choices || [];
    }



}

export class ProductLong {
    designation: string;
    thumbNail: string;
    variants: Variant[];

    constructor(options: {
        designation?: string;
        thumbNail?: string;
        variants?: Variant[]
                } = {}) {
        this.designation = options.designation || '';
        this.thumbNail = options.thumbNail || '';
        this.variants = options.variants || [];
    }
}


export class ProductShort {
    designation: string;
    thumbNail: string;
    variants: Variant[];

    constructor(options: {
        designation?: string;
        thumbNail?: string;
        variants?: Variant[]
                } = {}) {
        this.designation = options.designation || '';
        this.thumbNail = options.thumbNail || '';
        this.variants = options.variants || [];
    }
}

export class Variant  {
    designation: string;
    height: number;
    width: number;
    diameter: number;
    capacity: number;
    components: Component[];

    constructor(options: {
        designation?: string,
        height?: number,
        width?: number,
        diameter?: number,
        capacity?: number,
        components?: Component[]
                } = {}) {
        this.designation = options.designation || '';
        this.height = options.height || -1;
        this.width = options.width || -1;
        this.diameter = options.diameter || -1;
        this.capacity = options.capacity || -1;
        this.components = options.components || [];
    }
}

export class Component  {
    designation: string;
    measure_type: string;
    measure: number;

    constructor(options: {
        designation?: string,
        measure_type?: string,
        measure?: number  } = {}) {
        this.designation = options.designation || '';
        this.measure_type = options.measure_type || '';
        this.measure = options.measure || -1;
    }
}



