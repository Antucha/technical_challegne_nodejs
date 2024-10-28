import { Auth } from "@/auth/domain/auth";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ObjectiveAchievementRepository } from "../infrastructure/db-nosql/objective-achievement.repository";
import { ObjectiveRegistryRepository } from "../infrastructure/db-nosql/objective-registry.repository";
import { ObjectiveAchievementStructure } from "../domain/structure/objective-achievement.structure";
import { ObjectiveRegistryStructure } from "../domain/structure/objective-registry.structure";
import path from "path";

@Injectable()
export class ObjectiveService {

    constructor(
        private readonly objectiveAchievementRepository: ObjectiveAchievementRepository,
        private readonly objectiveRegistryRepository: ObjectiveRegistryRepository
    ) {}

    public async getObjectiveAchievements(auth: Auth, pathwayUuid) {

        const GET_OBJECTIVE_ACHIEVEMENT: ObjectiveAchievementStructure = await this.objectiveAchievementRepository.getOneByUserAndPathway(auth.uuid, pathwayUuid);

        if (!GET_OBJECTIVE_ACHIEVEMENT) {
            throw new HttpException("Objective achievement not found", HttpStatus.NOT_FOUND);
        }

        return {
            pathwayUuid: GET_OBJECTIVE_ACHIEVEMENT.pathwayUuid,
            score: GET_OBJECTIVE_ACHIEVEMENT.score
        }
    }

    public async createInitialObjectiveAchievement(
        auth: Auth, input: any): Promise<void> {

        const GET_OBJECTIVE_ACHIEVEMENT = await this.objectiveAchievementRepository.getOneByUserAndPathway(auth.uuid, input.pathwayUuid);

        if (GET_OBJECTIVE_ACHIEVEMENT) {
            throw new HttpException("Objective achievement already registered", HttpStatus.BAD_REQUEST);
        }

        const OBJECTIVE_ACHIEVEMENT: ObjectiveAchievementStructure = ObjectiveAchievementStructure.create(
            auth.uuid, 
            input.pathwayUuid, 
            input.score
        )

        if (input.beforeScore > 0) {
            const OBJECTIVE_REGISTRY: ObjectiveRegistryStructure = ObjectiveRegistryStructure.create(
                auth.uuid,
                input.pathwayUuid,
                input.beforeScore,
                null
            )

            await this.objectiveRegistryRepository.create(OBJECTIVE_REGISTRY);
        }

        await this.objectiveAchievementRepository.create(OBJECTIVE_ACHIEVEMENT);
    }


    public async createObjectiveRegistry(auth: Auth, score: number, mockExamUuid:string): Promise<void> {
        const OBJECTIVE_REGISTRY: ObjectiveRegistryStructure = ObjectiveRegistryStructure.create(
            auth.uuid,
            "pathwayUuid",
            score,
            mockExamUuid
        )

        await this.objectiveRegistryRepository.create(OBJECTIVE_REGISTRY);
    }

}