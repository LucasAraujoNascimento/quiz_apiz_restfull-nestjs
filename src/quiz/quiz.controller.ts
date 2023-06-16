import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Quiz } from './schema/quiz.schema';
import { QuizDTO } from './dto/quiz.dto';
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('quiz')
export class QuizController {
    constructor( private readonly quizService: QuizService){}

    @Get()
    async findAll(): Promise<Quiz[]>{
        return await this.quizService.findAll()
    }

    @Get(':id')
    async findOnde(@Param('id') id: string): Promise<Quiz>{
        return await this.quizService.findOne(id)
    }

    @Post('register')
    async register(@Body() newQuiz: QuizDTO): Promise<Quiz>{
        return await this.quizService.register(newQuiz)
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() updateQuiz: QuizDTO): Promise<Quiz>{
        return await this.quizService.update(id, updateQuiz)
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<Quiz>{
        return await this.quizService.delete(id)
    }
}
