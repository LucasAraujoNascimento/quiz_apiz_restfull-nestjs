import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RankingDTO{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsNumber()
    score: number;

    @IsNotEmpty()
    @IsString()
    response_time: string;
}