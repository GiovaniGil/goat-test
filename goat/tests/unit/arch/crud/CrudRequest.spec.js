import CrudRequest from 'Arch/crud/CrudRequest';
import testCrudRequest from '@test/helpers/testCrudRequest';

describe('CrudRequest.js', () => {
  it('Should throw a error if method baseUrl is not overrided', async () => {
    try {
      CrudRequest.baseUrl();
    } catch (error) {
      await expect(error.message).toEqual('Method baseUrl not implemented');
    }
  });

  it('Should return a promisse on call integration methods', async () => {
    CrudRequest.baseUrl = jest.fn().mockReturnValue('/teste');
    testCrudRequest(CrudRequest);
  });
});
