import axios from 'axios';

axios.defaults.baseURL = 'https://calend-serve-app.herokuapp.com/api'


const state = {
    token: localStorage.getItem('access_token') || null,
    UserSchedule: '',
		show:false,
		variant:'',
		message:''


};

const getters = {
    isLoggedIn: () => state.token != null,
    getUserSchedule: () => state.UserSchedule,
		checkShow: () => state.show,
		checkVariant: () => state.variant,
		checkMessage: () => state.message,


};

const actions = {

	
	async getSchedule({commit,state}) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
		const response = await axios.get('/getSchedule');  
		
		commit('setUserSchedule', response.data)
	},

	loginUser({commit},data) {
		return new Promise((resolve, reject) => {
			axios.post('/login', data)
			.then(response => {
				if(response.status == 200){
						const token = response.data.access_token
						localStorage.setItem('access_token',token)
						commit('setToken',token)
				}
				resolve(response.data)
			}).catch(err => {
					reject(err)
			})
		})

	},

	registerUser({dispatch},data) {
		return new Promise((resolve, reject) => {
			axios.post('/register', data)
			.then(response => {
					if(response.status == 201){
						return dispatch('loginUser', {email:data.email,password:data.password})
					}
			})
			.then((resp) => {
				resolve(resp.data)
			})
			.catch(err => {
					reject(err)
			})
		})

	},
	createEvent({commit},data) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
		return new Promise((resolve, reject) => {
			axios.post('/event', data)
			.then(response => {
				if(response.status == 201){
						resolve(response.data)
						commit()
				}
			}).catch(err => {
					reject(err)
			})
		})

	},
   
	logoutUser({commit,state,getters}) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
			if(getters.isLoggedIn){
					return new Promise((resolve, reject) => {
							axios.post('/logout')
							.then(response => {
								if(response.status == 200){
									localStorage.removeItem('access_token')
									commit('removeToken')
									resolve(response.data)
								}else{
									throw new Error('something went wrong')
								}
							}).catch(err => {
									localStorage.removeItem('access_token')
									commit('removeToken')
									reject(err)
							})
					})
			}
	},


};

const mutations = {
    setToken: (state, data) => (state.token = data),
    setUserSchedule: (state, data) => (state.UserSchedule = data),
		removeToken: (state) => (state.token = null),
		updateSnackbar: (state,data) =>  {
      state.message = data.message
      state.variant = data.variant
      state.show = data.show
      return
     
    } 


};

export default {
    state,
    getters,
    actions,
    mutations
};
