import { EntityBase } from "@/common/domain/entity-base";
import { Delete } from "@nestjs/common";

export class UserStructure extends EntityBase {
    static PK_HASH_PREFIX = 'USER#';
    static SK_HASH_PREFIX = 'PROFILE#';
    static GSK_HASH_PREFIX = 'EMAIL#';

    static TABLE_CATEGORY = 'user';

    uuid: string;
    profileUuid: string;
    isAdmin: boolean;
    role: string;
    email: string;
    password: string;
    state: string;
    createdAt: Date;
    updatedAt: Date;

    public static create(
        email: string,
        password: string,
        role: string,
        isAdmin: boolean,
        state: string,
    ): UserStructure {
        const USER_STRUCTURE = new UserStructure();

        USER_STRUCTURE.uuid = USER_STRUCTURE.generateUuid();
        USER_STRUCTURE.email = email;
        USER_STRUCTURE.password = password;
        USER_STRUCTURE.role = role;
        USER_STRUCTURE.isAdmin = isAdmin;
        USER_STRUCTURE.state = state;
        USER_STRUCTURE.createdAt = new Date();
        USER_STRUCTURE.updatedAt = new Date();

        return USER_STRUCTURE;
    }

    get pk(): string {
        return UserStructure.PK_HASH_PREFIX + this.uuid;
    }

    get sk(): string {
        return UserStructure.SK_HASH_PREFIX;
    }

    get gsk(): string {
        return UserStructure.GSK_HASH_PREFIX + this.email;
    }


    public toJSONStructured(): any {
        return {
            PK: this.pk,
            SK: this.sk,
            GSK: this.gsk,
            Email: this.email,
            Password: this.password,
            Role: this.role,
            IsAdmin: this.isAdmin,
            State: this.state,
            CreatedAtISO: this.createdAt?.toISOString(),
            CreatedAtUnix: Math.floor(this.createdAt.getTime() / 1000),
            UpdatedAtISO: this.updatedAt?.toISOString(),
            UpdatedAtUnix: Math.floor(this.updatedAt.getTime() / 1000),
            TableCategory: UserStructure.TABLE_CATEGORY,
            DeletedAtISO: null,
            DeletedAtUnix: null,
        }
    }


    public static fromJSONStructured(data: any): UserStructure {
        const USER_STRUCTURE = new UserStructure();

        USER_STRUCTURE.uuid = data.PK.replace(UserStructure.PK_HASH_PREFIX, '');
        USER_STRUCTURE.email = data.Email;
        USER_STRUCTURE.password = data.Password;
        USER_STRUCTURE.role = data.Role;
        USER_STRUCTURE.isAdmin = data.IsAdmin;
        USER_STRUCTURE.state = data.State;
        USER_STRUCTURE.createdAt = new Date(data.CreatedAtISO);
        USER_STRUCTURE.updatedAt = new Date(data.UpdatedAtISO);

        return USER_STRUCTURE;
    }
}