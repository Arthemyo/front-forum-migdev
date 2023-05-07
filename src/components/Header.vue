<template>
    <header class="conteiner">
        <div class="row p-2 bg-light bg-opacity-100 shadow-sm">
            <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                    <p class="m-4 logo col-md-2">Migdev</p>
                    <div class="d-flex search">
                        <input placeholder="Pesquisar" class="m-1 col-md-4 form-control" type="text">
                    </div>
                </div>
                <ul class="col-md-2 mt-3">
                    <div class="d-flex">
                        <div v-if="isLogado" class="dropdown">
                            <a class="text-light btn btn-secondary dropdown-toggle" role="button"
                                data-bs-toggle="dropdown" href="#" aria-expanded="false">
                                {{ user.nome }}
                            </a>
                            <ul class="dropdown-menu">
                                <RouterLink class="dropdown-item" to="/">
                                    <li @click="logOff" class="fw-semibold text-danger">Sair</li>
                                </RouterLink>
                                <RouterLink class="dropdown-item" to="/suas_duvidas">
                                    <li class="fw-semibold">Suas Dúvidas</li>
                                </RouterLink>
                            </ul>
                        </div>
                        <div v-else class="d-flex">
                            <li class="p-2">
                                <RouterLink to="/login">{{ stringLogin }}</RouterLink>
                            </li>
                            <li :hidden="isLogado" class="p-2">
                                <RouterLink to="/cadastro">Cadastro</RouterLink>
                            </li>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
        <Menu />
    </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex';
import Menu from './Menu.vue';

export default defineComponent({
    name: "HeaderVue",
    setup() {
        var store = useStore()
        var stringLogin = ref('Login')

        return {
            stringLogin,
            user: computed(() => store.getters.getUser),
            isLogado: computed(() => store.getters.isLogado),
            store
        }
    },
    methods: {
        logOff() {
            this.store.dispatch('deslog')
        }
    },
    components: { Menu }
});
</script>

<style scoped>
.row {
    margin-left: 0;
    margin-right: 0;
}

.logo {
    font-family: 'Anton', sans-serif;
    font-size: 18px;
    margin-left: 1.5rem;
    color: #261B70;
}

p {
    margin-left: 1.5rem;
}

a {
    text-decoration: none;
    color: #423B6E;
}

ul {
    text-decoration: none;
    list-style: none;
}

.search > input{
    height: 1.5rem;
    padding: 8px;
    width: 15.5rem;
    border-radius: 3px;
}
</style>