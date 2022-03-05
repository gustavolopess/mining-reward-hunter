import axios from "../../../node_modules/axios/index";
import { Builder } from "../../../node_modules/builder-pattern/dist/src/Builder";
import { CoinDto } from "../../../src/external/minerstat/minerstat.dto";
import { MinerstatGateway } from "../../../src/external/minerstat/minerstat.gateway";

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('MinerstatGateway', () => {
    const gateway = new MinerstatGateway();

    describe('#listRewardableMiningPools()', () => {
        describe('when call to Minerstat API is successful', () => {
            describe('and the response contains one or more pool data', () => {
                const apiResponse = [ 
                    Builder<CoinDto>().type('pool').build(),
                    Builder<CoinDto>().type('coin').build()
                ];

                const expectedListOfPools = [apiResponse[0]];
            
                beforeAll(() => {
                    mockedAxios.get = jest.fn().mockResolvedValue({
                        data: apiResponse
                    });
                });
    
                it('should return a list containing data of mining pools', async () => {
                    const listOfCoins = await gateway.listRewardableMiningPools();
                    expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.MINERSTAT_URL}/v2/coins`);
                    expect(listOfCoins).toEqual(expectedListOfPools);
                });
            });

            describe('and the response does not contain any pool data', () => {
                const apiResponse = [ 
                    Builder<CoinDto>().type('coin').build(),
                    Builder<CoinDto>().type('coin').build()
                ];

                const expectedListOfPools = [];

                beforeAll(() => {
                    mockedAxios.get = jest.fn().mockResolvedValue({
                        data: apiResponse
                    });
                });

                it('should return an empty list', async () => {
                    const listOfCoins = await gateway.listRewardableMiningPools();
                    expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.MINERSTAT_URL}/v2/coins`);
                    expect(listOfCoins).toEqual(expectedListOfPools);
                });
            });

        });

        describe('when call to Minerstat API fail', () => {
            beforeAll(() => {
                mockedAxios.get = jest.fn().mockRejectedValue(new Error('Error'));
            });

            it('should throw an error', async () => {
                await expect(gateway.listRewardableMiningPools()).rejects.toThrow('Error');
            });
        })
    });
});