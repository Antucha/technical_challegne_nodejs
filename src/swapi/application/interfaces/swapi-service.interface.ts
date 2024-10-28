import { SWAPIResponse } from '../../domain/interfaces/swapi-response.interface';

export interface ISWAPIService {
    getResource<T>(resource: string, id?: string): Promise<T>;
    getResourceList<T>(resource: string, page?: number): Promise<SWAPIResponse<T>>;
}