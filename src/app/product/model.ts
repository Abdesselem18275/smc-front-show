export class Base {

}



export class FilterCategory {
    controlType: string;
    key: string;
    value: string;
    choices: Choice[] = [];
    min: number;
    max: number;
    inputValue: any;
    description: string;
    constructor(options: {
        controlType?: string;
        key?: string;
        value?: string;
        choices?: Choice[];
        min?: number;
        max?: number;
        inputValue?: any;
        description?: string;
                } = {}) {
        this.controlType = options.controlType || '';
        this.key = options.key || '';
        this.value = options.value || '';
        this.choices = options.choices || [];
        this.min = options.min || -1;
        this.max = options.max || -1;
        this.inputValue = options.inputValue || this.min;
        this.description = options.description || '';
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
    pk: number;
    designation: string;
    aesthetics: string;
    areaOfUse: string;
    materials: string;
    thumbNail: BaseImage;
    interiorMaterial: Material;
    exteriorMaterial: Material;
    images: BaseImage[];
    variants: Variant[];
    categories: Category[];
    rootCategory: string;
    components: Component[];
    features: Feature[];
    collection: ProductCollection;
    constructor(options: {
        pk?: number;
        designation?: string;
        aesthetics?: string;
        areaOfUse?: string;
        materials?: string;
        thumbNail?: BaseImage;
        interiorMaterial?: Material;
        exteriorMaterial?: Material;
        images?: BaseImage[];
        variants?: Variant[];
        categories?: Category[];
        rootCategory?: string;
        components?: Component[];
        features?: Feature[];
        collection?: ProductCollection;
                } = {}) {
        this.pk = options.pk || -1;
        this.designation = options.designation || '';
        this.aesthetics = options.aesthetics || '';
        this.areaOfUse = options.areaOfUse || '';
        this.materials = options.materials || '';
        this.thumbNail = options.thumbNail || new BaseImage({});
        this.interiorMaterial = options.interiorMaterial || new Material({});
        this.exteriorMaterial = options.exteriorMaterial || new Material({});
        this.images = options.images || [];
        this.variants = options.variants.map(x => new Variant(x)) || [];
        this.categories = options.categories || [];
        this.rootCategory = options.rootCategory || '';
        this.components = options.components.map(x => new Component(x)) || [];
        this.features = options.features.map(x => new Feature(x)) || [];
        this.collection = options.collection || new ProductCollection({});
    }
}


export class ProductShort {
    pk: number;
    designation: string;
    interiorMaterial: Material;
    exteriorMaterial: Material;
    thumbNail: BaseImage;
    variants: Variant[];
    rootCategory: string;
    collection: ProductCollection;
    constructor(options: {
        pk?: number,
        designation?: string,
        interiorMaterial?: Material;
        exteriorMaterial?: Material;
        thumbNail?: BaseImage,
        variants?: Variant[],
        rootCategory?: string,
        collection?: ProductCollection;
                } = {}) {
        this.pk = options.pk || -1;
        this.designation = options.designation || '';
        this.interiorMaterial = options.interiorMaterial || new Material({});
        this.exteriorMaterial = options.exteriorMaterial || new Material({});
        this.thumbNail = options.thumbNail || new BaseImage({});
        this.variants = options.variants || [];
        this.rootCategory = options.rootCategory || '';
        this.collection = options.collection || new ProductCollection({});
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

    constructor(options: {
        id?: number,
        reference?: string;
        designation?: string,
        height?: Measure,
        thickness?: Measure,
        diameter?: Measure,
        capacity?: Measure,
                } = {}) {
        this.id = options.id || -1;
        this.reference = options.reference || 'AAA23BG85';
        this.designation = options.designation || '';
        this.height = options.height !== null ? new Measure(options.height) : new Measure({});
        this.thickness = options.thickness !== null ? new Measure(options.thickness) : new Measure({});
        this.diameter = options.diameter !== null ? new Measure(options.diameter) : new Measure({});
        this.capacity = options.capacity !== null ? new Measure(options.capacity) : new Measure({});
    }
}

export class Component  {
    designation: string;
    measure_type: string;
    svgIcon: BaseImage;
    material: Material;
    measure_min: Measure;
    measure_max: Measure;

    constructor(options: {
        designation?: string,
        measure_type?: string,
        svgIcon?: BaseImage,
        material?: Material,
        measure_min?: Measure,
        measure_max?: Measure} = {}) {
        this.designation = options.designation || '';
        this.measure_type = options.measure_type || '';
        this.svgIcon = options.svgIcon || new BaseImage({});
        this.material = options.material !== null ? new Material(options.material) : null;
        this.measure_min = options.measure_min !== null ? new Measure(options.measure_min) : null;
        this.measure_max = options.measure_max !== null ? new Measure(options.measure_max) : null;
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
    to_string() {
        return this.designation;
    }

}

export class BaseImage {
    designation: string;
    content: any;
    description: string;
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
  measure_unit: string;

  constructor(options: {
    value?: number,
    measure_unit?: string,
    } = {}) {
    this.value = options.value || -1;
    this.measure_unit = options.measure_unit || '';
    }

   to_string() {

       return this.value === -1 ? '-' : this.value.toString() + ' ' + this.measure_unit;
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


export class Category   {
    designation?: string;
    parentCategory?: Category;
    isRoot?: boolean;
    isLeaf?: boolean;
    children?: Category[];
    thumbNail?: BaseImage;
    svgIcon?: BaseImage;
    constructor(options: {
        designation?: string,
        parentCategory?: Category,
        isRoot?: boolean,
        isLeaf?: boolean,
        children?: Category[],
        thumbNail?: BaseImage,
        svgIcon?: BaseImage } = {}) {
        this.designation = options.designation || '';
        this.parentCategory = options.parentCategory || new Category({});
        this.isRoot = options.isRoot || false;
        this.isLeaf = options.isLeaf || false;
        this.children = options.children || [];
        this.thumbNail = options.thumbNail || new BaseImage({});
        this.svgIcon = options.svgIcon || new BaseImage({});

    }

}

export class Feature {
    designation: string;
    description: string;
    svgIcon: BaseImage;
    constructor(options: {
        designation?: string,
        description?: string,
        svgIcon?: BaseImage;
    } = {}) {
        this.designation = options.designation || '';
        this.description = options.description || '';
        this.svgIcon = options.svgIcon || new BaseImage({});
    }

}

export class ProductCollection {
    designation: string;
    description: string;
    thumbNail: BaseImage;
    svgIcon: BaseImage;
    constructor(options: {
        designation?: string,
        description?: string,
        thumbNail?: BaseImage,
        svgIcon?: BaseImage;
    } = {}) {
        this.designation = options.designation || '';
        this.description = options.description || '';
        this.thumbNail = options.thumbNail || new BaseImage({});
        this.svgIcon = options.svgIcon || new BaseImage({});
    }

}


export class NavTree extends Category {
    routerLink?: string;
    level: number;
    navChildren?: NavTree[];

}








