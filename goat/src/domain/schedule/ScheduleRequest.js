import CrudRequest from 'Arch/crud/CrudRequest';

export default class ScheduleRequest extends CrudRequest {
  static baseUrl() {
    return '/v1/events';
  }
}