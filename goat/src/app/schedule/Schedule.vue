<template>
    <v-form
      ref="form"
      v-model="formValid"
      @submit.prevent="mtdSave()"
    >
      <v-container>
        <v-alert
          v-model="alert"
          close-text="Fechar"
          color="#574b90"
          dark
          dismissible
        >
          Criação de atividade esportiva
        </v-alert>
        <v-alert
          v-if="error"
          close-text="Fechar"
          color="red lighten-2"
          dark
          dismissible
        >
          {{ error }}
        </v-alert>        
        <v-layout column>
          <v-row>
            <v-col cols="12" sm="12">
            <span>Evento</span>
              <v-text-field
                v-model="payload.strName"
                outlined
                :rules="[cptdRequiredRule]"
                clearable
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <span>Descrição</span>
              <v-textarea
                v-model="payload.textDescription"
                outlined
                :rules="[cptdRequiredRule]"
                clearable
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-row>
                <v-col cols="12" sm="12">
                  <span>De:</span>

                    <v-menu
                      ref="menuInitialDate"
                      v-model="menuInitialDate"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="cptdDateFormatted"
                          label="Data inicial"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          outlined
                          v-on="on"
                          :rules="[cptdRequiredRule]"
                          clearable
                        />
                      </template>
                      <v-date-picker
                        v-model="payload.dateFrom"
                        scrollable
                        @input="menuInitialDate = false"
                      />
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <span>Início</span>
                      <time-input v-model="payload.strStartTime" :rules="[cptdRequiredRule]"/>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <span>Término</span>
                      <time-input 
                        v-model="payload.strEndTime" 
                        :rules="[ cptdMinTimeRule, cptdRequiredRule ]"
                        clearable
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="3">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-radio-group v-model="boolRecurrent" @change="mtdResetInterval()">
                    <v-radio
                      label='Não se repete'
                      :value="false"
                    />
                    <v-radio
                      label="Repetir"
                      :value="true"
                    />
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="12">
                  <span>Intervalo de semanas: {{ payload.intWeeklyRecurrence }}</span>
                  <v-slider
                    v-model="payload.intWeeklyRecurrence"
                    max="10"
                    min="0"
                    :disabled="!boolRecurrent"
                    :loader-height="5"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>                   
        </v-layout>
        <v-card class="elevation-0">
          <v-divider />
          <div
            class="pa-4 d-flex justify-end align-center"
          >
            <div>
              <v-btn
                id="btnCancelar"
                color="#6A6E7B"
                outlined
                @click="mtdClearForm"
              >
                CANCELAR
              </v-btn>
            </div>
            <div
              class="ml-2"
            >
              <v-btn
                id="btnSalvar"
                class="white--text"
                type="submit"
                color="#786fa6"
                :loading="loadingForm"
              >
                SALVAR
              </v-btn>
            </div>
          </div>
        </v-card>
        <vue-cal
          xsmall
          show-week-numbers
          :time-from="from"
          :time-to="to"
          :disable-views="['years', 'year']"
          :special-hours="specialHours"
          :events="events"
          locale="pt-br"
          startWeekOnSunday
          class="mb-8"
        />
      </v-container>
    </v-form>
</template>

<script>

import TimeInput from 'App/schedule/components/TimeInput.vue';
import Moment from 'moment';
import VueCal from 'vue-cal';
import ScheduleRequest from '@/domain/schedule/ScheduleRequest';

export default {
  name: 'Schedule',
  components: { TimeInput, VueCal },
  data: () => ({
      menuInitialDate: false,
      alert: true,
      loadingForm: false,
      formValid: false,
      payload: {
        strName: '',
        textDescription: '',
        dateFrom: '',
        strStartTime: '',
        strEndTime: '',
        intWeeklyRecurrence: 0,
      },
      boolRecurrent: false,
      events: [],
      from: 0 * 60,
      to: 23 * 60,
      dailyHours: {},
      specialHours: {},
      error: '',
  }),
  created () {

    this.mtdGetEvents();
    this.dailyHours = { from: this.from, to: this.to, class: 'business-hours' };
    this.specialHours = {
        1: this.dailyHours,
        2: this.dailyHours,
        3: this.dailyHours,
        4: this.dailyHours,
        5: this.dailyHours,
        6: this.dailyHours,
        7: this.dailyHours,
      };
  },
  methods: {
    mtdGetEvents() {
      const loader = this.$loading.show();
      ScheduleRequest
        .list()
        .then(({ data }) => {
          this.events = data.content;
        })
        .catch((response) => {
          this.error = response;
        })
        .finally(() => {
          loader.hide();
        });    
    },
    mtdResetInterval() {
      this.payload.intWeeklyRecurrence = 0;
    },
    mtdFormatDate(date) {
      if (!date) {
        return null;
      }
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    mtdValidateForm() {
      return this.$refs.form.validate();
    },
    mtdSave() {               

      if (!this.mtdValidateForm()) {
        return;
      }
      const loader = this.$loading.show();        

      ScheduleRequest
        .save(this.payload)
        .then(() => {
          this.mtdGetEvents();
          this.mtdClearForm();
          this.$toasted.success('Registro salvo com sucesso!!!', {position: "top-center", duration : 5000}); 
        })
        .catch((response) => {
          this.error = response;
        })
        .finally(() => {
          loader.hide();
        });

    },
    mtdClearForm() {
      this.$refs.form.reset();
      this.boolRecurrent = false;
      this.payload.intWeeklyRecurrence = 0;
    }
  },
  computed: {
    cptdMinTimeRule() {
      return (value) => {
        const comparison = this.payload.strStartTime;
        const timeValue = Moment(value, 'HH:mm');
        const minTimeValue = Moment(comparison, 'HH:mm');
        if (minTimeValue.isAfter(timeValue)) {
          return `O horário deve ser maior que ${comparison}`;
        }
        return true;
      };
    },
    cptdDateFormatted: {
      get() {
        return this.mtdFormatDate(this.payload.dateFrom);
      },
      set(value) {
        this.payload.dateFrom = this.mtdFormatDate(value);
      },
    },
    cptdRequiredRule() {
      return (v) => {
        if (typeof v === 'boolean') {
          return true;
        }
        if (typeof v === 'number' && v === 0) {
          return true;
        }

        return !!v || 'Campo obrigatório';
      };
    },
  },
}
</script>
