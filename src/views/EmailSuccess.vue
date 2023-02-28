<template>
    <section class="conteiner row">
        <div class="d-flex justify-content-center mt-5">
            <div class="d-block p-5">
                <h3 class="fs-3 text text-success ">Email enviado com sucesso</h3>
                <p>Verifique seu email {{email}}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'EmailSuccess',
    setup(){
        var route = useRoute()
        var email = route.params.email
        

        return{
            email
        }
    }
})
</script>
    

<style scoped>

</style>
