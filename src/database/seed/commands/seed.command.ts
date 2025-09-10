import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import {SeedService} from "../seed.service";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seeder = app.get(SeedService);
    await seeder.run();
    await app.close();
}

bootstrap().catch((err) => {
    console.error('Seed failed', err);
    process.exit(1);
});
