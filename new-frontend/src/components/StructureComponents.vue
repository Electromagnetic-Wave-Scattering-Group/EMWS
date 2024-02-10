<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCounterStore } from '@/store/counter'


const counterStore = useCounterStore()

defineProps<{ msg: string }>()
// I want a better data model
const layer = ref({
  // number of layers to add
  num: 10, 
  // store each individual layer object
  layers: [
    {
      // layer's epsilon
      epsilon: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      // layer's mu
      mu: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      // layer's length 
      length: 10,
    },
    // issue is: I can't seem to find a way to have the number of layer objects update for each layer added
  ],
});

const isSubmitted = ref(false)

const handleSubmit = () => {
  // Perform any necessary actions with the submitted data
  console.log('Submitted Data:', layer)
  
  // Set the flag to indicate that the form has been submitted
  isSubmitted.value = true
}

</script>

<template>
<v-container class="bg-surface-variant">
        Please Input The Number of Layers for the Experiment

    <v-row no-gutters justify="center">
      <input type="number" v-model="layer.num">
    </v-row>
  </v-container>

  <v-container class="bg-surface-variant">
  <v-row>
    <v-col v-for="n in layer.num">
      <v-row>
        Layer {{ n }} Parameters 
      </v-row>
      <v-row justify="center">
        Length
      </v-row>
      <v-row>
        <input type="number" v-model="layer.layers.length">
      </v-row>

      <v-row>
        Epsilon
      </v-row>'


      <v-row>
        Mu
      </v-row>

    </v-col>

  </v-row>  
    
  </v-container>
</template>