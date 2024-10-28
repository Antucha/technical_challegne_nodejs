import { v4 as uuidv4 } from 'uuid';

export class EntityBase {

    public generateUuid() {
        return uuidv4();
    }
}