import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { SWAPIController } from './infrastructure/controllers/swapi.controller';
import { HttpSWAPIService } from './application/http-swapi.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,// 5 seconds
            maxRedirects: 5,// maximum number of redirects to follow
        }),
        CacheModule.register({
            ttl: 3600,// 1 hour
            max: 100,// maximum number of items that can be stored in cache
        }),
        forwardRef(() => AuthModule)

    ],
    controllers: [SWAPIController],
    providers: [HttpSWAPIService],
    exports: [HttpSWAPIService],
})
export class SWAPIModule {}