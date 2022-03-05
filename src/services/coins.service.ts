import { CoinDto } from "../external/minerstat/minerstat.dto";
import { MinerstatGateway } from "../external/minerstat/minerstat.gateway";

export interface RewardablePool {
    pool: string;
    pool_reward: number;
    pool_reward_unit: string;
    coin_price: number;
    pool_reward_fiat: number;
}

export class CoinsService {
    static minerstatGateway = new MinerstatGateway();

    public static async listRewardableCoins(): Promise<Set<string>> {
        const pools = await this.minerstatGateway.listRewardableMiningPools();
        return new Set<string>(pools.map(pool => pool.reward_unit));
    }

    public static async listMostRewardableMiningsOfCoin(coin: string): Promise<RewardablePool[]> {
        const rewardableMiningPools = await this.minerstatGateway.listRewardableMiningPools();
        const rewardableMiningPoolsOfCoin = rewardableMiningPools.filter(pool => pool.reward_unit === coin);
        const coinPriceMap = await this.listCoinPrices([coin]);
        const coinPrice = coinPriceMap.get(coin);
        
        const pools: RewardablePool[] = rewardableMiningPoolsOfCoin.map(pool => ({
            pool: pool.coin,
            pool_reward: pool.reward,
            pool_reward_unit: pool.reward_unit,
            coin_price:coinPrice,
            pool_reward_fiat: pool.reward * coinPrice
        }))
            
        return pools.sort((a, b) => a.pool_reward_fiat - b.pool_reward_fiat);
    }

    private static async listCoinPrices(coinList: string[]): Promise<Map<string, number>> {
        const coinPriceMap = new Map<string, number>();
        const coinsData = await this.minerstatGateway.getCoinsData(coinList);
        coinsData.forEach(coinData => {
            coinPriceMap.set(coinData.coin, coinData.price);
        });
        return coinPriceMap;
    }
}