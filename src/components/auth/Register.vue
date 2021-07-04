<template lang="pug">
	v-container 
		v-row
			v-col(class="d-flex justify-center mb-6")
				v-form(ref="registerForm" v-model="formValidity")
					h1 Register
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