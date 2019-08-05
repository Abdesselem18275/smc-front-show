import { ProductShort } from "../product/model";

export class UserAccount {
    profile: Profile;
    is_professional: Boolean;
    country: string;
    phone_number: string;
    position: string;
    activity_field: string;
    company_name: string;
    favorites: number[];
    constructor(options: {
        profile?: Profile;
        is_professional?: Boolean;
        country?: string;
        phone_number?: string;
        position?: string;
        activity_field?: string;
        company_name?: string;
        favorites?: number[];
    } = {}) {
        this.profile = options.profile || new Profile({});
        this.is_professional = options.is_professional || false;
        this.country = options.country || '';
        this.phone_number = options.phone_number || '';
        this.position = options.position || '';
        this.activity_field = options.activity_field || '';
        this.company_name = options.company_name || '';
        this.favorites = options.favorites || [];
    }

}

export class Profile {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    constructor(options: {
        email?: string;
        password?: string;
        first_name?: string;
        last_name?: string;
    } = {}) {
        this.email = options.email || '';
        this.password = options.password || '';
        this.first_name = options.first_name || '';
        this.last_name = options.last_name || '';
    }

}
