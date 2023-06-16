import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { Ranking } from './schema/ranking.schema';
import { RankingDTO } from './dto/ranking.dto';
import { AuthGuard } from '@nestjs/passport'


@Controller('ranking')
export class RankingController {

    constructor(private readonly rankingService: RankingService){}

    @Get()
    async findAll(): Promise<Ranking[]>{
        return await this.rankingService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Ranking>{
        return await this.rankingService.findOnde(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('register')
    async register(@Body() newRanking: RankingDTO): Promise<Ranking>{
        return await this.rankingService.register(newRanking)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateRanking: RankingDTO): Promise<Ranking>{
        return await this.rankingService.update(id, updateRanking)
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<Ranking>{
        return this.rankingService.delete(id);
    }
}
