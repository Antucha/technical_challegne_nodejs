import { EntityBase } from "@/common/domain/entity-base";
import { ProfileInterface } from "./interface/profile.interface";
import { User } from "./user";

export class Profile extends EntityBase implements ProfileInterface {
  id: number;

  uuid: string;

  name: string;

  surname: string;

  isPhoneVerified: boolean;

  countryCodePhone: string;

  countryCallingCodePhone: string;

  phone: string;

  fullPhone: string;

  birthDate: string;

  extraData: JSON;

  createdAt: Date;

  updatedAt: Date;

  user: User;

  static build(
    name: string, 
    surname: string, 
    phone: string, 
    fullPhone: string, 
    countryCodePhone: string, 
    countryCallingCodePhone:string, 
    birthDate: string = null,
    extraData: JSON) {

    const PROFILE = new Profile();

    PROFILE.uuid = PROFILE.generateUuid();
    PROFILE.name = name;
    PROFILE.surname = surname;
    PROFILE.phone = phone;
    PROFILE.fullPhone = fullPhone;
    PROFILE.countryCallingCodePhone = countryCallingCodePhone;
    PROFILE.countryCodePhone = countryCodePhone;
    PROFILE.extraData = extraData;
    PROFILE.birthDate = birthDate;
    PROFILE.isPhoneVerified = false;

    return PROFILE;
  }
}