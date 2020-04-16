export class AuthRequest {
    public username: string;
    public password: string;

    constructor(pUsername: string, pPassword: string) {
        this.username = pUsername;
        this.password = pPassword;
    }
}
