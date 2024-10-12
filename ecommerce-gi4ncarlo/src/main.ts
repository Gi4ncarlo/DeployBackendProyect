import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggsGlobal } from './middlewares/loggs.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { SeedsModule } from './seeds/seeds.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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





  await app.listen(3000);
}
bootstrap();