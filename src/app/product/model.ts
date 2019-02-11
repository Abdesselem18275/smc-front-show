
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
        this.checked = true;
    }

}

export class ProductLong {
    designation: string;
    description: string;
    thumbNail: BaseImage;
    interiorMaterial: Material;
    exteriorMaterial: Material;
    images: BaseImage[];
    variants: Variant[];
    features: BaseImage[];
    constructor(options: {
        designation?: string;
        description?: string;
        thumbNail?: BaseImage;
        interiorMaterial?: Material;
        exteriorMaterial?: Material;
        images?: BaseImage[];
        variants?: Variant[];
        features?: BaseImage[];
                } = {}) {
        this.designation = options.designation || '';
        this.description = options.description || '';
        this.thumbNail = options.thumbNail || new BaseImage({});
        this.interiorMaterial = options.interiorMaterial || new Material({});
        this.exteriorMaterial = options.exteriorMaterial || new Material({});
        this.images = options.images || [];
        this.variants = options.variants || [];
    }
}


export class ProductShort {
    pk: number;
    designation: string;
    interiorMaterial: Material;
    exteriorMaterial: Material;
    thumbNail: BaseImage;
    variants: Variant[];

    constructor(options: {
        pk?: number,
        designation?: string,
        interiorMaterial?: Material;
        exteriorMaterial?: Material;
        thumbNail?: BaseImage,
        variants?: Variant[]
                } = {}) {
        this.pk = options.pk || -1;
        this.designation = options.designation || '';
        this.interiorMaterial = options.interiorMaterial || new Material({});
        this.exteriorMaterial = options.exteriorMaterial || new Material({});
        this.thumbNail = options.thumbNail || new BaseImage({});
        this.variants = options.variants || [];
    }
}

export class Variant  {
    id: number;
    reference: string;
    designation: string;
    height: Measure;
    thickness: Measure;
    diameter: Measure;
    capacity: Measure;
    components: Component[];

    constructor(options: {
        id?: number,
        reference?: string;
        designation?: string,
        height?: Measure,
        thickness?: Measure,
        diameter?: Measure,
        capacity?: Measure,
        components?: Component[]
                } = {}) {
        this.id = options.id || -1;
        this.reference = options.reference || 'AAA23BG85';
        this.designation = options.designation || '';
        this.height = options.height || new Measure({});
        this.thickness = options.thickness || new Measure({});
        this.diameter = options.diameter || new Measure({});
        this.capacity = options.capacity || new Measure({});
        this.components = options.components || [];
    }
}

export class Component  {
    designation: string;
    measure_type: string;
    measure: Measure;
    material: Material;

    constructor(options: {
        designation?: string,
        measure_type?: string,
        measure?: Measure,
        material?: Material  } = {}) {
        this.designation = options.designation || '';
        this.measure_type = options.measure_type || '';
        this.measure = options.measure || new Measure({});
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

export class BaseImage {
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

export class Measure {
  value: number;
  measure_type: MeasureUnit;

  constructor(options: {
    value?: number,
    measure_type?: MeasureUnit
    } = {}) {
    this.value = options.value || -1;
    this.measure_type = options.measure_type || new MeasureUnit({});
    }
}


export class MeasureUnit {
  designation: string;
  description: string;

  constructor(options: {
    designation?: string,
    description?: string
    } = {}) {
    this.designation = options.designation || '';
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







