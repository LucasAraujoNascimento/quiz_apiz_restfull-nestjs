import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class HistoricDTO{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsNumber()
    option: number;

    @IsNotEmpty()
    @IsNumber()
    correct_answer: number;

    @IsNotEmpty()
    @IsString()
    response_time: string;
}