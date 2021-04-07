/* eslint-disable @typescript-eslint/naming-convention */
import { UrlTree } from '@angular/router';

export interface MinimalProduct {
  id: number;
  designation: string;
  appearanceVariants: string;
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
export interface ApiProduct {
    id: number;
    designation: string;
    short_description: string;
    interior_coatings: string[];
    long_description: string;
    raw_materials: string[];
    root_category: number;
    dimension_variants: ApiDimensionVariant[];
    appearance_variants: AppearanceVariant[];
    components_specifications: ComponentsSpecification[];
    features: Feature[];
    min_price: number;
    max_price: number;
};

export class Product {
    id: number;
    designation: string;
    shortDescription: string;
    interiorCoatings: string[];
    longDescription: string;
    rawMaterials: string[];
    rootCategory: number;
    dimensionVariants: DimensionVariant[];
    appearanceVariants: AppearanceVariant[];
    componentsSpecifications: ComponentsSpecification[];
    features: Feature[];
    minPrice: number;
    maxPrice: number;
    constructor(args:ApiProduct) {
        this.id = args.id
        this.designation = args.designation
        this.shortDescription = args.short_description
        this.interiorCoatings = args.interior_coatings
        this.longDescription = args.long_description
        this.rawMaterials = args.raw_materials
        this.rootCategory = args.root_category
        this.dimensionVariants = args.dimension_variants ?  args.dimension_variants.map(dim => new DimensionVariant(dim)) : []
        this.appearanceVariants = args.appearance_variants
        this.componentsSpecifications = args.components_specifications
        this.features = args.features
        this.minPrice = args.min_price
        this.maxPrice = args.max_price     
    }
}

export interface ApiDimensionVariantSpecification {
    value: number;
    measure_type: MeasureType;
    is_Master_specification: boolean;
}

export class DimensionVariantSpecification {
    value: number;
    measureType: MeasureType;
    isMasterSpecification: boolean;
    constructor(args:ApiDimensionVariantSpecification) {
        this.value = args.value
        this.measureType = args.measure_type
        this.isMasterSpecification = args.is_Master_specification
    }
}
export interface ApiDimensionVariant {
    id:number;
    designation: string;
    dimensionVariantsSpecs: DimensionVariantSpecification[];
  }
export class DimensionVariant {
  id:number;
  designation: string;
  dimensionVariantsSpecs: DimensionVariantSpecification[];
  constructor(args:ApiDimensionVariant) {
      Object.assign(this,args)
  }
}
export interface ApiMeasureType {
   designation: string;
   short_designation: string;
   unit: string;
}

export class MeasureType {
    designation: string;
    getShortDesignation: string;
    unit: string;
    constructor(args:ApiMeasureType){
        Object.assign(this,args)
        this.getShortDesignation = args.short_designation
    }
 }

export interface AppearanceVariant {
    id?: number;
    thumbNail?: string;
    images?: BaseImage[];
    look?: Look;
}
export interface Look {
    thumbNail: string;
    material: string;
    texture: string;
 }
export interface ComponentsSpecification {
    component: ProductComponent;
    measures: number[];
    rawMaterials: string[];
}

export interface ProductComponent  {
    designation: string;
    measureType: MeasureType;
    svgIcon: BaseImage;
}
export interface BaseImage {
    id: number;
    content: string;
    designation: string;
}
export interface ApiCategory   {
    id?: number;
    designation: string;
    description?: string;
    parent_category?: number;
    is_root?: boolean;
    is_leaf?: boolean;
    children?: Category[];
    thumbNail?: string;
    thumbNail_aux?: string;
    svgIcon?: string;
}
export class Category   {
    id?: number;
    designation: string;
    description?: string;
    parentCategory?: number;
    isRoot?: boolean;
    isLeaf?: boolean;
    children?: Category[];
    thumbNail?: string;
    thumbNailAux?: string;
    svgIcon?: string;
    constructor(args:ApiCategory) {
        Object.assign(this,args)
        this.thumbNailAux = args.thumbNail_aux
        this.parentCategory = args.parent_category
        this.isLeaf = args.is_leaf
        this.isRoot = args.is_root
        this.svgIcon = args.svgIcon
    }
}

export interface Feature {
    designation: string;
    description: string;
    svgIcon: BaseImage;
}
export interface Param {
    key: string;
    value: string;
    type: any;
}
export interface MenuTreeData {
    designation: string;
    routerLink?: UrlTree | string;
    icon?: string ;
    children?: MenuTreeData[];
  }


  export interface DimensionElement {
    [key: string]: string;
  }

export type PaginatedObjectsType<T> = {
    count: number;
    next: string;
    previous: string;
    results: T[]};

