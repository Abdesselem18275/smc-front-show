
export class FilterCategory {
    controlType: string;
    key: string;
    value: string;
    choices: Choice[] = [];
    min: number;
    max: number;
    inputValue: any;
    constructor(options: {
        controlType?: string;
        key?: string;
        value?: string;
        choices?: Choice[];
        min?: number;
        max?: number;
        inputValue?: any;
                } = {}) {
        this.controlType = options.controlType || '';
        this.key = options.key || '';
        this.value = options.value || '';
        this.choices = options.choices || [];
        this.min = options.min || -1;
        this.max = options.max || -1;
        this.inputValue = options.inputValue || this.min;
    }



}

export class Choice {
    key: string;
    value: string;
    checked: boolean;

    constructor(options: {
        key?: string,
        value?: string,
        checked?: boolean; } = {}) {
        this.key = options.key || '';
        this.value = options.value || '';
        this.checked = options.checked || true;
    }

}

export class ProductLong {
    designation: string;
    description: string;
    thumbNail: string;
    interiorMaterial: Material;
    exteriorMaterial: Material;
    images: LargeImage[];
    variants: Variant[];

    constructor(options: {
        designation?: string;
        description?: string;
        thumbNail?: string;
        interiorMaterial?: Material;
        exteriorMaterial?: Material;
        images?: LargeImage[];
        variants?: Variant[];
                } = {}) {
        this.designation = options.designation || '';
        this.description = options.description || '';
        this.thumbNail = options.thumbNail || '';
        this.interiorMaterial = options.interiorMaterial || new Material({});
        this.exteriorMaterial = options.exteriorMaterial || new Material({});
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
    id: number;
    reference: string;
    designation: string;
    height: number;
    thickness: number;
    diameter: number;
    capacity: number;
    components: Component[];

    constructor(options: {
        id?: number,
        reference?: string;
        designation?: string,
        height?: number,
        thickness?: number,
        diameter?: number,
        capacity?: number,
        components?: Component[]
                } = {}) {
        this.id = options.id || -1;
        this.reference = options.reference || 'AAA23BG85';
        this.designation = options.designation || '';
        this.height = options.height || -1;
        this.thickness = options.thickness || -1;
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

export class Category {
    designation: string;
    parentCategory: Category;
    isRoot: boolean;
    isLeaf: boolean;
    children: Category[];

    constructor(options: {
        designation?: string,
        parentCategory?: Category,
        isRoot?: boolean,
        isLeaf?: boolean,
        children?: Category[] } = {}) {
        this.designation = options.designation || '';
        this.parentCategory = options.parentCategory || new Category({});
        this.isRoot = options.isRoot || false;
        this.isLeaf = options.isLeaf || false;
        this.children = options.children || [];
    }

}







