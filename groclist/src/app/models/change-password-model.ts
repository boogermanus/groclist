export class ChangePasswordModel {
    public password: string;
    public newPassword: string;
    public confirmNewPassword: string;

    constructor(password: string, newPassword: string, confirmNewPassword: string) {
        this.password = password;
        this.newPassword = newPassword;
        this.confirmNewPassword = confirmNewPassword;
    }
}
