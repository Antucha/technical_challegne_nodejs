import { DynamoDBRepository } from "@/common/infrastructure/dynamo-db.repository";
import { ObjectiveAchievementStructure } from "@/user/domain/structure/objective-achievement.structure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ObjectiveAchievementRepository extends DynamoDBRepository {

    constructor() {
        super();
        this.tableName = process.env.DYNAMODB_TABLE_CHALLENGE_USER_SETTING;
    }


    public async create(course: ObjectiveAchievementStructure) {
        await this.putItem(course.toJSONStructured());
    }

    public async getOneByUserAndPathway(userUuid: string, pathwayUuid: string): Promise<ObjectiveAchievementStructure> {
        const result = await this.getItem({
            PK: ObjectiveAchievementStructure.PK_HASH_PREFIX + userUuid,
            SK: ObjectiveAchievementStructure.SK_HASH_PREFIX + pathwayUuid
        });

        if (!result) {
            return null;
        }

        return ObjectiveAchievementStructure.fromJSON(result);
    }
}