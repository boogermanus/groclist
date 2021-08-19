export class PasswordRequest {
    public username: string;
    public password: string;
    public newPassword: string;

    constructor(pUsername: string, pPassword: string, pNewPassword: string) {
        this.username = pUsername;
        this.password = pPassword;
        this.newPassword = pNewPassword;
    }
}
