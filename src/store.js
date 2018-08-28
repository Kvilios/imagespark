import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        users: [],
        range: {
            from: 0,
            length: 3 // по сколько пользователей подгружать за раз
        },
        loadUsersComplete: false,
        search: '',
        sortingBy: 0
    },
    getters: {
        usersData(state) {
            return state.users
        },
        rangeData(state) {
            return state.range
        },
        loadUsersCompleteData(state) {
            return state.loadUsersComplete
        },
        searchData(state) {
            return state.search
        },
        sortingByData(state) {
            return state.sortingBy
        }
    },
    mutations: {
        addUsers(state) {
            axios.get('/actions/getUsers.php', { params: { range: state.range.from + '-' + state.range.length } })
            .then(response => {
                if (response.data.length) {
                    response.data.forEach(el => {
                        state.users.push(el)
                    })
                }
                else state.loadUsersComplete = true
            })
            .catch(error => {
                console.log(error)
            })
        },
        updateRange(state) {
            state.range.from = state.range.from + state.range.length
        },
        updateSearch(state, value) {
            state.search = value
        },
        updateSortingBy(state, id) {
            state.sortingBy = id
        }
    },
    actions: {
        loadUsers({ commit }) {
            commit('updateRange')
            commit('addUsers')
        }
    }
})