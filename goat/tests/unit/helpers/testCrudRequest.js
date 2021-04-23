export default function (crudRequestClass) {
  expect(crudRequestClass.list() instanceof Promise).toBeTruthy();
  expect(crudRequestClass.save() instanceof Promise).toBeTruthy();
  expect(crudRequestClass.edit() instanceof Promise).toBeTruthy();
  expect(crudRequestClass.get() instanceof Promise).toBeTruthy();
  expect(crudRequestClass.remove() instanceof Promise).toBeTruthy();
}
