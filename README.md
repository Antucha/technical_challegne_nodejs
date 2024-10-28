

## Descrición

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Instalación de dependencias

```bash
$ yarn install
```

## Compilación y ejecución del proyecto

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Ejecución de test unitario

Para esta prueba técnica solo se ha diseñado una prueba unitaria para el servicio, y es este: 
```bash
src\swapi\application\http-swapi.service.spec.ts
```

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Despliegue
Para desplegar el aplicativo mediante serverless se debe ejecutar
```bash
$ serverless deploy --verbose
```

# Uso del MySwapi Challenge

La url habilitada para pruebas es la siguiente: `https://technicalchallegnenodejs-production.up.railway.app`

## Login
Necesita iniciar sesión en el endpoing `signin` mediante las siguientes credenciales:

```json
{
    "email": "johndoe@example.com",
    "password": "P@ssw0rd123",
    "role": "admin"
}

```

Y al iniciar sesión, obtendrá un token, el cual será necesario para hacer cualquier consulta en el aplicativo.

## Consultas a la API

La documentación de los endpoint las puede obtener en el la ruta de [Swagger](https://technicalchallegnenodejs-production.up.railway.app/api/docs)

