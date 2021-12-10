interface EmailOptions {
    to: string,
    subject: string,
    template: string,
    context?: any
}

export interface EmailService {
    sendEmail(options: EmailOptions): Promise<{ message?: string }>;
}
