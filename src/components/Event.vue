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

              v-dialog(ref='dialog' v-model='modal' :return-value.sync='date' persistent='' width='290px')
                template(v-slot:activator='{ on, attrs }')
                  v-text-field(v-model='date' label='Start date' prepend-icon='mdi-calendar' readonly='' v-bind='attrs' v-on='on')
                v-date-picker(v-model='date' scrollable='')
                  v-spacer
                  v-btn(text='' color='primary' @click='modal = false')
                    | Cancel
                  v-btn(text='' color='primary' @click='$refs.dialog.save(date)')
                    | OK
              v-dialog(ref='dialogStartTime' v-model='modalStartTime' :return-value.sync='start_time' persistent='' width='290px')
                template(v-slot:activator='{ on, attrs }')
                  v-text-field(v-model='start_time' label='Start Time' prepend-icon='mdi-clock-time-four-outline' readonly='' v-bind='attrs' v-on='on')
                v-time-picker(v-if='modalStartTime' v-model='start_time' full-width='' format="24hr")
                  v-spacer
                  v-btn(text='' color='primary' @click='modalStartTime = false')
                    | Cancel
                  v-btn(text='' color='primary' @click='$refs.dialogStartTime.save(start_time)')
                    | OK

              v-dialog(ref='dialogEndTime' v-model='modalEndTime' :return-value.sync='end_time' persistent='' width='290px')
                template(v-slot:activator='{ on, attrs }')
                  v-text-field(v-model='end_time' label='End Time' prepend-icon='mdi-clock-time-four-outline' readonly='' v-bind='attrs' v-on='on')
                v-time-picker(v-if='modalEndTime' v-model='end_time' full-width='' format="24hr")
                  v-spacer
                  v-btn(text='' color='primary' @click='modalEndTime = false')
                    | Cancel
                  v-btn(text='' color='primary' @click='$refs.dialogEndTime.save(end_time)')
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
      date:'',
      start_time:'',
      end_time:'',
      name:'',
      description:'',
      modal: false,
      modalStartTime: false,
      modalEndTime: false,
      items: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      day_of_the_week:''

    }),
    methods:{
      ...mapActions(['createEvent']),
      submit(){
        this.createEvent({
          date:this.date,
          start_time:this.start_time,
          end_time:this.end_time,
          name:this.name,
          description:this.description,
          day_of_the_week:this.day_of_the_week
        })
        .then(() => {
          this.$store.commit('updateSnackbar', {
            show:true,
            variant:'success',
            message:'Event Created'
          })
        })
        .catch(() => {
          this.$store.commit('updateSnackbar', {
            show:true,
            variant:'error',
            message:'Event Creation Failed'
          })
        })
      }
    }
}
</script>