<template lang="pug">
  v-sheet(:height="sheetHeight")
    v-container.fill-height
      v-row(align="center" justify="center")
        h1.text-center.display-1.hidden-sm-and-up
          | Event Schedule Creator Web Service
        h1.text-center.display-3.hidden-xs-only
          | Event Schedule Creator Web Service
</template>

<script>
export default {
  name:'Header',
	computed:{
		sheetHeight(){
			switch (this.$vuetify.breakpoint.name) {
				case 'xs' : return '100px'
				case 'sm' : return '150px'
				case 'md' : return '150px'
				case 'lg' : return '200px'
				case 'xl' : return '250px'
			}
			return '300px'
		}
	}
}
</script>