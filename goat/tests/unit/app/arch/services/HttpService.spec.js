import axios from 'axios';
import 'Arch/services/HttpService';

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    interceptors: {
      request: {
        use: jest.fn(),
      },
      response: {
        use: jest.fn(),
      },
    },
  }),
}));

describe('HttpService.js', () => {
  it('Verify axios instance', () => {
    expect(axios.create).toBeCalledTimes(1);
  });
});
