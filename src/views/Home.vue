<template lang="pug">
	div
		Header
		v-row 
			v-col(offset-md="2" cols="8" )
				v-divider
		Schedule
</template>

<script>
import Header from '@/components/partials/Header'
import Schedule from '@/components/Schedule'
export default {
	name: 'Home',
	components:{
		Header,
		Schedule
	},
}
</script>