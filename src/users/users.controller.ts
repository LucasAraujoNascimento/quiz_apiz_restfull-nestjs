import { Controller, Delete, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schema/users.schema';
import { UserDTO } from './dto/users.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(): Promise<User[]>{
        return await this.userService.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User>{
        return await this.userService.findOne(id)
    }

    @Post('register')
    async register(@Body() newUser: UserDTO): Promise<User>{
        return await this.userService.register(newUser)
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('update/:id')
    async update(@Param('id') id:string, @Body()newUpdate: UpdateUserDTO): Promise<User>{
        return await this.userService.update(id, newUpdate)
    }   

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    async delete(@Param('id') id:string): Promise<User>{
        return await this.userService.delete(id)
    }

}
