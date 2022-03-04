import axios from "../../../node_modules/axios/index";
import { Builder } from "../../../node_modules/builder-pattern/dist/src/Builder";
import { CoinDto } from "../../../src/external/minerstat/minerstat.dto";
import { MinerstatGateway } from "../../../src/external/minerstat/minerstat.gateway";

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('MinerstatGateway', () => {
    const gateway = new MinerstatGateway();

    describe('#listCoins()', () => {
        describe('when call to Minerstat API is successful', () => {
            let expectedListOfCoins = [ Builder<CoinDto>().build() ];
            
            beforeAll(() => {
                mockedAxios.get = jest.fn().mockResolvedValue({
                    data: expectedListOfCoins
                });
            });

            it('should return a list of coins', async () => {
                const listOfCoins = await gateway.listCoins();
                expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.MINERSTAT_URL}/v2/coins`);
                expect(listOfCoins).toEqual(expectedListOfCoins);
            });
        });

        describe('when call to Minerstat API fail', () => {
            beforeAll(() => {
                mockedAxios.get = jest.fn().mockRejectedValue(new Error('Error'));
            });

            it('should throw an error', async () => {
                await expect(gateway.listCoins()).rejects.toThrow('Error');
            });
        })
    });
});