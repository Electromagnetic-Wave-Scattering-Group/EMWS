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
const showResults = ref(false);

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

const runExperiment = () => {
  // Again, this would send the coeffecients to the backend for the experiment
  console.log('Experiment Coefficients:', coefficients.value);

  // once results come back we would show the div containing the graph
  showResults.value = true;
};
</script>

<template>


<div class="flex-container" >

  <div class="flex-child magenta">
    <h2>Please Input Frequency and Wavenumber</h2>
    <p>Frequency: {{ frequency }}</p>
    <input v-model="frequency" placeholder="w" />
    <p>Wavevector-X: {{ k1 }}</p>
    <input v-model="k1" placeholder="k1" />
    <p>Wavevector-Y: {{ k2 }}</p>
    <input v-model="k2" placeholder="k2" />
  <div class="button-padding">
    <button @click="finalizeParameters" class="btn btn-primary"> Finalize Parameters</button>

  </div>
  </div>

  <div class="flex-child green">
    <div v-if="showCheckboxes">
    <h2>Select Modes</h2>

    <!-- Split modes into two columns -->
    <div class="checkbox-columns">
      <div v-for="(mode, index) in modes" :key="mode" :class="{'column-1': index < 4, 'column-2': index >= 4}">
        <label>
          <input type="checkbox" v-model="selectedModes" :value="mode" />
          {{ mode }}
        </label>
      </div>
    </div>
    <div class="button-padding">

      <button @click="saveSelectedModes" class="btn btn-primary"> Save Selected Modes</button>

    </div>
  </div>

  </div>

  <div class="flex-child blue">
    <div v-if="showCoefficients">
    <h2>Coefficients</h2>

    <!-- Apply coefficients-columns class for styling -->
    <div class="coefficients-columns">
      <!-- First row -->
      <div class="coefficient-row">
        <div v-for="(coefficient, index) in coefficients.slice(0, 2)" :key="index">
          <input v-model="coefficients[index]" :placeholder="'C ' + (index + 1)" />
        </div>
      </div>

      <!-- Second row -->
      <div class="coefficient-row">
        <div v-for="(coefficient, index) in coefficients.slice(2)" :key="index">
          <input v-model="coefficients[index + 2]" :placeholder="'C ' + (index + 3)" />
        </div>
      </div>
    </div>


    <h2> Please Select Your Experiment </h2>

    <div>
      there should be a dropdown here 
      <b-dropdown> 
        here is some text
      </b-dropdown>
    </div>

    <!-- Button with padding -->
    <div class="button-padding">
      <button @click="runExperiment" class="btn btn-primary"> Run Experiment</button>
    </div>
  </div>

  </div>

</div>

<div v-if="showResults" style="width: 100%; padding-above: 20px; border: 1px solid #ddd; ">
  <h2>E and H components at Initial time</h2>
  <h3>Graph of results would display here</h3>
</div>
</template>
