import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { calculateModes, calculateField, calculateRangeOfModes} from '../service/api.js';
import Breadcrumb from 'primevue/breadcrumb';
 

interface DynamicDataStructure<T> {
    num: T;
    data: Array<{ name: string, length: number, epsilon: number[]; mu: number[] }>;
}


interface ModeArray<N> {
  num: N;
  modes: Array<Array<{ im: number; re: number }>>;
}

interface ResponseData {
  maxwell_matrices: [];
  eigenvalues: [];
  eigenvectors: [];
  modes: [];
}

interface TransmissionResponse {
  data: Array<{
    omega: number;
    frequencyData: {
      eigenvalues: Array<Array<{ im: number; re: number }>>;
      // Add other properties if needed (e.g., maxwell_matrices, eigenvectors, modes)
    };
  }>;
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
  const frequencyLeft = ref(.1)
  const frequencyRight = ref(.5)
  const points = ref(4)
  const omegaRange = ref<number[]>([]);
  const modeRange = ref<Array<Array<{ im: number; re: number }>>>([]);

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


  function setRangeOfModes() {
    calculateRangeOfModes().then((data: TransmissionResponse) => {
      const responseData = data.data;
      
      for (let i = 0; i < responseData.length; i++) {
        const entry = responseData[i];
        omegaRange.value.push(entry.omega)  
        console.log(entry.frequencyData.eigenvalues)

        // modeRange.value.push(entry.frequencyData.eigenvalues)

      }
      console.log(omegaRange)

      // for (var index in responseData) {
      //   console.log(responseData.indexOf(index))
      //   console.log(index)       // Access the 'omega' property from each entry and add it to omegaRange
      //   // omegaRange.value.push(index.omega);
  
      //   // // Access the 'frequencyData' property from each entry
      //   // const frequencyData = entry.frequencyData;
  
      //   // // Now you can access specific properties from frequencyData if needed
      //   // const eigenvalues = frequencyData.eigenvalues;
      //   // const maxwellMatrices = frequencyData.maxwell_matrices;
      //   // const eigenvectors = frequencyData.eigenvectors;
      //   // const modes = frequencyData.modes;
      //   // Continue with your logic for frequencyData if necessary
      // }


    // Access the eigenvalues property from the data
    // Set the modes variable
    // modes.value = data.eigenvalues;
    // maxwell_matrices.value = data.maxwell_matrices;
    // eigenvectors.value = data.eigenvectors;
    
    // // Continue with your logic
    // console.log(modes.value);
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
  maxwell_matrices, eigenvalues, eigenvectors, Ex, Ey, Ez, Hx, Hy, Hz, z, shouldRender, frequencyLeft, frequencyRight, setRangeOfModes, points}
})

