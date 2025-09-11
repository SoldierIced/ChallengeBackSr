import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {comparePassword, hashPassword} from "../users/users.constant";
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/entities/user.entity";

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async sigIn(email: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOneWithRelations({email: email},['user.password'])
        if (!user) {
            throw new UnauthorizedException();
        }
        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) throw new UnauthorizedException();
        //TODO agregar sistema de validacion de permisos para variables
        const payload = {
            sub: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };

    }

    async me(userId: string): Promise<Partial<User>> {
        const user = await this.usersService.findOneWithRelations({id: userId});
        console.log(user);
        if (!user) throw new UnauthorizedException();

        const {password, ...result} = user;
        return result;
    }
}
