import { Injectable } from '@nestjs/common';
import { CreatePlanetInput } from '../infraestructure/input/create-planet.input.dto';
import { PlanetRepository } from '../infraestructure/db-nosql/planet.repository';
import { PlanetStructure } from '../domain/structure/planet.structure';

@Injectable()
export class PlanetService {

  constructor(
    private readonly planetRepository: PlanetRepository
  ) {}

  public async create(createPlanetDto: CreatePlanetInput) {
    const PLANET = PlanetStructure.create(
      createPlanetDto.nombre,
      createPlanetDto.periodoRotacion,
      createPlanetDto.periodoOrbital,
      createPlanetDto.diametro,
      createPlanetDto.clima,
      createPlanetDto.gravedad,
      createPlanetDto.terreno,
      createPlanetDto.aguaSuperficial,
      createPlanetDto.poblacion,
      createPlanetDto.residentes,
      createPlanetDto.peliculas,
      createPlanetDto.url
    );

    await this.planetRepository.create(PLANET);
  }

  public async findAll(): Promise<PlanetStructure[]> {
    const PLANETS:PlanetStructure[] = await this.planetRepository.getAll();

    return PLANETS;
  }

  public async findOne(id: string): Promise<PlanetStructure> {
    const PLANET: PlanetStructure = await this.planetRepository.getById(id);

    return PLANET;
  }

}
