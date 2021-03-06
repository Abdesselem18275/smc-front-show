import { Params } from '@angular/router';
import { Category, BaseImage, MenuTreeData} from './product.models';
export type Country = {
    id: number;
    designation: string;
    alpha2Code: string;
    alpha3Code: string;
    numCode: string;
    currency: string;
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
export type LocaleInitData = {
    countries: Country[];
    currencies: Currency[];
};

export enum SessionStorageKey {
    shippingCountry = 'SHIPPING_COUNTRY',
    paymentCurrency = 'PAYMENT_CURRENCY',
  }

export enum AppQueryParamKey {
    shippingCountry = 'shippingCountry',
    paymentCurrency = 'paymentCurrency',
  }

export enum LanguageType {
    ENGLISH = 'English',
    FRENCH = 'Francais',
    GERMAN = 'Deutch'
}
export interface UserLanguage {
    id: string;
    languageType: string;
}