import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schema/quiz.schema';
import { Model } from 'mongoose';
import { QuizDTO } from './dto/quiz.dto';

@Injectable()
export class QuizService {
    constructor(@InjectModel(Quiz.name) private QuizModel: Model<Quiz>){}

    async findAll(): Promise<Quiz[]>{
        return await this.QuizModel.find({})
    }

    async findOne(id: string): Promise<Quiz>{

        try {
            return await this.QuizModel.findById({_id:id})
        } catch (e) {
            throw new NotFoundException(e.message)
        }
    }

    async register(newQuiz: QuizDTO): Promise<Quiz>{

        const question = await this.QuizModel.findOne({question: newQuiz.question})
        if(question) throw new BadRequestException('Questão já existe')

        try {
            const quiz = new this.QuizModel(newQuiz)
            return await quiz.save()
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async update(id: string, updateQuiz: QuizDTO): Promise<Quiz>{

        try {
            await this.QuizModel.findByIdAndUpdate({_id: id}, updateQuiz)
            return await this.QuizModel.findById({_id:id})
        } catch (e) {
            throw new NotFoundException(e.message);
        }
    }

    async delete(id: string): Promise<Quiz>{

        try{
            return await this.QuizModel.findByIdAndDelete(id);
        }catch(e){
            throw new NotFoundException(e.message);
        }
    }
}
