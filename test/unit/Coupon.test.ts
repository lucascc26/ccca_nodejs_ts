import Coupon from "../../src/domain/entity/Coupon";

test("Deve retornar true se o cupom estiver expirado", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const coupon = new Coupon("VALE20", 20, yesterday);

    const isExpired = coupon.isExpired(new Date());

    expect(isExpired).toBe(true);
});

test("Deve retornar true se o cupom não estiver expirado", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const coupon = new Coupon("VALIA20", 20, tomorrow);

    const isExpired = coupon.isExpired(new Date());

    expect(isExpired).toBe(false);
});