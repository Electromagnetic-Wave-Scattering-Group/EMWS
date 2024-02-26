<template>
  <div class="home">
    <h1>{{ $t('Welcome to the EMWS GUI!') }}</h1>

    <v-card class ="heading-3"  variant="tonal">
      <p class="font-weight-black">
      This is a functional GUI for simulating EM Waves in layered media
    </p>
    </v-card>

    <v-card text= "Unsure of what that means? Click the 'Theory' tab" variant="tonal"></v-card>

    <div class="mt-4 text-subtitle-2"></div>


    <v-card class ="heading-3"  variant="tonal">
      <p class="font-weight-black">
      This project is part of a colloboration among EM Reseachers
    </p>
    </v-card>

    <v-card text= "Want to learn more about the EMWS Research Group? Click the 'About' Tab" variant="tonal"></v-card>
    
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
