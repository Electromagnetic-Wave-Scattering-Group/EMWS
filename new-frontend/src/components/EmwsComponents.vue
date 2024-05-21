<script setup lang="ts">
import { ref, computed } from 'vue';

import { paramStore } from '@/store/emws'

const parameterStore = paramStore()

defineProps<{ msg: string }>();



const experiments = ref(['Scattering Experiment', 'Transmission Experiment', 'Faraday Rotation'])
const experiment = ref('')
const coeffecients = [1, 0, 0, 0]
const frequencyStart = ref()
const frequencyEnd = ref()

const series = computed(() => ([
  { name: 'Ex', data: parameterStore.Ex },
  { name: 'Ey', data: parameterStore.Ey },
  { name: 'Ez', data: parameterStore.Ez },
  { name: 'Hx', data: parameterStore.Hx },
  { name: 'Hy', data: parameterStore.Hy },
  { name: 'Hz', data: parameterStore.Hz }
])) 

const chartOptions = ref({
  chart: {
    height: 350,
    width: '100%',

    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  tooltip: {
    theme: 'dark'
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: 'E and H Field Values',
    align: 'left',
    style: {
      color: '#fff',  // Set the title text color to white
    },
  },
  grid: {
    row: {
      colors: ['##C4BBAF'],
      opacity: 0.5,
    },
  },
  theme: {
    palette: 'palette3',
  },
  xaxis: {
    categories: parameterStore.z,
    tickAmount: 10,
    labels: {
      style: {
        colors: '#fff',  // Set x-axis labels text color to white
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (value: number) {
        return value.toFixed(2);  // Format y-axis values to two decimal places
      },
      style: {
        colors: '#fff',  // Set y-axis values text color to white
      },
    },
  },
  legend: {
    labels: {
      colors: '#fff',  // Set legend labels text color to white
    },
  },
  
});


const transmissionChartOptions = ref({
  chart: {
    height: 350,
    width: '100%',

    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  tooltip: {
    theme: 'dark'
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  title: {
    text: 'Transmission Values',
    align: 'left',
    style: {
      color: '#fff',  // Set the title text color to white
    },
  },
  grid: {
    row: {
      colors: ['##C4BBAF'],
      opacity: 0.5,
    },
  },
  theme: {
    palette: 'palette3',
  },
  xaxis: {
    categories: parameterStore.omegaRange,
    tickAmount: 10,
    labels: {
      style: {
        colors: '#fff',  // Set x-axis labels text color to white
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (value: number) {
        return value.toFixed(2);  // Format y-axis values to two decimal places
      },
      style: {
        colors: '#fff',  // Set y-axis values text color to white
      },
    },
  },
  legend: {
    labels: {
      colors: '#fff',  // Set legend labels text color to white
    },
  },
  
});



const transmissionSeries = computed(() => ([
  { name: 'transmission', data: parameterStore.transmissionRange },
])) 


</script>

<template>


<v-container class="bg-surface-variant"> Please Select Your Experiment 
  <v-combobox
  label="Experiments"
  :items=experiments
  v-model = "experiment" 
></v-combobox>
</v-container>

<v-divider :thickness="10"></v-divider>
<v-container class="bg-surface-variant" v-if="experiment == 'Scattering Experiment'">
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
          <v-btn block class="mt-2" @click="parameterStore.setModes()">Calculate Modes</v-btn >
          
      </v-form>
    </v-col > 
    <v-col>
      Please Select Your Modes
      <v-row>
        <v-col>
            <v-checkbox v-for="(mode, index) in parameterStore.modes[0]" :key="index"
              v-model="parameterStore.selectedModesLeft"
              :label="`${mode.re.toFixed(2)} +  ${mode.im.toFixed(2)} j`"
              :value="mode"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox v-for="(mode, index) in parameterStore.modes[parameterStore.state.layerNum - 1]" :key="index"
              v-model="parameterStore.selectedModesRight"
              :label="`${mode.re.toFixed(2)} +  ${mode.im.toFixed(2)} j`"
              :value="mode"
            ></v-checkbox>
          </v-col>

      </v-row>
      <v-btn block class="mt-2" @click="parameterStore.clearModes()">Clear Mode Selection</v-btn >
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
      <v-btn @click="parameterStore.calcField()" block class="mt-2">Run Experiment</v-btn>

    </v-col> 

  </v-row>

</v-container>

<v-container class="bg-surface-variant" v-if="experiment == 'Transmission Experiment'">
    <v-row no-gutters>
    <v-col class="mr-4">
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
            v-model="parameterStore.frequencyLeft"
            label="wLeft"
            type="number">
          </v-text-field>
          <v-text-field
            v-model="parameterStore.frequencyRight"
            label="wLeft"
            type="number">
          </v-text-field>
          <v-text-field
            v-model="parameterStore.points"
            label="points"
            type="number">
          </v-text-field>
      </v-form>
    </v-col > 
    <v-col class="ml-4">
      Please Select Coeffecients
      <v-row>
        <v-col>
          <v-text-field v-for="(coeff, index) in coeffecients.slice(0, 2)" :key="index"
              v-model="parameterStore.transmissionCoeffecients[index]"
              :label="`C ${index+1}`"
              type="number"
              >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-for="(coeff, index) in coeffecients.slice(2,4)" :key="index"
              v-model="parameterStore.transmissionCoeffecients[index+2]"
              :label="`C ${index + 3}`"
              type="number"
              >
          </v-text-field>
        </v-col>
      </v-row>
      <v-btn @click="parameterStore.calculateTransmission()" block class="mt-2">Run Experiment</v-btn>

    </v-col> 

  </v-row>

</v-container>
<v-container class="bg-surface-variant" v-if="parameterStore.shouldRender, experiment=='Scattering Experiment'">
  <div id="chart">
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</v-container>



<v-container class="bg-surface-variant" v-if="experiment == 'Faraday Rotation'">
    <v-row no-gutters>
    <v-col class="mr-4">
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
            v-model="parameterStore.frequencyLeft"
            label="wLeft"
            type="number">
          </v-text-field>
          <v-text-field
            v-model="parameterStore.frequencyRight"
            label="wLeft"
            type="number">
          </v-text-field>
          <v-text-field
            v-model="parameterStore.points"
            label="points"
            type="number">
          </v-text-field>
      </v-form>
    </v-col > 
    <v-col class="ml-4">
      Please Select Coeffecients
      <v-row>
        <v-col>
          <v-text-field v-for="(coeff, index) in coeffecients.slice(0, 2)" :key="index"
              v-model="parameterStore.transmissionCoeffecients[index]"
              :label="`C ${index+1}`"
              type="number"
              >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-for="(coeff, index) in coeffecients.slice(2,4)" :key="index"
              v-model="parameterStore.transmissionCoeffecients[index+2]"
              :label="`C ${index + 3}`"
              type="number"
              >
          </v-text-field>
        </v-col>
      </v-row>
      <v-btn block class="mt-2">Run Experiment</v-btn>
    </v-col> 

  </v-row>

</v-container>




<v-container class="bg-surface-variant" v-if="parameterStore.shouldRender, experiment=='Transmission Experiment'">
  <div id="chart">
    <apexchart type="line" height="350" :options="transmissionChartOptions" :series="transmissionSeries"></apexchart>
  </div>
</v-container>



</template>
