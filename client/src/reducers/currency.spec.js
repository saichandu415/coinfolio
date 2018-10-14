import currency from './currency';
import { RECEIVE_DETAILS } from './../constants/ActionTypes';

describe('reducers', () => {
  describe('currency', () => {
    const initialState = {
        details: []
    };

    const demoRequest = [
        {
        "currency": "BTC",
        "dayOpen": "7436.82313",
        "dayVolume": "1017039454.62165",
        "dayOpenVolume": "1013499101.75834",
        "weekOpen": "7123.20591",
        "weekVolume": "7856259697.70049",
        "weekOpenVolume": "7139283718.53940",
        "monthOpen": "10769.08245",
        "monthVolume": "41483988434.15605",
        "monthOpenVolume": "50120582053.23234",
        "yearOpen": "1144.85801",
        "yearVolume": "385101925394.80138",
        "yearOpenVolume": "16773015388.14144",
        "close": "6888.45685",
        "high": "24436.29525",
        "highTimestamp": "2018-01-05T00:00:00Z",
        "highExchange": "bithumb",
        "highQuoteCurrency": "KRW",
        "availableSupply": "16957550.0",
        "maxSupply": "21000000.0"
        }
    ];

    it('should provide the initial state', () => {
      expect(currency(undefined, {})).toEqual(initialState)
    });

    it('should return the demoRequest state', () => {
      expect(currency(demoRequest, {RECEIVE_DETAILS})).toEqual(demoRequest)
    });
  })
})
