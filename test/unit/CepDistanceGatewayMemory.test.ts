import CepDistanceGatewayMemory from "../../src/infra/gateway/memory/CepDistanceGatewayMemory";

test("Deve calcular a distância entre dois ceps", function () {
    const cepDistanceGateway = new CepDistanceGatewayMemory();
    const distance = cepDistanceGateway.calculateDistanceInKm("11.111-111", "99.999-999");
    expect(distance).toBe(1000);
});