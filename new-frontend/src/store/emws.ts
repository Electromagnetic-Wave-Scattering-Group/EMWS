import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const paramStore = defineStore('params', () => {
// numerical parameters 
  const frequency = ref(Number);
  const k1 = ref(Number);
  const k2 = ref(Number);
  let selectedModes = ref([])
  let coeffecients = ref([])
    const experiment = ref('')

  function checkInputs() {
    console.log(frequency, k1, k2, selectedModes, coeffecients, experiment)
  }
  return { k1, k2, frequency, selectedModes, coeffecients, experiment, checkInputs}
})

