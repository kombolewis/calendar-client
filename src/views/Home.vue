<template lang="pug">
	div
		Header
		v-row 
			v-col(offset-md="2" cols="8" )
				v-divider
</template>

<script>
import Header from '@/components/partials/Header'
export default {
	name: 'Home',
	components:{
		Header,
	},
}
</script>