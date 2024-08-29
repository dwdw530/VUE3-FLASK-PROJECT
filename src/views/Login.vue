<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async loginUser() {
      try {
        await this.login({ email: this.email, password: this.password })
        this.$router.push('/orders')
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
