import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {VersioningType} from "@nestjs/common";
import {ResponseInterceptor} from "./common/interceptors/response.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
        defaultVersion: '1'
    })
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.listen(process.env.APP_PORT ?? 3000);
}

bootstrap();
