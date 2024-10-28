import { EntityBase } from "@/common/domain/entity-base";
import { UserInterface } from "./interface/user.interface";
import { Profile } from "./profile";
import { ProfileInterface } from "./interface/profile.interface";
import { RoleUserEnum } from "@/common/domain/enum/role-user.enum";

export class User extends EntityBase implements UserInterface{
    id: number;

    uuid: string;
  
    email: string;
  
    password: string;

    profileId: number;
  
    state: string;

    role: string;

    isAdmin: boolean;
  
    createdAt: Date;
  
    updatedAt: Date;

    profile: ProfileInterface;

    static build(email: string, password: string, profile: Profile) {
      const USER = new User();

      USER.uuid = USER?.generateUuid();
      USER.email = email;
      USER.isAdmin = false;
      USER.password = password;
      USER.profile = profile;
      USER.role = RoleUserEnum.USER;

      return USER;
    }
}