# Instrucciones para configurar el proyecto

## Requisitos previos
Asegúrate de tener instalados los siguientes programas:
- Node.js
- MySQL
- NestJS

Si no tienes instalado NestJS, puedes hacerlo ejecutando el siguiente comando:
```bash
npm i -g @nestjs/cli
```
Luego clonar el repositorio con el siguiente comando: 
```bash
git clone https://github.com/iwttn/trip-microservices-test.git
```
Ingresar a la carpeta de `trip-microservices-test`
```bash
cd ./trip-microservices-test
```
Ejecutar el script sql `migrate-db-search.sql`
 
Luego ejecutar cada servicio:
```bash
cd ./search 
npm run dev

cd ./reserve
npm run start:dev

cd ./payment
npm run dev
``` 
Finalmente ejecutar el script sql `migrate-db-reserve.sql`

