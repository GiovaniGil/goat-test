/* istanbul ignore file */

import MockHelper from 'Arch/crud/MockHelper';
import Router from '@/router';

class MockCrudRequest {
  static getMockList() {
    throw Error('Method getMockList not implemented');
  }

  static list() {
    const { sortBy } = Router.currentRoute.query;
    const { sortDir } = Router.currentRoute.query;
    const { limit = 15 } = Router.currentRoute.query;
    const { page = 1 } = Router.currentRoute.query;
    let orderFunction;
    if (sortDir === 'asc') {
      orderFunction = (a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (b[sortBy] > a[sortBy]) {
          return 1;
        }
        return 0;
      };
    } else {
      orderFunction = (a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        if (b[sortBy] < a[sortBy]) {
          return 1;
        }
        return 0;
      };
    }

    return MockHelper.mockPromiseListRequest(
      this.getMockList().sort(orderFunction).splice(limit * (page - 1), limit),
      this.getMockList().length,
    );
  }

  static get(id) {
    return MockHelper.mockPromiseGetRequest(
      this.getMockList().find((item) => item.id === Number(id)),
    );
  }

  static save() {
    return MockHelper.mockPromiseSaveEditOrRemoveRequest();
  }

  static edit() {
    return MockHelper.mockPromiseSaveEditOrRemoveRequest();
  }

  static remove() {
    return MockHelper.mockPromiseSaveEditOrRemoveRequest();
  }
}

export default MockCrudRequest;
