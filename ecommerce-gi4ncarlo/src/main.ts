import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggsGlobal } from './middlewares/loggs.middleware';
import { CategoriesSeed } from './seeds/categories/categories.seed';
import { ProductsSeed } from './seeds/products/products.seed';
import { SeedsModule } from './seeds/seeds.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggsGlobal);

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