import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
        ){}

    async login(user){
        const payload = { sub: user.id, username: user.username, admin:user.admin }

        return {
            token: this.jwtService.sign(payload)
        }
    }

    async validateUser(email: string, password:string){
        let user: UserDTO
        try {
            user = await this.userService.findEmail(email)
        } catch (e) {
            return null
        }

        const isPasswordValid = compareSync(password, user.password);

        if(!isPasswordValid) return null;

        return user;
    }
}
