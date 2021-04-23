/* istanbul ignore file */
class MockHelper {
  static mockPromiseListRequest(resolveData, total = null) {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          content: resolveData,
          total: total || resolveData.length,
        },
      });
      reject();
    });
  }

  static mockPromiseGetRequest(resolveData) {
    return new Promise((resolve, reject) => {
      resolve({
        data: {
          ...resolveData,
        },
      });
      reject();
    });
  }

  static mockPromiseSaveEditOrRemoveRequest() {
    return new Promise((resolve, reject) => {
      resolve();
      reject();
    });
  }

}

export default MockHelper;
