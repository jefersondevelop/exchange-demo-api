export class Account {
    constructor(
        public readonly id?: string,
        public readonly reciptAccount?: string,
        public readonly reciptEmail?: string,
        public readonly reciptName?: string,
        public readonly reciptPhone?: string,
        public readonly userId?: string
    ) {

    }

    public withId(id?: string): Account {
        return new Account(
            id,
            this.reciptAccount,
            this.reciptEmail,
            this.reciptName,
            this.reciptPhone,
            this.userId
        )
    }

}