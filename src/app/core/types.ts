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
export interface ProductShort {
    id: number;
    designation: string;
    shortDescription: string;
    interiorCoatings: string[];
    longDescription: string;
    rawMaterials: string[];
    rootCategory: number;
    dimensionsSpecifications: DimensionsSpecification[];
    appearanceVariants: AppearanceVariant[];
    componentsSpecifications: ComponentsSpecification[];
    features: Feature[];

}

export interface ProductLong extends ProductShort {
  longDescription: string;
}

export interface DimensionsSpecification {
    measures: number[];
    measureType: MeasureType;
    isMasterSpecification: boolean;
}
export interface MeasureType {
   designation: string;
   getShortDesignation: string;
   unit: string;
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


export interface Category   {
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

export type PaginatedProductsType = {count: number;next: string;previous: string;results: ProductShort[]};
export type InitDataType = {
    categories: Category[];
    icons: BaseImage[];
    navMenuTree: MenuTreeData[];
}
;
