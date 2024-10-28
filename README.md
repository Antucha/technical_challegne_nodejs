
# Uso del MySwapi Challenge

La url habilitada para pruebas es la siguiente: `https://technicalchallegnenodejs-production.up.railway.app`

## Descripción

Se utilizó Node JS como base en su framework Nest JS.
 - Se utilizó DynamoDB como base de datos de almacén.
 - Se generó el documento `serverless.yml` para realizar el despliegue mediante serverless framework.
 - Se crearon algunos enpoint personalizados POST y GET para insertar datos en la base de datos y para recuperar esa información.
 - Se integó com SWAPI para hacer consultas sobre los endpoint people y planet.
 - Se redactó esta documentación de uso.
 - Se generó documentación técnica con Swagger.
 - Se realizó test unitario sobre uno de los servicios del aplicativo.


## Consultas a la API

La documentación de los endpoint las puede obtener en el la ruta de [Swagger](https://technicalchallegnenodejs-production.up.railway.app/api/docs) ya que el aplicativo se integró con esa herramienta para generar la documentación de manera automática.

## Login
Necesita iniciar sesión en el endpoing `signin` mediante las siguientes credenciales:

```json
{
    "email": "johndoe@example.com",
    "password": "P@ssw0rd123",
    "role": "admin"
}

```

Y al iniciar sesión, obtendrá un token, el cual será necesario para hacer cualquier consulta en el aplicativo mediante Bearer token.



# Información técnica


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
Para desplegar el aplicativo mediante serverless se debe ejecutar:
```bash
$ serverless deploy --verbose
```

