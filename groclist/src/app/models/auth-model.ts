export class AuthModel {
    public username: string;
    public password: string;

    constructor(email: string, password: string) {
        this.username = email;
        this.password = password;
    }
}
