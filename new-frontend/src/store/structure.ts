import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


    interface DynamicDataStructure<T> {
        num: T;
        data: Array<{ length: number, epsilon: number[]; mu: number[] }>;
    }

export const structureStore = defineStore('structure', () => {
    
    // declare a state variable where we will store the number of layers and the corresponding layer data
    const state = {
        layerNum: 0,
        dynamicStructure: null as DynamicDataStructure<number> | null,
      };

    
      function buildStruct(layerNum: number, layerDataArray: Array<{ length: number, epsilon: number[]; mu: number[] }>): { dynamicStructure: DynamicDataStructure<number>; layerNum: number } {
        const dynamicStructure: DynamicDataStructure<number> = {
          num: layerNum,
          data: layerDataArray,
        };
      
        console.log(dynamicStructure);
        state.dynamicStructure = dynamicStructure;
        state.layerNum = layerNum;
      
        return { dynamicStructure, layerNum };
      }
      
        const getDynamicStructure = () => state.dynamicStructure;

        const updateDynamicStructure = (dynamicStructure: DynamicDataStructure<number>) => {
            state.dynamicStructure = dynamicStructure;
            console.log(dynamicStructure)
        };
        

      return { state, buildStruct, getDynamicStructure, updateDynamicStructure};
    })
