<template>
    <div class="border border-top-0 border-bottom-0 p-3 content">
        <ul>
            <li>
                <div><RouterLink to="/tags">Tags</RouterLink></div>
            </li>
            <li>
                <div v-if="isLogado"><RouterLink to="/user">User</RouterLink></div> 
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: "BarraLateral",
    setup() {
        var store = useStore()

        return {
            isLogado: computed(() => store.getters.isLogado)
        }
    }
})
</script>

<style scoped>
ul{
    margin-right: 1.5rem;
    text-decoration: none;
    list-style: none;
}

.content{
    height: 100%;
    background-color: rgb(246, 246, 246);
}
</style>