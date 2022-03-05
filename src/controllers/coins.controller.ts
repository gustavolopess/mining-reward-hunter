import { MinerstatGateway } from "../external/minerstat/minerstat.gateway";
import express from 'express';

export class CoinsController {
    static minerstatGateway: MinerstatGateway;

    public static async listRewardableCoins(_: express.Request, res: express.Response): Promise<void> {
        try {
            const { rewardableCoins } = res.locals;
            res.json([...rewardableCoins]);
        } catch (err) {
            res.status(500).send(err);
        }   
    }

    public static async listMostRewardableMiningsOfCoin(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { rewardableMiningPoolsOfCoin } = res.locals;
            res.json(rewardableMiningPoolsOfCoin);
        } catch (err) {
            res.status(500).send(err);
        }
    }
}