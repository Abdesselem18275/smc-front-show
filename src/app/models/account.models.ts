/* eslint-disable @typescript-eslint/naming-convention */

import { MinimalProduct } from '../core/types';

export interface Profile {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_professional: boolean;
    country: string;
    phone_number: string;
    position: string;
    activity_field: string;
    company_name: string;
    favorites: MinimalProduct[];
    civility: string;
    sended_requests:  UserRequest[];
}
export interface UserRequest {
    id: number;
    subjects: string[];
    status: string;
    related_products: string[];
    text_content: string;
    updated: string;
    added: string;
}
