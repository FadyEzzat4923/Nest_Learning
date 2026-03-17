import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,

      exceptionFactory: (errors) => {
        const formattedErrors: Record<string, string> = {};

        for (const err of errors) {
          if (err.constraints) {
            const firstError = Object.values(err.constraints)[0];
            formattedErrors[err.property] = firstError;
          }
        }

        return new BadRequestException(formattedErrors);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
