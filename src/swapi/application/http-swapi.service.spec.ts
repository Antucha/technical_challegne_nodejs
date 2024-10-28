// src/swapi/infrastructure/services/http-swapi.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { HttpSWAPIService } from './http-swapi.service';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';

describe('HttpSWAPIService', () => {
  let service: HttpSWAPIService;
  let httpService: HttpService;
  let cacheManager: any;

  // Mock data
  const mockPerson = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
  };

  const mockPeopleList = {
    count: 1,
    next: null,
    previous: null,
    results: [mockPerson],
  };

  beforeEach(async () => {
    // Mock del Cache Manager
    const mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
    };

    // Mock del HttpService usando jest.fn()
    const mockHttpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpSWAPIService,
        {
          provide: HttpService,
          useValue: { get: jest.fn() },
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<HttpSWAPIService>(HttpSWAPIService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get<any>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getResource', () => {
    it('should return cached data if available', async () => {
      cacheManager.get.mockResolvedValue(mockPerson);

      const result = await service.getResource('people', '1');

      expect(result).toEqual(mockPerson);
      expect(cacheManager.get).toHaveBeenCalledWith('people_1');
      expect(httpService.get).not.toHaveBeenCalled();
    });

    it('should fetch and cache data if not in cache', async () => {
      const mockResponse: AxiosResponse = {
        data: mockPerson,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: new AxiosHeaders({
                'Content-Type': 'application/json'
            }),
        },
      };

      cacheManager.get.mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

      const result = await service.getResource('people', '1');
      console.log('result:', result);

      expect(result).toEqual(mockPerson);
      expect(cacheManager.get).toHaveBeenCalledWith('people_1');
    });

    it('should handle http errors appropriately', async () => {
      cacheManager.get.mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => 
        throwError(() => ({
          response: {
            status: 404,
            data: 'Not found',
          },
        }))
      );

      await expect(service.getResource('people', '999')).rejects.toThrow(
        HttpException
      );
    });
  });

  describe('getResourceList', () => {
    it('should return cached list if available', async () => {
      cacheManager.get.mockResolvedValue(mockPeopleList);

      const result = await service.getResourceList('people', 1);

      expect(result).toEqual(mockPeopleList);
      expect(cacheManager.get).toHaveBeenCalledWith('people_list_1');
      expect(httpService.get).not.toHaveBeenCalled();
    });

    it('should fetch and cache list if not in cache', async () => {
      const mockResponse: AxiosResponse = {
        data: mockPeopleList,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: new AxiosHeaders({
                'Content-Type': 'application/json'
            }),
        },
      };

      cacheManager.get.mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

      const result = await service.getResourceList('people', 1);

      expect(result).toEqual(mockPeopleList);
      expect(cacheManager.get).toHaveBeenCalledWith('people_list_1');
      expect(cacheManager.set).toHaveBeenCalledWith(
        'people_list_1',
        mockPeopleList,
        3600
      );
    });

    it('should handle pagination correctly', async () => {
      const mockResponse: AxiosResponse = {
        data: mockPeopleList,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: new AxiosHeaders({
                'Content-Type': 'application/json'
            }),
        },
      };

      cacheManager.get.mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

      const result = await service.getResourceList('people', 2);

      expect(result).toEqual(mockPeopleList);
    });

    it('should use default page 1 if no page provided', async () => {
      const mockResponse: AxiosResponse = {
        data: mockPeopleList,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: new AxiosHeaders({
                'Content-Type': 'application/json'
            }),
        },
      };

      cacheManager.get.mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

      const result = await service.getResourceList('people');

      expect(result).toEqual(mockPeopleList);
    });
  });

  describe('Error handling', () => {
    it('should handle network errors', async () => {
      cacheManager.get.mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => 
        throwError(() => new Error('Network error'))
      );

      await expect(service.getResource('people', '1')).rejects.toThrow(
        HttpException
      );
    });

    it('should handle invalid resource errors', async () => {
      cacheManager.get.mockResolvedValue(null);
      jest.spyOn(httpService, 'get').mockImplementation(() => 
        throwError(() => ({
          response: {
            status: 404,
            data: 'Resource not found',
          },
        }))
      );

      await expect(service.getResource('invalid', '1')).rejects.toThrow(
        HttpException
      );
    });
  });
});