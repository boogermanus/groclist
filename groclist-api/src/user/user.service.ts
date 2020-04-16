import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository } from 'typeorm';
import {User} from '../entity/User';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findOne(pUserName: string): Promise<User>{
        const users = await this.userRepository.find({where: {username: pUserName}});

        if (users.length > 0)
            return new Promise<User>(resolve => resolve(users[0]));
        else
            return new Promise<User>(reject => reject(null));
    }

    public async save(pUser: User) {
        await this.userRepository.save(pUser);
    }
}