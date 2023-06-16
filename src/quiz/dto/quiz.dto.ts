import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuizDTO{

    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsArray()
    options: string[];

    @IsNotEmpty()
    @IsNumber()
    correct_answer: number;
}