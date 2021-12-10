import { Account } from "../../../domain/account/models/account";
import { AccountRepository } from "../../../domain/account/ports/account_repository";
import { AccountService } from "../../../domain/account/ports/account_service";

export class BasicAccountService implements AccountService {

    constructor(private readonly accounRepository: AccountRepository) {
    }
    save(account: Account): Promise<Account | undefined> {
        return this.accounRepository.save(account);
    }
    findByAccountNumberWithUser(accountNumber: string | undefined, userId: string | undefined): Promise<Account | undefined> {
        return this.accounRepository.findByAccountNumberWithUser(accountNumber, userId)
    }
    existsByAccountNumber(accountNumber: string | undefined): Promise<Boolean | undefined> {
        return this.existsByAccountNumber(accountNumber)
    }

}
