import express from 'express';
import { CoinsController } from '../controllers/coins.controller';
import { rewardableCoinsCacheMiddleware } from '../middlewares/rewardable-coins-cache.middleware';
import { rewardableMiningPoolsPerCoinCacheMiddleware } from '../middlewares/rewardable-mining-pools-per-coin-cache.middleware';

const CoinsRouter = express.Router();

CoinsRouter.get('/rewardable', rewardableCoinsCacheMiddleware, CoinsController.listRewardableCoins)
CoinsRouter.get('/mining-pools/:coin', rewardableMiningPoolsPerCoinCacheMiddleware, CoinsController.listMostRewardableMiningsOfCoin)

export default CoinsRouter;