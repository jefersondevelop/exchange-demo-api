
export class Profile {
    constructor(
        public readonly address: string,
        public readonly city: string,
        public readonly state: string,
        public readonly currentCountry: string,
        public readonly birthCountry: string,
        public readonly birthdate: string,
        public readonly occupation: string,
        public readonly phoneNumber?: string,
        public readonly username?: string,
        public readonly lastname?: string,
        public readonly dniFront?: string,
        public readonly dniBack?: string,
        public readonly selfie?: string,
        public readonly documentDate?: string,
        public readonly documentType?: string,
        public readonly documentNumber?: string
    ) {
    }

    public withSelfie(selfie: string) {
        return new Profile(
            this.address,
            this.city,
            this.state,
            this.currentCountry,
            this.birthCountry,
            this.birthdate,
            this.occupation,
            this.phoneNumber,
            this.username,
            this.lastname,
            this.dniFront,
            this.dniBack,
            selfie,
            this.documentDate,
            this.documentType,
            this.documentNumber
        )
    }

    public withDnis(dniBack: string | undefined, dniFront: string | undefined) {
        return new Profile(
            this.address,
            this.city,
            this.state,
            this.currentCountry,
            this.birthCountry,
            this.birthdate,
            this.occupation,
            this.phoneNumber,
            this.username,
            this.lastname,
            dniFront,
            dniBack,
            this.selfie,
            this.documentDate,
            this.documentType,
            this.documentNumber
        )
    }
}
