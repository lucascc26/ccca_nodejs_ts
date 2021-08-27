export default class Coupon {
    code: string;
    percentage: number;
    expirationDate: Date;
    
    constructor(code: string, percentage: number, expirationDate: Date) {
        this.code = code;
        this.percentage = percentage;
        this.expirationDate = expirationDate;
    }

    public isExpired(currentDate: Date): boolean {
        return currentDate > this.expirationDate;
    }
}