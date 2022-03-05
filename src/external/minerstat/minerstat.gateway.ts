import axios from "../../../node_modules/axios/index";
import { CoinDto } from "./minerstat.dto";

export class MinerstatGateway {
    private readonly minerstatUrl = process.env.MINERSTAT_URL;

    public async listRewardableMiningPools(): Promise<CoinDto[]> {
        const response = await axios.get(`${this.minerstatUrl}/v2/coins`);
        return response.data.filter(coinData => coinData.reward !== -1 && coinData.type === 'pool');
    }

    public async getCoinsData(coinsList: string[]): Promise<CoinDto[]> {
        const response = await axios.get(`${this.minerstatUrl}/v2/coins?list=${coinsList.join(',')}`);
        return response.data;
    }
}