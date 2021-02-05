import { Params } from '@angular/router';
import { Category, BaseImage, MenuTreeData} from './product.models';
export type Country = {
    id: number;
    designation: string;
    alpha2Code: string;
    alpha3Code: string;
    numCode: string;
};
export type Currency = {
    id: number;
    designation: string;
    symbol: string;
    country: string;
    alphaCode: string;
    numCode: number;
};
export type CarouselMode = 'vertical' | 'horizontal';
export type RedirectDataType = {redirectUrl: string;params: Params};
export type InitDataType = {
    categories: Category[];
    icons: BaseImage[];
    navMenuTree: MenuTreeData[];
    countries: Country[];
    currencies: Currency[];
};
