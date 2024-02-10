<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ msg: string }>();

const frequency = ref('');
const k1 = ref('');
const k2 = ref('');
// const modes = ref([null, null, null, null, null, null, null, null]);
const modes = ref([1, 2, 3, 4, 5, 6, 7, 8]);
const showCheckboxes = ref(false);
const selectedModes = ref([]);
const showCoefficients = ref(false);
const coefficients = ref([null, null, null, null]);
const formSubmitted = ref(false);
const experiments = ref(['Scattering Experiment', 'Transmission Experiment', 'Faraday Roration'])
const selected = ref('')

const calcModes = () => {
  // this is where an api call would take place and return calculated modes (first and last layer eigenvalues)
  //  take the k1, k2, frequency and hit backend, instead populate with dummy data
  modes.value = [10, 20, 30, 40, 50, 60, 70, 80];

};

const finalizeParameters = () => {
  // Perform any necessary actions with the submitted data
  console.log('Frequency:', frequency.value);
  console.log('Wavevector-X:', k1.value);
  console.log('Wavevector-Y:', k2.value);
  
  // Calculate modes using k1, k2, frequency
  calcModes();
  
  // Set the flag to show checkboxes
  showCheckboxes.value = true;
};

const saveSelectedModes = () => {
  // log the selected modes for future use 
  console.log('Selected Modes:', selectedModes.value);
  
  // once modes are logged, show the coeffecients input div
  showCoefficients.value = true;
};

const submitForm = () => {
    formSubmitted.value = true
}

</script>

<template>

<v-container class="bg-surface-variant">
    <v-row no-gutters>
    <v-col >
      Please Input Parameters for the Signal
        <v-form @submit.prevent>
          <v-text-field
            v-model="k1"
            label="k1">
          </v-text-field>
          <v-text-field
            v-model="k2"
            label="k2">
          </v-text-field>
          <v-text-field
            v-model="frequency"
            label="w">
          </v-text-field>
        
      </v-form>
    </v-col > 

    <v-col>
      Please Select Your Modes
      <v-row>
        <v-col>
            <v-checkbox v-for="(mode, index) in modes.slice(0, 4)" :key="index"
              v-model="selectedModes"
              :label="`${mode}`"
              :value="mode"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox v-for="(mode, index) in modes.slice(4, 8)" :key="index"
              v-model="selectedModes"
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
          <v-text-field v-for="(coeff, index) in coefficients.slice(0, 2)" :key="index"
              v-model="coefficients[index]"
              :label="`C ${index+1}`"
              >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-for="(coeff, index) in coefficients.slice(2,4)" :key="index"
              v-model="coefficients[index+2]"
              :label="`C ${index + 3}`"
              >
          </v-text-field>
        </v-col>
      </v-row>
      Please Select Your Experiment 
      <v-row>
        <v-combobox
        label="Experiments"
        :items="experiments"
        v-model="selected"
        ></v-combobox>
      </v-row>
      <v-btn @click="submitForm" block class="mt-2">Submit</v-btn>
    </v-col>
  </v-row>




  </v-container>

  <v-container v-if="formSubmitted" class="bg-surface-variant">
    <v-row> Experiment: {{ selected }} </v-row>
    <v-row justify="center"> Results would display here</v-row>
  </v-container>

</template>
