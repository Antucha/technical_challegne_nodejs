import { ProfileInterface } from "./profile.interface";

export interface UserInterface {
    id: number;

    uuid: string;
  
    email: string;

    profileId: number;
  
    password: string;

    isAdmin: boolean;

    role: string;
  
    state: string;
  
    createdAt: Date;
  
    updatedAt: Date;

    profile: ProfileInterface;

    toInterface?(): UserInterface;

    generateUuid?(): string;
}