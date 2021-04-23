<template>
   <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="getValue"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            prepend-icon="mdi-clock-time-four-outline"
            v-model="getValue"
            outlined      
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="rules"
            clearable
          />
        </template>
        <v-time-picker
          v-if="modal"
          v-model="getValue"
          full-width
          format="24hr"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            id="btnOk"
            text
            color="primary"
            @click="$refs.dialog.save(getValue)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
</template>

<script>
  export default {
    name: 'TimeInput',
    data: () =>  ({
      time: null,
      modal: false,
    }),
    props: {
      value: {
        type: String,
        required: true,
      },
      rules: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    computed: {
      getValue: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        },
      },
    },   
  }
</script>