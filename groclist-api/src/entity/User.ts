import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
    constructor(pUsername: string) {
        this.username = pUsername;
        this.isAdmin = false;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public password: string;

    @Column()
    public isAdmin: boolean;

    public async setPassword(pPassword: string) {
        this.password = await bcrypt.hash(pPassword, 8);
    }

    public async validatePassword(pPassword: string) {
        return await bcrypt.compare(pPassword, this.password);
    }
}