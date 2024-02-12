<script setup lang="ts">
import { ref } from 'vue';

import { paramStore } from '@/store/emws'

const parameterStore = paramStore()

defineProps<{ msg: string }>();

const experiments = ref(['Scattering Experiment', 'Transmission Experiment', 'Faraday Roration'])

const modes = [1, 2, 3, 4, 5, 6, 7, 8]
const coeffecients = [1, 0, 0, 0]


</script>

<template>
<v-container class="bg-surface-variant">
    <v-row no-gutters>
    <v-col >
      Please Input Parameters for the Signal
        <v-form @submit.prevent>
          <v-text-field
            v-model="parameterStore.k1"
            label="k1"
            type="number"
            >
          </v-text-field>
          <v-text-field
            v-model="parameterStore.k2"
            label="k2"
            type="number">
          </v-text-field>
          <v-text-field
            v-model="parameterStore.frequency"
            label="w"
            type="number">
          </v-text-field>
          <v-btn  block class="mt-2">Calculate Modes</v-btn>
      </v-form>
    </v-col > 
    <v-col>
      Please Select Your Modes
      <v-row>
        <v-col>
            <v-checkbox v-for="(mode, index) in modes.slice(0, 4)" :key="index"
              v-model="parameterStore.selectedModes"
              :label="`${mode}`"
              :value="mode"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox v-for="(mode, index) in modes.slice(4, 8)" :key="index"
              v-model="parameterStore.selectedModes"
              :label="`${mode}`"
              :value="mode"
            ></v-checkbox>
          </v-col>
      </v-row>
    </v-col>
    <v-col>
      Please Select Coeffecients
      <v-row>
        <v-col>
          <v-text-field v-for="(coeff, index) in coeffecients.slice(0, 2)" :key="index"
              v-model="parameterStore.coeffecients[index]"
              :label="`C ${index+1}`"
              type="number"
              >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-for="(coeff, index) in coeffecients.slice(2,4)" :key="index"
              v-model="parameterStore.coeffecients[index+2]"
              :label="`C ${index + 3}`"
              type="number"
              >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        Please Select Which Experiment to Run
        <v-combobox
          label="Options"
          :items=experiments
          v-model="parameterStore.experiment"
        ></v-combobox>
      </v-row>
      <v-btn @click="parameterStore.checkInputs()" block class="mt-2">Run Experiment</v-btn>

    </v-col> 

  </v-row>

</v-container>
<v-container v-if="parameterStore.experiment">
  heypo
</v-container>

</template>
