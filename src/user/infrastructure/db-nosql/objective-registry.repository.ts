import { DynamoDBRepository } from "@/common/infrastructure/dynamo-db.repository";
import { ObjectiveRegistryStructure } from "@/user/domain/structure/objective-registry.structure";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ObjectiveRegistryRepository extends DynamoDBRepository {

    constructor() {
        super();
        this.tableName = process.env.DYNAMODB_TABLE_CHALLENGE_USER_OBJECTIVE;
    }


    public async create(course: ObjectiveRegistryStructure) {
        await this.putItem(course.toJSONStructured());
    }
}