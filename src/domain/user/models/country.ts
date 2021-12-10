export class Country {

    constructor(
        private readonly id?: string,
        private readonly name?: string,
        private readonly shortname?: string,
        private readonly logo?: string,
        private readonly isActive: Boolean = true
    ) { }

    public withId(id: string): Country {
        return new Country(
            id,
            this.name,
            this.shortname,
            this.logo,
            this.isActive
        );
    }

}