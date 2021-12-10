export class Exchange {

    constructor(
        public readonly id?: string,
        public readonly targetName?: string,
        public readonly sourceName?: string,
        public readonly type?: string,
        public readonly comission?: string,
        public readonly finalValue?: string,
        public readonly isActive: Boolean = true
    ) { }

    public withId(id: string): Exchange {
        return new Exchange(
            id,
            this.targetName,
            this.sourceName,
            this.type,
            this.comission,
            this.finalValue,
            this.isActive
        );
    }

}