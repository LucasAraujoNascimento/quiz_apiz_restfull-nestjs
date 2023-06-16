import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { Historic } from './schema/historic.schema';
import { HistoricDTO } from './dto/historic.dto';
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('historic')
export class HistoricController {
    constructor( private readonly historicService: HistoricService ){}

    @Get()
    async findAll(): Promise<Historic[]>{
        return await this.historicService.findAll()
    }

    @Get(':id')
    async findOnde(@Param('id') id: string): Promise<Historic>{
        return await this.historicService.findOne(id)
    }

    @Post('register')
    async register(@Body() newHistoric: HistoricDTO): Promise<Historic>{
        return await this.historicService.register(newHistoric)
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateHistoric: HistoricDTO): Promise<Historic>{
        return await this.historicService.update(id, updateHistoric)
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<Historic>{
        return await this.historicService.delete(id)
    }
}
