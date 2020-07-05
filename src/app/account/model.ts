import { MinimalProduct } from "../product/model";

export interface Profile {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profile: Profile;
    isProfessional: boolean;
    country: string;
    phoneNumber: string;
    position: string;
    activityField: string;
    companyName: string;
    favorites: MinimalProduct[];
    civility: string;
}
