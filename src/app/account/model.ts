import { MinimalProduct } from "../product/model";

export interface Profile {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    profile: Profile;
    is_professional: boolean;
    country: string;
    phone_number: string;
    position: string;
    activity_field: string;
    company_name: string;
    favorites: MinimalProduct[];
    civility: string;
}
