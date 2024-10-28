import { EntityBase } from "@/common/domain/entity-base";
import { Delete } from "@nestjs/common";

export class ProfileStructure extends EntityBase {
    static PK_HASH_PREFIX = 'Profile#';
    static SK_HASH_PREFIX = 'User#';

    static TABLE_CATEGORY = 'profile';

    uuid: string
    userUuid: string;
    name: string;
    surname: string;
    countryCodePhone: string;
    phone: string;
    fullPhone: string;
    birthDate: string;
    countryCallingCodePhone: string;
    isPhoneVerified: boolean;
    extraData: JSON;
    createdAt: Date;
    updatedAt: Date;

    public static create(
        userUuid: string,
        name: string,
        surname: string,
        birthDate: string,
        countryCodePhone?: string,
        phone?: string,
        countryCallingCodePhone?: string,
        isPhoneVerified?: boolean,
        extraData?: JSON
    ): ProfileStructure {
        const PROFILE_STRUCTURE = new ProfileStructure();

        PROFILE_STRUCTURE.uuid = PROFILE_STRUCTURE.generateUuid();
        PROFILE_STRUCTURE.userUuid = userUuid;
        PROFILE_STRUCTURE.name = name;
        PROFILE_STRUCTURE.surname = surname;
        PROFILE_STRUCTURE.birthDate = birthDate;
        PROFILE_STRUCTURE.countryCodePhone = countryCodePhone;
        PROFILE_STRUCTURE.phone = phone;
        PROFILE_STRUCTURE.fullPhone = phone ? `${countryCallingCodePhone}${phone}` : null;
        PROFILE_STRUCTURE.countryCallingCodePhone = countryCallingCodePhone;
        PROFILE_STRUCTURE.isPhoneVerified = isPhoneVerified || false;
        PROFILE_STRUCTURE.extraData = extraData;
        PROFILE_STRUCTURE.createdAt = new Date();
        PROFILE_STRUCTURE.updatedAt = new Date();

        return PROFILE_STRUCTURE;
    }

    get pk(): string {
        return ProfileStructure.PK_HASH_PREFIX + this.uuid;
    }

    get sk(): string {
        return ProfileStructure.SK_HASH_PREFIX + this.userUuid;
    }

    public toJSONStructured(): any {
        return {
            PK: this.pk,
            SK: this.sk,
            Name: this.name,
            Surname: this.surname,
            CountryCodePhone: this.countryCodePhone,
            Phone: this.phone,
            FullPhone: this.fullPhone,
            BirthDate: this.birthDate,
            CountryCallingCodePhone: this.countryCallingCodePhone,
            IsPhoneVerified: this.isPhoneVerified,
            ExtraData: this.extraData ? JSON.stringify(this.extraData) : null,
            CreatedAtISO: this.createdAt?.toISOString(),
            CreatedAtUnix: Math.floor(this.createdAt.getTime() / 1000),
            UpdatedAtISO: this.updatedAt?.toISOString(),
            UpdatedAtUnix: Math.floor(this.updatedAt.getTime() / 1000),
            TableCategory: ProfileStructure.TABLE_CATEGORY,
            DeletedAtISO: null,
            DeletedAtUnix: null,
        }
    }


    public static fromJSONStructured(data: any): ProfileStructure {
        const PROFILE_STRUCTURE = new ProfileStructure();

        PROFILE_STRUCTURE.uuid = data.PK.replace(ProfileStructure.PK_HASH_PREFIX, '');
        PROFILE_STRUCTURE.userUuid = data.SK.replace(ProfileStructure.SK_HASH_PREFIX, '');
        PROFILE_STRUCTURE.name = data.Name;
        PROFILE_STRUCTURE.surname = data.Surname;
        PROFILE_STRUCTURE.countryCodePhone = data.CountryCodePhone;
        PROFILE_STRUCTURE.phone = data.Phone;
        PROFILE_STRUCTURE.fullPhone = data.FullPhone;
        PROFILE_STRUCTURE.birthDate = data.BirthDate;
        PROFILE_STRUCTURE.countryCallingCodePhone = data.CountryCallingCodePhone;
        PROFILE_STRUCTURE.isPhoneVerified = data.IsPhoneVerified;
        PROFILE_STRUCTURE.extraData = data.ExtraData ? JSON.parse(data.ExtraData) : null;
        PROFILE_STRUCTURE.createdAt = new Date(data.CreatedAtISO);
        PROFILE_STRUCTURE.updatedAt = new Date(data.UpdatedAtISO);

        return PROFILE_STRUCTURE;
    }
}