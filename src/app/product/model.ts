export interface Base {

}



export interface FilterCategory {
    controlType: string;
    key: string;
    value: string;
    choices: Choice[];
    min: number;
    max: number;
    inputValue: any;
    description: string;
}

export interface Choice {
    key: string;
    value: string;
    checked: boolean;
}


export interface ProductShort {
    pk: number;
    designation: string;
    interiorMaterial: Material;
    exteriorMaterial: Material;
    thumbNail: BaseImage;
    variants: Variant[];
    rootCategory: string;
    collection: ProductCollection;
}

export interface ProductLong extends ProductShort  {
    aesthetics: string;
    areaOfUse: string;
    materials: string;
    images: BaseImage[];
    categories: Category[];
    components: Component[];
    features: Feature[];
}



export interface Variant  {
    id: number;
    reference: string;
    designation: string;
    height: Measure;
    thickness: Measure;
    diameter: Measure;
    capacity: Measure;
}

export interface Component  {
    designation: string;
    measure_type: string;
    svgIcon: BaseImage;
    material: Material;
    measure_min: Measure;
    measure_max: Measure;
}

export interface Material {
    designation: string;
    color: string;
}

export interface BaseImage {
    id: number;
    content: any;
    designation: string;
}

export interface Measure {
  value: number;
  measure_unit: string;
}

export interface MeasureUnit {
  designation: string;
  description: string;
}


export interface Category   {
    designation: string;
    description:string;
    parentCategory: Category;
    isRoot: boolean;
    isLeaf: boolean;
    children: Category[];
    thumbNail: BaseImage;
    svgIcon: BaseImage;
}

export interface Feature {
    designation: string;
    description: string;
    svgIcon: BaseImage;
}

export interface ProductCollection {
    designation: string;
    description: string;
    thumbNail: BaseImage;
    svgIcon: BaseImage;
}


export interface NavTree  {
    designation?: string;
    routerLink?: string;
    svgIcon?: string;
    children?: NavTree[];

}
export enum ParamType {
    PAGE = 'Page',
    FILTER = 'Filter',
    CATEGORY = 'Category',
    SEARCH = 'Search',
}
export interface Param {
    key: string;
    value: string;
    type: ParamType;
}








