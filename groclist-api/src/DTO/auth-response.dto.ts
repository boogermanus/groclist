export class AuthResponse {
    constructor(pToken: string) {
        this.token = pToken;
    }
    public token: string;
}