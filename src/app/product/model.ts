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
    id: number;
    designation: string;
    shortDescription: string
    interiorCoatings: string[];
    rawMaterials: string[];
    rootCategory: string;
    dimensionsSpecifications: DimensionsSpecification[];
    appearanceVariants : AppearanceVariant[];
    componentsSpecifications: ComponentsSpecification[]
}

export interface DimensionsSpecification {
    measures: number[];
    measureType : MeasureType
}
export interface MeasureType {
   designation : string
   unit: string  
}
export interface AppearanceVariant {
    id:number;
    thumbNail:string;
    images: BaseImage[];
    look: Look;
}
export interface Look {
    thumbNail : string;
    material: string;
    texture: string; 
 }
export interface ComponentsSpecification {
    component : Component;
    measures : number[];
    rawMaterials: string[];
}

export interface Component  {
    designation: string;
    measureType: MeasureType;
    svgIcon: BaseImage;
}
export interface BaseImage {
    id: number;
    content: any;
    designation: string;
}


export interface Category   {
    id?: number;
    designation: string;
    description?: string;
    parentCategory?: number;
    isRoot?: boolean;
    isLeaf?: boolean;
    children?: Category[];
    thumbNail?: string;
    thumbNailAux?:string;
    svgIcon?: BaseImage;
}

export interface Feature {
    designation: string;
    description: string;
    svgIcon: BaseImage;
}
export enum ParamType {
    PAGE = "Page",
    FILTER = "Filter",
    CATEGORY = "Category",
    SEARCH = "Search",
}
export interface Param {
    key: string;
    value: string;
    type: ParamType;
}
export interface MenuTreeData {
    designation: string;
    routerLink?: any;
    icon?: string ;
    children?: MenuTreeData[];
  }





