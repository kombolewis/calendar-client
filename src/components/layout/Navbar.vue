<template lang="pug">
	v-app-bar(app color="primary" dark)
		v-toolbar-title.font-weight-bold NEOWS
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
const fb = {}
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
				fb.auth().signOut()
				.then(() => {
					return this.$store.dispatch('logoutUser')
				})
				.then(() => {
					return this.$router.push({name:'Home'})
				})
				.then(() => {
					this.$store.commit('updateSnackbar', {
            show:true,
            variant:'success',
            message:'Logout successful'
          })
				})
				.catch(() => {
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