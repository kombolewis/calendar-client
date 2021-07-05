<template lang="pug">
	v-footer(color='primary lighten-1' padless)
		v-row(justify='center' no-gutters)
			v-btn.my-2(
				v-for='link in links' 
				:key="`${link.label}-footer-link`"
				color='white' 
				text 
				rounded
				:to="link.url"
			)
				| {{ link.label }}
			v-col.primary.lighten-2.py-4.text-center.white--text(cols='12')
				| {{ new Date().getFullYear() }} &mdash; 
				strong EVSCRT

</template>

<script>
export default {
	name:'Footer',
	props:['links']
}
</script>