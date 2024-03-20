<script setup lang="ts">
import { ref, computed } from 'vue'

import { paramStore } from '@/store/emws'
const structStore = paramStore()

defineProps<{ msg: string }>()

const num = ref(0);
const dynamicStructureRef = ref();
let readyToFinalize = ref(false)
// Computed property to make dynamicStructure accessible in the template
const dynamicStructure = computed(() => dynamicStructureRef.value);

const onBuildStruct = () => {
  const layerDataArray = [];

  for (let i = 1; i <= num.value; i++) {
    const layerData = {
      name: 'layer ' + (i + 1),
      // length: Number, 
      length: i+2,
      epsilon: Array.from({ length: 9 }, () => Math.random()), // Length 9 array
      mu: Array.from({ length: 9 }, () => Math.random()),      // Length 9 array
    };
    layerDataArray.push(layerData);
  }

  // Call buildStruct and get the returned object
  const { dynamicStructure } = structStore.buildStruct(num.value, layerDataArray);
  readyToFinalize.value = true;

  // Assign to the ref so it can be reactive in the template
  dynamicStructureRef.value = dynamicStructure;
};

const finalizeStruct = () => {
  // Check if dynamicStructure is not null before finalizing
  if (dynamicStructureRef.value) {
    // Update the store with the current dynamicStructure data
    structStore.updateDynamicStructure(dynamicStructureRef.value);
  }
};


</script>

<template>
  <v-container class="bg-surface-variant">
    Please Input The Number of Layers for the Experiment
    <v-form @submit.prevent>
      <v-text-field v-model="num" label="Number of Layers" type="number"></v-text-field>
      <v-btn @click="onBuildStruct" block class="mt-2">Set Number of Layers</v-btn>
    </v-form>

    <v-container v-if="dynamicStructure">
      <v-row v-for="(layer, index) in dynamicStructure.data" :key="index">
        <v-col>
          <v-row>
            Layer {{ index + 1 }} Parameters
          </v-row>
            <v-row> 
              <v-text-field
                v-model="layer.length"
                :label="`Layer ${index + 1} Length`"
                type="number"
              ></v-text-field>
            </v-row>
            <v-row v-for="i in 3" :key="i">
        <v-col v-for="j in 3" :key="j">
          <v-text-field v-model="layer.epsilon[(i - 1) * 3 + j - 1]" :label="`Epsilon ${i}${j}`" type="number"></v-text-field>
        </v-col>
      </v-row>
      <v-row v-for="i in 3" :key="i">
        <v-col v-for="j in 3" :key="j">
          <v-text-field v-model="layer.mu[(i - 1) * 3 + j - 1]" :label="`Mu ${i}${j}`" type="number"></v-text-field>
        </v-col>
      </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-btn v-if="readyToFinalize" @click="finalizeStruct" block class="mt-2">Finalize Structure</v-btn>
  </v-container>
</template>
