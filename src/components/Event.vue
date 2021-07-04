<template lang="pug">
  v-container
    v-row
      v-col 
        v-card.mx-auto.mt-5(width="400")
          v-card-title
            .text-center
              h1.display-1 Create Event
          v-card-text
            v-form
              v-text-field(
                label="Event Name"
                v-model="name"
              )

              v-textarea(
                v-model="description" 
                auto-grow='' 
                label='Event Description' 
                rows='1' 
                row-height='20'
              )

              v-dialog(ref='dialog' v-model='modal' :return-value.sync='start_date' persistent='' width='290px')
                template(v-slot:activator='{ on, attrs }')
                  v-text-field(v-model='start_date' label='Start date' prepend-icon='mdi-calendar' readonly='' v-bind='attrs' v-on='on')
                v-date-picker(v-model='start_date' scrollable='')
                  v-spacer
                  v-btn(text='' color='primary' @click='modal = false')
                    | Cancel
                  v-btn(text='' color='primary' @click='$refs.dialog.save(start_date)')
                    | OK
              v-dialog(ref='dialog2' v-model='modal2' :return-value.sync='end_date' persistent='' width='290px')
                template(v-slot:activator='{ on, attrs }')
                  v-text-field(v-model='end_date' label='End date' prepend-icon='mdi-calendar' readonly='' v-bind='attrs' v-on='on')
                v-date-picker(v-model='end_date' scrollable='')
                  v-spacer
                  v-btn(text='' color='primary' @click='modal2 = false')
                    | Cancel
                  v-btn(text='' color='primary' @click='$refs.dialog2.save(end_date)')
                    | OK
              v-select(v-model='day_of_the_week' :items='items' label='Day of the Week' multiple='')
                template(v-slot:selection='{ item, index }')
                  v-chip
                    span {{ item }}

          v-divider
          v-card-actions
            v-spacer
            v-btn(color="info"  @click="submit") Submit
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'Login',
    data: () => ({
      start_date:'',
      end_date:'',
      name:'',
      description:'',
      modal: false,
      modal2: false,
      items: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      day_of_the_week:''

    }),
    methods:{
      ...mapActions(['loginUser']),
      submit(){
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