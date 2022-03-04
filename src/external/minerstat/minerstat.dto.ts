export interface CoinDto {
    id: string;
    coin: string;
    name: string;
    type: string;
    algorithm: string;
    network_hashrate: number;
    difficulty: number;
    reward: number;
    reward_unit: string;
    reward_block: number;
    price: number;
    volume: number;
    updated: number;
}