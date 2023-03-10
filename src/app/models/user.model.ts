export class User { 
    constructor(
        private email: string,
        private token: string,
        private localid: string,
        private expirationDate:Date
    ) { }


    get expireDate() { 
        return this.expirationDate;
    }
    get getToken() { 
        return this.token;
    }
}