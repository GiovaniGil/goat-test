import '@test/base-test';
import Vuetify from 'vuetify';
import { mount } from '@vue/test-utils';
import Schedule from 'App/schedule/Schedule';
import ScheduleRequest from 'Domain/schedule/ScheduleRequest';

jest.useFakeTimers();
jest.mock('Domain/schedule/ScheduleRequest', () => ({
  save: jest.fn().mockResolvedValue({ data: {} }),
  list: jest.fn().mockResolvedValue({
    data: {
      content: [
        {
          start: '2021-04-22 08:00',
          end: '2021-04-22 10:00',
          title: 'Nightclub',
          content: '08:00-10:00',
          class: 'event',
        },
        {
          start: '2021-04-22 10:00',
          end: '2021-04-22 12:00',
          title: 'Piano lesson',
          content: 'Testes',
          class: 'event',
        },
      ],
    },
  }),
}));

function clearMocks() {
  ScheduleRequest.list.mockClear();
  ScheduleRequest.save.mockClear();
}

function factory($loading) {
  const vuetify = new Vuetify();
  const div = document.createElement('div');
  document.body.appendChild(div);
  return mount(Schedule, {
    vuetify,
    attachTo: div,
    sync: false,
    stubs: ['time-input', 'vue-cal'],
    mocks: {
      $loading,
      $route: { params: {} },
    },
  });
}

describe('Schedule.vue', () => {
  let $loading;
  const hide = jest.fn();
  const show = jest.fn().mockReturnValue({ hide });

  afterEach(() => {
    clearMocks();
  });

  beforeEach(() => {
    $loading = {
      show,
      hide
    };
    show.mockClear();
    hide.mockClear();
  });

  it('It is a Vue Instance', () => {
    const wrapper = factory($loading);
    expect(wrapper).toBeTruthy();
    wrapper.destroy();
  });

 it('Verifying if it is comparing time correctly', async () => {
    const wrapper = factory($loading);
    wrapper.vm.payload = {
      strStartTime: '02:00',
      strEndTime: '',
    };
    await wrapper.vm.$nextTick();
    const cptdMinTimeRule = wrapper.vm.cptdMinTimeRule;
    expect(cptdMinTimeRule('03:00')).toEqual(true);
    expect(cptdMinTimeRule('01:00')).toEqual(`O horário deve ser maior que ${wrapper.vm.payload.strStartTime}`);
    wrapper.destroy();
  });

  it('Verifying if it is comparing time correctly', async () => {
    const wrapper = factory($loading);
    wrapper.vm.cptdDateFormatted = '2021-03-03';
    expect(wrapper.vm.payload.dateFrom).toEqual('03/03/2021');
    wrapper.destroy();
  });

  it('Verifying if require rule it is working', async () => {
    const wrapper = factory($loading);
    const cptdRequiredRule = wrapper.vm.cptdRequiredRule;
    expect(cptdRequiredRule(true)).toEqual(true);
    expect(cptdRequiredRule(0)).toEqual(true);
    wrapper.destroy();
  });

  it('Verifying if it is clearing form correctly', async () => {
    const wrapper = factory($loading);
    const spyMtdClearForm = jest.spyOn(wrapper.vm, 'mtdClearForm');
    wrapper.vm.payload = {
      strName: 'Teste',
      textDescription: 'Teste',
      dateFrom: '2020-01-01',
      strStartTime: '02:00',
      strEndTime: '03:00',
      intWeeklyRecurrence: 1,
    };
    await wrapper.vm.$nextTick();
    const btnCancelar = wrapper.find('#btnCancelar');
    btnCancelar.trigger('click');
    expect(spyMtdClearForm).toBeCalled();
    expect(wrapper.vm.payload.strName).toBeFalsy();
    wrapper.destroy();
  });

  it('Verifying if it is saving', async () => {
    ScheduleRequest.list.mockResolvedValue({
      data: {
        content: [
          {
            start: '2021-04-22 08:00',
            end: '2021-04-22 10:00',
            title: 'Nightclub',
            content: '08:00-10:00',
            class: 'event',
          },
          {
            start: '2021-04-22 08:00',
            end: '2021-04-22 10:00',
            title: 'Nightclub',
            content: '08:00-10:00',
            class: 'event',
          },
          {
            start: '2021-04-22 10:00',
            end: '2021-04-22 12:00',
            title: 'Piano lesson',
            content: 'Testes',
            class: 'event',
          },
        ],
      },
    });
    const wrapper = factory($loading);
    const spyMtdSave = jest.spyOn(wrapper.vm, 'mtdSave');
    const btnSalvar = wrapper.find('#btnSalvar');
    
    wrapper.vm.payload = {
      strName: 'Teste',
      textDescription: 'Teste',
      dateFrom: '2020-01-01',
      strStartTime: '02:00',
      strEndTime: '03:00',
      intWeeklyRecurrence: 1,
    };
    await wrapper.vm.$nextTick();
    btnSalvar.trigger('click');
    await wrapper.vm.$nextTick();

    expect(spyMtdSave).toBeCalled();
    expect(hide).toBeCalled();
    expect(wrapper.vm.events.length).toBe(3);
    wrapper.destroy();
  });
  
  it('Verifying if it is throwing error when saving', async () => {
    ScheduleRequest.save.mockRejectedValue('Erro');
    const wrapper = factory($loading);
    const spyMtdSave = jest.spyOn(wrapper.vm, 'mtdSave');
    const btnSalvar = wrapper.find('#btnSalvar');

    wrapper.vm.$refs.form.validate = () => true;
    btnSalvar.trigger('click');
    await wrapper.vm.$nextTick();

    expect(spyMtdSave).toBeCalled();
    expect(hide).toBeCalled();
    expect(wrapper.vm.error).toEqual('Erro');
    wrapper.destroy();
  });  

  it('Verifying if it is returning when form is invalid', async () => {
    const wrapper = factory($loading);
    const spyMtdSave = jest.spyOn(wrapper.vm, 'mtdSave');
    const btnSalvar = wrapper.find('#btnSalvar');

    wrapper.vm.$refs.form.validate = () => false;
    btnSalvar.trigger('click');
    await wrapper.vm.$nextTick();

    expect(spyMtdSave).toBeCalled();
    expect(ScheduleRequest.save).toBeCalledTimes(0);
    wrapper.destroy();
  });  

  it('Verifying if it is throwing error when saving', async () => {
    ScheduleRequest.list.mockRejectedValue('Erro');
    const wrapper = await factory($loading);
    await wrapper.vm.mtdGetEvents;
    expect(wrapper.vm.error).toEqual('Erro');
    wrapper.destroy();
  });  


});
