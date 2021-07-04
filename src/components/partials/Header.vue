<template lang="pug">
  v-sheet(:height="sheetHeight")
    v-container.fill-height
      v-row(align="center" justify="center")
        h1.text-center.display-1.hidden-sm-and-up
          | Welcome to Near Earth Object Web Service
        h1.text-center.display-3.hidden-xs-only
          | Welcome to Near Earth Object Web Service
</template>

<script>
export default {
  name:'Header',
	computed:{
		sheetHeight(){
			switch (this.$vuetify.breakpoint.name) {
				case 'xs' : return '200px'
				case 'sm' : return '300px'
				case 'md' : return '300px'
				case 'lg' : return '300px'
				case 'xl' : return '350px'
			}
			return '300px'
		}
	}
}
</script>