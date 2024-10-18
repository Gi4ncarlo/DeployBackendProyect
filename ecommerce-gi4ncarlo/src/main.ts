import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggsGlobal } from './middlewares/loggs.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { SeedsModule } from './seeds/seeds.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeed } from './seeds/users/users.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggsGlobal);

  //SWAGGER
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Nest PT21A")
  .setDescription("Demo Para testear proyecto Backend")
  .setVersion("1.11")
  .addBearerAuth()
  .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("docs", app, document)

  // Run seeds
  const categoriesSeed = app.select(SeedsModule).get(CategoriesSeed);
  await categoriesSeed.seed();
  console.log("La inserción de categorías ha terminado.");

  const productsSeed = app.select(SeedsModule).get(ProductsSeed);
  await productsSeed.seed();
  console.log("La inserción de productos ha terminado.");

  const usersSeed = app.select(SeedsModule).get(UsersSeed);
  await usersSeed.seed();
  console.log("La inserción de Usuarios ha terminado.");


  console.log('CONECTADO A LA BASE DE DATOS:', process.env.DB_NAME);


  await app.listen(3000);
}
bootstrap();