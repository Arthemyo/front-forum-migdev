<template>
    <div class="conteiner">
        <div class="row p-5">
            <div class="m-1 d-flex justify-content-center pt-5">
                <div class="col-md-6">
                    <div class="d-flex">
                        <div class="mt-3 p-3">
                            <p class="fw-light">{{ user.nome }}</p>
                            <p class="fw-light">{{ user.email }}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: "UserVue",
    setup() {
        const store = useStore()
        var user = computed(() => store.getters.getUser)
        var token = computed(() => store.getters.getToken)

        return {
            user,
            token,
            store
        }
    },
    methods: {
        

    }
})
</script>

<style scoped>
img {
    width: 125px;
}

.row {
    margin-left: 0;
    margin-right: 0;
}
</style>