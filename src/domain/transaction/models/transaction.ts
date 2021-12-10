import { Account } from "../../account/models/account";

export enum TransactionStatus {
    PENNDING = 'PENDING'
}


export class Transaction {

    constructor(
        public readonly id?: string,
        public readonly targetCountry?: string,
        public readonly comission?: Number,
        public readonly source?: string,
        public readonly target?: string,
        public readonly valueSent?: Number,
        public readonly valueToSent?: Number,
        public readonly date?: Date,
        public readonly status?: TransactionStatus,
        public readonly account?: Account
    ) {

    }

    public withId(id: string): Transaction {

        return new Transaction(
            id,
            this.targetCountry,
            this.comission,
            this.source,
            this.target,
            this.valueSent,
            this.valueToSent,
            this.date,
            this.status,
            this.account
        )

    }

}