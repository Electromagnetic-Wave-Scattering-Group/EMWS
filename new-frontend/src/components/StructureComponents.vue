<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCounterStore } from '@/store/counter'


const counterStore = useCounterStore()

defineProps<{ msg: string }>()
// I want a better data model
const layer = ref({
  // number of layers to add
  num: null, 
  // store each individual layer object
  layers: [
    {
      // layer's epsilon
      epsilon: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
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
  <h1>{{ msg }}</h1>
  <div class="card">
    <h3 v-if="!layer.num">Please Input the Number of Layers</h3>
    <p>Number of Layers: {{ layer.num }}</p>
    <input v-model="layer.num" placeholder="3" />
  </div>
     
  <div v-if="layer.num"> Please Input Epsilon and Mu parameters for the layers

  <div v-for="n in parseInt(layer.num)" :key="n"> 
    <b-container>
      <h3>Please Enter Layer {{ n }} length</h3>
      
      <!-- <input v-model="layer.layers[n-1].length" placeholder="Layer length" />  -->
      
      
      <h3>Please Enter Layer {{ n }} Epsilon</h3>
      <!-- <div v-for="(row, rowIndex) in layer.layers[n-1].epsilon" :key="rowIndex">
        <div v-for="(value, colIndex) in row" :key="colIndex">
          <input v-model="layer.layers[n-1].epsilon[rowIndex][colIndex]" :placeholder="'Epsilon ' + (rowIndex + 1) + 'x' + (colIndex + 1)" />
        </div>
      </div> -->
  
      <h3>Please Enter Layer {{ n }} Mu</h3>
      <!-- <div v-for="(row, rowIndex) in layer.layers[n-1].mu" :key="rowIndex">
        <div v-for="(value, colIndex) in row" :key="colIndex">
          <input v-model="layer.layers[n-1].mu[rowIndex][colIndex]" :placeholder="'Mu ' + (rowIndex + 1) + 'x' + (colIndex + 1)" />
        </div>
      </div> -->

    <!-- Would ideally be:  <input v-model="layer.layers[n-1].length" placeholder="Layer length" />  -->
      <!-- <input v-model="layer.layers.length" placeholder="Layer length" />  -->


    
    </b-container> 
</div>
</div>
<button @click="handleSubmit" class="btn btn-primary"> Submit</button> 


</template>