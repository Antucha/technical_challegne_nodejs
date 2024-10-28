import { DynamoDBRepository } from "@/common/infrastructure/dynamo-db.repository";
import { PlanetStructure } from "@/planet/domain/structure/planet.structure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlanetRepository extends DynamoDBRepository {
    constructor() {
        super();
        this.tableName = process.env.DYNAMODB_TABLE_CHALLENGE_PLANET;
    }

    public async create(planet: PlanetStructure){

        return await this.putItem(planet.toJSONStructured());
    }

    public async getAll(): Promise<PlanetStructure[]> {
        const PARAMS = {
            IndexName: 'TableCategory-CreatedAtUnix-index',
            KeyConditionExpression: 'TableCategory = :TableCategory',
            ExpressionAttributeValues: {
                ':TableCategory': PlanetStructure.TABLE_CATEGORY
            }
        }

        const response = await this.queryItems(PARAMS);

        if (!response?.Items) {
            return [];
        }

        return response?.Items.map((item: any) => PlanetStructure.fromJSONStructured(item));

    }

    public async getById(uuid: string): Promise<PlanetStructure> {
        const PARAMS = {
            KeyConditionExpression: 'PK = :PK AND begins_with(SK, :SK)',
            ExpressionAttributeValues: {
                ':PK': PlanetStructure.PK_HASH_PREFIX + uuid,
                ':SK': PlanetStructure.SK_HASH_PREFIX
            },
            Limit: 1
        }

        const response = await this.queryItems(PARAMS);

        if (!response?.Items) {
            return null;
        }

        return PlanetStructure.fromJSONStructured(response.Items[0]);
    }
}
