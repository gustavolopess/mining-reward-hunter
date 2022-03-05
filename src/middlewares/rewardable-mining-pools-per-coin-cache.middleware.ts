import memoryCache, { CacheClass } from 'memory-cache';
import { Request, Response, NextFunction } from 'express';
import { CoinsService, RewardablePool } from '../services/coins.service';
import { CoinDto } from '../external/minerstat/minerstat.dto';

const memCache: CacheClass<string, RewardablePool[]> = new memoryCache.Cache();

const REWARDABLE_POOLS_PER_COIN_KEY_PREFIX = 'rewardablePools';
const REWARDABLE_POOLS_PER_COIN_TTL = 1000 * 60 * 30;

export const rewardableMiningPoolsPerCoinCacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { coin } = req.params;
    const cacheKey = `${REWARDABLE_POOLS_PER_COIN_KEY_PREFIX}-${coin}`

    let rewardableMiningPoolsOfCoin = memCache.get(cacheKey);
    if (rewardableMiningPoolsOfCoin == null) {
        rewardableMiningPoolsOfCoin = await CoinsService.listMostRewardableMiningsOfCoin(coin);
        memCache.put(cacheKey, rewardableMiningPoolsOfCoin, REWARDABLE_POOLS_PER_COIN_TTL);  
    }

    res.locals.rewardableMiningPoolsOfCoin = rewardableMiningPoolsOfCoin;
    next();
}