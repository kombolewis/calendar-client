<template lang="pug">
    v-app
      Navbar(:links="linksComputed")
      v-main
        router-view
      v-snackbar(
        v-model="$store.getters.checkShow"
        :multi-line="true"
        :right="true"
        :top="true"
        :timeout="6000"
        :color="$store.getters.checkVariant"

      )
        .d-flex.justify-space-between.align-center
          .subtitle-1 {{$store.getters.checkMessage}}
          v-btn(
            dark
            text
            @click="$store.commit('updateSnackbar', {show: false})"
          )
            | Close
      Footer(:links="linksComputed")

</template>

<script>
import Navbar from './components/layout/Navbar'
import Footer from './components/partials/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data: () => ({
    show:this.$store.getters.checkshow,
    variant:'',
    message:''
  }),
  computed:{
    linksComputed(){
      return[
        {
          label: 'Home',
          url:'/'
        },
        {
          label: this.$store.getters.isLoggedIn ? 'Logout':'Login',
          url:'/login'
        },
      ]
    },
  },
}
</script>