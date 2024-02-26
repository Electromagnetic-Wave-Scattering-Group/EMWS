import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateModes, calculateField} from '../service/api.js';
 

interface DynamicDataStructure<T> {
    num: T;
    data: Array<{ name: string, length: number, epsilon: number[]; mu: number[] }>;
}

interface ResponseData {
  maxwell_matrices: [];
  eigenvalues: [];
  eigenvectors: [];
  modes: [];
}

interface FieldResponse {
    z: []
    Ex: []
    Ey: []
    Hx: []
    Hy: []
    Ez: []
    Hz: []
}
export const paramStore = defineStore('params', () => {

// numerical parameters 
  const frequency = ref(.5);
  const k1 = ref(.2);
  const k2 = ref(.22);
  let selectedModes = ref([])
  let coeffecients = ref([])
  const experiment = ref('')
  const maxwell_matrices = ref([])
  const eigenvalues = ref([])
  const eigenvectors = ref([])
  const z = ref([])
  const Ex = ref([])
  const Ey = ref([])
  const Ez = ref([])
  const Hx = ref([])
  const Hy = ref([])
  const Hz = ref([])
  var shouldRender = ref(false)
  let modes = ref(
    [
    [
      {
          "im": 0,
          "re": 0
      },
      {
          "im": 0,
          "re": 0
      },
      {
          "im": 0,
          "re": 0
      },
      {
          "im": 0,
          "re": 0
      }
  ],
  [
      {
          "im": 0,
          "re": 0
      },
      {
          "im": 0,
          "re": 0
      },
      {
          "im": 0,
          "re": 0
      },
      {
          "im": 0,
          "re": 0
      }
  ]
  ]
)

  function checkInputs() {
    console.log(frequency, k1, k2, selectedModes, coeffecients, experiment)
  }
  
  
  const state = {
    layerNum: 0,
    dynamicStructure: null as DynamicDataStructure<number> | null,
  };

  function buildStruct(layerNum: number, layerDataArray: Array<{ name: string, length: number, epsilon: number[]; mu: number[] }>): 
    { dynamicStructure: DynamicDataStructure<number>; layerNum: number } {
    const dynamicStructure: DynamicDataStructure<number> = {
      num: layerNum,
      data: layerDataArray,
    };
  
    state.dynamicStructure = dynamicStructure;
    state.layerNum = layerNum;
  
    return { dynamicStructure, layerNum };
  }
  
    const getDynamicStructure = () => state.dynamicStructure;

    const updateDynamicStructure = (dynamicStructure: DynamicDataStructure<number>) => {
        state.dynamicStructure = dynamicStructure;
        console.log(dynamicStructure)
    };

    const computedProperties = {
        allParams: computed(() => ({
            k1: k1,
            k2: k2,
            omega: frequency,
            state: state, // Assuming layerData is the state you want to include
        })),
    };
    function setModes() {
      calculateModes().then((data: ResponseData) => {
      // Access the eigenvalues property from the data
      // Set the modes variable
      modes.value = data.eigenvalues;
      maxwell_matrices.value = data.maxwell_matrices;
      eigenvectors.value = data.eigenvectors;
      
      // Continue with your logic
      console.log(modes.value);
    })
    .catch((error: Error) => {
      // Handle error here
      console.error('Error:', error);
    });
  }
  function calcField() {
    calculateField().then((data: FieldResponse) => {
      // Access the eigenvalues property from the data
      // Set the modes variable
      Ex.value = data.Ex
      Ey.value = data.Ey
      Ez.value = data.Ez
      Hx.value = data.Hx
      Hy.value = data.Hy
      Hz.value = data.Hz
      z.value = data.z
      shouldRender.value = true
      // Continue with your logic

    })
    .catch((error: Error) => {
      // Handle error here
      console.error('Error:', error);
    });
  }


  return { k1, k2, frequency, selectedModes, coeffecients, experiment, checkInputs, state, buildStruct, getDynamicStructure, updateDynamicStructure, ...computedProperties, setModes, modes, calcField,
  maxwell_matrices, eigenvalues, eigenvectors, Ex, Ey, Ez, Hx, Hy, Hz, z, shouldRender}
})

