<template>
    <section class="conteiner">
        <div class="row d-flex justify-content-center  pt-4">
            <div class="col-md-6 mt-4">
                <form>
                    <div id="formulario">
                        <div class="d-block">
                            <label class="d-block fw-light">Email<input v-model="email" id="email"
                                    class="d-block form-control" type="email" placeholder="Digite seu email"></label>
                            <label class="d-block mt-2 fw-light">Senha<input v-model="senha" id="senha" type="password"
                                    class="form-control d-block" placeholder="Digite sua senha"></label>
                            <span id="spanError" :hidden="!errorLogin ? true : false"
                                class=" m-2 d-block alert alert-danger d-none">Email ou senha incorreta</span>
                            <button class="btn btn-primary mt-2" type="button" @click="logUser()">Login</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'LoginVue',
    data() {
        return {
            errorLogin: true
        }
    },
    methods: {
        logUser() {
            this.user = this.getUser()
            this.store.dispatch('login', this.user)
                .finally(() => {
                    var isLogado = this.store.getters.isLogado

                    if (isLogado) {
                        this.$router.push('/posts')
                    } else {
                        var element = document.getElementById("spanError")

                        element?.classList.remove("d-none")

                    }
                })
        },
        getUser() {
            return {
                usuario: this.nome,
                email: this.email,
                senha: this.senha,
            }
        }
    },
    setup() {
        const store = useStore()
        var route = useRoute()

        var email = ''
        var senha = ''
        var nome = ''

        var user = {}

        return {
            email,
            senha,
            nome,
            user,
            store,
            route
        }

    }
})
</script>

<style scoped>
.row {
    margin-left: 0;
    margin-right: 0;
}
</style>
