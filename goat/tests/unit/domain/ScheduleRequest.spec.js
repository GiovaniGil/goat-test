import ScheduleRequest from '@/domain/schedule/ScheduleRequest';
import testCrudRequest from '@test/helpers/testCrudRequest';

describe('ScheduleRequest.js', () => {
  it('Should return a promisse on call integration methods', async () => {
    testCrudRequest(ScheduleRequest);
  });
});
