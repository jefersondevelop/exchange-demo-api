export enum role {
    ADMIN = 'ADMIN',
    EXCHANGER = 'EXCHANGER'
}

export enum roleStatus {
    ACTIVE = 1,
    EXCHANGER = 2
}


export class Role {

    constructor(
        public readonly id?: string,
        public readonly name?: string,
        public readonly description?: string,
        public readonly isActive: Boolean = true
    ) { }

    public withId(id: string): Role {
        return new Role(
            id,
            this.name,
            this.description,
            this.isActive
        );
    }

}