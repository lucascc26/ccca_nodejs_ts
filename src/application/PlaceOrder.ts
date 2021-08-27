import CouponRepository from "../domain/repository/CouponRepository";
import Order from "../domain/entity/Order";
import CepDistanceGatewayMemory from "../infra/gateway/memory/CepDistanceGatewayMemory";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import RepositoryFactory from "../domain/factory/RepositoryFactory";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import FreightCalculator from "../domain/service/FreightCalculator";

export default class PlaceOrder {
    cepDistanceGateway: CepDistanceGatewayMemory;
    itemRepository: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;

    constructor(repositoryFactory: RepositoryFactory, cepDistanceGateway: CepDistanceGatewayMemory) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.cepDistanceGateway = cepDistanceGateway;
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.cepDistanceGateway.calculateDistanceInKm(input.zipcode, "99.999-99");

        for (const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.id);
            if (!item)
                throw new Error("Item not found");

            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }

        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon)
                order.addCoupon(coupon);
        }

        await this.orderRepository.save(order);

        return new PlaceOrderOutput({
            freight: order.freight,
            code: order.code.value,
            total: order.getTotal()
        });
    }
}