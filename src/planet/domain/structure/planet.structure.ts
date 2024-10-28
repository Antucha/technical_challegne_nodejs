import { EntityBase } from "@/common/domain/entity-base";

export class PlanetStructure extends EntityBase {
    static PK_HASH_PREFIX = 'Planet#';
    static SK_HASH_PREFIX = '#METADATA#';
    static TABLE_CATEGORY = 'planet';

    uuid: string;
    nombre: string;
    periodoRotacion: string;
    periodoOrbital: string;
    diametro: string;
    clima: string;
    gravedad: string;
    terreno: string;
    aguaSuperficial: string;
    poblacion: string;
    residentes: string[];
    peliculas: string[];
    createdAt: Date;
    editedAt: Date;
    url: string;

    public static create(
        nombre: string,
        periodoRotacion: string,
        periodoOrbital: string,
        diametro: string,
        clima: string,
        gravedad: string,
        terreno: string,
        aguaSuperficial: string,
        poblacion: string,
        residentes: string[],
        peliculas: string[],
        url: string
    ): PlanetStructure {
        const PLANET_STRUCTURE = new PlanetStructure();
        PLANET_STRUCTURE.uuid = PLANET_STRUCTURE.generateUuid();
        PLANET_STRUCTURE.nombre = nombre;
        PLANET_STRUCTURE.periodoRotacion = periodoRotacion;
        PLANET_STRUCTURE.periodoOrbital = periodoOrbital;
        PLANET_STRUCTURE.diametro = diametro;
        PLANET_STRUCTURE.clima = clima;
        PLANET_STRUCTURE.gravedad = gravedad;
        PLANET_STRUCTURE.terreno = terreno;
        PLANET_STRUCTURE.aguaSuperficial = aguaSuperficial;
        PLANET_STRUCTURE.poblacion = poblacion;
        PLANET_STRUCTURE.residentes = residentes;
        PLANET_STRUCTURE.peliculas = peliculas;
        PLANET_STRUCTURE.url = url;
        PLANET_STRUCTURE.createdAt = new Date();
        PLANET_STRUCTURE.editedAt = new Date();
        return PLANET_STRUCTURE;
    }

    get pk(): string {
        return PlanetStructure.PK_HASH_PREFIX + this.uuid;
    }

    get sk(): string {
        return PlanetStructure.SK_HASH_PREFIX;
    }

    public toJSONStructured(): any {
        return {
            PK: this.pk,
            SK: this.sk,
            Nombre: this.nombre,
            PeriodoRotacion: this.periodoRotacion,
            PeriodoOrbital: this.periodoOrbital,
            Diametro: this.diametro,
            Clima: this.clima,
            Gravedad: this.gravedad,
            Terreno: this.terreno,
            AguaSuperficial: this.aguaSuperficial,
            Poblacion: this.poblacion,
            Residentes: this.residentes,
            Peliculas: this.peliculas,
            Url: this.url,
            CreatedAtISO: this.createdAt?.toISOString(),
            EditedAtISO: this.editedAt?.toISOString(),
            CreatedAtUnix: Math.floor(this.createdAt.getTime() / 1000),
            EditedAtUnix: Math.floor(this.editedAt.getTime() / 1000),
            TableCategory: PlanetStructure.TABLE_CATEGORY
        }
    }

    public static fromJSONStructured(data: any): PlanetStructure {
        const PLANET_STRUCTURE = new PlanetStructure();
        PLANET_STRUCTURE.uuid = data.PK.replace(PlanetStructure.PK_HASH_PREFIX, '');
        PLANET_STRUCTURE.nombre = data?.Nombre;
        PLANET_STRUCTURE.periodoRotacion = data?.PeriodoRotacion;
        PLANET_STRUCTURE.periodoOrbital = data?.PeriodoOrbital;
        PLANET_STRUCTURE.diametro = data?.Diametro;
        PLANET_STRUCTURE.clima = data?.Clima;
        PLANET_STRUCTURE.gravedad = data?.Gravedad;
        PLANET_STRUCTURE.terreno = data?.Terreno;
        PLANET_STRUCTURE.aguaSuperficial = data?.AguaSuperficial;
        PLANET_STRUCTURE.poblacion = data?.Poblacion;
        PLANET_STRUCTURE.residentes = data?.Residentes || [];
        PLANET_STRUCTURE.peliculas = data?.Peliculas || [];
        PLANET_STRUCTURE.url = data?.Url;
        PLANET_STRUCTURE.createdAt = new Date(data.CreatedAtISO);
        PLANET_STRUCTURE.editedAt = new Date(data.EditedAtISO);
        return PLANET_STRUCTURE;
    }
}
