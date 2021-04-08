/* eslint-disable @typescript-eslint/naming-convention */

export interface ApiProfile {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    is_professional: boolean;
    country: string;
    phone_number: string;
    position: string;
    auth_token: string;
    activity_field: string;
    company_name: string;
    favorites: number[];
    civility: string;
}

export class Profile {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isProfessional: boolean;
    country: string;
    phoneNumber: string;
    position: string;
    authToken: string;
    activityField: string;
    companyName: string;
    favorites: number[];
    civility: string;

    constructor(args:ApiProfile) {
        this.id = args.id
        this.email = args.email
        this.country = args.country
        this.position = args.position
        this.civility = args.civility
        this.favorites = args.favorites
        this.firstName = args.first_name
        this.lastName = args.last_name
        this.isProfessional = args.is_professional
        this.activityField = args.activity_field
        this.companyName = args.company_name
        this.authToken = args.auth_token
        this.phoneNumber = args.phone_number
    }

    get initials():string {
        return this.firstName[0].concat(this.lastName[0])
    }
}

