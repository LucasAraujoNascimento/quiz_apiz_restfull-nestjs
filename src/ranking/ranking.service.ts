import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ranking } from './schema/ranking.schema';
import { Model } from 'mongoose';
import { RankingDTO } from './dto/ranking.dto';

@Injectable()
export class RankingService {
    constructor(@InjectModel(Ranking.name) private rankingMode: Model<Ranking>){}

    async findAll(): Promise<Ranking[]>{
        return await this.rankingMode.find()
    }

    async findOnde(id: string): Promise<Ranking>{

        try {
            return await this.rankingMode.findById({_id:id})
        } catch (e) {
            throw new NotFoundException(e.message)
        }
    }

    async register(newRanking: RankingDTO): Promise<Ranking>{
        
        try {
            const ranking = new this.rankingMode(newRanking)
            return await ranking.save()
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async update(id: string, updateRanking: RankingDTO): Promise<Ranking>{

        try {
            await this.rankingMode.findByIdAndUpdate({_id:id}, updateRanking)
            return await this.rankingMode.findById({_id:id})
        } catch (e) {
            throw new NotFoundException(e.message)
        }
    }

    async delete(id: string): Promise<Ranking>{
        
        try{
            return await this.rankingMode.findByIdAndDelete(id)
        }catch(e){
            throw new NotFoundException(e.message)
        }
    }
}
