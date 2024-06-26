export class RegisterModel {
    public username: string;
    public password: string;
    public confirmPassword: string;
    public name: string = ''

    constructor(username: string, password: string, confirmPassword: string) {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
