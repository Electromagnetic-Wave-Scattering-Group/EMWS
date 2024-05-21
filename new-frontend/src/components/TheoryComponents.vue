<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCounterStore } from '@/store/counter'

const counterStore = useCounterStore()

defineProps<{ msg: string }>()

const count = ref(0)
const doubleCount = computed(() => count.value * 2)
const increment = () => count.value++
const formula = '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$'
</script>

<template>
    <div class="mt-4 text-subtitle-2"></div>

<v-card variant="tonal"
  width="1000"
  title="Layered Structures"
></v-card>




<v-card variant="tonal" style="border: none;" subtitle="asdfadsf">
  <math-field read-only style="background-color: #232323; color: white; padding: 0; border: none;">
    C = \begin{bmatrix}
        \varepsilon & \zeta \\
    \xi & \mu
\end{bmatrix}
  </math-field>
</v-card>

<v-card variant="tonal"
  width="1000"
  subtitle="A discussion on the differences between lossy and lossless media"
></v-card>
<v-card variant="tonal"
  width="1000"
  subtitle="Some latex showing an example of each"
></v-card>
<v-card variant="tonal"
  width="1000"
  subtitle="A sample structure for a field scattering problem, transmission problem, and a faraday rotation problem"
></v-card>
<div class="mt-4 text-subtitle-2"></div>


<div class="mt-4 text-subtitle-2"></div>
<v-card variant="tonal"
  width="1000"
  title="Maxwells Equations"
></v-card>
<div class="mt-4 text-subtitle-2"></div>

<div class="mt-4 text-subtitle-2"></div>
<v-card variant="tonal"
  width="1000"
  title="Field Scattering"
></v-card>
<div class="mt-4 text-subtitle-2"></div>


<div class="mt-4 text-subtitle-2"></div>
<v-card variant="tonal"
  width="1000"
  title="Energy Transmission"
></v-card>
<div class="mt-4 text-subtitle-2"></div>

<div class="mt-4 text-subtitle-2"></div>
<v-card variant="tonal"
  width="1000"
  title="Faraday Rotation"
></v-card>
<div class="mt-4 text-subtitle-2"></div>
<div class="mt-4 text-subtitle-2"></div>
<v-card variant="tonal"
  width="1000"
  title="Applications"
></v-card>
<div class="mt-4 text-subtitle-2"></div>
</template>