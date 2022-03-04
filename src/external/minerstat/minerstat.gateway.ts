import axios from "../../../node_modules/axios/index";
import { CoinDto } from "./minerstat.dto";

export class MinerstatGateway {
    private readonly minerstatUrl = process.env.MINERSTAT_URL;

    public async listCoins(): Promise<CoinDto[]> {
        const response = await axios.get(`${this.minerstatUrl}/v2/coins`);
        return response.data;
    }
}