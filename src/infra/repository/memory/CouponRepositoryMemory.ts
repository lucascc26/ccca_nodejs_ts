import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
    private coupons: Coupon[];

    constructor() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.coupons = [
            new Coupon("VALE20", 20, tomorrow),
            new Coupon("VALIA20", 20, yesterday)
        ];
    }

    getByCode(code: string): Promise<Coupon | undefined> {
        return Promise.resolve(this.coupons.find(coupon => coupon.code === code));
    }

}