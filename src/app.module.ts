import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuizModule } from './quiz/quiz.module';
import { RankingModule } from './ranking/ranking.module';
import { HistoricModule } from './historic/historic.module';


@Module({
  imports: [
    
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UsersModule,
    AuthModule,
    QuizModule,
    RankingModule,
    HistoricModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
