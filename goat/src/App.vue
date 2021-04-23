<template>
  <v-app>
    <v-app-bar
      app 
      height="100px"
      color="white"
    >
      <img 
        :src="logo"
        class="ml-sm-8"
        alt="logo"
      />
    </v-app-bar>
    <v-main style="margin-top: 50px">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Logo from 'Assets/goat.png'

export default {
  name: 'App',
  data: () => ({
    logo: Logo,
  }),
}
</script>
