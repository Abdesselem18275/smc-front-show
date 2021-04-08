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
    dimensionVariants: ApiDimensionVariant[];
    appearanceVariants: AppearanceVariant[];
    componentsSpecifications: ApiComponentsSpecification[];
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
        this.dimensionVariants = args.dimensionVariants ?  args.dimensionVariants.map(dim => new DimensionVariant(dim)) : []
        this.appearanceVariants = args.appearanceVariants
        this.componentsSpecifications = args.componentsSpecifications ? args.componentsSpecifications.map(comp => new ComponentsSpecification(comp)):[]
        this.features = args.features
        this.minPrice = args.min_price
        this.maxPrice = args.max_price     
    }
    get dimensionColumns():string[] {
        return Array.from(this.dimensionVariants.reduce(
          (acc: Set<string>,currentValue: DimensionVariant) => {
            currentValue.dimensionVariantsSpecs.forEach(dimSpecs => {
              acc.add(dimSpecs.measureType.designation);
            });
            return acc;
          }
    
          ,new Set<string>()));
    }
}

export interface ApiDimensionVariantSpecification {
    value: number;
    measure_type: ApiMeasureType;
    is_Master_specification: boolean;
}

export class DimensionVariantSpecification {
    value: number;
    measureType: MeasureType;
    isMasterSpecification: boolean;
    constructor(args:ApiDimensionVariantSpecification) {
        this.value = args.value
        this.measureType = new MeasureType(args.measure_type)
        this.isMasterSpecification = args.is_Master_specification
    }
}
export interface ApiDimensionVariant {
    id:number;
    designation: string;
    dimensionVariantsSpecs: ApiDimensionVariantSpecification[];
  }
export class DimensionVariant {
  id:number;
  designation: string;
  dimensionVariantsSpecs: DimensionVariantSpecification[];
  constructor(args:ApiDimensionVariant) {
      Object.assign(this,args)
      this.dimensionVariantsSpecs = args.dimensionVariantsSpecs.map(dim => new DimensionVariantSpecification(dim))
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
    images?: string[];
    look?: Look;
}
export interface Look {
    thumbNail: string;
    material: string;
    texture: string;
 }
export interface ApiComponentsSpecification {
    component: ApiProductComponent;
    measures: number[];
    rawMaterials: string[];
}
export class ComponentsSpecification {
    component: ProductComponent;
    measures: number[];
    rawMaterials: string[];
    constructor(args:ApiComponentsSpecification ) {
        Object.assign(this,args)
        this.component = new ProductComponent(args.component)
    }
}

export interface ApiProductComponent  {
    designation: string;
    measure_type: ApiMeasureType;
    svg_icon: BaseImage;
}
export class ProductComponent  {
    designation: string;
    measureType: MeasureType;
    svgIcon: BaseImage;
    constructor(args:ApiProductComponent) {
        this.designation = args.designation
        this.svgIcon = args.svg_icon
        this.measureType = new MeasureType(args.measure_type)
    }
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

