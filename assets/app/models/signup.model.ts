export class SignUpModel {
    constructor(public username: string, public email: string, public firstName?: string, public lastName?: string, public password?: string, public remember?: boolean) {}
}