export default interface CepDistanceGateway {
    calculateDistanceInKm(cepFrom: string, cepTo: string): number;
}