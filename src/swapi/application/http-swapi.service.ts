import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ISWAPIService } from './interfaces/swapi-service.interface';
import { SWAPIResponse } from '../domain/interfaces/swapi-response.interface';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class HttpSWAPIService implements ISWAPIService {
    private readonly baseURL = process.env.SWAPI_BASE_URL;
    private readonly cacheTTL = 3600; // 1 hour

    
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async getResource<T>(resource: string, id?: string): Promise<T> {
        try {
            const cacheKey = `${resource}_${id || ''}`;
            const cachedData = await this.cacheManager.get<T>(cacheKey);

            if (cachedData) {
                return cachedData;
            }

            const url = id 
                ? `${this.baseURL}/${resource}/${id}`
                : `${this.baseURL}/${resource}`;

            const { data } = await firstValueFrom(
                this.httpService.get<T>(url)
            );

            await this.cacheManager.set(cacheKey, data, this.cacheTTL);
            return data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getResourceList<T>(
        resource: string, 
        page: number = 1
    ): Promise<SWAPIResponse<T>> {
        try {
            const cacheKey = `${resource}_list_${page}`;
            const cachedData = await this.cacheManager.get<SWAPIResponse<T>>(cacheKey);

            if (cachedData) {
                return cachedData;
            }

            const { data } = await firstValueFrom(
                this.httpService.get<SWAPIResponse<T>>(
                    `${this.baseURL}/${resource}/?page=${page}`
                )
            );

            await this.cacheManager.set(cacheKey, data, this.cacheTTL);
            return data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any) {
        if (error.response) {
            throw new HttpException(
                error.response.data,
                error.response.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        throw new HttpException(
            'SWAPI Service Error',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}