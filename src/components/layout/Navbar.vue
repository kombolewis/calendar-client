<template lang="pug">
	v-app-bar(app color="primary" dark)
		v-toolbar-title.font-weight-bold EVSCRT
		v-spacer
		v-btn(
			v-for="link in links"
			:key="`${link.label}-header-link`"
			text 
			rounded 
			:to="link.url"
		)
			span(@click="handleClicks(link.label)") {{ link.label }}

		
</template>

<script>

export default {
		name:'Navbar',
		props:['links'],
		methods:{
			handleClicks(label){
				if(label == 'Logout'){
					this.logout()
				}
			},
			logout(){
				this.$store.dispatch('logoutUser')
				.then(() => {
					this.$store.commit('updateSnackbar', {
            show:true,
            variant:'success',
            message:'Logout successful'
          })
				})
				.catch((err) => {
					console.log(err)
					this.$store.commit('updateSnackbar', {
            show:true,
            variant:'error',
            message:'Log out failed'
          })
				})
			}
		}
}
</script>