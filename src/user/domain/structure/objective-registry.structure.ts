import { EntityBase } from "@/common/domain/entity-base";
import { convertDateToUnixTimestamp, getCurrentUTCDate } from "@/common/domain/enum/date-util.enum";
import { StateEnum } from "@/common/domain/enum/state.enum";

export class ObjectiveRegistryStructure extends EntityBase {
    static PK_HASH_PREFIX = 'User#$1#Pathway#$2';

    static TABLE_CATEGORY = 'objective'

    deletedAt: Date;
    uuid: string;
    userUuid: string;
    score: number;
    mockExamResponseUuid: string;
    pathway: string;
    state: string;
    createdAt: Date;

    public static create(
        userUuid: string,
        pathway: string,
        score: number,
        mockExamResponseUuid: string | null
    ): ObjectiveRegistryStructure {
        
        const MOCK_EXAM_STRUCTURE = new ObjectiveRegistryStructure();

        MOCK_EXAM_STRUCTURE.uuid = MOCK_EXAM_STRUCTURE.generateUuid();
        MOCK_EXAM_STRUCTURE.userUuid = userUuid;
        MOCK_EXAM_STRUCTURE.pathway = pathway;
        MOCK_EXAM_STRUCTURE.score = score;
        MOCK_EXAM_STRUCTURE.mockExamResponseUuid = mockExamResponseUuid;
        MOCK_EXAM_STRUCTURE.state = StateEnum.ACTIVE;
        MOCK_EXAM_STRUCTURE.createdAt = getCurrentUTCDate(); 

        return MOCK_EXAM_STRUCTURE;
    }

    get pk(): string {
        return ObjectiveRegistryStructure.PK_HASH_PREFIX.replace('$1', this.userUuid).replace('$2', this.pathway);
    }

    get sk(): number {
        return convertDateToUnixTimestamp(this.createdAt);
    }

    get gsk(): number {
        return this.score
    }

    public toJSONStructured(): any {
        return {
            PK: this.pk,
            SK: this.sk,
            GSK: this.gsk,
            State: this.state,
            CreatedAtISO: this.createdAt?.toISOString(),
            TableCategory: ObjectiveRegistryStructure.TABLE_CATEGORY,
            DeletedAtISO: null,
            DeletedAtUnix: null,
        }
    }

    public static fromJSON(data: any): ObjectiveRegistryStructure {

        const OBJECTIVE_STRUCTURE = new ObjectiveRegistryStructure();

        const { userUuid, pathway } = ObjectiveRegistryStructure.parsePK(data.PK);

        OBJECTIVE_STRUCTURE.userUuid = userUuid;
        OBJECTIVE_STRUCTURE.score = data.GSK;

        OBJECTIVE_STRUCTURE.pathway = pathway;
        OBJECTIVE_STRUCTURE.state = data.State;
        OBJECTIVE_STRUCTURE.createdAt = new Date(data.CreatedAtISO);

        return OBJECTIVE_STRUCTURE;
    }

     /**
     * Analiza la cadena PK y extrae userUuid y pathway.
     * @param pk La cadena de clave primaria en el formato 'User#$1#Pathway$2'.
     * @returns Un objeto con userUuid y pathway.
     */
     public static parsePK(pk: string): { userUuid: string; pathway: string } {
        const regex = /^User#([^#]+)#Pathway#([^#]+)$/;
        const match = pk.match(regex);
        if (!match) {
            throw new Error('Formato de PK inválido');
        }
        const userUuid = match[1];
        const pathway = match[2];
        return { userUuid, pathway };
    }

   
    
}