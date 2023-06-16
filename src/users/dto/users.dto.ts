import { IsNotEmpty, IsString, IsEmail, MinLength} from 'class-validator';

export class UserDTO{
    
    _id?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    password: string;
}