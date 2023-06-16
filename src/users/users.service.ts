import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schema/users.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async findAll(): Promise<User[]>{
        return await this.userModel.find({}, '_id username email created_at');
    }

    async findOne(id: string): Promise<User>{

        try{
            return await this.userModel.findById({_id:id}, '_id username email created_at')
        }catch(e){
            throw new NotFoundException('User não encontrado!')
        }
    }

    async findEmail(newUser: string): Promise<User>{

        const existUser = await this.userModel.findOne({email: newUser});
        if(!existUser){
            throw new NotFoundException('Email e/ou senha inválidos');
        }
        return existUser

        
    }

    async register(newUser: UserDTO): Promise<User>{

        const existUser = await this.userModel.findOne({email: newUser.email});

        if(existUser)
        throw new BadRequestException('Email já existe')
        
        const hashPass = bcrypt.hashSync(newUser.password, 10)
        newUser.password = hashPass

        try {
            const user = new this.userModel(newUser)
            return await user.save()
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    
    }

    async update(id: string, updateUser: UpdateUserDTO): Promise<User>{

        try {
            await this.userModel.findByIdAndUpdate({_id:id}, updateUser)
            return await this.userModel.findById({_id:id}, '_id username email created_at')
        } catch (e) {
            throw new NotFoundException(e.message);
        }
        
    }

    async delete(id: string): Promise<User>{

        try {
            return await this.userModel.findByIdAndDelete(id)
        } catch (e) {
            throw new NotFoundException(e.message);
        }
        
    }
}
