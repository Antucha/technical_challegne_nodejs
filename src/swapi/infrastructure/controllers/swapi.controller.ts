import { Controller, Get, Param, Query,UseGuards } from '@nestjs/common';
import { HttpSWAPIService } from '../../application/http-swapi.service';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiHideProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@/auth/application/guard/admin.guard';


@(ApiTags('SWAPI INTEGRACTION'))
@Controller('swapi')
export class SWAPIController {
    constructor(private readonly swapiService: HttpSWAPIService) {}

    @ApiOperation({ summary: 'Get all people' })
    @Get('people')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async getPeople(@Query('page') page?: number) {
        return this.swapiService.getResourceList('people', page);
    }

    @ApiOperation({ summary: 'Get person by ID' })
    @Get('people/:id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async getPerson(@Param('id') id: string) {
        return this.swapiService.getResource('people', id);
    }

    @ApiOperation({ summary: 'Get all planets' })
    @Get('planets')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async getPlanets(@Query('page') page?: number) {
        return this.swapiService.getResourceList('planets', page);
    }

    @ApiOperation({ summary: 'Get planet by ID' })
    @Get('planets/:id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async getPlanet(@Param('id') id: string) {
        return this.swapiService.getResource('planets', id);
    }
}