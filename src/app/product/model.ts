
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
    description: string;
    thumbNail: string;
    material: Material;
    images: LargeImage[];
    variants: Variant[];

    constructor(options: {
        designation?: string;
        description?: string;
        thumbNail?: string;
        material?: Material;
        images?: LargeImage[];
        variants?: Variant[];
                } = {}) {
        this.designation = options.designation || '';
        this.description = options.description || '';
        this.thumbNail = options.thumbNail || '';
        this.material = options.material || new Material({});
        this.images = options.images || [];
        this.variants = options.variants || [];
    }
}


export class ProductShort {
    pk: number;
    designation: string;
    thumbNail: string;
    variants: Variant[];

    constructor(options: {
        pk?: number,
        designation?: string,
        thumbNail?: string,
        variants?: Variant[]
                } = {}) {
        this.pk = options.pk || -1;
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
    material: Material;

    constructor(options: {
        designation?: string,
        measure_type?: string,
        measure?: number,
        material?: Material  } = {}) {
        this.designation = options.designation || '';
        this.measure_type = options.measure_type || '';
        this.measure = options.measure || -1;
        this.material = options.material || new Material({});
    }
}

export class Material {
    designation: string;
    color: string;

    constructor(options: {
        designation?: string,
        color?: string } = {}) {
        this.designation = options.designation || '';
        this.color = options.color || '';
    }

}

export class LargeImage {
    designation: string;
    content: string;
    description?: string;
    constructor(options: {
        designation?: string,
        content?: string ,
        description?: string    } = {}) {
        this.designation = options.designation || '';
        this.content = options.content || '';
        this.description = options.description || '';
    }

}







