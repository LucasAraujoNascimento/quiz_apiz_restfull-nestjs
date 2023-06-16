import { Module } from '@nestjs/common';
import { HistoricController } from './historic.controller';
import { HistoricService } from './historic.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Historic, HistoricSchema } from './schema/historic.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Historic.name, schema: HistoricSchema}])],
  controllers: [HistoricController],
  providers: [HistoricService]
})
export class HistoricModule {}
