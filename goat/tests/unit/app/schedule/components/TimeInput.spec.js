import { mount } from '@vue/test-utils';
import '@test/base-test';
import TimeInput from 'App/schedule/components/TimeInput.vue';
import Vuetify from 'vuetify';

function factory(value = '') {
    const vuetify = new Vuetify();
    const div = document.createElement('div');
    document.body.appendChild(div);
  return mount(TimeInput, {
    vuetify,
    attachTo: div,
    sync: false,
    mocks: {
      $t: () => 'msg error',
    },
    propsData: {
      value,
    },
  });
}

describe('TimeInput.vue', () => {
  it('Is vue instance', () => {
    const wrapper = factory('');
    expect(wrapper).toBeTruthy();
    wrapper.destroy();
  });

  it('Set value', async () => {
    const value = '12:45';
    const wrapper = factory();
    const select = wrapper.find('input');

    select.element.click();
    await wrapper.vm.$nextTick();

    wrapper.vm.getValue = value;
    const inputSearch = wrapper.find('#btnOk');
    inputSearch.trigger('click');

    expect(wrapper.vm.modal).toBeTruthy();
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toEqual(value);
    wrapper.destroy();
  });

});
