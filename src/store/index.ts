import { createStore, Store } from "vuex"
import { InjectionKey } from 'vue'
import axios from "axios"

interface Estado {
    user: object,
    logado: boolean,
    token: string
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        user: {
            email: sessionStorage.getItem('EMAIL'),
            nome: sessionStorage.getItem('NOME'),
            id: Number(sessionStorage.getItem('ID')),
            imagem: sessionStorage.getItem('IMAGEM')
        },
        logado: sessionStorage.getItem('NOME') ? true : false,
        token: sessionStorage.getItem('TOKEN') || ''
    },
    getters: {
        getUser: (state) => state.user,
        isLogado: (state) => state.logado,
        getToken: (state) => state.token
    },
    actions: {
        async login({ commit }, user) {

            await axios.post('http://localhost:8080/auth', {
                email: user.email,
                senha: user.senha
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).then((data) => {
                    console.log(data.data.usuario);
                    
                    const imagem = "data:image;base64," + data.data.usuario.imagem

                    sessionStorage.setItem('TOKEN', data.data.token)
                    sessionStorage.setItem('EMAIL', data.data.usuario.email)
                    sessionStorage.setItem('NOME', data.data.usuario.usuario)
                    sessionStorage.setItem('ID', data.data.usuario.id)
                    sessionStorage.setItem('IMAGEM', imagem)

                    user.email = sessionStorage.getItem('EMAIL')
                    user.nome = sessionStorage.getItem('NOME')
                    user.id = Number(sessionStorage.getItem('ID'))
                    user.imagem = sessionStorage.getItem('IMAGEM')

                    commit('SET_USER', user)
                    commit('SET_LOGADO', true)
                    commit('SET_TOKEN', sessionStorage.getItem('TOKEN'))

                    return data.data

                }).catch((error) => {
                    console.log(error.message)

                    return {
                        messege: error.message
                    }
                })
        },
        deslog({ commit }) {

            commit('SET_USER', {})
            commit('SET_LOGADO', false)
            commit('SET_TOKEN', '')

            sessionStorage.clear()

        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        SET_LOGADO(state, logado) {
            state.logado = logado
        },
        SET_TOKEN(state, token) {
            state.token = token
        }
    }
})

export default store