import { User } from "../user";
import { UserInterface } from "./user.interface";

export interface ProfileInterface {
    id: number;

    uuid: string;

    name: string;

    surname: string;

    countryCallingCodePhone: string;

    countryCodePhone: string;

    isPhoneVerified: boolean;

    birthDate: string;

    phone: string;

    fullPhone: string

    extraData: JSON;

    createdAt: Date;

    updatedAt: Date;

    user: UserInterface | User;

    toInterface?(): ProfileInterface;
}