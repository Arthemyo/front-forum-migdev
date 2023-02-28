<template>
    <section class="bg-dark bg-gradient ">
        <nav>
            <ul class="d-flex justify-content-evenly">
                <li class="p-2">
                    <router-link to="/" class="link fw-semibold text-light">Post Sua Dúvida</router-link>
                </li>
                <li class="p-2">
                    <router-link to="/posts" class="link fw-semibold text-light">Dúvidas</router-link>
                </li>
            </ul>
        </nav>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex';

export default defineComponent({
    name: 'MenuVue',
    setup(){
        const store = useStore()

        return{
            logado: computed(() => store.getters.isLogado)
        }
    }
})
</script>

<style scoped>
section{
    height: 40px;
}

ul{
    margin-right: 1.5rem;
    text-decoration: none;
    list-style: none;
}

.link {
    text-decoration: none;
}
</style>
