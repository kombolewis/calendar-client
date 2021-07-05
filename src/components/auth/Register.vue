<template lang="pug">
	v-container 
		v-row
			v-col(class="d-flex justify-center mb-6")
				v-form(ref="registerForm" v-model="formValidity")
					h1 Register
					v-text-field(
						label="Firstname"
						prepend-icon="mdi-account"
						v-model="fname" 
						required
					)
					v-text-field(
						label="Lastname"
						prepend-icon="mdi-account"
						v-model="lname" 
						required
					)
					v-text-field(
						label="Email"
						type="Email" 
						prepend-icon="mdi-email"
						v-model="email" 
						:rules="emailRules"
						required
					)
					v-text-field(
						:type="showPassword ? 'text' : 'password'" 
						label="Password"
						v-model="password"
						required
						:rules="passwordRules"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append = " showPassword = !showPassword "
					)
					v-switch(
						label="Agree to terms and conditions" 
						v-model="agreeToTerms"
						required
						:rules="agreeToTermRules"
					)
					v-btn.mr-4(color="primary" :disabled="!formValidity" @keyup.enter="register" @click="register") Submit
					v-btn.mr-4(color="warning" @click="resetValidation") Reset Validation
					v-btn(color="error" @click="resetForm") Reset 
			
</template>

<script>
export default {
		name:'Register',
		data: () => ({
      showPassword: false,
			agreeToTerms:false,
			agreeToTermRules:[
				value => !!value || 'You must agree to the terms and conditions to sign up for an account.'
			],
			email:'',
			fname:'',
			lname:'',
			emailRules: [
				value => !!value || 'Email is required.',
				value => value.indexOf('@') !== 0 || 'Email should have a username.',
				value => value.includes('@')|| 'Email should include \'@\' symbol',
				value => value.indexOf('.') - value.indexOf('@') > 1 || 'Email should contain a valid domain.',
				value => value.indexOf('.') <= value.length - 3 || 'Email should contain a valid domain extension'
			],
			formValidity:false,
			password:'',
			passwordRules:[
				value => !!value || 'Password is required.',
				value => value.length >= 6 || 'Password too short. Atleast 6 characters required',
			]
		}),
		methods: {
			resetForm(){
				this.$refs.registerForm.reset()
			},
			resetValidation(){
				this.$refs.registerForm.resetValidation()
			},
			register(){
				this.$store.dispatch('registerUser', {
					email:this.email,
					password:this.password,
					fname:this.fname,
					lname:this.lname
				})
				.then(() => {
					return this.$router.replace({name:'Home'})
				})
				.then(() => {
					this.$store.commit('updateSnackbar', {
            show:true,
            variant:'success',
            message:'Registration successful'
          })
				})
				.catch(() => {
          this.$store.commit('updateSnackbar', {
            show:true,
            variant:'error',
            message:'Registration failed'
          })
				})
			}
		},
}
</script>