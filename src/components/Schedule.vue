<template lang="pug">
  v-row.fill-height
    v-col
      v-sheet(height='64')
        v-toolbar(flat='')
          v-btn.mr-4(outlined='' color='grey darken-2' @click='setToday')
            | Today
          v-btn(fab='' text='' small='' color='grey darken-2' @click='prev')
            v-icon(small='')
              | mdi-chevron-left
          v-btn(fab='' text='' small='' color='grey darken-2' @click='next')
            v-icon(small='')
              | mdi-chevron-right
          v-toolbar-title(v-if='$refs.calendar')
            | {{ $refs.calendar.title }}
          v-spacer
          v-menu(bottom='' right='')
            template(v-slot:activator='{ on, attrs }')
              v-btn(outlined='' color='grey darken-2' v-bind='attrs' v-on='on')
                span {{ typeToLabel[type] }}
                v-icon(right='')
                  | mdi-menu-down
            v-list
              v-list-item(@click="type = 'day'")
                v-list-item-title Day
              v-list-item(@click="type = 'week'")
                v-list-item-title Week
              v-list-item(@click="type = 'month'")
                v-list-item-title Month
              v-list-item(@click="type = '4day'")
                v-list-item-title 4 days
      v-sheet(height='600')
        v-calendar(
          ref='calendar'
          v-model='focus' 
          color='primary' 
         :events='events' 
         :event-color='getEventColor' 
         :type='type' 
         @click:event='showEvent' 
         @click:more='viewDay' 
         @click:date='viewDay' 
         @change='updateRange'
        )
        v-menu(v-model='selectedOpen' :close-on-content-click='false' :activator='selectedElement' offset-x='')
          v-card(color='grey lighten-4' min-width='350px' flat='')
            v-toolbar(:color='selectedEvent.color' dark='')
              v-btn(icon='')
                v-icon mdi-pencil
              v-toolbar-title(v-html='selectedEvent.name')
              v-spacer
              v-btn(icon='')
                v-icon mdi-heart
              v-btn(icon='')
                v-icon mdi-dots-vertical
            v-card-text
              span(v-html='selectedEvent.details')
            v-card-actions
              v-btn(text='' color='secondary' @click='selectedOpen = false')
                | Cancel
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:'Schedule',
  data: () => ({
    focus: '',
    type: 'month',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  methods: {
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange () {
      const data  = []
      for(const {events} of this.getUserSchedule){
        events.forEach((event) => {
          const {schedules} = event
          schedules.forEach(schedule => {
            data.push({
              name:event.name,
              start:`${schedule.scheduled_date} ${event.start_time}`,
              end:`${schedule.scheduled_date} ${event.end_time}`,
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed:true,
            })
          })
        })
      }
      this.events = data
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
  computed: {
    ...mapGetters(['getUserSchedule']),
  },
  mounted() {
    this.$store.dispatch('getSchedule')
    this.$refs.calendar.checkChange()
  }
}
</script>
