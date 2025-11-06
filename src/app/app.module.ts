import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from '../task/task.module';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'amaros',
      port: 1433,
      username: 'sa',
      password: 'sa',
      database: 'taskAPI',
      autoLoadEntities: true,
      synchronize: true,
      options: {
        encrypt: false, // Pode ser necessário dependendo da configuração do servidor
        trustServerCertificate: true,
      },
    }),
    TaskModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
