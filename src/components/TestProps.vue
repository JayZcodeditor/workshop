<template>
  <v-btn @click="login_function">Click Me</v-btn>
</template>

<script>
import { EvenBus } from '@/EvenBus'
export default {
  methods: {
    login_function() {
      EvenBus.$on('Login_function')
    }
  }
}
</script>

<style>

</style>