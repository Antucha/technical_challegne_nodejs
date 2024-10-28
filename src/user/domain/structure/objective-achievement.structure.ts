import { convertDateToUnixTimestamp, getCurrentUTCDate } from "@/common/domain/enum/date-util.enum";

export class ObjectiveAchievementStructure {

    static PK_HASH_PREFIX = 'User#';
    static SK_HASH_PREFIX = 'ObjectivePathway#';
    static TABLE_CATEGORY = 'objective-achievement'

    score: number
    userUuid: string
    pathwayUuid: string
    createdAt: Date;

    public static create(
        userUuid: string,
        pathwayUuid: string,
        score: number
    ): ObjectiveAchievementStructure {

        const OBJECTIVE_ACHIEVEMENT = new ObjectiveAchievementStructure()

        OBJECTIVE_ACHIEVEMENT.userUuid = userUuid;
        OBJECTIVE_ACHIEVEMENT.pathwayUuid = pathwayUuid;
        OBJECTIVE_ACHIEVEMENT.score = score;
        OBJECTIVE_ACHIEVEMENT.createdAt = getCurrentUTCDate(); 

        return OBJECTIVE_ACHIEVEMENT;
    }

    get pk(): string {
        return ObjectiveAchievementStructure.PK_HASH_PREFIX + this.userUuid;
    }

    get sk(): string {
        return ObjectiveAchievementStructure.SK_HASH_PREFIX + this.pathwayUuid;
    }

    public toJSONStructured(): any {
        return {
            PK: this.pk,
            SK: this.sk,
            GSK: this.score,
            Score: this.score,
            CreatedAtISO: this.createdAt?.toISOString(),
            CreatedAtUnix: convertDateToUnixTimestamp(this.createdAt),
            TableCategory: ObjectiveAchievementStructure.TABLE_CATEGORY
        }
    }

    public static fromJSON(data: any): ObjectiveAchievementStructure {
        const OBJECTIVE_ACHIEVEMENT = new ObjectiveAchievementStructure()

        OBJECTIVE_ACHIEVEMENT.userUuid = data.SK.replace(ObjectiveAchievementStructure.PK_HASH_PREFIX, '');
        OBJECTIVE_ACHIEVEMENT.pathwayUuid = data.SK.replace(ObjectiveAchievementStructure.SK_HASH_PREFIX, '');
        OBJECTIVE_ACHIEVEMENT.score = data?.Score;
        OBJECTIVE_ACHIEVEMENT.createdAt = new Date(data.CreatedAtISO);

        return OBJECTIVE_ACHIEVEMENT;
    }

}