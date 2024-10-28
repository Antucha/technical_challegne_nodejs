import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { PlanetService } from '@/planet/application/planet.service';
import { CreatePlanetInput } from '../input/create-planet.input.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AdminGuard } from '@/auth/application/guard/admin.guard';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('PLANET')
@Controller('planet')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Create a planet' })
  public async create(
    @Body() createPlanetDto: CreatePlanetInput,
    @Req() req: Request,
    @Res() res: Response
  ) {
    
    const PLANET = await this.planetService.create(createPlanetDto);

    const { status } = {status: 200};

    res.status(status).json({
      message: 'Planet created successfully',
      data: PLANET
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Get all planets' })
  public async findAll(
    @Res() response: Response
  ) {
    const planets = await this.planetService.findAll();
    const { status } = {status: 200};

    response.status(status).json({
      message: 'All planets listed correctly',
      data: planets
    });
  }
 

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @ApiOperation({ summary: 'Get planet by ID' })
  public async findOne(
    @Param('id') id: string,
    @Res() response: Response
  ) {
    const planet = await this.planetService.findOne(id);
    const { status } = {status: 200};

    response.status(status).json({
      message: 'Planet listed correctly',
      data: planet
    });
  }
}
