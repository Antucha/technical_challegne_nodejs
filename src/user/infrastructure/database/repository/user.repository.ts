import { DynamoDBRepository } from "@/common/infrastructure/dynamo-db.repository";
import { UserStructure } from "@/user/domain/structure/user.structure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends DynamoDBRepository {

    constructor() {
        super();
        this.tableName = process.env.DYNAMODB_TABLE_CHALLENGE_USER;
    }

    public async create(user: UserStructure) {
        await this.putItem(user.toJSONStructured());
    }

    public async getOneByUuid(uuid: string): Promise<UserStructure> {
        const result = await this.getItem({
            PK: UserStructure.PK_HASH_PREFIX + uuid,
            SK: UserStructure.SK_HASH_PREFIX
        });

        if (!result) {
            return null;
        }

        return UserStructure.fromJSONStructured(result);

    }

    public async getOneByEmail(email: string): Promise<UserStructure> {
        const PARAMS = {
            IndexName: 'GSK-PK-index',
            KeyConditionExpression: 'GSK = :GSK',
            ExpressionAttributeValues: {
                ':GSK': UserStructure.GSK_HASH_PREFIX + email
            }
        };

        const result = await this.queryItems(PARAMS);

        if (!result?.Items){
            return null;
        }

        return UserStructure.fromJSONStructured(result.Items[0]);
    }

    public async getAll(): Promise<UserStructure[]> {
        const PARAMS = {
            IndexName: 'TableCategory-CreatedAtUnix-index',
            KeyConditionExpression: 'TableCategory = :TableCategory',
            FilterExpression: '#st = :State',
            ExpressionAttributeNames: {
                '#st': 'State'
            },
            ExpressionAttributeValues: {
                ':TableCategory': UserStructure.TABLE_CATEGORY,
                ':State': 'active'
            }
        }

        const result = await this.queryItems(PARAMS);

        if (!result?.Items){
            return [];
        }

        return result.Items.map(item => UserStructure.fromJSONStructured(item));

    }
}