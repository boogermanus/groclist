export class AuthRequest {
    public email: string;
    public password: string;

    constructor(pEmail: string, pPassword: string) {
        this.email = pEmail;
        this.password = pPassword;
    }
}