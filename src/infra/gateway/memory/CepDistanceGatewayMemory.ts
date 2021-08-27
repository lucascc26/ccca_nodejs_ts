import CepDistanceGateway from "../../../domain/gateway/CepDistanceGateway";

export default class CepDistanceGatewayMemory implements CepDistanceGateway {
    calculateDistanceInKm(cepFrom: string, cepTo: string): number {
        return 1000;
    }
}