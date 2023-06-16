import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Historic } from './schema/historic.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HistoricDTO } from './dto/historic.dto';

@Injectable()
export class HistoricService {
    constructor(@InjectModel(Historic.name) private historicModel: Model<Historic>){}

    async findAll(): Promise<Historic[]>{
        return await this.historicModel.find({})
    }

    async findOne(id: string): Promise<Historic>{

        try {
            return await this.historicModel.findById({_id:id})
        } catch (e) {
            throw new NotFoundException(e.message)
        }
    }

    async register(newHistoric: HistoricDTO): Promise<Historic>{

        try {
            const historic = new this.historicModel(newHistoric)
            return await historic.save()
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async update(id: string, updateHistoric: HistoricDTO): Promise<Historic>{

        try {
            await this.historicModel.findByIdAndUpdate({_id: id}, updateHistoric)
            return await this.historicModel.findById({_id:id})
        } catch (e) {
            throw new NotFoundException(e.message);
        }
    }

    async delete(id: string): Promise<Historic>{

        try{
            return await this.historicModel.findByIdAndDelete(id);
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }
}
