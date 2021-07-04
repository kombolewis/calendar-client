import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.100.20:8000/api'




const state = {
    id_no: '',
    token: localStorage.getItem('access_token') || null,
    allAccounts: null,
    userInfo:null,


};

const getters = {
    getId: () => state.id_no,
    loggedIn: () => state.token != null,
    getAllAccounts: () => state.allAccounts,
    loggedinUserInfo: () => state.userInfo,

};

const actions = {


    async setCustomerId({commit}, data) {
       
        commit('setCustomerId', data)
    },

    getUserState(context, data) {
        return new Promise((resolve, reject) => {
            axios.post('/getUserState', {id_no:data.id_no})
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })

    
  
    },

    setContact(context,data) {
        return new Promise((resolve, reject) => {
            axios.post('/setContact', {
                contact:data.contact,
                id_no:data.id_no
            })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
  
    },

    loginUser({commit},data) {
        return new Promise((resolve, reject) => {
            axios.post('/login', {
                id_no:data.id_no,
                password:data.password
            })
            .then(response => {
                if(response.data.status == '22'){
                    const token = response.data.access_token
                    localStorage.setItem('access_token',token)
                    commit('setToken',token)
                }
                resolve(response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
  
    },

    setUserPassword({commit},data) {
        return new Promise((resolve, reject) => {
            axios.post('/setPassword', {
                id_no:data.id_no,
                password:data.password
            })
            .then(response => {
                const token = response.data.access_token
                localStorage.setItem('access_token', token)
                commit('setToken',token)
                resolve(response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
  
    },
    logoutUser({commit,state,getters}) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        if(getters.loggedIn){
            return new Promise((resolve, reject) => {
                axios.post('/logout')
                .then(response => {
                    localStorage.removeItem('access_token')
                    commit('removeToken')
                    resolve(response.data)
                }).catch(err => {
                    localStorage.removeItem('access_token')
                    commit('removeToken')
                    reject(err)
                })
            })
        }
    },
    resetUserPassword(context,data) {
        return new Promise((resolve, reject) => {
            axios.post('/setPassword', {
                id_no:data.id_no,
                password:data.password
            })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
  
    },
    async retrieveAccounts({commit,state}) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        const response = await axios.get('/members');  
        
        commit('setAccounts', response.data)
    },
    async requestUserInfo({commit,state}) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        const response = await axios.get('/userInfo');  
        
        commit('setUserInfo', response.data)
    },

    fetchTransactions(context,data) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        return new Promise((resolve, reject) => {
            axios.post('/fetchTransactions', {
                member_no:data.member_no,
                portfolio:data.portfolio
            })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },


    createAccount(context,data) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        return new Promise((resolve, reject) => {
            axios.post('/register', data)
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getNav(context, data) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        return new Promise((resolve, reject) => {
            axios.post('/fetchNav', {
                portfolio:data.portfolio
            })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getPDFStatement(context, data) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        return new Promise((resolve, reject) => {
            axios.post('/getPDFStatement', {
                portfolio:data.portfolio,
                member_no:data.member_no
            })
            .then(response => {
                resolve(response.data)
            }).catch(err => {
                reject(err)
            })
        })
    },

};

const mutations = {
    setCustomerId: (state, data) => (state.id_no = data),
    setToken: (state, data) => (state.token = data),
    setAccounts: (state, data) => (state.allAccounts = data),
    setUserInfo: (state, data) => (state.userInfo = data),
    removeToken: (state) => (state.token = null)


};

export default {
    state,
    getters,
    actions,
    mutations
};
