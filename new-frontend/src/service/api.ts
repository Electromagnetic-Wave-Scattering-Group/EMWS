import { paramStore } from '@/store/emws';
import axios from 'axios';



export function calculateModes() {
  const parameterStore = paramStore();
  const omega = parameterStore.frequency;
  const k1 = parameterStore.k1;
  const k2 = parameterStore.k2;
  const layers = parameterStore.state.dynamicStructure
  

  const post = {
    'k1': k1, 
    'k2': k2, 
    'omega': omega, 
    'layers': layers
  }

  return axios({
    method: 'post',
    url: 'http://127.0.0.1:5000/structure/test',
    data: post
  })
  .then(response => {
    // Handle successful response here
    // You can return the data if needed
    console.log(response.data.modes)
    return response.data;
    // Continue with your calculation logic using k1 and other parameters
  })
  .catch(error => {
    // Handle error here
    console.error('Error:', error);
    // You may want to throw the error again or handle it differently based on your needs
    throw error;
  });
}

export function calculateTransmissionValues() {
  const parameterStore = paramStore();
  const frequencyLeft = parameterStore.frequencyLeft;
  const frequencyRight = parameterStore.frequencyRight;
  const k1 = parameterStore.k1;
  const k2 = parameterStore.k2;
  const layers = parameterStore.state.dynamicStructure;
  const points = parameterStore.points;
  const coeffecients = parameterStore.transmissionCoeffecients;

  const post = {
    'frequencyLeft': frequencyLeft, 
    'frequencyRight': frequencyRight, 
    'k1': k1, 
    'k2': k2, 
    'layers': layers, 
    'points': points, 
    'coeffecients': coeffecients
  }
  return axios({
    method: 'post',
    url: 'http://127.0.0.1:5000/structure/transmission',
    data: post
  })
  .then(response => {
    console.log(response.data)
    // Handle successful response here
    // You can return the data if needed
    return response.data;
    // Continue with your calculation logic using k1 and other parameters
  })
  .catch(error => {
    // Handle error here
    console.error('Error:', error);
    // You may want to throw the error again or handle it differently based on your needs
    throw error;
  });
}



export function calculateField() {
  const parameterStore = paramStore();
  const omega = parameterStore.frequency;
  const k1 = parameterStore.k1;
  const k2 = parameterStore.k1;
  const layers = parameterStore.state.dynamicStructure
  const incoming = parameterStore.coeffecients
  const selectedLeft = parameterStore.selectedModesLeft
  const selectedRight = parameterStore.selectedModesRight
  const post = {
    'k1': k1, 
    'k2': k2, 
    'omega': omega, 
    'incoming': incoming,
    'selectedLeft': selectedLeft,
    'selectedRight': selectedRight,
    'maxwell_matrices': parameterStore.maxwell_matrices,
    'eigenvalues': parameterStore.modes,
    'eigenvectors': parameterStore.eigenvectors,
    'layers': layers, 
  }


  return axios({
    method: 'post',
    url: 'http://127.0.0.1:5000/structure/testfield',
    data: post
  })
  .then(response => {
    // Handle successful response here
    // You can return the data if needed
    return response.data;
    // Continue with your calculation logic using k1 and other parameters
  })
  .catch(error => {
    // Handle error here
    console.error('Error:', error);
    // You may want to throw the error again or handle it differently based on your needs
    throw error;
  });
}

