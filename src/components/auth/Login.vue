<template lang="pug">
  v-container
    v-row
      v-col 
        v-card.mx-auto.mt-5(width="400")
          v-card-title
            h1.display-1 Login
          v-card-text
            v-form
              v-text-field(
                label="Username"
                prepend-icon="mdi-account-circle"
                v-model="email"
              )
              v-text-field(
                :type="showPassword ? 'text' : 'password'" 
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append = " showPassword = !showPassword "
                v-model="password"
                @keyup.enter="login"
              )
          v-divider
          v-card-actions
            v-btn(color="success" :to="{name: 'Register'}") Register
            v-spacer
            v-btn(color="info"  @click="login") Login
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'Login',
    data: () => ({
      showPassword: false,
      email:'',
      password:'',
    }),
    methods:{
      ...mapActions(['loginUser']),
      login(){
        this.loginUser({email:this.email,password:this.password})
        .then(() => {
          return this.$router.push({name:'Home'})
        })
        .then(() => {
          this.$store.commit('updateSnackbar', {
            show:true,
            variant:'success',
            message:'Login successful'
          })
        })
        .catch(() => {
          this.$store.commit('updateSnackbar', {
            show:true,
            variant:'error',
            message:'Login Failed'
          })
        })
      }
    }
  }
</script>