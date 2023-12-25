import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as process from 'process';


var port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('Blogs API')
    .setDescription('The is a blog API description')
    .setVersion('1.0')
    .addTag('blogs')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);
}

bootstrap().then(() => console.log(
  'Server started on port ' + port + '. check http://localhost:' + port + '/docs for documentation'),
);
