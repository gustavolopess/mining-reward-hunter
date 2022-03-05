import memoryCache, { CacheClass } from 'memory-cache';
import { Request, Response, NextFunction } from 'express';
import { CoinsService } from '../services/coins.service';

const memCache: CacheClass<string, Set<string>> = new memoryCache.Cache();

const REWARDABLE_COINS_CACHE_KEY = 'rewardableCoins';
const REWARDABLE_COINS_TTL = 1000 * 60 * 60;

export const rewardableCoinsCacheMiddleware = async (_: Request, res: Response, next: NextFunction) => {
    let rewardableCoins = memCache.get(REWARDABLE_COINS_CACHE_KEY);
    if (rewardableCoins == null) {
        rewardableCoins = await CoinsService.listRewardableCoins();
        memCache.put(REWARDABLE_COINS_CACHE_KEY, rewardableCoins, REWARDABLE_COINS_TTL);  
    }

    res.locals.rewardableCoins = rewardableCoins;
    next();
}