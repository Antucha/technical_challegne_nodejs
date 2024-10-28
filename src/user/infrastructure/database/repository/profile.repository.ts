import { DynamoDBRepository } from "@/common/infrastructure/dynamo-db.repository";
import { ProfileStructure } from "@/user/domain/structure/profile.structure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProfileRepository extends DynamoDBRepository {

    constructor() {
        super();
        this.tableName = process.env.DYNAMODB_TABLE_CHALLENGE_USER;
    }

    public async create(profile: ProfileStructure) {
        await this.putItem(profile.toJSONStructured());
    }

    public async getOneByUuid(uuid: string): Promise<ProfileStructure> {
        const result = await this.getItem({
            PK: ProfileStructure.PK_HASH_PREFIX + uuid,
            SK: ProfileStructure.SK_HASH_PREFIX + uuid
        });

        if (!result) {
            return null;
        }

        return ProfileStructure.fromJSONStructured(result);
    }

    public async getOneByUserUuid(userUuid: string): Promise<ProfileStructure> {
        const PARAMS = {
            IndexName: 'SK-PK-index',
            KeyConditionExpression: 'SK = :SK',
            ExpressionAttributeValues: {
                ':SK': ProfileStructure.SK_HASH_PREFIX + userUuid
            }
        };


        const result = await this.queryItems(PARAMS);

        console.log('result: ', result);

        if (!result?.Items){
            return null;
        }

        return ProfileStructure.fromJSONStructured(result.Items[0]);
    }

    public async getAll(): Promise<ProfileStructure[]> {
        const PARAMS = {
            IndexName: 'TableCategory-CreatedAtUnix-index',
            KeyConditionExpression: 'TableCategory = :TableCategory',
            FilterExpression: '#st = :State',
            ExpressionAttributeNames: {
                '#st': 'State'
            },
            ExpressionAttributeValues: {
                ':TableCategory': ProfileStructure.TABLE_CATEGORY,
                ':State': 'active'
            }
        }

        const result = await this.queryItems(PARAMS);

        if (!result?.Items){
            return null;
        }

        return result.Items.map(item => ProfileStructure.fromJSONStructured(item));
    }
}
